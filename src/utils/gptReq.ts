import axios from 'axios';
import Message from '../common/interfaces/Message';
import logger from './logger';

export default async function gptSendMessage(message: Message) {
    const API_KEY =
        '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';

    const data = {
        model: 'gpt-3.5-turbo',
        messages: [message],
        max_tokens: 2000,
        temperature: 0.5
    };

    const config = {
        headers: {
            Authorization: `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        }
    };

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', data, config);
        const responseData = response.data.choices[0];
        console.log(responseData.message.content);
        return responseData.message.content;
    } catch (error) {
        logger.error(error);
        throw error;
    }
}
