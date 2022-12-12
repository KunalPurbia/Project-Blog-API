const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    publish: {
        type: Boolean,
        default: false
    }
});

const Blog = mongoose.model("blog", blogSchema);

module.exports = { Blog };