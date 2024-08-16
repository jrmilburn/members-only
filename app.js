const express = require("express");
const path = require('node:path');
const session = require("express-session");
require("dotenv").config();
const indexRouter = require("./routes/index");
const passport = require("passport");

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(session({secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));

require("./db/passport");

app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);


app.listen(3000, () => console.log("app listening on port 3000"));