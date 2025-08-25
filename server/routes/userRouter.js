const express = require("express");
const passport = require("passport");
const userRouter = express.Router();

userRouter.get("/", (req,res) => {
    res.send("Hello Dhirendra")
});

userRouter.get("/dashboard", 
    passport.authenticate("jwt", {session: false}),
    (req,res) => {
        res.status(200).json({
            success: true,
            message: "Welcome to our dashboard",
            id: req.user._id,
            username: req.user.username,
            email: req.user.email
        });
    }
)

module.exports = userRouter;