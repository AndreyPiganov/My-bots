import { ElementHandle, Page } from 'puppeteer';
import gptSendMessage from '../src/utils/gptReq';
import logger from '../src/utils/logger';
import delay from '../src/utils/delay';

export default async function exclusiveKonturScript(page: Page) {
    try {
        await delay(2000);

        await page.screenshot({ path: 'screens/exclusiveKontur.png' });

        await page.waitForSelector('button[aria-label="Chat"]', { timeout: 0 });

        await delay(5000);

        await page.click('button[aria-label="Chat"]');

        await page.screenshot({ path: 'screens/chatKontur.png' });

        let found = false;
        let foundEl: ElementHandle | null;

        while (!found) {
            const foundElDivs = await page.$$('div.message');
            const filteredDivs = (
                await Promise.all(
                    foundElDivs.map(async (divEl) => {
                        const spanEl = await divEl.$('span');
                        const spanElText = await spanEl?.evaluate((el) => el.textContent?.trim());
                        return spanElText === 'Астанин Павел Андреевич' ? divEl : null;
                    })
                )
            ).filter(Boolean);

            if (filteredDivs.length > 0) {
                found = true;
                foundEl = filteredDivs[0];
                logger.info('Элемент найден!');
                await page.screenshot({ path: 'screens/resultKontur.png' });
            } else {
                await page.screenshot({ path: 'screens/whileKontur.png' });
                logger.info('Элемент не найден, ожидаем...');
                await new Promise<void>((resolve) => setTimeout(resolve, 5000));
            }
        }

        const messageTextEl = await foundEl.$('message-text');

        if (messageTextEl) {
            const messageContent = await messageTextEl.evaluate((message) => message.textContent);

            logger.info(`Текст элемента message-text:${messageContent}`);

            const response = await gptSendMessage({
                role: 'user',
                content: `${messageContent}(Ответь коротко на этот, вопрос просто без обьяснения)`
            });

            logger.info(`Получен ответ на вопрос${response}`);

            const divIcon = await foundEl.$('n-icon');

            await divIcon.hover();

            await divIcon.click();

            await page.waitForSelector('textarea');

            await page.click('textarea');

            await page.type('textarea', response, { delay: 100 });

            await page.keyboard.press('Enter');

            logger.info('Отправили сообщение');
        } else {
            logger.warn('Элемент message-text не найден.');
        }
    } catch (error) {
        logger.error(error);
        throw error;
    }
}
