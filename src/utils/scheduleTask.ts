import cron from 'node-cron';
import runWithRetries from './runWithRetries';
import TaskQueue from 'src/structures/TaskQueue';

export const scheduleTask = (time: string, tasks: Function[], taskQueue: TaskQueue) => {
    cron.schedule(time, async () => {
        for (const task of tasks) {
            taskQueue.add(async () => await runWithRetries(task));
        }
    });
};
