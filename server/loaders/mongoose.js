const mongoose = require('mongoose');
const config = require('../config/config')

module.exports.connect = () => {
    const connection = mongoose.connect(config.mongoUri);
    let db = mongoose.connection;

    db.on('open', (stream) => {
        console.log(' MongoDb connected.');
    })
    if (!db.error) {
        logger.error(' MongoDb could not connect.')
    }

    return connection;
}