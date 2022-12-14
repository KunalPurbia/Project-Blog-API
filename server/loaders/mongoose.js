const mongoose = require('mongoose');
const config = require('../config/config')

mongoose.set("strictQuery", false);

module.exports.connect = () => {
    const connection = mongoose.connect(config.mongoUri);
    let db = mongoose.connection;

    db.on('open', (stream) => {
        console.log('DATABASE CONNECTION ESTABLISHED.');
    })
    if (!db.error) {
        console.log('DATABASE CONNECTION REJECTED.')
    }

    return connection;
}