const router = require('express').Router();
const bodyParser = require('body-parser');
const multer = require('multer');

const authController = require('../controllers/auth.controller');
const lessonController = require('../controllers/lesson.controller');


router.post('/new', 
            authController.verifyToken,
            bodyParser.json(),
            lessonController.createNewLesson);

router.delete('/delete',
            authController.verifyToken,
            bodyParser.json(),
            lessonController.deleteLesson);

router.get('/:id', 
            authController.verifyToken,
            lessonController.getLessonById);

router.post('/addScreen', 
            authController.verifyToken,
            bodyParser.urlencoded({extended: true}),
            multer({
                storage: multer.diskStorage({
                    destination: (req, file, cb) => {
                        cb(null, "teachers/"+req.body.teacherId+"/"+req.body.courseName+"/"+req.body.lessonName+"/");
                    },
                    filename: (req, file, cb) => {
                        cb(null, Date.now() + "-" + file.originalname);
                    }
                })
            }).single("screen"), 
            lessonController.addScreen);

router.post('/deleteScreen', 
            authController.verifyToken,
            bodyParser.json(),
            lessonController.deleteScreen)

router.post('/uploadFile', 
        authController.verifyToken,
        bodyParser.urlencoded({extended: true}),
        multer({
            storage: multer.diskStorage({
                destination: (req, file, cb) => {
                    cb(null, "teachers/"+req.body.teacherId+"/"+req.body.courseName+"/"+req.body.lessonName+"/");
                },
                filename: (req, file, cb) => {
                    cb(null, Date.now() + "-" + file.originalname);
                }
            })
        }).single("file"), 
        lessonController.uploadFile);

router.post('/removeFile', 
            authController.verifyToken,
            bodyParser.json(),
            lessonController.removeFile)

router.post('/addLink', 
            authController.verifyToken,
            bodyParser.json(),
            lessonController.addLink);

router.post('/removeLink', 
            authController.verifyToken,
            bodyParser.json(),
            lessonController.removeLink);

router.get('/comments/:discussionId', 
            authController.verifyToken,
            lessonController.getDiscussionComments);




module.exports = router;