const blogModel = require('../models/blog.model');

websiteUrl = 'http://localhost:3000/'

exports.newBlog = (req, res, next) => {
    blogModel.newBlog(req.body.title, req.body.articleImage, req.body.metaTags, req.body.content)
        .then(blog => {
            res.json({
                blogCreated: true,
                blog: blog
            })
        })
        .catch(err => {
            res.json({
                blogCreated: false,
                errMsg: err
            })
        })
}

exports.updateBlog = (req, res, next) => {

}

exports.deleteBlog = (req, res, next) => {
    blogModel.deleteBlog(req.body.blogId)
        .then(() => {
            res.json({
                blogDeleted: true
            })
        })
        .catch(err => {
            res.json({
                blogDeleted: false,
                errMsg: err
            })
        })
}

exports.getAllBlogs = (req, res, next) => {
    blogModel.getAllBlogs()
        .then(blogs => {
            res.json({
                blogs: blogs
            })
        })
        .catch(err => {
            res.json({
                errMsg: err
            })
        })
}

exports.getBlogContent = (req, res, next) => {
    blogModel.getBlogContent(req.params.blogId)
        .then(blog => {
            blog.imageName = websiteUrl + 'blog-images/' + blog.imageName;
            res.json({
                blog: blog
            })
        })
        .catch(err => {
            res.json({
                errMsg: err
            })
        })
}

