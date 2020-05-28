const messageModel = require('../models/message.model');

module.exports = io => {
    io.on("connection", socket => {
        socket.on("getMessages", (person) => {
            messageModel.getMessagesBelongPerson(person)
            .then(messages => {
                socket.emit("messages", messages);
            })
            .catch(err => {
                console.log(err);
                // socket.emit("error");
            })
        })
        socket.on("sendMessage", (msg) => {
            messageModel
                .sendMessage(msg)
                .then(() => {
                    if(io.onlineTeachers[msg.sender.id] || io.onlineStudents[msg.sender.id])
                        io.to(msg.sender.id).emit('newMessage', msg);
                    if(io.onlineTeachers[msg.reciever.id] || io.onlineStudents[msg.reciever.id])
                        io.to(msg.reciever.id).emit('newMessage', msg);
                })
                .catch(err => {
                    console.log(err);
                    // socket.emit('sendingError', 'Sending Error: try again', msg);
                })
            });
        });
};
