const lessonModel = require('../models/lesson.model');
let commentModel = require('../models/comment.model');


exports.createNewLesson = (req, res, next) => {
    lessonModel.createNewLesson(req.body.courseId, req.body.courseName, req.body.lessonName, req.body.teacherId, req.body.teacherName, req.body.members)
    .then(lesson => {
        res.json({
            lesson: lesson
        });
    })
    .catch(err => {
        res.json({
            errMsg: err
        });
    })
}

exports.deleteLesson = (req, res, next) => {
    lessonModel.deleteLesson(req.body.lessonId, req.body.courseId, req.body.lessonName, req.body.courseName, req.body.teacherId)
    .then(() => {
        res.json({
            lessonDeleted: true
        })
    })
    .catch(err => {
        res.json({
            lessonDeleted: false,
            errMsg: err
        })
    })
}

exports.getLessonById = (req, res, next) => {
    lessonModel.getLessonById(req.params.id)
    .then(lesson => {
        res.json({
            lesson: lesson
        })
    })
    .catch(err => {
        res.json({
            errMsg: err
        })
    })
}

exports.uploadFile = (req, res, next) => {
    lessonModel.uploadFile(req.body.lessonId, req.file.filename)
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
    lessonModel.removeFile(req.body.lessonData, req.body.filename)
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
    lessonModel.addLink(req.body.lessonId, req.body.link)
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
    lessonModel.removeLink(req.body.lessonId, req.body.link)
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