const { User } = require('../models/userSchema');

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
};

module.exports.findEmail = (email) =>{
    return new Promise((resolve, reject) => {
        User.find({email: email}, (err, foundUser)=>{
            if(err){
                reject(err);
            } else{
                resolve(foundUser)
            }
        });
    })
};

module.exports.updateUser = (id) =>{
    return new Promise((resolve, reject) => {
        User.findByIdAndUpdate({_id: id}, {author: true}, (err, result)=>{
            if(err){
                reject(err);
            } else{
                resolve(result);
            }
        })
    })
}