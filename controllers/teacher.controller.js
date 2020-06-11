const teacherModel = require('../models/teacher.model');

exports.getTeacherData = (req, res, next) => {
    teacherModel.getTeacherData(req.params.id)
    .then(teacher => {
        res.json({teacher});
    })
    .catch(err => {
        res.json({
            error: true
        })
    })
}

exports.updateTeacher = (req, res, next) => {
    teacherModel
            .updateTeacher(req.body.id, req.body.name, req.body.email)
            .then(teacher => res.json({
                update: true,
                teacher: teacher
                })
            )
            .catch(err => res.json({
                update: false, 
                errMsg: err
            }))
}

exports.deleteTeacher = (req, res, next) => {
    teacherModel
            .deleteTeacher(req.body.id)
            .then(() => res.json({
                    delete: true
                })
            )
            .catch(err => res.json({
                    delete: false,
                    errMsg: err
                })
            );
}

exports.changeImage = (req, res, next) => {
    studentModel
        .changeImage(req.body.teacherId, req.file.filename)
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
    teacherModel
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
