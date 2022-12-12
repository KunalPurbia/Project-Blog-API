const blogService = require('../services/blogService.js')

module.exports.createBlog = async (req, res) => {
    if (req.user.author === true) {
        await blogService.addBlog(req.body).then(() => res.send("Blog Added")).catch((err) => {
            res.send(err);
        })
    } else {
        res.sendStatus(401);
    }
}