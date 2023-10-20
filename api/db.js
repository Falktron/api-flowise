const { Database } = require('pg-promise');

const connectionDetails = {
    user: process.env.DATABASE_USERNAME  || 'flowise',
    password: process.env.DATABASE_PASSWORD ||'Change_this_password',
    host: process.env.DATABASE_HOST|| 'cxo2.mium.chat',
    database: process.env.DATABASE_NAME||'flowise',
    port: process.env.DATABASE_PORT||'5432',
};

const db = new Database(connectionDetails);

module.exports = { db };
