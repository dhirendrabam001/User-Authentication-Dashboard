const bcrypt = require("bcrypt");
const userModel = require("../models/user");
const registerData = async (req,res) => {
    const {username, email, password, cpassword} = req.body;
    
    // Check all field are required or not
    if(!username || !email || !password || !cpassword) {
        return res.status(400).json({success: false, message: "Please field the neccessary requirements"});
    };

    // Compare password and cpassword
    if(password !== cpassword) {
        return res.status(401).json({success: false, message: "Password does not matched"});
    };

    // Password Hashing
    const hashPassword = await bcrypt.hash(password, 10);
    console.log(hashPassword);
    
    // Create and save database data
    const user = await userModel.create({
        username,
        email,
        password: hashPassword,
    });

    await user.save();
    res.status(200).json({success: true, message: "User Register Successfully"});

};



const loginData = (req,res) => {

}

module.exports = {
    registerData,
    loginData
}