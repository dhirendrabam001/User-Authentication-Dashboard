const express = require("express");
require("dotenv").config();
const app = express();


// Require everything
require("./server/database/connection");
const path = require("path");
const userRouter = require("./server/routes/userRouter");
const authRouter = require("./server/routes/authRouter");
const ejs = require("ejs");
const passport = require("passport");
require("./config/passport");
const cookieParser = require("cookie-parser");


// use everything
app.set("view engine","ejs");
app.set("views", path.join(__dirname, "client", "views"));

app.use(express.static(path.join(__dirname, "client", "public")));

// Bootstrap
app.use("/css", express.static(path.join(__dirname, "node_modules", "bootstrap", "dist", "css")));
app.use("/js", express.static(path.join(__dirname, "node_modules", "bootstrap", "dist", "css")));

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
// app.use(passport.deserializeUser());
app.use(express.urlencoded({extended: true}));
app.use(userRouter);
app.use(authRouter);
// app.use("/api/auth", authRouter);


const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server Is Running Port Number:${PORT}`);
    
});
