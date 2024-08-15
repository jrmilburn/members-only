const express = require("express");
const path = require("node:path");
const indexRouter = require("./routes/indexRouter");
const session = require("express-session");
const pgSession = require('connect-pg-simple')(session);
const passport = require("./config/passport");

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(session({
    store: new pgSession({         
      tableName : 'sessions'   // Use another table-name than the default "session" one
      // Insert connect-pg-simple options here
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
    // Insert express-session options here
  }));

app.use(passport.session());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`app listening on ${PORT}.`));