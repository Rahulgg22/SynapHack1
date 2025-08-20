const express = require('express');
const router = express.Router();
const azureScoreController = require('../controllers/azureScoreController');

router.post('/', azureScoreController.createScore);
router.get('/event/:event_id', azureScoreController.getScoresByEvent);

module.exports = router;
