const commentService = require('../services/commentService');

module.exports.addComment = async (req, res) =>{
    if(req.user.author === false) {
        await commentService.addComment(req.user._id, req.params.id, req.body.comment).then(()=>res.sendStatus(201)).catch((err)=>res.send(err));
    } else{
        res.sendStatus(401);
    }
};

module.exports.deleteComment = (req, res) => {
    if(req.user.author === false){
        commentService.deleteComment(req.user._id, req.params.id).then(()=>res.send(201)).catch((err)=>res.send(err));
    } else{
        res.sendStatus(401);
    }
}