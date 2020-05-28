const router = require('express').Router();
const bodyParser = require('body-parser');

const authController = require('../controllers/auth.controller');
const contactController = require('../controllers/contact-us.controller');

router.post('/contact-us',
            bodyParser.json(),
            contactController.sendNewMessage);

router.get('/contacts/get', 
            authController.verifyToken, 
            contactController.recieveMessages)

router.post('/contact/read', 
            authController.verifyToken,
            bodyParser.json(),
            contactController.read)

module.exports = router;