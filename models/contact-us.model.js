const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const DB_URL = 'mongodb://localhost:27017/virtual-classroom';

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