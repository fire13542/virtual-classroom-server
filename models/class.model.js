const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const DB_URL = 'mongodb://localhost:27017/virtual-classroom';

const classSchema = mongoose.Schema({
    name: String,
    teacherId: String,
    courses: {
        type: [{id: String, name: String}], 
        default: []
    }
})

const Class = mongoose.model('class', classSchema);
exports.Class = Class;


