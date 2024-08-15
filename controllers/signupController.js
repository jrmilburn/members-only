const db = require("../db/queries");
const bcrypt = require("bcryptjs");
const pool = require("../db/pool");

/*async function signUpPost(req, res) {

    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        try {
            await 
        }
    })

}*/

async function signUpGet(req, res){
    res.render("sign-up-form");
};

module.exports = {
    signUpGet,
}