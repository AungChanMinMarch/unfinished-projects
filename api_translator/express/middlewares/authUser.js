const jwt = require("jsonwebtoken");

const authUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        //no need to delete cookie because there is no token cookie 
        res.status(401).send({message: "No token provided!Please login" });
        return;
    }
    jwt.verify(token, process.env.API_SECRET, (err, decode)=> {
        if (err) req.user = undefined; 
        if(!decode){
            // Delete cookie because token is invalid or expired
            res.cookie("token", '', {
                expires: new Date(Date.now()),
                httpOnly: true,
            });
            res.status(401).send({ message: "invalid or expired token. Please log in again..."});
            return
        }
        console.log('verify token success..');
        req.userId = decode.id;
        req.userEmail = decode.email;
        next();
  });
};
module.exports = authUser;