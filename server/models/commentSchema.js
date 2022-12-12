const mongoose = require('mongoose')

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

const Comment = mongoose.model("comment", commentSchema);

module.exports = {Comment}