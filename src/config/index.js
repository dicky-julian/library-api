const config = {
    mysql: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    },
    jwt: {
        secret: process.env.SECRET_KEY,
        secretRefresh: process.env.SECRET_KEY_REFRESH
    }
}

module.exports = config;