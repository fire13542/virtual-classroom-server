const homeworkModel = require('../models/homework.model');
let commentModel = require('../models/comment.model');


exports.createNewHomework = (req, res, next) => {
    homeworkModel.createNewHomework(req.body.courseId, req.body.courseName, req.body.homeworkName, req.body.toDate, req.body.teacherId, req.body.teacherName, req.body.members)
    .then(homework => {
        res.json({
            homework: homework
        });
    })
    .catch(err => {
        res.json({
            errMsg: err
        });
    })
}

exports.deleteHomework = (req, res, next) => {
    homeworkModel.deleteHomework(req.body.homeworkId, req.body.courseId, req.body.homeworkName, req.body.courseName, req.body.teacherId)
    .then(() => {
        res.json({
            homeworkDeleted: true
        })
    })
    .catch(err => {
        res.json({
            homeworkDeleted: false,
            errMsg: err
        })
    })
}

exports.getHomeworkById = (req, res, next) => {
    homeworkModel.getHomeworkById(req.params.id)
    .then(homework => {
        res.json({
            homework: homework
        })
    })
    .catch(err => {
        res.json({
            errMsg: err
        })
    })
}

exports.uploadFile = (req, res, next) => {
    homeworkModel.uploadFile(req.body.homeworkId, req.file.filename)
        .then(() => {
            res.json({
                fileUploaded: true,
                filename: req.file.filename
            });
        })
        .catch(err => {
            res.json({
                error: true,
                errMsg: err
            })
        })
}

exports.removeFile = (req, res, next) => {
    homeworkModel.removeFile(req.body.homeworkData, req.body.filename)
        .then(() => {
            res.json({
                fileRemoved: true
            });
        })
        .catch(err => {
            res.json({
                fileRemoved: false,
                errMsg: err
            });
        })
}

exports.addLink = (req, res, next) => {
    homeworkModel.addLink(req.body.homeworkId, req.body.link)
        .then(link => {
            res.json({
                link: link
            })
        })
        .catch(err => {
            res.json({
                errMsg: err
            })
        })
}

exports.removeLink = (req, res, next) => {
    homeworkModel.removeLink(req.body.homeworkId, req.body.link)
        .then(link => {
            res.json({
                linkRemoved: true
            })
        })
        .catch(err => {
            res.json({
                errMsg: err
            })
        })
}

exports.getDiscussionComments = (req, res, next) => {
    commentModel.getDiscussionComments(req.params.discussionId)
    .then(comments => {
        res.json({
            comments: comments
        })
    })
    .catch(err => {
        res.json({
            error: true,
            errMsg: err
        })
    })
}