const studentModel = require('../models/student.model');


exports.updateStudent = (req, res, next) => {
    studentModel
            .updateStudent(req.body.id, req.body.name, req.body.password)
            .then(() => res.json({
                update: true
                })
            )
            .catch(err => res.json({
                update: false, 
                errMsg: err
            }))
}

exports.deleteStudent = (req, res, next) => {
    studentModel
            .deleteStudent(req.body.id)
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

