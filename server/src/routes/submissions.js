const express = require('express');
const router = express.Router();
const submissionController = require('../controllers/submissionController');

router.post('/', submissionController.createSubmission);
router.get('/event/:event_id', submissionController.getSubmissionsByEvent);
router.get('/team/:team_id', submissionController.getSubmissionsByTeam);
router.get('/:id', submissionController.getSubmissionById);

module.exports = router;
