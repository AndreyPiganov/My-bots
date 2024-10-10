import dotenv from 'dotenv';
import runHHBot from 'scripts/hhBot';
import startOdinOnline from 'scripts/odinOnlineBot';
import startZoomClass from 'scripts/runZoomBot';

dotenv.config();

const items = {
    testing: {
        link: 'https://zoom.us/j/4095516819?pwd=SlQyQ2YvRWZ1OE1Qdm5UamVTRk5KUT09',
        name: 'Поддержка и тестирование программных модулей'
    },
    programming: {
        link: 'https://zoom.us/j/4095516819?pwd=SlQyQ2YvRWZ1OE1Qdm5UamVTRk5KUT09',
        name: 'Разработка программных модулей'
    },
    mobile: {
        link: 'https://zoom.us/j/8204557587?pwd=MUpQMFNMUVNNWXB6SUhYU0MreWdCdz09',
        name: 'Разработка мобильных приложений'
    },
    securityLife: {
        link: 'https://zoom.us/j/4898102962?pwd=RjFvUnRVVXFVRGhiOGZRYmdsc3ZOdz09',
        name: 'Безопасность жизнедеятельности'
    },
    db: {
        link: 'https://zoom.us/j/7463860716?pwd=NTJnMXIrMHlPRnlCUEJSZlR1cmVCdz09',
        name: 'Технология разработки и защиты баз данных'
    },
    psihology: {
        link: 'https://zoom.us/j/2615158278?pwd=Vnk0L3EycnVUeTNFYlJ2RWZxNURJQT09',
        name: 'Психология общения'
    },
    systemProgramming: {
        link: 'https://zoom.us/j/4095516819?pwd=SlQyQ2YvRWZ1OE1Qdm5UamVTRk5KUT09',
        name: 'Системное программирование Node.js'
    },
    docs: {
        link: 'https://zoom.us/j/6480814148?pwd=SjJaeWkvelg0Y3JWYmdsRG9veElLQT09',
        name: 'Стандартизация, сертификация и техническое документоведение'
    }
};

export default {
    services: {
        odin: {
            email: String(process.env.ODIN_EMAIL) || '',
            password: String(process.env.ODIN_PASSWORD) || ''
        },
        hh: {
            email: String(process.env.HH_EMAIl) || '',
            password: String(process.env.HH_PASSWORD) || ''
        }
    },
    schedule: {
        monday: [
            {
                time: '0 9',
                tasks: [startOdinOnline, () => startZoomClass(items.testing.link, 1)]
            },
            {
                time: '10 10',
                tasks: [runHHBot]
            },
            {
                time: '45 10',
                tasks: [startOdinOnline, () => startZoomClass(items.programming.link, 2)]
            },
            {
                time: '12 45',
                tasks: [startOdinOnline, () => startZoomClass(items.mobile.link, 3)]
            },
            {
                time: '30 14',
                tasks: [startOdinOnline, () => startZoomClass(items.securityLife.link, 4)]
            },
            {
                time: '50 14',
                tasks: [runHHBot]
            },
            {
                time: '0 19',
                tasks: [runHHBot]
            },
            {
                time: '15 23',
                tasks: [runHHBot]
            }
        ],
        tuesday: [
            {
                time: '0 9',
                tasks: [startOdinOnline, () => startZoomClass(items.programming.link, 1)]
            },
            {
                time: '10 10',
                tasks: [runHHBot]
            },
            {
                time: '45 10',
                tasks: [startOdinOnline, () => startZoomClass(items.securityLife.link, 2)]
            },
            {
                time: '50 14',
                tasks: [runHHBot]
            },
            {
                time: '10 19',
                tasks: [runHHBot]
            },
            {
                time: '15 23',
                tasks: [runHHBot]
            }
        ],
        wednesday: [
            {
                time: '0 9',
                tasks: [startOdinOnline, () => startZoomClass(items.mobile.link, 1)]
            },
            {
                time: '10 10',
                tasks: [runHHBot]
            },
            {
                time: '45 10',
                tasks: [startOdinOnline, () => startZoomClass(items.db.link, 2)]
            },
            {
                time: '45 12',
                tasks: [startOdinOnline, () => startZoomClass(items.psihology.link, 3)]
            },
            {
                time: '50 14',
                tasks: [runHHBot]
            },
            {
                time: '10 19',
                tasks: [runHHBot]
            },
            {
                time: '15 23',
                tasks: [runHHBot]
            }
        ],
        thursday: [
            {
                time: '10 10',
                tasks: [runHHBot]
            },
            {
                time: '20 14',
                tasks: [runHHBot]
            },
            {
                time: '30 14',
                tasks: [startOdinOnline, () => startZoomClass(items.systemProgramming.link, 1)]
            },
            {
                time: '15 16',
                tasks: [startOdinOnline, () => startZoomClass(items.systemProgramming.link, 2)]
            },
            {
                time: '45 18',
                tasks: [runHHBot]
            },
            {
                time: '0 40',
                tasks: [runHHBot]
            }
        ],
        friday: [
            {
                time: '20 0',
                tasks: [runHHBot]
            },
            {
                time: '10 10',
                tasks: [runHHBot]
            },
            {
                time: '55 1',
                tasks: [startOdinOnline, runHHBot]
            }, // тест
            {
                time: '45 12',
                tasks: [startOdinOnline, () => startZoomClass(items.programming.link, 1)]
            },
            {
                time: '20 14',
                tasks: [runHHBot]
            },
            {
                time: '30 14',
                tasks: [startOdinOnline, () => startZoomClass(items.securityLife.link, 2)]
            },
            {
                time: '15 16',
                tasks: [startOdinOnline, () => startZoomClass(items.docs.link, 3)]
            },
            {
                time: '40 18',
                tasks: [runHHBot]
            },
            {
                time: '0 23',
                tasks: [runHHBot]
            }
        ]
    },
    system: {
        port: process.env.PORT || 5000,
        logLevel: String(process.env.LOG_LEVEL) || 'debug',
        nodeEnv: String(process.env.NODE_ENV) || 'development'
    }
};
