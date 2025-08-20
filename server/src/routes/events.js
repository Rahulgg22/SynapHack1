const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);
router.post('/', auth, role(['organizer', 'admin']), eventController.createEvent);
router.put('/:id', auth, role(['organizer', 'admin']), eventController.updateEvent);
router.delete('/:id', auth, role(['organizer', 'admin']), eventController.deleteEvent);

module.exports = router;
