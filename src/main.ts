import express from 'express';
import config from './config/configuration';
import { scheduleTask } from './utils/scheduleTask';
import { getCurrentDayIndex } from './utils/getCurrentDay';
import TaskQueue from './structures/TaskQueue';

const scheduleConfig = config.schedule;

const app = express();
const PORT = process.env.PORT || 5000;
const taskQueue = new TaskQueue();

for (const [day, tasks] of Object.entries(scheduleConfig)) {
    tasks.forEach((task) => scheduleTask(`${task.time} * * ${getCurrentDayIndex(day)}`, task.tasks, taskQueue));
}

app.listen(PORT, () => {
    console.log(`Сервер работает на порту ${PORT}`);
});
