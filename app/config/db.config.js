module.exports = {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DB: process.env.DB_DATABASE,
    dialect: 'mysql',
    port: 3306,
    logging: false,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    dialectOptions: {
        connectTimeout: 60000
    }
};