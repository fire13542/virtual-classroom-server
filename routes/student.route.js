const router = require('express').Router();
const bodyParser = require('body-parser');
const multer = require('multer');

const studentController = require('../controllers/student.controller');


router.put('/update', 
                bodyParser.json(),
                studentController.updateStudent)

router.delete('/delete', 
                bodyParser.json(),
                studentController.deleteStudent);



router.post('/image', 
                bodyParser.urlencoded({extended: true}),
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
            bodyParser.json(),
            studentController.changePassword)

module.exports = router;