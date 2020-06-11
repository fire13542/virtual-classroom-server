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

router.post('/student-questions',
            authController.verifyToken,
            bodyParser.json(),
            quizController.getStudentQuizQuestions);

router.post('/teacher-questions',
            authController.verifyToken,
            bodyParser.json(),
            quizController.getTeacherQuizQuestions);

router.post('/finish-quiz',
            authController.verifyToken,
            bodyParser.json(),
            quizController.finishQuiz)

module.exports = router