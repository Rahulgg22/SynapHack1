const Judge = require('../models/Judge');
const azure = require('../utils/azureQueries');

exports.getAllJudges = async (req, res, next) => {
  try {
    const judges = await Judge.find();
    res.json(judges);
  } catch (err) { next(err); }
};

exports.addJudge = async (req, res, next) => {
  try {
    // Create a pending judge invitation in Mongo for now
    const judge = await Judge.create({ ...req.body, status: req.body.status || 'pending' });
    res.status(201).json(judge);
  } catch (err) { next(err); }
};

exports.updateJudge = async (req, res, next) => {
  try {
    const judge = await Judge.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!judge) return res.status(404).json({ message: 'Judge not found' });
    res.json(judge);
  } catch (err) { next(err); }
};

// Search users to invite as judges
exports.searchUsers = async (req, res, next) => {
  try {
    const q = String(req.query.q || '').trim();
    if (!q) return res.json([]);
    const users = await azure.searchUsers(q);
    res.json(users);
  } catch (err) { next(err); }
};

exports.deleteJudge = async (req, res, next) => {
  try {
    const judge = await Judge.findByIdAndDelete(req.params.id);
    if (!judge) return res.status(404).json({ message: 'Judge not found' });
    res.json({ message: 'Judge deleted' });
  } catch (err) { next(err); }
};
