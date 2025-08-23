const express = require("express");
require("dotenv").config();
const app = express();


// Require everything
require("./server/database/connection");
const userRouter = require("./server/routes/userRouter");
const authRouter = require("./server/routes/authRouter");


// use everything
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(userRouter);
app.use("/api/auth", authRouter);


const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server Is Running Port Number:${PORT}`);
    
});
