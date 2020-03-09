const mongoose = require('mongoose');

const randomString = require('randomstring');

mongoose.Promise = global.Promise;

const DB_URL = 'mongodb://localhost:27017/virtual-classroom';

const courseSchema = mongoose.Schema({
    name: String,
    courseCode: String,
    teacherId: String,
    lessons: {
        type: [{id: String, name: String}],
        default: []
    }
})

const Course = mongoose.model('course', courseSchema);
exports.Course = Course;

