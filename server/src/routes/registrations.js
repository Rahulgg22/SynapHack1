const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/registrationController');
const auth = require('../middleware/auth');

router.post('/', auth, registrationController.registerForEvent);
router.get('/event/:eventId', registrationController.getRegistrationsForEvent);
router.get('/user/:userId', registrationController.getRegistrationsForUser);

module.exports = router;
