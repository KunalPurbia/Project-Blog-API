const express = require('express');
const app = express();
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('../config/config');
const request = require('supertest')

//////////////////////////////////////////////////////////VARIABLES TO STORE TOKEN FOR AUTHENTICATION
var viewerToken = "";
var authorToken = "";
var blogOneID = "";
var blogTwoID = "";
var blogThreeID = "";
var commentId = "";

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
const authorRouter = require('../routes/authorRouter');

//////////////////////////////////////////////////////////SETTING ALL ROUTES
app.use("/sign-in", signinRouter);
app.use("/log-in", loginRouter);
app.use("/viewer", viewerRouter);
app.use("/author", authorRouter);

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
describe("Author all routes test", () => {

    it('POST /log-in on successfull log in', async () => {
        const { body, statusCode } = await request(app).post("/log-in").send({
            email: "author@test.com",
            password: "123"
        });
        authorToken = "Bearer " + body[1];
        expect(statusCode).toBe(200);
    });

    it("POST /author/addBlog - To add blog into DB", async () => {
        const { body, statusCode } = await request(app)
            .post("/author/addBlog")
            .set("Authorization", authorToken)
            .send({
                title: "Test Blog 1",
                content: "This is test blog ONE"
            });
        expect(statusCode).toBe(200);
    });

    it("POST /author/addBlog - To add blog into DB", async () => {
        const { body, statusCode } = await request(app)
            .post("/author/addBlog")
            .set("Authorization", authorToken)
            .send({
                title: "Test Blog 2",
                content: "This is test blog Second"
            });
        expect(statusCode).toBe(200);
    });

    it("POST /author/addBlog - To add blog into DB", async () => {
        const { body, statusCode } = await request(app)
            .post("/author/addBlog")
            .set("Authorization", authorToken)
            .send({
                title: "Test Blog 3",
                content: "This is test blog third"
            });
        expect(statusCode).toBe(200);
    });

    it("GET /author to get all blogs written", async () => {
        const { body, statusCode } = await request(app)
            .get("/author")
            .set("Authorization", authorToken);
        blogOneID = body[0]._id;
        blogTwoID = body[1]._id;
        blogThreeID = body[2]._id;
        expect(statusCode).toBe(200);
    });

    it("GET /author/blog/:id to get all blogs written", async () => {
        const { body, statusCode } = await request(app)
            .get(`/author/blog/${blogOneID}`)
            .set("Authorization", authorToken);
        expect(statusCode).toBe(200);
    });

    it("PUT /author/blog/:id to get all blogs written", async () => {
        const { body, statusCode } = await request(app)
            .put(`/author/blog/${blogOneID}`)
            .set("Authorization", authorToken)
            .send({
                title: "Updated Blog",
                content: "Check this one is updated"
            });
        expect(statusCode).toBe(200);
    });

    it("DELETE /author/blog/:id - To delete selected blog", async () => {
        const { body, statusCode } = await request(app)
            .delete(`/author/blog/${blogThreeID}`)
            .set("Authorization", authorToken);
        expect(statusCode).toBe(200);
    });

    it("PUT /author/blog/:id/publish - To publish blog ONE", async () => {
        const { body, statusCode } = await request(app)
            .put(`/author/blog/${blogOneID}/publish`)
            .set("Authorization", authorToken);
        expect(statusCode).toBe(200);
    });

    it("PUT /author/blog/:id/publish - To publish blog TWO", async () => {
        const { body, statusCode } = await request(app)
            .put(`/author/blog/${blogTwoID}/publish`)
            .set("Authorization", authorToken);
        expect(statusCode).toBe(200);
    });

    it("PUT /author/blog/:id/unpublish - To UN-publish blog TWO", async () => {
        const { body, statusCode } = await request(app)
            .put(`/author/blog/${blogTwoID}/unpublish`)
            .set("Authorization", authorToken);
        expect(statusCode).toBe(200);
    });
});

//////////////////////////////////////////////////////////VIEWER ROUTE TESTING ALL ROUTES
describe("Viewer route test for all api", () => {

    it('POST /log-in on successfull log in', async () => {
        const { body, statusCode } = await request(app).post("/log-in").send({
            email: "viewer@test.com",
            password: "123"
        });
        viewerToken = "Bearer " + body[1];
        expect(statusCode).toBe(200);
    });

    it('GET /viewer - to get all published blog only', async () => {
        const { body, statusCode } = await request(app)
            .get("/viewer")
            .set("Authorization", viewerToken);
        expect(statusCode).toBe(200)
    });

    it('GET /viewer/blog/:id - to get one full blog', async () => {
        const { body, statusCode } = await request(app).get(`/viewer/blog/${blogOneID}`).set("Authorization", viewerToken);
        expect(statusCode).toBe(200)
    });

    it('POST /viewer/blog/:id/comment - to post comment on selected blog', async () => {
        const { body, statusCode } = await request(app).post(`/viewer/blog/${blogOneID}/comment`).set("Authorization", viewerToken).send({
            comment: "This is my test comment"
        });

        expect(statusCode).toBe(200);
    });

    it('DELETE /viewer/blog/:id/comment - to post comment on selected blog', async () => {
        const { body, statusCode } = await request(app).delete(`/viewer/blog/${blogOneID}/comment`).set("Authorization", viewerToken);

        expect(statusCode).toBe(200);
    });

    it('POST /viewer/blog/:id/comment - to post comment on selected blog', async () => {
        const { body, statusCode } = await request(app).post(`/viewer/blog/${blogOneID}/comment`).set("Authorization", viewerToken).send({
            comment: "This is my test comment to delete from author"
        });

        expect(statusCode).toBe(200);
    });
});

//////////////////////////////////////////////////////////AUTHOR ROUTE TEST FOR DELETING SPECIFIC COMMENT
describe("Author route test for deleting comment", () => {

    it('POST /log-in on successfull log in', async () => {
        const { body, statusCode } = await request(app).post("/log-in").send({
            email: "author@test.com",
            password: "123"
        });
        authorToken = "Bearer " + body[1];
        expect(statusCode).toBe(200);
    });

    it("GET /author to get all blogs written", async () => {
        const { body, statusCode } = await request(app)
            .get("/author")
            .set("Authorization", authorToken);
        expect(statusCode).toBe(200);
    });

    it('GET /author/blog/:id - to get one full blog', async () => {
        const { body, statusCode } = await request(app).get(`/author/blog/${blogOneID}`).set("Authorization", authorToken);
        commentId = body[1][0]._id;
        expect(statusCode).toBe(200);
    });

    it('DELETE /author/blog/:id/comment/:commentId - to delete particular comment using ID', async () => {
        const { body, statusCode } = await request(app).delete(`/author/blog/${blogOneID}/comment/${commentId}`).set("Authorization", authorToken);
        expect(statusCode).toBe(200);
    });
});

//////////////////////////////////////////////////////////DESTROYING DATABASE AFTER COMPLETE TEST
afterAll((done) => {
    mongoose.connection.db.dropDatabase(() => {
        mongoose.connection.close(() => done())
    });
});