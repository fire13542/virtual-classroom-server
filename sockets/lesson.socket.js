let commentModel = require('../models/comment.model');

module.exports = io => {
    io.on("connection", socket => {
        socket.on("joinLessonRoom", (lessonId) => {
            socket.join(lessonId);
        });
        socket.on("joinHomeworkRoom", (homeworkId) => {
            socket.join(homeworkId);
        });
        // socket.on('video', (stream) => {
        //     console.log(stream)
        // });
        // roomId: either (lessonId) OR (homeworkId)
        socket.on('newComment', ({roomId, comment}) => {
            commentModel.newComment(comment)
            .then(c => {
                io.to(roomId).emit('recieveComment', c);
            })
            .catch(err => {
                // socket.emit('sendCommentError');
                console.log(err);
            })
        })
    });
};

