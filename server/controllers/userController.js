const userServices = require('../services/userService');
const bcrypt = require('../helpers/bcrypt')

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
}