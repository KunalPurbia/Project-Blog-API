const userServices = require('../services/userService');
const bcrypt = require('../helpers/bcrypt');
const e = require('express');

module.exports.registerUser = async (req, res) => {
    const checkUser = await userServices.checkDuplicateEmail(req.body.email);
    if (checkUser === null) {
        const password = await bcrypt.hash(req.body.password);
        await userServices.registerUser(req.body, password).then(() => {
            res.send("User registered successfully")
        }).catch((err) => {
            res.send(err);
        });
    } else{
        res.send("User email is already registered")
    }
};

module.exports.loginUser = async (req, res) => {
    const checkUser = await userServices.findEmail(req.body.email);
    if(checkUser.length === 0){
        res.send("User does not exist")
    } else{
        const userData = checkUser[0];
        const finalUser = await bcrypt.compare(req.body.password, userData.password);
        if(finalUser === true){
            res.send("User found");
        } else{
            res.send("User does not exist")
        }
    }
}