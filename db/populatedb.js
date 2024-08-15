const { Client } = require("pg");

require("dotenv").config();

const { HOST, USER, DATABASE, PASSWORD, DB_PORT } = process.env;

const userSQL = `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        firstName VARCHAR(255),
        lastName VARCHAR(255),
        username VARCHAR(255),
        password VARCHAR(255)
    );

    INSERT INTO users (firstName, lastName, username, password)
    VALUES ('Joe', 'Milburn', 'jrmilburn@outlook.com', 'password');
`;

const messageSQL = `
    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        message TEXT,
        userId INTEGER,
        FOREIGN KEY (userId) REFERENCES users(id)
    );

    INSERT INTO messages(message, userId)
    VALUES ('Hello world!', 1);
`;

async function main() {
    console.log('seeding...');
    const client = new Client({
        connectionString: `postgresql://${USER}:${PASSWORD}@${HOST}:${DB_PORT}/${DATABASE}`,
    });
    await client.connect();
    await client.query(userSQL);
    await client.query(messageSQL);
    await client.end();
    console.log("done");
}

main();