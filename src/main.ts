import express from 'express';
import config from './config/configuration';
import { scheduleTask } from './utils/scheduleTask';
import { getCurrentDayIndex } from './utils/getCurrentDay';

const scheduleConfig = config.schedule;

const app = express();
const PORT = process.env.PORT || 5000;

for (const [day, tasks] of Object.entries(scheduleConfig)) {
    tasks.forEach((task) => scheduleTask(`${task.time} * * ${getCurrentDayIndex(day)}`, task.tasks));
}

app.listen(PORT, () => {
    console.log(`Сервер работает на порту ${PORT}`);
});
