const express = require('express');
const router = express.Router();
const judgeController = require('../controllers/judgeController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

router.get('/', judgeController.getAllJudges);
router.get('/search', auth, role(['organizer','admin']), judgeController.searchUsers);
router.post('/', auth, role(['organizer', 'admin']), judgeController.addJudge);
router.put('/:id', auth, role(['organizer', 'admin']), judgeController.updateJudge);
router.delete('/:id', auth, role(['organizer', 'admin']), judgeController.deleteJudge);

module.exports = router;
