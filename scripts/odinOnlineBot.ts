import puppeteer from 'puppeteer';
import formatTime from '../src/utils/formatTime';
import config from '../src/config/configuration';
import getCurrentDay from '../src/utils/getCurrentDay';
import logger from '../src/utils/logger';

export default async function startOdinOnline(): Promise<void> {
    try {
        const now = new Date();
        const dayOfWeek = getCurrentDay();
        const time = formatTime(now);
        logger.info(`Бот заходит для показательного онлайна в ${dayOfWeek} ${time}`);

        const browser = await puppeteer.launch({
            headless: false,
            args: ['--allow-file-access'],
            userDataDir: './session/odin'
        });

        const page = await browser.newPage();

        await page.setViewport({
            width: 1280,
            height: 720,
            deviceScaleFactor: 1
        });

        await page.goto('https://www.odin.study/ru/Account/Login', { waitUntil: 'networkidle2' });

        const isLoggin = await page.$('button[data-v-9915af7a]');

        if (isLoggin) {
            await page.type('input[type="email"]', config.odin.email);

            await page.type('input[type="password"]', config.odin.password);

            await isLoggin.click();
        }

        const endDateWork = new Date();

        logger.info(`Бот закончил работу в ${dayOfWeek} - ${formatTime(endDateWork)}`);

        await browser.close();
    } catch (error) {
        logger.error('Произошла ошибка', error);
        throw error;
    }
}
