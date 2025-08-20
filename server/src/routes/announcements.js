const express = require('express');
const router = express.Router();
const announcementController = require('../controllers/announcementController');

router.post('/', announcementController.createAnnouncement);
router.get('/event/:event_id', announcementController.getAnnouncementsByEvent);

module.exports = router;
