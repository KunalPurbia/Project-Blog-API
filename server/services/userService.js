const { User } = require('../models/userSchema');

module.exports.registerUser = (data) => {
    return new Promise((resolve, reject) => {
        const newUser = new User(data);
        try {
            newUser.save((err, result) => {
                if (err) {
                    reject(err.errors[Object.keys(err.errors)[0]].message);
                }
                resolve(result)
            });
        } catch (err) {
            throw err
        }
    })
}