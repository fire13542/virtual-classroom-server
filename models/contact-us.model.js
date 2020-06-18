const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const DB_URL = require('./db-url').DB_URL;

const contactSchema = mongoose.Schema({
    senderName: String,
    senderEmail: String,
    messageSubject: String,
    messageContent: String,
    sendDate: Date,
    read: {type: Boolean, default: false}
})

const Contact = mongoose.model('contact', contactSchema);
exports.Contact = Contact;


exports.sendNewMessage = async (senderName, senderEmail, messageSubject, messageContent) => {
    try {
        await mongoose.connect(DB_URL);
        let message = new Contact({
            senderName: senderName,
            senderEmail: senderEmail,
            messageSubject: messageSubject,
            messageContent: messageContent,
            sendDate: Date.now()
        });
        let m = await message.save();
        mongoose.disconnect();
        return m;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}

exports.recieveMessages = async () => {
    try {
        await mongoose.connect(DB_URL);
        let messages = await Contact.find();
        mongoose.disconnect();
        return messages;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}

exports.read = async (contact) => {
    try {
        await mongoose.connect(DB_URL, {useNewUrlParser: true});
        await Contact.findByIdAndUpdate(contact._id, {
            read: true
        })
        mongoose.disconnect();
        return;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}