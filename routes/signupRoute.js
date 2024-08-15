const { Router } = require("express");
const signUpController = require("../controllers/signupController");

const signUpRouter = Router();

signUpRouter.get("/", signUpController.signUpGet);

module.exports = signUpRouter;
