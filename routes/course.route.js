const router = require('express').Router();
const bodyParser = require('body-parser');
const multer = require('multer');

const courseCountroller = require('../controllers/course.controller');

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


module.exports = router;
