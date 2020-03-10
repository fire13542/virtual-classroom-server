const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const DB_URL = 'mongodb://localhost:27017/virtual-classroom';

const commentSchema = mongoose.Schema({
    discussionId: String, 
    content: String, 
    sender: {id: String, name: String, character: String}, // character: {teacher / student} 
    timestamp: Number
})

const Comment = mongoose.model('comment', commentSchema);
exports.Comment = Comment;


