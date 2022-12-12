const { Blog } = require('../models/blogSchema');
const {Comment} = require('../models/commentSchema');

module.exports.getAllBlogs = () => {
    return new Promise((resolve, reject) => {
        try {
            Blog.find({}, (err, result)=>{
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

module.exports.getViewBlogs = () =>{
    return new Promise((resolve, reject) => {
        try {
            Blog.find({publish: true}, (err, result)=>{
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
}

module.exports.getFullBlog = (id) =>{
    return new Promise((resolve, reject) => {
        try {
            let blogData = []
            Blog.findById({_id: id}, (err, result)=>{
                if(err){
                    reject(err);
                } else{
                    blogData.push(result);
                    Comment.find({blogId: id}, (err, result) =>{
                        if(err){
                            reject(err);
                        } else{
                            blogData.push(result);
                            console.log(blogData);
                            resolve(blogData);
                        }
                    })
                }
            })
        } catch (error) {
            throw error
        }
    })
}

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
                } else{
                    resolve(result)
                }
            });
        } catch (err) {
            throw err
        }
    })
};

module.exports.editBlog = (id, data) =>{
    return new Promise((resolve, reject) => {
        try {
            Blog.findByIdAndUpdate(id, {title: data.title, content: data.content}, (err, result) => {
                if (err) {
                    reject(err.errors[Object.keys(err.errors)[0]].message);
                } else{
                    resolve(result)
                }
            })
        } catch (err) {
            throw err
        }
    })
}

module.exports.deleteBlog = (id) =>{
    return new Promise((resolve, reject) => {
        try {
            Blog.findByIdAndDelete(id, (err, result) =>{
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

module.exports.publishBlog = (id) =>{
    return new Promise((resolve, reject) => {
        try {
            Blog.findByIdAndUpdate({_id: id}, {publish: true}, (err, result)=>{
                if(err){
                    reject(err);
                } else{
                    resolve(result);
                }
            })
        } catch (error) {
            throw error
        }
    })
};

module.exports.unpublishBlog = (id) =>{
    return new Promise((resolve, reject) => {
        try {
            Blog.findByIdAndUpdate({_id: id}, {publish: false}, (err, result)=>{
                if(err){
                    reject(err);
                } else{
                    resolve(result);
                }
            })
        } catch (error) {
            throw error
        }
    })
}