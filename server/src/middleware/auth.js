const jwt = require('jsonwebtoken');
const azure = require('../utils/azureQueries');

module.exports = async function (req, res, next) {
  console.log('[Auth Middleware] Checking authentication...');
  
  const token = req.header('Authorization')?.replace('Bearer ', '');
  console.log('[Auth Middleware] Token present:', !!token);
  
  if (!token) {
    console.log('[Auth Middleware] No token found');
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  
  try {
    console.log('[Auth Middleware] Verifying token...');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('[Auth Middleware] Token decoded:', decoded);
    
    const user = await azure.getUserById(decoded.id);
    console.log('[Auth Middleware] User found:', !!user);
    
    if (!user) {
      console.log('[Auth Middleware] User not found in database');
      return res.status(401).json({ message: 'User not found' });
    }
    
    // Check if user is an organizer
    console.log('[Auth Middleware] Checking organizer status...');
    const isOrganizer = await azure.isUserOrganizer(user.user_id);
    console.log('[Auth Middleware] Is organizer:', isOrganizer);
    
    req.user = {
      ...user,
      isOrganizer,
      role: isOrganizer ? 'organizer' : 'user'
    };
    
    console.log('[Auth Middleware] Authentication successful');
    next();
  } catch (err) {
    console.log('[Auth Middleware] Authentication error:', err.message);
    res.status(401).json({ message: 'Token is not valid' });
  }
};
