const express = require('express');
const router = express.Router();
const azureTeamController = require('../controllers/azureTeamController');

router.post('/', azureTeamController.createTeam);
router.get('/:team_id', azureTeamController.getTeamById);

module.exports = router;
