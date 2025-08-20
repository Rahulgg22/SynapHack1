const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

router.get('/overview', auth, role(['organizer', 'admin']), analyticsController.getOverview);

module.exports = router;
