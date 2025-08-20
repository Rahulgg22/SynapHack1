const azure = require('../utils/azureQueries');

exports.createEvent = async (req, res, next) => {
  try {
    const mapped = mapIncomingEventPayload(req.body);
    const event = await azure.createEvent(mapped);
    res.status(201).json(event);
  } catch (err) { next(err); }
};

// Create event and assign organizer role to the creator
exports.createEventAsOrganizer = async (req, res, next) => {
  console.log('[Controller] createEventAsOrganizer called');
  console.log('[Controller] Request body:', req.body);
  console.log('[Controller] User:', req.user);
  
  try {
    const user_id = req.user.user_id || req.user.id;
    console.log('[Controller] User ID:', user_id);
    const mapped = mapIncomingEventPayload(req.body);
    const result = await azure.createEventWithOrganizer(mapped, user_id);
    console.log('[Controller] Event created successfully:', result);
    
    res.status(201).json({
      message: 'Event created successfully and you are now the organizer',
      event_id: result.event_id,
      role: result.role
    });
  } catch (err) { 
    console.log('[Controller] Error creating event:', err);
    next(err); 
  }
};

// Get events organized by the current user
exports.getMyOrganizedEvents = async (req, res, next) => {
  try {
    const user_id = req.user.user_id || req.user.id;
    const events = await azure.getEventsByOrganizer(user_id);
    res.json(events);
  } catch (err) { next(err); }
};

// Check if user is an organizer
exports.checkOrganizerStatus = async (req, res, next) => {
  try {
    const user_id = req.user.user_id || req.user.id;
    const isOrganizer = await azure.isUserOrganizer(user_id);
    res.json({ isOrganizer });
  } catch (err) { next(err); }
};

exports.getEventById = async (req, res, next) => {
  try {
    const event = await azure.getEventById(req.params.event_id);
    if (!event) return res.status(404).json({ message: 'Not found' });
    res.json(event);
  } catch (err) { next(err); }
};

exports.getAllEvents = async (req, res, next) => {
  try {
    console.log('[Controller] getAllEvents called');
    const events = await azure.getAllEvents();
    console.log('[Controller] Events fetched:', events);
    res.json(events);
  } catch (err) { 
    console.error('[Controller] Error fetching events:', err);
    next(err); 
  }
};

function mapIncomingEventPayload(body) {
  // Map frontend fields to DB columns and provide sane defaults
  const toDate = (v) => (v ? new Date(v) : null);
  const toInt = (v, d) => {
    const n = parseInt(v, 10);
    return Number.isFinite(n) ? n : d;
  };
  return {
    title: body.title || body.name || null,
    theme: body.theme || body.domain || null,
    description: body.description || null,
    mode: body.mode || 'online',
    start_date: toDate(body.start_date),
    end_date: toDate(body.end_date),
    registration_deadline: toDate(body.registration_deadline),
    max_team_size: toInt(body.max_team_size, 4),
    status: body.status || 'upcoming',
    rules: body.rules || null,
    prizes: body.prizes || null,
    sponsor_info: body.sponsor_info || null,
    banner_url: body.banner_url || null,
    location: body.location || null,
    created_by: body.created_by || null,
  };
}
