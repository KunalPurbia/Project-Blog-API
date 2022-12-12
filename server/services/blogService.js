const { Blog } = require('../models/blogSchema');

module.exports.addBlog = (data) =>{
    return new Promise((resolve, reject) => {
        const newBlog = new Blog({
            title: data.title,
            content: data.content
        });
        try {
            newBlog.save((err, result) => {
                if (err) {
                    reject(err.errors[Object.keys(err.errors)[0]].message);
                }
                resolve(result)
            });
        } catch (err) {
            throw err
        }
    })
}