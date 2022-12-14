const express = require('express');
const app = express();
const passport = require('passport')
const mongooseLoader = require('../loaders/mongoose');
const request = require('supertest')

//////////////////////////////////////////////////////////SETTING MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(passport.initialize());

//////////////////////////////////////////////////////////CONNECTING TO DATABASE
mongooseLoader.connect();

require('../middlewares/jwtAuth');

//////////////////////////////////////////////////////////REQUIRING ROUTES
const loginRouter = require('../routes/loginRouter');

//////////////////////////////////////////////////////////SETTING ALL ROUTES
app.use("/log-in", loginRouter);

//////////////////////////////////////////////////////////Sign In route testing
describe("Log in route test", ()=>{
    it('POST /log-in on successfull log in', async () =>{
        const {body, statusCode} = await request(app).post("/log-in").send({
            email:"test1234@test.com",
            password:"test123"
        });
        expect(statusCode).toBe(200);
    });

    it('POST /log-in on successfull log in', async () =>{
        const {body, statusCode} = await request(app).post("/log-in").send({
            email:"test1234@test.com",
            password:"test123456789"
        });
        expect(statusCode).toBe(401);
    });
});