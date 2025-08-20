const express = require('express');
const router = express.Router();
const azureTeamMemberController = require('../controllers/azureTeamMemberController');

router.post('/', azureTeamMemberController.addTeamMember);
router.get('/:team_id', azureTeamMemberController.getTeamMembers);

module.exports = router;
