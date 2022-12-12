const blogService = require('../services/blogService.js');

module.exports.allBlogs = async  (req, res) =>{
    if (req.user.author === true) {
        await blogService.getAllBlogs().then((result)=>res.send(result)).catch((err)=>res.send(err));
    } else if(req.user.author === false){
        await blogService.getViewBlogs().then((result)=>res.send(result)).catch((err)=>res.send(err));
    }else {
        res.sendStatus(401);
    }
};

module.exports.getFullBlog = async (req, res) =>{
    if(req.user.author === true) {
        await blogService.getFullBlog(req.params.id).then((result)=>res.send(result)).catch((err)=>res.send(err));
    } else if(req.user.author === false) {
        await blogService.getFullBlog(req.params.id).then((result)=>res.send(result)).catch((err)=>res.send(err));
    } else{
        res.sendStatus(401);
    }
}