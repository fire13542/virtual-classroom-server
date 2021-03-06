const messageModel = require('../models/message.model');


exports.getMessagesBetweenSenderAndReciever = (req, res, next) => {
    messageModel
        .getMessagesBetweenSenderAndReciever(req.body.sender, req.body.reciever)
        .then(messages => {
            res.json(messages)
        })
        .catch(err => {
            res.json({
                error: true,
                errMsg: err
            });
        })
}