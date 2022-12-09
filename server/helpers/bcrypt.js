const bcrypt = require('bcryptjs');

module.exports.hash = async (password) =>{
    const hashPassword = await bcrypt.hash(password, 12);
    return hashPassword;
}

module.exports.compare = async (userPassword, hashPassword) =>{
    const result = await bcrypt.compare(userPassword, hashPassword);
    return result;
}