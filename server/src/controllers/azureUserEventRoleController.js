const azure = require('../utils/azureQueries');

exports.addUserEventRole = async (req, res, next) => {
  try {
    await azure.addUserEventRole(req.body);
    res.status(201).json({ message: 'User event role added' });
  } catch (err) { next(err); }
};

exports.getUserEventRoles = async (req, res, next) => {
  try {
    const roles = await azure.getUserEventRoles(req.params.user_id, req.params.event_id);
    res.json(roles);
  } catch (err) { next(err); }
};
