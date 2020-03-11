const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const DB_URL = 'mongodb://localhost:27017/virtual-classroom';

const messageSchema = mongoose.Schema({
    content: String, 
    sender: {id: String, name: String, character: String}, // character: {teacher / student} 
    reciever: {id: String, name: String, character: String},
    timestamp: Number
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


exports.getMessagesBetweenSenderAndReciever = async (sender, reciever) => {
    try {
        await mongoose.connect(DB_URL);
        let messages = Message.find({sender: sender, reciver: reciever});
        if(messages) {
            mongoose.disconnect();
            return messages;
        }
        else {
            throw new Error("No Message found");
        }
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}


exports.sendMessage = async messageData => {
    try {
        await mongoose.connect(DB_URL);
        let message = new Message({
            content: messageData.content, 
            sender: messageData.sender, 
            reciever: messageData.reciever,
            timestamp: messageData.timestamp
        });
        await message.save();
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}

