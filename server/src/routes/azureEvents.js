const express = require('express');
const router = express.Router();
const azureEventController = require('../controllers/azureEventController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

// Debug middleware
router.use((req, res, next) => {
  console.log(`[Events Route] ${req.method} ${req.path}`);
  console.log('[Events Route] Headers:', req.headers);
  next();
});

// Test endpoint
router.get('/test', (req, res) => {
  res.json({ message: 'Events route is working!' });
});

// Test Azure connection
router.get('/test-azure', async (req, res) => {
  try {
    const azure = require('../utils/azureQueries');
    const events = await azure.getAllEvents();
    res.json({ 
      message: 'Azure connection working!', 
      eventCount: events.length,
      events: events.slice(0, 3) // Show first 3 events
    });
  } catch (error) {
    console.error('Azure test error:', error);
    res.status(500).json({ 
      message: 'Azure connection failed', 
      error: error.message 
    });
  }
});

router.get('/', azureEventController.getAllEvents);
router.get('/my-organized', auth, azureEventController.getMyOrganizedEvents);
router.get('/organizer-status', auth, azureEventController.checkOrganizerStatus);
router.get('/:event_id', azureEventController.getEventById);

// Allow any authenticated user to create an event and become an organizer
router.post('/create-as-organizer', auth, azureEventController.createEventAsOrganizer);

// Protected routes that require organizer role
router.post('/', auth, role.isOrganizer, azureEventController.createEvent);

module.exports = router;
