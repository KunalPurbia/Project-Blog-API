const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database connection succesful");
}).catch((e) => {
    console.log("Error occured");
});

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    author: {
        type: Boolean,
        required: true
    }
});

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

const commentSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    blogId: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
});

const User = mongoose.model("user", userSchema);
const Blog = mongoose.model("blog", blogSchema);
const Comment = mongoose.model("comment", commentSchema);

module.exports = { User, Blog, Comment }