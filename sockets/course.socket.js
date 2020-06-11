const announcementModel = require('../models/announcement.model');

module.exports = io => {
    io.on("connection", socket => {
        socket.on("joinCourseRoom", (courseId) => {
            socket.join(courseId);
        });
        socket.on('newAnnouncement', ({courseId, announcement}) => {
            announcementModel.newAnnouncement(courseId, announcement.courseName, announcement.title, announcement.description, announcement.fromDate, announcement.toDate)
            .then(announcement => {
                io.to(courseId).emit('recieveAnnouncement', announcement);
            })
            .catch(err => {
                // socket.emit('error');
                console.log(err);
            })
        })
        socket.on('deleteAnnouncement', ({courseId, announcementId}) => {
            announcementModel.deleteAnnouncement(announcementId)
            .then(announcementId => {
                io.to(courseId).emit('announcementDeleted', announcementId);
            })
        })
        socket.on('getAllAnnouncementOfMember', (coursesIds) => {
                announcementModel.getAllAnnouncementOfMember(coursesIds)
                .then(announcements => {
                    socket.emit('allAnnouncementOfMember', announcements);
                })
                .catch(err => {
                    // socket.emit('error');
                    console.log(err);
                })
        })
    });
};