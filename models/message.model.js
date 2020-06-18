const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const DB_URL = require('./db-url').DB_URL;

const messageSchema = mongoose.Schema({
    subject: String,
    content: String, 
    sender: {id: String, name: String, image: String, character: String}, // character: {teacher / student} 
    reciever: {id: String, name: String, image: String, character: String},
    timestamp: Date
})

const Message = mongoose.model('message', messageSchema);
exports.Message = Message;

exports.getMessageById = async id => {
    try {
        await mongoose.connect(DB_URL)
        let message = await Message.findById(id);
        if(message){
            mongoose.disconnect();
            return message;
        }
        else{
            throw new Error("No Message with this ID");
        }
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}

exports.getMessagesBelongPerson = async (person) => {
    try {
        mongoose.connect(DB_URL);
        let messages = await Message.find({$or: [{sender: person}, {reciever: person}]});
        mongoose.disconnect();
        return messages;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}

exports.getMessagesBetweenSenderAndReciever = async (sender, reciever) => {
    try {
        await mongoose.connect(DB_URL);
        let messages = await Message.find({$or: [
            {sender: sender, reciver: reciever},
            {sender: reciever, reciever: sender}
        ]},
        null, 
        {
            sort: {
                timestamp: 1
            }
        });
        mongoose.disconnect();
        return messages;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}


exports.sendMessage = async messageData => {
    try {
        await mongoose.connect(DB_URL, {useUnifiedTopology: true});
        let message = new Message(messageData);
        let m = await message.save();
        mongoose.disconnect();
        return m;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}

