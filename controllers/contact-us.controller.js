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

exports.recieveMessages = (req, res, next) => {
    contactModel.recieveMessages()
    .then(messages => {
        res.json({
            messages
        });
    })
    .catch(err => {
        res.json({
            errMsg: err
        });
    })
}

exports.read = (req, res, next) => {
    contactModel.read(req.body.contact)
    .then(() => {
        res.json({
            read: true
        });
    })
    .catch(err => {
        res.json({
            read: false,
            errMsg: err
        });
    })
}