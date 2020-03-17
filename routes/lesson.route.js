const router = require('express').Router();
const bodyParser = require('body-parser');
const multer = require('multer');

const lessonController = require('../controllers/lesson.controller');

router.post('/upload', 
        bodyParser.urlencoded({extended: true}),
        multer({
            storage: multer.diskStorage({
                destination: (req, file, cb) => {
                    cb(null, "teachers/"+req.body.teacherId+"/"+req.body.courseName+"/"+lessonName+"/");
                },
                filename: (req, file, cb) => {
                    cb(null, Date.now() + "-" + file.originalname);
                }
            })
        }).single("avatar"), 
        lessonController.uploadFile);




module.exports = router;