const router = require('express').Router();
const bodyParser = require('body-parser');
const multer = require('multer');

const authController = require('../controllers/auth.controller');
const teacherController = require('../controllers/teacher.controller');
const studentController = require('../controllers/student.controller');
const courseController = require('../controllers/course.controller');

router.get('/refresh/:id', 
            authController.verifyToken,
            teacherController.getTeacherData);

router.put('/update', 
            authController.verifyToken,
            bodyParser.json(),
            teacherController.updateTeacher)

router.delete('/delete', 
            authController.verifyToken,
            bodyParser.json(),
            teacherController.deleteTeacher);


router.post('/course/create',
            authController.verifyToken,
            bodyParser.json(),
            courseController.createNewCourse)

router.post('/image', 
            authController.verifyToken,
            multer({
                storage: multer.diskStorage({
                    destination: (req, file, cb) => {
                        cb(null, "images/teachers-images/");
                    },
                    filename: (req, file, cb) => {
                        cb(null, Date.now() + "-" + file.originalname);
                    }
                })
            }).single("image"),
            teacherController.changeImage)

router.put('/change-password', 
            bodyParser.json(),
            teacherController.changePassword);



module.exports = router;