const router = require('express').Router();
const bodyParser = require('body-parser');
const multer = require('multer');

const authController = require('../controllers/auth.controller');
const courseCountroller = require('../controllers/course.controller');

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
                        cb(null, "teachers/"+req.body.teacherId+"/"+req.body.courseName+"/");
                    },
                    filename: (req, file, cb) => {
                        cb(null, Date.now() + "-" + file.originalname);
                    }
                })
            }).single("avatar"),
            courseCountroller.courseImage)

router.get('/carousel', courseCountroller.getCarouselImages)

module.exports = router;
