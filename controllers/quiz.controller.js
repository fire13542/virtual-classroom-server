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
    quizModel.deleteQuiz(req.body.quizId)
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
    quizModel.getQuizById(req.params.quizId)
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

exports.getQuizQuestions = (req, res, next) => {
    quizModel.getQuizQuestions(req.body.quizId)
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

exports.attend = (req, res, next) => {
    quizModel.attend(req.body.quizId, req.body.attendantStudent)
    .then(() => {
        res.json({
            attended: true
        })
    })
    .catch(err => {
        res.json({
            attended: false,
            errMsg: err
        })
    })
}