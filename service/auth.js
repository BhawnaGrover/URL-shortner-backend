const jwt = require("jsonwebtoken");
const secret = "Bhawna@1102"

function setUser(user){
    return jwt.sign({
        _id: user._id,
        email: user.email,
    }, secret); // here user is the payload
}
// packets or chunks of data sent to the server and that cannot be accessed ordinarily.

function getUser(token){
    if(!token) return null;
    return jwt.verify(token, secret);
}

module.exports = {
    setUser,
    getUser,
}