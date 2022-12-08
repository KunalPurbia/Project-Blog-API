const userServices = require('../services/userService');

module.exports.registerUser = async (req, res) => {
    await userServices.registerUser(req.body).then(()=>{
        res.send("User registered successfully")
    }).catch((err)=>{
        res.send(err);
    });
}