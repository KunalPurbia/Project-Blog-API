const userServices = require('../services/userService');

module.exports.registerUser = (req, res) => {
    console.log(userServices);
    userServices.registerUser(req.body)
    res.json(req.body);
}