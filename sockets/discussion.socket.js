const discussionModel = require('../models/discussion.model');
const commentModel = require('../models/comment.model');

module.exports = io => {
    io.on("connection", socket => {
            socket.on('joinDiscussion', (discussionId, memberId) => {
                discussionModel
                    .getMembers(discussionId)
                    .then(members => {
                        return members.contains(memberId);
                    })
                    .then(isMember => {
                        if(isMember) {
                            socket.join(discussionId);
                            socket.emit('canComment');
                        }
                        else {
                            socket.join(discussionId);
                            socket.emit('canNotComment');
                        }
                    })
                    .catch(err => {
                        socket.emit('error', err);
                    })
            })
            socket.on('sendComment', (commentData) => {
                commentModel
                    .newComment(commentData)
                    .then(comment => {
                        socket
                            .to(comment.discussionId)
                            .emit('newComment', comment);
                    })
                    .catch(err => {
                        socket.emit('error', err);
                    })
            })
        });
};