const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const DB_URL = 'mongodb://localhost:27017/virtual-classroom';

const lessonSchema = mongoose.Schema({
    name: String,
    screen: String,
    links: {
        type: [{statement: String, link: String}],
        default: []
    },
    files: {
        type: [String],
        default: []
    },
    discussionId: String
})

const Lesson = mongoose.model('lesson', lessonSchema);
exports.Lesson = Lesson;


