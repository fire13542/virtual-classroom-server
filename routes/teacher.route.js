const router = require('express').Router();
const bodyParser = require('body-parser');
const multer = require('multer');

const teacherController = require('../controllers/teacher.controller');
const studentController = require('../controllers/student.controller');
const courseController = require('../controllers/course.controller');


router.put('/update', 
                bodyParser.json(),
                teacherController.updateTeacher)

router.delete('/delete', 
                bodyParser.json(),
                teacherController.deleteTeacher);


router.post('/course/create',
            bodyParser.json(),
            courseController.createNewCourse)

router.post('/image', 
            bodyParser.urlencoded({extended: true}),
            multer({
                storage: multer.diskStorage({
                    destination: (req, file, cb) => {
                        cb(null, "images/teachers-images/");
                    },
                    filename: (req, file, cb) => {
                        cb(null, Date.now() + "-" + file.originalname);
                    }
                })
            }).single("avatar"),
            studentController.changeImage)

router.put('/change-password', 
            bodyParser.json(),
            teacherController.changePassword)

module.exports = router;