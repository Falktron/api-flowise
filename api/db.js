const { Database } = require('pg-promise');

const connectionDetails = {
    user: process.env.DATABASE_USERNAME ,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT,
};

const db = new Database(connectionDetails);

module.exports = { db };
