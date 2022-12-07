require('dotenv').config();
const express = require('express');
const app = express();
const passport = require('passport');

//////////////////////////////////////////////////////////SETTING MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

//////////////////////////////////////////////////////////REQUIRING ROUTES
const indexRouter = require('./routes/indexRoutes.js');

//////////////////////////////////////////////////////////REQUIRING PASSPORT AUTHENTICATION
require('./config/passport')

//////////////////////////////////////////////////////////SETTING ALL ROUTES
app.use("/", indexRouter);

//////////////////////////////////////////////////////////LISTENING TO PORT
app.listen(process.env.PORT, ()=>{
    console.log(`SERVER STARTED ON ${process.env.PORT}`);
})