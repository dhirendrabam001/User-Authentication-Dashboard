const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
const passport = require("passport");

const createToken = (user) => {
    return jwt.sign(
        {sub: user._id, email: user.email},
        process.env.JWT_SECRET,
        {expiresIn: "45m"}
    );
};

console.log("token", createToken);


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
    
    // Create and save database data
    const user = await userModel.create({
        username,
        email,
        password: hashPassword,
    });
    res.status(200).json({success: true, message: "User Register Successfully"});

};



const loginData = (req,res, next) => {
    passport.authenticate("local", {session: false}, (error, user, info) => {
        if(error) {
            return res.status(500).json({success: false, message: "server issue"});
        }
        if(!user) {
           return res.status(401).json({success: false, message: "Invalid User", user: info});
        }

        const token = createToken(user);
        console.log("Generated token", token);
        
        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        });
        res.json({ message: "Login successful", token });
    })(req, res, next);
}

module.exports = {
    registerData,
    loginData
}