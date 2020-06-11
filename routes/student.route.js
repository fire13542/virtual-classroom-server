const router = require('express').Router();
const bodyParser = require('body-parser');
const multer = require('multer');

const authController = require('../controllers/auth.controller');
const studentController = require('../controllers/student.controller');

router.get('/refresh/:id', 
            authController.verifyToken,
            studentController.getStudentData);

router.put('/update', 
            authController.verifyToken,
            bodyParser.json(),
            studentController.updateStudent);

router.delete('/delete', 
            authController.verifyToken,
            bodyParser.json(),
            studentController.deleteStudent);

router.post('/image', 
            authController.verifyToken,
            multer({
                storage: multer.diskStorage({
                    destination: (req, file, cb) => {
                        cb(null, "images/students-images/");
                    },
                    filename: (req, file, cb) => {
                        cb(null, Date.now() + "-" + file.originalname);
                    }
                })
            }).single("avatar"),
            studentController.changeImage)

router.put('/change-password', 
            authController.verifyToken,
            bodyParser.json(),
            studentController.changePassword)

router.post('/enroll-course', 
            authController.verifyToken,
            bodyParser.json(),
            studentController.enrollCourse)

router.post('leave-course', 
            authController.verifyToken,
            bodyParser.json(),
            studentController.leaveCourse)


module.exports = router;