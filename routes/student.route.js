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
                            cb(null, "teachers/"+req.body.teacherId+"/");
                        },
                        filename: (req, file, cb) => {
                            cb(null, Date.now() + "-" + file.originalname);
                        }
                    })
                }).single("avatar"),
                studentController.changeImage)



module.exports = router;