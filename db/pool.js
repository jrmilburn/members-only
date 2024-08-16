const { Pool } = require("pg");

const { HOST, USER_REMOTE, DATABASE, PASSWORD, DB_PORT } = process.env;

const pool = new Pool({
    host: HOST,
    user: USER_REMOTE,
    database: DATABASE,
    password: PASSWORD,
    port: DB_PORT,
});

module.exports = pool;