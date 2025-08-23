const mongoose = require("mongoose");

const userScheme = new mongoose.Schema({
    username: {type: String, required: true, trim: true},
    email: {type:String, required: true, unique: true, trim: true},
    password: {type: String, required: true, trim: true}

});

const userModel = mongoose.model("registerInfo", userScheme);

module.exports = userModel;