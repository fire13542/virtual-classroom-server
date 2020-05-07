const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const DB_URL = 'mongodb://localhost:27017/virtual-classroom';

const announcementSchema = mongoose.Schema({
    courseId: String,
    title: String,
    description: String,
    fromDate: Date, 
    toDate: Date
})

const Announcement = mongoose.model('announcement', announcementSchema);
exports.Announcement = Announcement;