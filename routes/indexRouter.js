const { Router } = require("express");
const indexController = require("../controllers/indexController");
const signupRoute = require("./signupRoute");

const indexRouter = Router();

indexRouter.get("/", indexController.messageGet);
indexRouter.use("/signup", signupRoute);

module.exports = indexRouter;