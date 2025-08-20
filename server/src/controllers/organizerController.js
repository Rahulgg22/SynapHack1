const azure = require('../utils/azureQueries');

exports.dashboard = async (req, res, next) => {
  try {
    const user_id = req.user.user_id || req.user.id;
    
    // Get events organized by this user
    const events = await azure.getEventsByOrganizer(user_id);
    
    // For now, return basic dashboard data
    // In a full implementation, you'd fetch registrations, announcements, etc.
    res.json({ 
      events,
      message: 'Organizer dashboard data retrieved successfully',
      user: {
        id: user_id,
        name: req.user.name,
        email: req.user.email,
        isOrganizer: true
      }
    });
  } catch (err) { 
    next(err); 
  }
};
