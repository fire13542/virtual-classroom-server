const router = require('express').Router();
const bodyParser = require('body-parser');
const multer = require('multer');

const authController = require('../controllers/auth.controller');
const courseCountroller = require('../controllers/course.controller');

router.post('/get', 
            authController.verifyToken,
            bodyParser.json(),
            courseCountroller.getCourseById);

router.post('/new', 
            authController.verifyToken,
            bodyParser.json(),
            courseCountroller.createNewCourse);

router.delete('/delete', 
                authController.verifyToken,
                bodyParser.json(),
                courseCountroller.deleteCourse);

router.post('/image', 
            bodyParser.urlencoded({extended: true}),
            multer({
                storage: multer.diskStorage({
                    destination: (req, file, cb) => {
                        cb(null, "images/courses-images");
                    },
                    filename: (req, file, cb) => {
                        cb(null, Date.now() + "-" + file.originalname);
                    }
                })
            }).single("image"),
            courseCountroller.courseImage);

router.post('/courseCode', 
            authController.verifyToken,
            bodyParser.json(),
            courseCountroller.changeCourseCode
            );

router.get('/carousel', courseCountroller.getCarouselImages);

router.put('/remove-student', 
            authController.verifyToken,
            bodyParser.json(),
            courseCountroller.removeStudentFromCourse);

router.post('/students', 
            authController.verifyToken,
            bodyParser.json(), 
            courseCountroller.getStudentsOfCourses);

router.post('/teachers', 
            authController.verifyToken,
            bodyParser.json(), 
            courseCountroller.getTeachersOfCourses);


module.exports = router;
