const registerData = (req,res) => {
    const {username, email, password, cpassword} = req.body;
    console.log(req.body);
    

}



const loginData = (req,res) => {

}

module.exports = {
    registerData,
    loginData
}