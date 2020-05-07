const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const DB_URL = 'mongodb://localhost:27017/virtual-classroom';

const blogSchema = mongoose.Schema({
    title: String,
    articleImageUrl: String,
    metaTags: {
        type: {title: String, description: String},
        default: {title: '', description: ''}
    },
    content: String,
    createDate: Date
})

const Blog = mongoose.model('blog', blogSchema);
exports.Blog = Blog;

exports.newBlog = async (title, articleImage, metaTags, content) => {
    // create new blog 
    try {
        await mongoose.connect(DB_URL);
        let blog = new Blog({
            title: title,
            articleImageUrl: articleImage,
            metaTags: metaTags,
            content: content,
            createDate: Date.now()
        });
        let b = await blog.save();
        mongoose.disconnect();
        return b;    
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}

exports.updateBlog = async (blogId, newTitle, newImageName, newContent) => {
    try {
        await mongoose.connect(DB_URL);
        let blog = await Blog.findByIdAndUpdate(blogId, {
            title: newTitle,
            articleImageUrl: newImageName,
            content: newContent,
            createDate: Date.now()
        });
        mongoose.disconnect();
        return blog;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}

exports.deleteBlog = async (blogId) => {
    try {
        await mongoose.connect();
        await Blog.findByIdAndDelete(blogId);
        mongoose.disconnect();
        return;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}

exports.getAllBlogs = async () => {
    // get _id , title and images urls of each blog
    try {
        await mongoose.connect(DB_URL);
        let blogs = await Blog.find({},'title articleImageUrl createDate');
        mongoose.disconnect();
        return blogs;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}

exports.getBlogContent = async (blogId) => {
    // get content of the blog which has _id: blogId 
    try {
        await mongoose.connect(DB_URL);
        let blog = await Blog.findById(blogId);
        mongoose.disconnect();
        return blog;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}

