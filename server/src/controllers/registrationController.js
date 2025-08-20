const Registration = require('../models/Registration');
const azure = require('../utils/azureQueries');

exports.registerForEvent = async (req, res, next) => {
  try {
    const { event, teamName } = req.body;
    const event_id = Number(event);
    const user_id = req.user?.user_id || req.user?.id;

    if (!user_id) return res.status(400).json({ message: 'User not found in request context' });
    if (!event_id || !teamName) return res.status(400).json({ message: 'event and teamName are required' });

    // Create a team and assign the current user as leader
    const createdTeam = await azure.createTeam({
      event_id,
      team_name: teamName,
      project_name: null,
      submission_status: 'draft',
      github_repo_url: null,
      demo_video_url: null,
    });

    const team_id = createdTeam?.team_id;
    if (!team_id) return res.status(500).json({ message: 'Failed to create team' });

    await azure.addTeamMember({
      team_id,
      user_id,
      role_in_team: 'leader',
      is_leader: 1,
    });

    return res.status(201).json({ success: true, team_id, message: 'Registration completed' });
  } catch (err) { next(err); }
};

exports.getRegistrationsForEvent = async (req, res, next) => {
  try {
    const regs = await Registration.find({ event: req.params.eventId }).populate('user');
    res.json(regs);
  } catch (err) { next(err); }
};

exports.getRegistrationsForUser = async (req, res, next) => {
  try {
    const regs = await Registration.find({ user: req.params.userId }).populate('event');
    res.json(regs);
  } catch (err) { next(err); }
};
