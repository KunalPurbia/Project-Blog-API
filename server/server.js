const express = require('express');
const app = express();
const config = require('./config/config');
const mongooseLoader = require('./loaders/mongoose')

//////////////////////////////////////////////////////////SETTING MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

//////////////////////////////////////////////////////////CONNECTING TO DATABASE
mongooseLoader.connect();

//////////////////////////////////////////////////////////REQUIRING ROUTES
const indexRouter = require('./routes/indexRoutes.js');
const userRouter = require('./routes/userRouter')

//////////////////////////////////////////////////////////SETTING ALL ROUTES
app.use("/", indexRouter);
app.use("/sign-in", userRouter);

//////////////////////////////////////////////////////////LISTENING TO PORT
app.listen(process.env.SERVER, ()=>{
    console.log(`SERVER STARTED ON ${config.server}`);
});