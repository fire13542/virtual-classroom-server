const quizModel = require('../models/quiz.model');

exports.newQuiz = (req, res, next) => {
    quizModel.newQuiz(req.body.quizData)
    .then(quiz => {
        res.json({
            quiz: quiz
        })
    })
    .catch(err => {
        res.json({
            errMsg: err
        })
    })
}

exports.deleteQuiz = (req, res, next) => {
    quizModel.deleteQuiz(req.body.courseId, req.body.quizId)
    .then(() => {
        res.json({
            quizDeleted: true
        })
    })
    .catch(err => {
        res.json({
            quizDeleted: false,
            errMsg: err
        })
    })
}

exports.getQuizById = (req, res, next) => {
    quizModel.getQuizById(req.params.id)
    .then(quiz => {
        res.json({
            quiz: quiz
        })
    })
    .catch(err => {
        res.json({
            errMsg: err
        })
    })
}

exports.getStudentQuizQuestions = (req, res, next) => {
    quizModel.getStudentQuizQuestions(req.body.quizId, req.body.attendantStudent)
    .then(questions => {
        res.json({
            questions: questions
        })
    })
    .catch(err => {
        res.json({
            errMsg: err
        })
    })
}


exports.getTeacherQuizQuestions = (req, res, next) => {
    quizModel.getTeacherQuizQuestions(req.body.quizId)
    .then(questions => {
        res.json({
            questions: questions
        })
    })
    .catch(err => {
        res.json({
            errMsg: err
        })
    })
}

exports.finishQuiz = (req, res, next) => {
    quizModel.finishQuiz(req.body.quiz, req.body.student, req.body.answers)
    .then((grade) => {
        res.json({
            grade
        })
    })
    .catch(err => {
        res.json({
            errMsg: err
        })
    })
}