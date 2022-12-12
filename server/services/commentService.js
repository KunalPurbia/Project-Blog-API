const {Comment} = require('../models/commentSchema');

module.exports.addComment = (userId, blogId, comment) =>{
    return new Promise((resolve, reject) => {
        try {
            const newComment = new Comment({
                userId: userId,
                blogId, blogId,
                comment: comment
            });
            newComment.save((err, result) =>{
                if(err){
                    reject(err);
                } else{
                    resolve(result);
                }
            });
        } catch (error) {
            throw error
        }
    })
};

module.exports.deleteComment = (userId, blogId) => {
    return new Promise((resolve, reject) => {
        try {
            Comment.findOneAndDelete({userId: userId, blogId: blogId}, (err, result)=>{
                if(err){
                    reject(err);
                } else{
                    resolve(result);
                }
            });
        } catch (error) {
            throw error
        }
    })
};

module.exports.deleteCommentById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            Comment.findByIdAndDelete({_id: id}, (err, result) => {
                if(err){
                    reject(err);
                } else{
                    resolve(result)
                }
            })
        } catch (error) {
            throw error;
        }
    })
};