
const User = require('../models/Users');


const register = async (req, res) => {

    console.log("mm..." + req.body);
    /// User.create();

    res.send({ user: req.body });
}

const login = async (req, res) => {
    res.send('login user');
}

const logout = async (req, res) => {
    res.send('logout user');
}

module.exports = {
    register,
    login,
    logout
}