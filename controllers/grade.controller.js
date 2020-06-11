const gradeModel = require('../models/grade.model');

// exports.newGrade = (req, res, next) => {
//     gradeModel.newGrade(req.body.gradeData)
//     .then(grade => {
//         res.json({
//             grade: grade
//         })
//     })
//     .catch(err => {
//         res.json(err => {
//             res.json({
//                 errMsg: err
//             })
//         })
//     })
// }

exports.getStudentGrades = (req, res, next) => {
    gradeModel.getStudentGrades(req.body.studentId)
    .then(grades => {
        res.json({
            grades: grades
        })
    })
    .catch(err => {
        res.json(err => {
            res.json({
                errMsg: err
            })
        })
    })
}

exports.getQuizGrades = (req, res, next) => {
    gradeModel.getQuizGrades(req.body.quizId)
    .then(grades => {
        res.json({
            grades: grades
        })
    })
    .catch(err => {
        res.json(err => {
            res.json({
                errMsg: err
            })
        })
    })
}