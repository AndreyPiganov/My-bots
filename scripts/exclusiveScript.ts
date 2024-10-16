import { Frame } from 'puppeteer';
import gptSendMessage from '../src/utils/gptReq';
import logger from '../src/utils/logger';

export default async function exclusiveScript(frame: Frame) {
    try {
        await frame.waitForSelector('div[class="footer-chat-button"]');

        await frame.waitForSelector('div[id="chat"]');

        await frame.click('div[class="footer-chat-button"]');

        await frame.click('div[id="chat"]');

        await frame.waitForSelector('div span[title="Test"]', { timeout: 0 });

        const divchatItem = await frame.$('div span[title="Test"]'); // Имя преподователя в Zoom

        if (divchatItem) {
            const divP = await frame.$('div[class="_rtfEditor_1n3rs_1"] > p');

            if (divP) {
                const pContent = await divP.evaluate((p) => p.textContent);

                logger.info('Текст элемента p:', pContent);

                const response = await gptSendMessage({
                    role: 'user',
                    content: `${pContent}(Ответь одним словом на вопрос)`
                });

                const editableDiv = await frame.$('div[contenteditable="true"]');

                await editableDiv.evaluate((el: HTMLElement) => {
                    el.innerHTML = response;
                });
            } else {
                logger.warn('Элемент p не найден.');
            }
        } else {
            logger.error('div с span[title="Имя преподавателя в Zoom"] не найден.');
        }
    } catch (error) {
        logger.error(error);
        throw error;
    }
}
