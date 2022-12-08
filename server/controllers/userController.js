const userServices = require('../services/userService');

module.exports.registerUser = async (req, res) => {
    const checkUser = await userServices.checkDuplicateEmail(req.body.email);
    if (checkUser.length === 0) {
        await userServices.registerUser(req.body).then(() => {
            res.send("User registered successfully")
        }).catch((err) => {
            res.send(err);
        });
    } else{
        res.send("User email is already registered")
    }
}