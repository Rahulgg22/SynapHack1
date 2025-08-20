const Judge = require('../models/Judge');

exports.getAllJudges = async (req, res, next) => {
  try {
    const judges = await Judge.find();
    res.json(judges);
  } catch (err) { next(err); }
};

exports.addJudge = async (req, res, next) => {
  try {
    const judge = await Judge.create(req.body);
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

exports.deleteJudge = async (req, res, next) => {
  try {
    const judge = await Judge.findByIdAndDelete(req.params.id);
    if (!judge) return res.status(404).json({ message: 'Judge not found' });
    res.json({ message: 'Judge deleted' });
  } catch (err) { next(err); }
};
