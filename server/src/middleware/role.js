module.exports = function (roles = []) {
  if (typeof roles === 'string') roles = [roles];
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: insufficient role' });
    }
    next();
  };
};

// Middleware to check if user is an organizer for any event
module.exports.isOrganizer = async (req, res, next) => {
  try {
    const azure = require('../utils/azureQueries');
    const user_id = req.user.user_id || req.user.id;
    const isOrganizer = await azure.isUserOrganizer(user_id);
    
    if (!isOrganizer) {
      return res.status(403).json({ 
        message: 'Forbidden: You need to be an organizer to access this resource. Create an event to become an organizer.' 
      });
    }
    
    req.user.isOrganizer = true;
    next();
  } catch (err) {
    res.status(500).json({ message: 'Error checking organizer status' });
  }
};
