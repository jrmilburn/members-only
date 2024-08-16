const pool = require("./pool");

async function getUserFromName(username) {
    const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [
        username  
      ]);
    return rows[0];
}

async function getUserFromId(id) {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return rows[0];
}

async function createUser(user) {
    await pool.query(`
        INSERT INTO users (firstname, lastname, username, password) 
        VALUES ($1, $2, $3, $4)
        `, [
            user.firstname,
            user.lastname,
            user.username,
            user.password
        ])
}

async function getAllMessages() {

    const { rows } = await pool.query(`
        SELECT message, messages.id, username 
        FROM messages 
        JOIN users 
        ON (users.id = messages.userid);
        `)

        console.log(rows);

    return rows;
}

async function createMessage(message) {

    await pool.query(`
        INSERT INTO messages (message, userid)
        VALUES ($1, $2)
        `, [
            message.message,
            message.userid,
        ])

}

async function deleteMessage(messageID) {

    await pool.query(`
        DELETE FROM messages
        WHERE id = $1;    
        `, [
            messageID
        ]);

}

module.exports = {
    getUserFromName,
    getUserFromId,
    createUser,
    getAllMessages,
    createMessage,
    deleteMessage
}