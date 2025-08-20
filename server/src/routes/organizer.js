const express = require('express');
const router = express.Router();
const organizerController = require('../controllers/organizerController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

// Allow access to organizer dashboard if user is an organizer for any event
router.get('/dashboard', auth, role.isOrganizer, organizerController.dashboard);

module.exports = router;
