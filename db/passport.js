const passport = require("passport");
const LocalStrategy = require("passport-local");
const db = require("./queries");
const bcrypt = require("bcryptjs");

const customFields = {
    username: 'uname',
    password: 'pw',
};

const verifyCallback = async (username, password, done) => {

    try {

        const user = await db.getUserFromName(username);

        if(!user) {
            return done(null, false, {message: "Incorrect username"});
        }

        const match = await bcrypt.compare(password, user.password);

        if(!match) {
            return done(null, false, { message: "Incorrect password"});
        }
        return done(null, user);
    } catch(err) {
        return done(err);
    }

};

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
    
        const user = await db.getUserFromId(id);

        done(null, user);
        
    } catch(err) {
        done(err);
    }
});

module.exports = passport;