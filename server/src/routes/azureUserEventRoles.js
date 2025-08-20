const express = require('express');
const router = express.Router();
const azureUserEventRoleController = require('../controllers/azureUserEventRoleController');
const auth = require('../middleware/auth');

router.post('/', auth, azureUserEventRoleController.addUserEventRole);
router.get('/:user_id/:event_id', azureUserEventRoleController.getUserEventRoles);
router.post('/accept', auth, azureUserEventRoleController.acceptInvitation);
router.get('/me/pending', auth, azureUserEventRoleController.getPendingInvites);

module.exports = router;
