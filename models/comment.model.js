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


exports.newComment = async (commentData) => {
    try {
        await mongoose.connect(DB_URL);
        let comment = new Comment(commentData);
        let c = await comment.save();
        mongoose.disconnect();
        return c;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}

exports.getDiscussionComments = async (discussionId) => {
    try {
        await mongoose.connect(DB_URL);
        let comments = await Comment.find({discussionId: discussionId}, null, {
            sort: {
                timestamp: 1
            }
        });
        mongoose.disconnect();
        return comments;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}

exports.removeComment = (commentId) => {
    try {
        await mongoose.connect(DB_URL);
        await Comment.findByIdAndDelete(commentId);
        mongoose.disconnect();
        return;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}