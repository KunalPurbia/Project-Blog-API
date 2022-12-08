const userModel = require('../services/userModel')

module.exports.registerUser = (req, res) => {
    userModel.registerUser(req.body)
    res.json(req.body);
}