const router = require('express').Router();
const bodyParser = require('body-parser');

const authController = require('../controllers/auth.controller');
const gradeController = require('../controllers/grade.controller');

// router.post('/new', 
//             authController.verifyToken,
//             bodyParser.json(),
//             gradeController.newGrade);

router.post('/student',
            authController.verifyToken,
            bodyParser.json(),
            gradeController.getStudentGrades);

router.post('/quiz', 
            authController.verifyToken,
            bodyParser.json(),
            gradeController.getQuizGrades);

module.exports = router;