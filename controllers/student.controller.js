const studentModel = require('../models/student.model');

exports.getStudentData = (req, res, next) => {
    studentModel.getStudentData(req.params.id)
    .then(student => {
        res.json({student});
    })
    .catch(err => {
        res.json({
            error: true
        })
    })
}

exports.updateStudent = (req, res, next) => {
    studentModel
            .updateStudent(req.body.id, req.body.name, req.body.email)
            .then(student => res.json({
                update: true,
                student: student
                })
            )
            .catch(err => res.json({
                update: false, 
                errMsg: err
            }))
}

exports.deleteStudent = (req, res, next) => {
    studentModel
            .deleteStudent(req.body.studentId)
            .then(() => res.json({
                    delete: true
                })
            )
            .catch(err => res.json({
                    delete: false,
                    errMsg: err
                })
            )
}

exports.changeImage = (req, res, next) => {
    studentModel
        .changeImage(req.body.studentId, req.file.filename)
        .then(() => {
            res.json({
                imageChanged: true,
                imageName: req.file.filename
            })
        })
        .catch(err => {
            res.json({
                imageChanged: false,
                errMsg: err
            })
        })
}

exports.changePassword = (req, res, next) => {
    studentModel
        .changePassword(req.body.email, req.body.newPassword)
        .then(() => {
            res.json({
                passwordChanged: true
            })
        })
        .catch(err => {
            res.json({
                passwordChanged: false,
                errMsg: err
            })
        })
}

exports.enrollCourse = (req, res, next) => {
    studentModel.enrollCourse(req.body.studentId, req.body.studentName, req.body.studentImage, req.body.courseCode)
        .then(course => {
            res.json({
                course: course
            })
        })
        .catch(err => {
            res.json({
                errMsg: err
            })
        })
}

exports.leaveCourse = (req, res, next) => {
    studentModel.leaveCourse(req.body.student, req.body.course)
        .then(() => {
            res.json({
                leaved: true
            })
        })
        .catch(err => {
            res.json({
                leaved: false,
                errMsg: err
            })
        })
}