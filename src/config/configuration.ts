export default () => ({
    odin: {
        email: String(process.env.ODIN_EMAIL) || '',
        password: String(process.env.ODIN_PASSWORD) || ''
    },
    hh: {
        email: String(process.env.HH_EMAIl) || '',
        password: String(process.env.HH_PASSWORD) || ''
    },
    port: process.env.PORT || 5000,
    logLevel: String(process.env.LOG_LEVEL) || 'debug',
    nodeEnv: String(process.env.NODE_ENV) || 'development'
});
