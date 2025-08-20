const azure = require('../utils/azureQueries');

exports.createTeam = async (req, res, next) => {
  try {
    const team = await azure.createTeam(req.body);
    res.status(201).json(team);
  } catch (err) { next(err); }
};

exports.getTeamById = async (req, res, next) => {
  try {
    const team = await azure.getTeamById(req.params.team_id);
    if (!team) return res.status(404).json({ message: 'Not found' });
    res.json(team);
  } catch (err) { next(err); }
};
