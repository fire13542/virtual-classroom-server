const router = require('express').Router();
const bodyParser = require('body-parser');
const multer = require('multer');

const blogController = require('../controllers/blog.controller');
const authController = require('../controllers/auth.controller');


router.post('/blog/new', 
            authController.verifyToken, 
            bodyParser.json(), 
            blogController.newBlog);


router.delete('/blog/delete', 
                authController.verifyToken, 
                bodyParser.json(), 
                blogController.deleteBlog);


router.get('/blog/all', blogController.getAllBlogs);


router.get('/blog/:blogId', blogController.getBlogContent);



module.exports = router;