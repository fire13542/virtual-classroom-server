const router = require('express').Router();
const bodyParser = require('body-parser');

const studentController = require('../controllers/student.controller');


router.put('/update', 
                bodyParser.json(),
                studentController.updateStudent)

router.delete('/delete', 
                bodyParser.json(),
                studentController.deleteStudent);




module.exports = router;