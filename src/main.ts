import startZoomClass from './bot';
import cron from 'node-cron';
import express from 'express';

const ZOOM_LINK_1 = 'https://us05web.zoom.us/j/89193547230?pwd=SXxhDEUTIVb8gYODlhRKyQRtfthPc1.1';

const app = express();

cron.schedule('0 9 * * 1', () => {
    startZoomClass(ZOOM_LINK_1, 1);
});

cron.schedule('45 10 * * 1', () => {
    startZoomClass(ZOOM_LINK_1, 2);
});

cron.schedule('45 12 * * 1', () => {
    startZoomClass(ZOOM_LINK_1, 3);
});

cron.schedule('30 14 * * 1', () => {
    startZoomClass(ZOOM_LINK_1, 4);
});

cron.schedule('0 9 * * 2', () => {
    startZoomClass(ZOOM_LINK_1, 1);
});

cron.schedule('45 10 * * 2', () => {
    startZoomClass(ZOOM_LINK_1, 2);
});

cron.schedule('0 9 * * 3', () => {
    startZoomClass(ZOOM_LINK_1, 1);
});

cron.schedule('45 10 * * 3', () => {
    startZoomClass(ZOOM_LINK_1, 2);
});

cron.schedule('45 12 * * 3', () => {
    startZoomClass(ZOOM_LINK_1, 3);
});

cron.schedule('30 14 * * 4', () => {
    startZoomClass(ZOOM_LINK_1, 1);
});

cron.schedule('15 16 * * 4', () => {
    startZoomClass(ZOOM_LINK_1, 2);
});

cron.schedule('45 12 * * 5', () => {
    startZoomClass(ZOOM_LINK_1, 1);
});

cron.schedule('30 14 * * 5', () => {
    startZoomClass(ZOOM_LINK_1, 2);
});

cron.schedule('15 16 * * 5', () => {
    startZoomClass(ZOOM_LINK_1, 3);
});

app.listen(5000, () => {
    console.log('Сервер работает на порту 5000');
});
