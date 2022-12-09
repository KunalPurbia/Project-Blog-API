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
const signinRouter = require('./routes/signinRouter');
const loginRouter = require('./routes/loginRouter')

//////////////////////////////////////////////////////////SETTING ALL ROUTES
app.use("/", indexRouter);
app.use("/sign-in", signinRouter);
app.use("/log-in", loginRouter);

//////////////////////////////////////////////////////////LISTENING TO PORT
app.listen(process.env.SERVER, ()=>{
    console.log(`SERVER STARTED ON ${config.server}`);
});