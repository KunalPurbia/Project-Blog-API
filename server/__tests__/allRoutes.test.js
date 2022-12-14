const express = require('express');
const app = express();
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('../config/config');
const request = require('supertest')

//////////////////////////////////////////////////////////VARIABLES TO STORE TOKEN FOR AUTHENTICATION
var viewerToken = "";
var authorToken = "";

//////////////////////////////////////////////////////////SETTING MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(passport.initialize());

//////////////////////////////////////////////////////////CONNECTING TO DATABASE
beforeAll(() => {
    mongoose.set("strictQuery", false);
    mongoose.connect(config.mongoTestUri);
});

//////////////////////////////////////////////////////////INITIALIZING MIDDLEWARE FOR JWT AUTHENTICATION
require('../middlewares/jwtAuth');

//////////////////////////////////////////////////////////REQUIRING ROUTES
const signinRouter = require('../routes/signinRouter');
const loginRouter = require('../routes/loginRouter');
const viewerRouter = require('../routes/viewerRouter');
// const authorRouter = require('../routes/authorRouter');

//////////////////////////////////////////////////////////SETTING ALL ROUTES
app.use("/sign-in", signinRouter);
app.use("/log-in", loginRouter);
app.use("/viewer", viewerRouter);
// app.use("/author", authorRouter);

//////////////////////////////////////////////////////////SIGN IN ROUTE TESTING
describe("Sign In route test", () => {
    it('POST /sign-in on successfull sign in', async () => {
        const { body, statusCode } = await request(app).post("/sign-in").send({
            username: "TEST Viewer",
            email: "viewer@test.com",
            password: "123"
        });
        expect(statusCode).toBe(201);
    });

    it('POST /sign-in on sign in with repeated email', async () => {
        const { body, statusCode } = await request(app).post("/sign-in").send({
            username: "TEST Viewer",
            email: "viewer@test.com",
            password: "abc"
        });
        expect(statusCode).toBe(400);
    });

    it('POST /sign-in on successfull sign in', async () => {
        const { body, statusCode } = await request(app).post("/sign-in").send({
            username: "TEST Author",
            email: "author@test.com",
            password: "123"
        });
        expect(statusCode).toBe(201);
    });

    it('POST /sign-in on sign in with repeated email', async () => {
        const { body, statusCode } = await request(app).post("/sign-in").send({
            username: "TEST Author",
            email: "author@test.com",
            password: "abc"
        });
        expect(statusCode).toBe(400);
    });
});

//////////////////////////////////////////////////////////LOGIN ROUTE TESTING
describe("Log in route test", () => {
    it('POST /log-in on successfull log in', async () => {
        const { body, statusCode } = await request(app).post("/log-in").send({
            email: "viewer@test.com",
            password: "123"
        });
        expect(statusCode).toBe(200);
    });

    it('POST /log-in on login with wrong password', async () => {
        const { body, statusCode } = await request(app).post("/log-in").send({
            email: "viewer@test.com",
            password: "abc"
        });
        expect(statusCode).toBe(401);
    });

    it('POST /log-in on login with wrong email', async () => {
        const { body, statusCode } = await request(app).post("/log-in").send({
            email: "wrongMail@test.com",
            password: "abc"
        });
        expect(statusCode).toBe(401);
    });
});

//////////////////////////////////////////////////////////VIEWER ROUTE TESTING TO MAKE AUTHOR
describe("Viewer route test for update to Author", () => {

    it('POST /log-in on successfull log in', async () => {
        const { body, statusCode } = await request(app).post("/log-in").send({
            email: "author@test.com",
            password: "123"
        });
        viewerToken = "Bearer " + body[1];
        expect(statusCode).toBe(200);
    });

    it('PUT /viewer/becomeAuthor - to make viewer Author for blog', async () => {
        const { body, statusCode } = await request(app)
            .put("/viewer/becomeAuthor")
            .set("Authorization", viewerToken)
            .send({
                code: "dreamAuthor000"
            });
        expect(statusCode).toBe(200)
    });
});

//////////////////////////////////////////////////////////AUTHOR ROUTE TESTING FOR CRUD BLOG

// //////////////////////////////////////////////////////////DESTROYING DATABASE AFTER COMPLETE TEST
// afterAll((done) => {
//     mongoose.connection.db.dropDatabase(() => {
//         mongoose.connection.close(() => done())
//     });
// });