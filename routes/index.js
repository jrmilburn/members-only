const { Router } = require("express");
const db = require("../db/queries");
const passport = require("../db/passport");
const bcrypt = require("bcryptjs");

const indexRouter = Router();

indexRouter.get("/log-out", (req, res, next) => {
    req.logout((err) => {
        if(err) {
            return next(err);
        }
        res.redirect("/");
    });
});

/**Index
 * ------------------------------------------
 */

indexRouter.get("/", async (req, res) => {

    const messages = await db.getAllMessages();

    const user = req.user;

    console.log('USER: ', user);

    res.render("index", {
        user: user,
        messages: messages,
    })
})

/**
 * ------------------------------------------
 */

/**Sign up
 * ------------------------------------------
 */

indexRouter.get("/sign-up", (req, res) => {
    res.render("sign-up-form", { user: req.user });
});

indexRouter.post("/sign-up", async (req, res, next) => {
    bcrypt.hash(req.body.pw, 10, async (err, hashedPassword) => {
        try {
            const user = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                username: req.body.uname,
                password: hashedPassword,
                isadmin: false
            };
            await db.createUser(user);
            res.redirect('/log-in');
        } catch (err) {
            return next(err);
        }
      });
    
});

/**-------------------------------------------
 * 
 */

/**Log in 
 * ------------------------------------------
 */

indexRouter.get("/log-in", (req, res) => {
    res.render("log-in", {
        user: req.user,
    })
})

indexRouter.post("/log-in", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in"
}), (req, res, next) => {
});

/**-------------------------------------------
 * 
 */

indexRouter.get("/new-message", (req, res) => {
    res.render("new-message");
});

indexRouter.post("/new-message", async (req, res) => {


    const message = {
        message: req.body.message,
        userid: req.user.id
    };
    await db.createMessage(message);
    res.redirect('/');
})

indexRouter.get("/:id/delete", async (req, res) => {

    if(req.user.isadmin) {
        await db.deleteMessage(req.params.id);
    }

    res.redirect("/");
});

module.exports = indexRouter;