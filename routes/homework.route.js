const router = require('express').Router();
const bodyParser = require('body-parser');
const multer = require('multer');

const authController = require('../controllers/auth.controller');
const homeworkController = require('../controllers/homework.controller');


router.post('/new', 
            authController.verifyToken,
            bodyParser.json(),
            homeworkController.createNewHomework);

router.delete('/delete',
            authController.verifyToken,
            bodyParser.json(),
            homeworkController.deleteHomework);

router.get('/:id', 
            authController.verifyToken,
            homeworkController.getHomeworkById);

router.post('/uploadFile', 
        authController.verifyToken,
        bodyParser.urlencoded({extended: true}),
        multer({
            storage: multer.diskStorage({
                destination: (req, file, cb) => {
                    cb(null, "teachers/"+req.body.teacherId+"/"+req.body.courseName+"/homeworks/"+req.body.homeworkName+"/");
                },
                filename: (req, file, cb) => {
                    cb(null, Date.now() + "-" + file.originalname);
                }
            })
        }).single("file"), 
        homeworkController.uploadFile);

router.post('/removeFile', 
            authController.verifyToken,
            bodyParser.json(),
            homeworkController.removeFile)

router.post('/addLink', 
            authController.verifyToken,
            bodyParser.json(),
            homeworkController.addLink);

router.post('/removeLink', 
            authController.verifyToken,
            bodyParser.json(),
            homeworkController.removeLink);

router.post('/upload-solution', 
            authController.verifyToken,
            bodyParser.urlencoded({extended: true}),
            multer({
                storage: multer.diskStorage({
                    destination: (req, file, cb) => {
                        cb(null, "teachers/"+req.body.teacherId+"/"+req.body.courseName+"/homeworks/"+req.body.homeworkName+"/solutions/");
                    },
                    filename: (req, file, cb) => {
                        cb(null, Date.now() + "-" + file.originalname);
                    }
                })
            }).single("solutionFile"), 
            homeworkController.uploadSolution);

router.post('/download-solution', 
            authController.verifyToken,
            bodyParser.json(),
            homeworkController.downloadSolution)

router.get('/comments/:discussionId', 
            authController.verifyToken,
            homeworkController.getDiscussionComments);




module.exports = router;