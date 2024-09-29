import startZoomClass from './bot';
import cron from 'node-cron';
import express from 'express';
import { config } from './config/configuration';

const { monday, tuesday, wednesday, thursday, friday } = config.schedule;

const app = express();

cron.schedule('0 9 * * 1', async () => {
    await startZoomClass(monday.first, 1);
});

cron.schedule('45 10 * * 1', async () => {
    await startZoomClass(monday.second, 2);
});

cron.schedule('45 12 * * 1', async () => {
    await startZoomClass(monday.third, 3);
});

cron.schedule('30 14 * * 1', async () => {
    await startZoomClass(monday.four, 4);
});

cron.schedule('0 9 * * 2', async () => {
    await startZoomClass(tuesday.first, 1);
});

cron.schedule('45 10 * * 2', async () => {
    await startZoomClass(tuesday.second, 2);
});

cron.schedule('0 9 * * 3', async () => {
    await startZoomClass(wednesday.first, 1);
});

cron.schedule('45 10 * * 3', async () => {
    await startZoomClass(wednesday.second, 2);
});

cron.schedule('45 12 * * 3', async () => {
    await startZoomClass(wednesday.third, 3);
});

cron.schedule('30 14 * * 4', async () => {
    await startZoomClass(thursday.first, 1);
});

cron.schedule('15 16 * * 4', async () => {
    await startZoomClass(thursday.second, 2);
});

cron.schedule('45 12 * * 5', async () => {
    await startZoomClass(friday.first, 1);
});

cron.schedule('30 14 * * 5', async () => {
    await startZoomClass(friday.second, 2);
});

cron.schedule('15 16 * * 5', async () => {
    await startZoomClass(friday.third, 3);
});

app.listen(5000, () => {
    console.log('Сервер работает на порту 5000');
});
