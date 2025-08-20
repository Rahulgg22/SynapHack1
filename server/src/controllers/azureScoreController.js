const azure = require('../utils/azureQueries');

exports.createScore = async (req, res, next) => {
  try {
    const score = await azure.createScore(req.body);
    res.status(201).json(score);
  } catch (err) { next(err); }
};

exports.getScoresByEvent = async (req, res, next) => {
  try {
    const scores = await azure.getScoresByEvent(req.params.event_id);
    res.json(scores);
  } catch (err) { next(err); }
};
