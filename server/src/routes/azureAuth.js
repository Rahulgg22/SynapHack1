const express = require('express');
const router = express.Router();
const azureUserController = require('../controllers/azureUserController');

router.post('/register', azureUserController.register);
router.post('/login', azureUserController.login);
router.get('/me', azureUserController.me);

module.exports = router;
