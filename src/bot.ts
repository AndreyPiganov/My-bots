import puppeteer from 'puppeteer';
import { formatTime } from './utils/formatTime';

export default async function startZoomClass(link: string, numberClass: number): Promise<void> {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const time = formatTime(now);
    console.log(`Выполняется задача в ${dayOfWeek} ${time} - ${numberClass} пара`, Date.now());

    const browser = await puppeteer.launch({
        headless: false,
        args: [
            '--use-fake-ui-for-media-stream', // Автоматически принимает запросы на доступ к микрофону/камере
            '--use-fake-device-for-media-stream', // Использует фейковые устройства для тестирования
            '--use-file-for-fake-audio-capture=./assets/micro.wav',
            '--allow-file-access'
        ],
        ignoreDefaultArgs: ['--mute-audio']
    });

    const context = browser.defaultBrowserContext();

    await context.overridePermissions(link, ['microphone', 'camera']);
    await context.overridePermissions('https://zoom.us', ['microphone', 'camera']);
    await context.overridePermissions('https://app.zoom.us', ['microphone', 'camera']);

    const page = await browser.newPage();
    const page2 = await browser.newPage(); // Для скипа окна браузера зума.

    await page.goto(link);
    await page2.goto(link);

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

        console.log('Отлично подключили звук для конференции');
    } catch {
        await frame.waitForSelector(
            'button[class="zm-btn join-audio-by-voip__join-btn zm-btn--primary zm-btn__outline--white zm-btn--lg"]'
        );

        await frame.click(
            'button[class="zm-btn join-audio-by-voip__join-btn zm-btn--primary zm-btn__outline--white zm-btn--lg"]'
        );
        console.warn('Конференция уже работает');
    }

    console.log('Бот вошел в конференцию');

    await frame.waitForSelector('button[class="zm-btn zm-btn-legacy zm-btn--primary zm-btn__outline--blue"]', {
        timeout: 0
    });

    await frame.click('button[class="zm-btn zm-btn-legacy zm-btn--primary zm-btn__outline--blue"]');

    console.log(`Задача закончилась в ${Date.now()}`);
    return;
}
