const contactModel = require('../models/contact-us.model');

exports.sendNewMessage = (req, res, next) => {
    contactModel
        .sendNewMessage(req.body.senderName, req.body.senderEmail, req.body.messageSubject, req.body.messageContent)
        .then(message => {
            res.json({
                messageSent: true
            });
        })
        .catch(err => {
            res.json({
                messageSent: false,
                errMsg: err
            })
        })
}