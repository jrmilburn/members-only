const pool = require("./pool");

async function getAllMessages() {
    const { rows } = await pool.query(`SELECT firstName, lastName, message FROM messages JOIN users ON (messages.userid = users.id);`);
    return rows;
}

async function getUserFromName(username) {
    const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [
        username  
      ]);
    return rows;
}

async function getUserFromId(id) {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
        id 
      ]);
    return rows;
}

/*async function createUser(user) {
    await pool.query(`
        INSERT INTRO users 
        `)
}*/

module.exports = {
    getAllMessages,
    getUserFromName,
    getUserFromId,
}