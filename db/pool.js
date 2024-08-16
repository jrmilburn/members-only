const { Pool } = require("pg");

const { HOST, USER, DATABASE, PASSWORD, DB_PORT } = process.env;

const pool = new Pool({
    host: HOST,
    user: USER,
    database: DATABASE,
    password: PASSWORD,
    port: DB_PORT,
});

module.exports = pool;