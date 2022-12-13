const blogService = require('../services/blogService.js');
const commentService = require('../services/commentService');

module.exports.createBlog = async (req, res) => {
    if (req.user.author === true) {
        await blogService.addBlog(req.body).then((result) => res.send(result)).catch((err) => {
            res.send(err);
        })
    } else {
        res.sendStatus(401);
    }
};

module.exports.editBlog = async (req, res)=>{
    if(req.user.author === true) {
        await blogService.editBlog(req.params.id, req.body).then(()=>res.sendStatus(200)).catch((err)=>res.send(err));
    } else{
        res.sendStatus(401);
    }
};

module.exports.deleteBlog = async (req, res) => {
    if(req.user.author === true) {
        await blogService.deleteBlog(req.params.id).then(()=>res.sendStatus(200)).catch((err)=> res.send(err));
    } else{
        res.sendStatus(401);
    }
};

module.exports.publishBlog = async (req, res) =>{
    if(req.user.author === true){
        await blogService.publishBlog(req.params.id).then(()=>res.sendStatus(200)).catch((err) => res.send(err));
    } else{
        res.sendStatus(401);
    }
};

module.exports.unpublishBlog = async (req, res) =>{
    if(req.user.author === true) {
        await blogService.unpublishBlog(req.params.id).then(()=>res.sendStatus(200)).catch((err)=>res.send(err));
    }
}

module.exports.deleteComment = (req, res) =>{
    if(req.user.author === true) {
        commentService.deleteCommentById(req.params.commentId).then(()=>res.sendStatus(200)).catch((err)=>res.send(err));
    }
}