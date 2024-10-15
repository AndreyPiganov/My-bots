import puppeteer from 'puppeteer';
import logger from '../src/utils/logger';
import { getCurrentDay } from '../src/utils/getCurrentDay';
import formatTime from '../src/utils/formatTime';
import { ConfigService } from '@nestjs/config';
import fs from 'fs';
import path from 'path';

export default async function runHHBot(): Promise<void> {
    const userDataDir = './session/hh';
    const configService = new ConfigService();
    try {
        const now = new Date();
        const dayOfWeek = getCurrentDay();
        const time = formatTime(now);
        logger.info(`Бот заходит для поднятия поиска резюме в ${dayOfWeek} ${time}`);

        const browser = await puppeteer.launch({
            headless: true,
            executablePath: '/usr/bin/google-chrome-stable',
            args: [
                '--allow-file-access',
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--disable-gpu'
            ],
            userDataDir,
            protocolTimeout: 0
        });

        const page = await browser.newPage();

        await page.setUserAgent(
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36'
        );

        await page.setExtraHTTPHeaders({
            'Accept-Language': 'en-US,en;q=0.9'
        });

        await page.setViewport({
            width: 1280,
            height: 720,
            deviceScaleFactor: 1 // Масштабирование. 1 = 100%, 2 = 200%, и т.д.
        });
        await page.goto('https://spb.hh.ru/', { waitUntil: 'load' });
        const isLoggin = await page.$('a[data-qa="login"]');
        if (isLoggin) {
            await isLoggin.click();

            logger.info('Бот начал авторизовываться на сайте');

            await page.waitForSelector('a[data-qa="expand-login-by-password"]', { visible: true });

            await page.click('a[data-qa="expand-login-by-password"]');

            await page.waitForSelector('input[data-qa="login-input-username"]', { visible: true });
            await page.waitForSelector('input[data-qa="login-input-password"]', { visible: true });

            await page.type('input[data-qa="login-input-username"]', configService.get('HH_EMAIL'));
            await page.type('input[data-qa="login-input-password"]', configService.get('HH_PASSWORD'));

            await page.click('button[data-qa="account-login-submit"]');
        }

        await page.waitForSelector('a[data-qa=mainmenu_myResumes]');

        await page.click('a[data-qa=mainmenu_myResumes]');

        logger.info('Бот заходит в резюме');

        try {
            await page.waitForSelector('button[data-qa="resume-update-button_actions"]', { timeout: 60000 });

            await page.click('button[data-qa="resume-update-button_actions"]');

            logger.info('Резюме поднято в поиске');
        } catch {
            logger.warn('Резюме уже поднято в поиске');
        }

        await page.close();
        await browser.close();

        const endDateWork = new Date();
        const endTime = formatTime(endDateWork);

        logger.info(`Бот закончил работу в ${dayOfWeek} в ${endTime}`);
        return;
    } catch (error) {
        logger.error('Произошла ошибка', error);
        const sessionDirRm = path.resolve(__dirname, 'session/hh');
        if (fs.existsSync(sessionDirRm)) {
            logger.info(`Удаление папки: ${sessionDirRm}`);
            fs.rm(sessionDirRm, { recursive: true, force: true }, (err) => {
                if (err) {
                    logger.error(`Ошибка при удалении папки: ${err.message}`);
                } else {
                    logger.info(`Папка ${sessionDirRm} успешно удалена.`);
                }
            });
        } else {
            logger.info(`Папка ${sessionDirRm} не существует.`);
        }
        throw error;
    }
}
