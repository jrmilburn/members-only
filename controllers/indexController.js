const db = require("../db/queries");

async function messageGet(req, res) {

    const messages = await db.getAllMessages();

    res.render("index", {
        title: "message",
        user: req.user,
    });

}

module.exports = {
    messageGet,
}