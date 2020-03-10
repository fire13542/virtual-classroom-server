const courseModel = require('../models/course.model');


exports.createNewCourse = (req, res, next) => {
    courseModel
        .createNewCourse(req.body.teacherId, req.body.courseName)
        .then(() => {
            res.json({
                courseCreated: true
            })
        })
        .catch(err => {
            res.json({
                courseCreated: false,
                errMsg: err
            })
        })
}