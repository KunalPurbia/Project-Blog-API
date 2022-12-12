const blogService = require('../services/blogService.js');

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
        await blogService.editBlog(req.params.id, req.body).then(()=>res.sendStatus(201)).catch((err)=>res.send(err));
    } else{
        res.sendStatus(401);
    }
};

module.exports.deleteBlog = async (req, res) => {
    if(req.user.author === true) {
        await blogService.deleteBlog(req.params.id).then(()=>res.send("deleted")).catch((err)=> res.send(err));
    } else{
        res.sendStatus(401);
    }
}