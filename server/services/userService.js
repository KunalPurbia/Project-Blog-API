const { User } = require('../models/userSchema');
const bcrypt = require('bcryptjs')
// const bcrypt = require('../helpers/bcrypt')

module.exports.registerUser = async (data, password) => {
    return new Promise((resolve, reject) => {
        const newUser = new User({
            username: data.username,
            email: data.email,
            password: password,
            author: data.author
        });
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
};

module.exports.checkDuplicateEmail = (email) => {
    return new Promise((resolve, reject) => {
        User.find({ email: email }, (err, foundUser) => {
            if (err) {
                reject(err);
            } else {
                if(foundUser.length == 0){
                    resolve(null);
                } else{
                    resolve(foundUser);
                }
            }
        });
    });
}