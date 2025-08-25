const express = require("express");
const passport = require("passport");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

userRouter.get("/", (req,res) => {
    res.render("register")
});

userRouter.get("/register", (req,res) => {
    res.render("register")
});


userRouter.get("/login", (req,res) => {
    res.render("login")
});

userRouter.get("/dashboard",
    passport.authenticate("jwt", {session: false}),
     async (req,res) => {
    const token = req.cookies.token;
    if(!token) {
        return res.status(400).json({message: "Token does not found"});
    }
    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);
        if (!user) {
            return res.redirect("/login");
        }

        // render dashboard with username from DB
        res.render("dashboard", { username: user.username });

        
    } catch (error) {
        console.error(error);
        res.status(400).json({succss: false, message: "Internal Server Issue"});
    }
    
});


userRouter.get("/lagout", (req,res) => {
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: false,
        sameSite: "strict"
    })

    res.redirect("/login")
});


module.exports = userRouter;