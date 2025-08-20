const azure = require('../utils/azureQueries');

exports.addUserEventRole = async (req, res, next) => {
  try {
    // Default to 'judge' role invitations with 'pending' permissions when not provided
    const payload = {
      role: req.body.role || 'judge',
      permissions: req.body.permissions || 'pending',
      user_id: req.body.user_id,
      event_id: req.body.event_id,
    };
    await azure.addUserEventRole(payload);
    res.status(201).json({ message: 'User event role added' });
  } catch (err) { next(err); }
};

exports.getUserEventRoles = async (req, res, next) => {
  try {
    const roles = await azure.getUserEventRoles(req.params.user_id, req.params.event_id);
    res.json(roles);
  } catch (err) { next(err); }
};

exports.getPendingInvites = async (req, res, next) => {
  try {
    const user_id = req.user.user_id || req.user.id;
    const invites = await azure.getPendingInvitesForUser(user_id);
    res.json(invites);
  } catch (err) { next(err); }
};

exports.acceptInvitation = async (req, res, next) => {
  try {
    const { user_id, event_id } = req.body;
    await azure.setUserEventRolePermissions({ user_id, event_id, permissions: 'active' });
    res.json({ message: 'Invitation accepted' });
  } catch (err) { next(err); }
};
