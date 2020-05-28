const router = require('express').Router();
const bodyParser = require('body-parser');

const authController = require('../controllers/auth.controller');
const quizController = require('../controllers/quiz.controller');

router.post('/new', 
            authController.verifyToken,
            bodyParser.json(),
            quizController.newQuiz);

router.delete('/delete',
            authController.verifyToken,
            bodyParser.json(),
            quizController.deleteQuiz);

router.get('/:id', 
            authController.verifyToken,
            quizController.getQuizById);

router.post('/questions',
            authController.verifyToken,
            bodyParser.json(),
            quizController.getQuizQuestions);

router.post('/attend',
            authController.verifyToken,
            bodyParser.json(),
            quizController.attend)

module.exports = router