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

