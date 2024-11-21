import puppeteer from 'puppeteer';
import formatTime from '../src/utils/formatTime';
import { getCurrentDay } from '../src/utils/getCurrentDay';
import logger from '../src/utils/logger';
import delay from '../src/utils/delay';
import exclusiveKonturScript from './exclusiveKonturScript';

export default async function startKonturClass(link: string, className: string): Promise<void> {
    try {
        const now = new Date();
        const dayOfWeek = getCurrentDay();
        const time = formatTime(now);

        logger.info(`Выполняется задача в ${dayOfWeek} ${time} - ${className}`);

        const browser = await puppeteer.launch({
            headless: true,
            executablePath: '/usr/bin/google-chrome-stable',
            args: [
                '--use-fake-ui-for-media-stream', // Автоматически принимает запросы на доступ к микрофону/камере
                '--use-fake-device-for-media-stream', // Использует фейковые устройства для тестирования
                // '--use-file-for-fake-audio-capture=./assets/micro.wav',
                '--allow-file-access',
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-media-source'
                // '--accept-cookies', // Пробуем автоматически принимать cookies
                // '--disable-features=SameSiteByDefaultCookies' // Отключение обработки SameSite
            ],
            ignoreDefaultArgs: ['--mute-audio'],
            protocolTimeout: 0,
            timeout: 0
        });

        const context = browser.defaultBrowserContext();

        await context.overridePermissions(link, ['microphone', 'camera']);
        await context.overridePermissions('https://hexletcol2.ktalk.ru', ['microphone', 'camera']);
        await context.overridePermissions('https://ktalk.ru', ['microphone', 'camera']);

        const page = await browser.newPage();

        await page.setUserAgent(
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36'
        );

        await page.setExtraHTTPHeaders({
            'Accept-Language': 'ru-RU,en;q=0.9'
        });

        await page.setViewport({
            width: 1280,
            height: 720,
            deviceScaleFactor: 1
        });

        await page.goto(link, { waitUntil: 'networkidle2' });

        await delay(3000);

        await page.waitForSelector('input[type="text"]');

        await page.type('input[type="text"]', 'Пиганов Андрей 3102д', { delay: 100 });

        await delay(2000);

        await page.waitForSelector('button[type="submit"]');

        await page.click('button[type="submit"]');

        await delay(3000);

        await page.waitForSelector('div[role="button"]');

        await page.click('div[role="button"]');

        logger.info('Бот вошел в конфренцию');

        await page.screenshot({ path: 'screens/screenshotKontur.png' });

        const offMic = await page.$('button[aria-label="Выключить микрофон"]');

        if (offMic) {
            await offMic.click();

            await page.waitForSelector('button[aria-label="Выключить камеру"]');

            await page.click('button[aria-label="Выключить камеру"]');
        } else {
            await page.waitForSelector('button[aria-label="Turn off microphone"]');

            await page.click('button[aria-label="Turn off microphone"]');

            await delay(3000);

            await page.waitForSelector('button[aria-label="Turn off camera"]');

            await page.click('button[aria-label="Turn off camera"]');
        }

        logger.info('Микрофон и камера выключены');

        if (className === 'Тестовый блок' || className === 'Технология разработки и защиты баз данных') {
            logger.info('Обработка ответов эксклюзив для Базы данных');

            await exclusiveKonturScript(page);
        }

        await page.screenshot({ path: 'screens/preResultKontur.png' });

        const closeTime = 90 * 60 * 1000;

        await new Promise<void>((resolve) => {
            setTimeout(async () => {
                await page.screenshot({ path: 'screens/resultKontur.png' });
                await page.close();
                await browser.close();
                const endDateWork = new Date();
                const endTime = formatTime(endDateWork);
                logger.info('Браузер закрыт через полтора часа');
                logger.info(`Задача закончилась в ${dayOfWeek} ${endTime}`);
                resolve();
            }, closeTime);
        });

        return;
    } catch (error) {
        logger.error('Произошла ошибка', error);
        throw error;
    }
}
