const router = require('express').Router();
const bodyParser = require('body-parser');

// const authGuard = require('./guard/auth.guard');

const authController = require('../controllers/auth.controller');

router.post('/signup', 
            bodyParser.json(), 
            authController.postSignup);


router.post('/login', 
            bodyParser.json(),
            authController.postLogin)



module.exports = router;

