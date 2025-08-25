const express = require("express");
const Router = express.Router();
const {registerData, loginData} = require("../controllers/authController");

Router.post("/register", registerData);
Router.post("/login", loginData);



module.exports = Router;