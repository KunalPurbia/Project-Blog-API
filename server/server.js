// require('dotenv').config();
const express = require('express');
const app = express();

const config = require('./config/config');
console.log(config);

//////////////////////////////////////////////////////////SETTING MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

//////////////////////////////////////////////////////////REQUIRING ROUTES
const indexRouter = require('./routes/indexRoutes.js');
const userRouter = require('./routes/userRouter')

//////////////////////////////////////////////////////////REQUIRING PASSPORT AUTHENTICATION
require('./config/passport');

//////////////////////////////////////////////////////////SETTING ALL ROUTES
app.use("/", indexRouter);
app.use("/sign-in", userRouter);

//////////////////////////////////////////////////////////LISTENING TO PORT
app.listen(process.env.SERVER, ()=>{
    console.log(`SERVER STARTED ON ${process.env.SERVER}`);
});