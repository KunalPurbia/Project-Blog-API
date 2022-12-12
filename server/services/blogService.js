const e = require('express');
const { Blog } = require('../models/blogSchema');

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
}