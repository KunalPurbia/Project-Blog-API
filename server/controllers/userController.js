const userServices = require('../services/userService');
const bcrypt = require('../helpers/bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const { User } = require('../models/userSchema');

module.exports.registerUser = async (req, res) => {
    const checkUser = await userServices.checkDuplicateEmail(req.body.email);
    if (checkUser === null) {
        const password = await bcrypt.hash(req.body.password);
        await userServices.registerUser(req.body, password).then(() => {
            res.send("User registered successfully")
        }).catch((err) => {
            res.send(err);
        });
    } else {
        res.send("User email is already registered")
    }
};

module.exports.loginUser = async (req, res) => {
    const checkUser = await userServices.findEmail(req.body.email);
    if (checkUser.length === 0) {
        res.send("User does not exist")
    } else {
        const userData = checkUser[0];
        const finalUser = await bcrypt.compare(req.body.password, userData.password);
        if (finalUser === true) {
            const tokenDetail = {};
            tokenDetail.email = userData.email;
            tokenDetail.password = userData.password;
            tokenDetail.author = userData.author;
            const token = jwt.sign(tokenDetail, config.jwtKey);
            const details = [userData.author, token]
            res.send(details);
        } else {
            res.send("User does not exist")
        }
    }
};

module.exports.updateToAuthor = async (req, res) =>{
    if(req.user.author === false){
        if(req.body.code == config.authorCode){
            await userServices.updateUser(req.user.id).then(()=>res.sendStatus(200)).catch((err)=>res.send(err));
        }
    } else {
        res.sendStatus(401);
    
    }
}