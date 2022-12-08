const {User} = require('../models/userSchema');

module.exports.registerUser = (data) =>{
    console.log(User);

    const newUser = new User(data);
    try{
        newUser.save();
        console.log(User);
        console.log(data);
        console.log(newUser);
    } catch(err){
        throw err
    }
}