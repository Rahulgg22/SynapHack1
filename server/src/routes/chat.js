const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.post('/', chatController.createMessage);
router.get('/event/:event_id', chatController.getMessagesByEvent);

module.exports = router;
