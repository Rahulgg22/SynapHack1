const express = require('express');
const router = express.Router();
const azureUserEventRoleController = require('../controllers/azureUserEventRoleController');

router.post('/', azureUserEventRoleController.addUserEventRole);
router.get('/:user_id/:event_id', azureUserEventRoleController.getUserEventRoles);

module.exports = router;
