import puppeteer from 'puppeteer';
import formatTime from '../src/utils/formatTime';
import getCurrentDay from '../src/utils/getCurrentDay';
import logger from '../src/utils/logger';

export default async function startZoomClass(link: string, numberClass: number): Promise<void> {
    try {
        const now = new Date();
        const dayOfWeek = getCurrentDay();
        const time = formatTime(now);

        logger.info(`Выполняется задача в ${dayOfWeek} ${time} - ${numberClass} пара`);

        const browser = await puppeteer.launch({
            headless: true,
            executablePath: '/usr/bin/chromium-browser',
            args: [
                '--use-fake-ui-for-media-stream', // Автоматически принимает запросы на доступ к микрофону/камере
                '--use-fake-device-for-media-stream', // Использует фейковые устройства для тестирования
                '--use-file-for-fake-audio-capture=./assets/micro.wav',
                '--allow-file-access',
                '--no-sandbox',
                '--disable-setuid-sandbox'
            ],
            ignoreDefaultArgs: ['--mute-audio']
        });

        const context = browser.defaultBrowserContext();

        await context.overridePermissions(link, ['microphone', 'camera']);
        await context.overridePermissions('https://zoom.us', ['microphone', 'camera']);
        await context.overridePermissions('https://app.zoom.us', ['microphone', 'camera']);

        const page = await browser.newPage();

        page.on('console', (msg) => {
            logger.log('BROWSER LOG:', msg.text());
        });

        const page2 = await browser.newPage(); // Для скипа окна браузера зума.

        await page.setViewport({
            width: 1280,
            height: 720,
            deviceScaleFactor: 1 // Масштабирование. 1 = 100%, 2 = 200%, и т.д.
        });

        await page2.setViewport({
            width: 1280,
            height: 720,
            deviceScaleFactor: 1
        });

        await page.goto(link);
        await page2.goto(link);

        await page2.close();

        await page.waitForSelector('a[download]', { timeout: 60000 });

        await page.click('a[download]');

        await page.waitForSelector('a[web_client]');

        const response = await Promise.all([
            page.waitForNavigation(), // Ожидание редиректа
            page.click('a[web_client]') // Клик по элементу
        ]);

        await page.goto(response[0].url());

        const iframeElement = await page.$('iframe');

        const frame = await iframeElement.contentFrame();

        await frame.waitForSelector('input[type="text"]', { visible: true });

        await frame.type('input[type="text"]', 'Пиганов Андрей 3102д');

        await frame.click('button[type=button]');
        try {
            await frame.waitForSelector('div[class="preview-video__control-button-container simple"]', {
                timeout: 5000
            });

            await frame.click('div[class="preview-video__control-button-container simple"]');

            await frame.click('div[class="preview-video__control-button-container simple"]');

            logger.info('Отлично подключили звук для конференции');
        } catch {
            await frame.waitForSelector(
                'button[class="zm-btn join-audio-by-voip__join-btn zm-btn--primary zm-btn__outline--white zm-btn--lg"]'
            );

            await frame.click(
                'button[class="zm-btn join-audio-by-voip__join-btn zm-btn--primary zm-btn__outline--white zm-btn--lg"]'
            );

            logger.warn('Конференция уже работает и подключили звук');
        }

        logger.info('Бот вошел в конференцию');

        await frame.waitForSelector('button[class="zm-btn zm-btn-legacy zm-btn--primary zm-btn__outline--blue"]', {
            timeout: 0
        });

        await frame.click('button[class="zm-btn zm-btn-legacy zm-btn--primary zm-btn__outline--blue"]');

        const endDateWork = new Date();
        const endTime = formatTime(endDateWork);

        logger.info(`Задача закончилась в ${dayOfWeek} ${endTime}`);

        await browser.close();
    } catch (error) {
        logger.error('Произошла ошибка', error);
        throw error;
    }
}
