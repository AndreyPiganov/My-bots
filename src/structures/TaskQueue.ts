import { Task } from 'src/types/task';
import logger from 'src/utils/logger';

export default class TaskQueue {
    private queue: Task[];
    private isProcessing: boolean;

    constructor() {
        this.queue = [];
        this.isProcessing = false;
    }

    add(task: Task) {
        this.queue.push(task);
        this.processQueue();
    }

    async processQueue() {
        if (this.isProcessing) return;
        this.isProcessing = true;

        while (this.queue.length > 0) {
            const currentTask = this.queue.shift();
            try {
                await currentTask();
                logger.info('Задача начала обрабатываться');
            } catch (error) {
                logger.error('Ошибка выполнения задачи:', error);
            }
        }

        this.isProcessing = false;
    }
}
