const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const DB_URL = require('./db-url').DB_URL;

const announcementSchema = mongoose.Schema({
    courseId: String,
    courseName: String,
    title: String,
    description: String,
    fromDate: Date, 
    toDate: Date
})

const Announcement = mongoose.model('announcement', announcementSchema);
exports.Announcement = Announcement;


exports.newAnnouncement = async (courseId, courseName, title, description, fromDate, toDate) => {
    try {
        await mongoose.connect(DB_URL);
        let announcement = new Announcement({
            courseId, courseName, title, description, fromDate, toDate
        });
        let a = await announcement.save();
        mongoose.disconnect();
        return a;
    } catch (error) {
        throw new Error(error);
    }
}

exports.deleteAnnouncement = async (announcementId) => {
    try {
        await mongoose.connect(DB_URL, {useNewUrlParser: true});
        await Announcement.findByIdAndDelete(announcementId);
        mongoose.disconnect();
        return announcementId;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}

exports.getAllAnnouncementOfMember = async (couresIds) => {
    try {
        await mongoose.connect(DB_URL);
        let announcements = await Announcement.find({courseId: {$in: couresIds}, fromDate:{$lt: Date.now()}, toDate: {$gt: Date.now()}});
        mongoose.disconnect();
        return announcements;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}