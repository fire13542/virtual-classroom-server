const router = require('express').Router();
const bodyParser = require('body-parser');

const teacherController = require('../controllers/teacher.controller');


router.put('/update', 
                bodyParser.json(),
                teacherController.updateTeacher)

router.delete('/delete', 
                bodyParser.json(),
                teacherController.deleteTeacher);




module.exports = router;