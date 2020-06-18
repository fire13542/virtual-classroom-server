const router = require('express').Router();
const bodyParser = require('body-parser');

const authController = require('../controllers/auth.controller');


router.post('/login', 
            bodyParser.json(), 
            authController.adminLogin);

router.post('/signup', 
            bodyParser.json(), 
            authController.adminSignup);


module.exports = router;

