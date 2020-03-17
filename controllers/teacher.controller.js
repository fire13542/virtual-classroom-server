const teacherModel = require('../models/teacher.model');


exports.updateTeacher = (req, res, next) => {
    teacherModel
            .updateTeacher(req.body.id, req.body.name, req.body.password)
            .then(() => res.json({
                update: true
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
