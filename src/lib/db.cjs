const { Pool } = require("pg");

/**
 * Create a new connection pool to the database.
 */
const pool = new Pool({
  database: process.env.POSTGRES_DB || "postgres",
  user: process.env.POSTGRES_USERNAME || "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  port: Number(process.env.POSTGRES_PORT || 5432),
});

/**
 * Connect to the PostgreSQL database.
 * @returns {Promise<import("pg").Client>} A new client from the connection pool.
 */
const connectToDB = async () => await pool.connect();

module.exports = { connectToDB };
