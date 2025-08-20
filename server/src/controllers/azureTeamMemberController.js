const azure = require('../utils/azureQueries');

exports.addTeamMember = async (req, res, next) => {
  try {
    await azure.addTeamMember(req.body);
    res.status(201).json({ message: 'Team member added' });
  } catch (err) { next(err); }
};

exports.getTeamMembers = async (req, res, next) => {
  try {
    const members = await azure.getTeamMembers(req.params.team_id);
    res.json(members);
  } catch (err) { next(err); }
};
