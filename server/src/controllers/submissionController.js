const Submission = require('../models/mongodb/Submission');

exports.createSubmission = async (req, res, next) => {
  try {
    const submission = await Submission.create(req.body);
    res.status(201).json(submission);
  } catch (err) { next(err); }
};

exports.getSubmissionsByEvent = async (req, res, next) => {
  try {
    const submissions = await Submission.find({ event_id: req.params.event_id });
    res.json(submissions);
  } catch (err) { next(err); }
};

exports.getSubmissionsByTeam = async (req, res, next) => {
  try {
    const submissions = await Submission.find({ team_id: req.params.team_id });
    res.json(submissions);
  } catch (err) { next(err); }
};

exports.getSubmissionById = async (req, res, next) => {
  try {
    const submission = await Submission.findById(req.params.id);
    if (!submission) return res.status(404).json({ message: 'Not found' });
    res.json(submission);
  } catch (err) { next(err); }
};
