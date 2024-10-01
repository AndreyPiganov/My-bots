import dotenv from 'dotenv';

dotenv.config();

export default {
    odin: {
        email: String(process.env.ODIN_EMAIL) || '',
        password: String(process.env.ODIN_PASSWORD) || ''
    },
    schedule: {
        monday: {
            first: 'https://zoom.us/j/4095516819?pwd=SlQyQ2YvRWZ1OE1Qdm5UamVTRk5KUT09',
            second: 'https://zoom.us/j/4095516819?pwd=SlQyQ2YvRWZ1OE1Qdm5UamVTRk5KUT09',
            third: 'https://zoom.us/j/4095516819?pwd=SlQyQ2YvRWZ1OE1Qdm5UamVTRk5KUT09',
            four: 'https://zoom.us/j/4898102962?pwd=RjFvUnRVVXFVRGhiOGZRYmdsc3ZOdz09'
        },
        tuesday: {
            first: 'https://zoom.us/j/4095516819?pwd=SlQyQ2YvRWZ1OE1Qdm5UamVTRk5KUT09',
            second: 'https://zoom.us/j/4898102962?pwd=RjFvUnRVVXFVRGhiOGZRYmdsc3ZOdz09'
        },
        wednesday: {
            first: 'https://zoom.us/j/8204557587?pwd=MUpQMFNMUVNNWXB6SUhYU0MreWdCdz09',
            second: 'https://zoom.us/j/7463860716?pwd=NTJnMXIrMHlPRnlCUEJSZlR1cmVCdz09',
            third: 'https://zoom.us/j/2615158278?pwd=Vnk0L3EycnVUeTNFYlJ2RWZxNURJQT09'
        },
        thursday: {
            first: 'https://zoom.us/j/4095516819?pwd=SlQyQ2YvRWZ1OE1Qdm5UamVTRk5KUT09',
            second: 'https://zoom.us/j/4095516819?pwd=SlQyQ2YvRWZ1OE1Qdm5UamVTRk5KUT09'
        },
        friday: {
            first: 'https://zoom.us/j/4095516819?pwd=SlQyQ2YvRWZ1OE1Qdm5UamVTRk5KUT09',
            second: 'https://zoom.us/j/8109183427?pwd=NTd4SG4zNHpwUVNDa3c5NVNWTFBEdz09',
            third: 'https://zoom.us/j/6480814148?pwd=SjJaeWkvelg0Y3JWYmdsRG9veElLQT09'
        }
    },
    port: process.env.PORT || 5000,
    logLevel: String(process.env.LOG_LEVEL) || 'debug',
    nodeEnv: String(process.env.NODE_ENV) || 'development'
};
