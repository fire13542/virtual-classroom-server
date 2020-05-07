const router = require('express').Router();
const bodyParser = require('body-parser');

const contactController = require('../controllers/contact-us.controller');

router.post('/contact-us',
            bodyParser.json(),
            contactController.sendNewMessage);



module.exports = router;