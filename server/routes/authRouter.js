const express = require("express");
const Router = express.Router();
const {registerData, loginData} = require("../controllers/authController");

Router.post("/register", registerData);



module.exports = Router;