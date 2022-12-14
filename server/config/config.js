require('dotenv').config();

const config = {
    server: parseInt(process.env['SERVER']),
    mongoUri: process.env['MONGO_DB_URL'],
    mongoTestUri: process.env['MONGO_TEST_URL'],
    jwtKey: process.env['JWT_KEY'],
    authorCode: process.env['AUTHOR_CODE']
}

module.exports = config;