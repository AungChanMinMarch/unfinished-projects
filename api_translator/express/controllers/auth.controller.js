var jwt = require("jsonwebtoken");
var User = require("../models/user");
const token_max_age = 10 * 365 * 24 * 60 * 60 //10 YEARS

exports.responseToken = (req, res)=>{
    //signing token with user id
    const token = jwt.sign({
        id: req.userId,
        email: req.userEmail
    }, process.env.API_SECRET, {
        expiresIn: token_max_age
    });

    //responding to client request with user profile success message and  access token .
    // res.setHeader('set-cookie', [`token=${token}`])
    res.cookie("token", token, {
        expires: new Date(Date.now() + token_max_age),
        httpOnly: true
    })
    res.status(200).json({message: "Login successfull"});
}
exports.signOut = (req, res) => {
    res.cookie("token", '', {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.json({message: 'sign out Success'})
}
