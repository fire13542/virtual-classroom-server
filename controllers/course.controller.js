const courseModel = require('../models/course.model');
const fileManager = require('file-manager-js');


exports.getCourseById = (req, res, next) => {
    courseModel.getCourseById(req.body.courseId)
    .then(course => {
        res.json({
            course: course
        });
    })
    .catch(err => {
        res.json({
            errMsg: err
        })
    })
}
exports.createNewCourse = (req, res, next) => {
    courseModel
        .createNewCourse(req.body.teacherId, req.body.courseName)
        .then(teacher => {
            res.json({
                courseCreated: true,
                teacher: teacher
            })
        })
        .catch(err => {
            res.json({
                courseCreated: false,
                errMsg: err
            })
        })
}

exports.deleteCourse = (req, res, next) => {
    courseModel.deleteCourse(req.body.teacherId, req.body.courseData)
    .then(teacher => {
        res.json({
            courseDeleted: true,
            teacher: teacher
        })
    })
    .catch(err => {
        res.json({
            courseDeleted: false,
            errMsg: err
        })
    })
}

exports.courseImage = (req, res, next) => {
    courseModel
        .courseImage(req.body.courseId, req.file.filename)
        .then(() => {
            res.json({
                imageChanged: true
            })
        })
        .catch(err => {
            res.json({
                error: true,
                errMsg: err
            })
        })
}

exports.changeCourseCode = (req, res, next) => {
    courseModel.changeCourseCode(req.body.courseId)
    .then(courseCode => {
        res.json({
            courseCode
        });
    })
    .catch(err => {
        res.json({
             errMsg: err
        })
    })
}

exports.getCarouselImages = (req, res, next) => {
    fileManager.list('images/courses-images/carousel')
    .then(entries => {
        res.json({
            images: entries.files.map(file => file.slice(31))
        })
    })
    .catch(err => {
        res.json({
            error: err
        })
    })
}

exports.removeStudentFromCourse = (req, res, next) => {
    courseModel.removeStudentFromCourse(req.body.courseId, req.body.student)
    .then(() => {
        res.json({
            studentRemoved: true
        })
    })
    .catch(err => {
        res.json({
            studentRemoved: false,
            errMsg: err
        })
    })
}

