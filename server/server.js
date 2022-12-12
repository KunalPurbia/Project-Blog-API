const express = require('express');
const app = express();
const passport = require('passport')
const config = require('./config/config');
const mongooseLoader = require('./loaders/mongoose');

//////////////////////////////////////////////////////////SETTING MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(passport.initialize());

//////////////////////////////////////////////////////////CONNECTING TO DATABASE
mongooseLoader.connect();

require('./middlewares/jwtAuth');

//////////////////////////////////////////////////////////REQUIRING ROUTES
const signinRouter = require('./routes/signinRouter');
const loginRouter = require('./routes/loginRouter');
const authorRouter = require('./routes/authorRouter');
const viewerRouter = require('./routes/viewerRouter')

//////////////////////////////////////////////////////////SETTING ALL ROUTES
app.use("/sign-in", signinRouter);
app.use("/log-in", loginRouter);
app.use("/author", authorRouter);
app.use("/viewer", viewerRouter);

//////////////////////////////////////////////////////////LISTENING TO PORT
app.listen(process.env.SERVER, ()=>{
    console.log(`SERVER STARTED ON ${config.server}`);
});