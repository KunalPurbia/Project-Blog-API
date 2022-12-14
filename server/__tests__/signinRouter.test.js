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
const signinRouter = require('../routes/signinRouter');

//////////////////////////////////////////////////////////SETTING ALL ROUTES
app.use("/sign-in", signinRouter);

//////////////////////////////////////////////////////////Sign In route testing
describe("Sign In route test", ()=>{
    it('POST /sign-in on successfull sign in', async () =>{
        const {body, statusCode} = await request(app).post("/sign-in").send({
            username: "TEST1234",
            email:"test1234@test.com",
            password:"test123"
        });
        expect(statusCode).toBe(201);
    });

    it('POST /sign-in on sign in with repeated email', async () =>{
        const {body, statusCode} = await request(app).post("/sign-in").send({
            username: "TEST1234",
            email:"test1234@test.com",
            password:"test123"
        });
        expect(statusCode).toBe(400);
    });
})