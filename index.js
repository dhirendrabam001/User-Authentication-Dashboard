const express = require("express");
require("dotenv").config();
const app = express();


// Require everything
require("./server/database/connection");
const userRouter = require("./server/routes/userRouter");
const authRouter = require("./server/routes/authRouter");
const passport = require("passport");
require("./config/passport");
const cookieParser = require("cookie-parser");


// use everything
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
// app.use(passport.deserializeUser());
app.use(express.urlencoded({extended: true}));
app.use(userRouter);
app.use("/api/auth", authRouter);
// app.use("/api/auth", authRouter);


const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server Is Running Port Number:${PORT}`);
    
});
