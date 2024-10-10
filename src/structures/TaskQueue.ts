import { Task } from 'src/types/task';

export default class TaskQueue {
    private queue: Task[];
    private isProcessing: boolean;

    constructor() {
        this.queue = [];
        this.isProcessing = false;
    }

    // Добавляем задачу в очередь
    add(task: Task) {
        this.queue.push(task);
        this.processQueue();
    }

    // Обрабатываем очередь
    async processQueue() {
        if (this.isProcessing) return;
        this.isProcessing = true;

        while (this.queue.length > 0) {
            const currentTask = this.queue.shift();
            try {
                await currentTask();
            } catch (error) {
                console.error('Ошибка выполнения задачи:', error);
            }
        }

        this.isProcessing = false;
    }
}
