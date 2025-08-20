const Event = require('../models/Event');
const Registration = require('../models/Registration');
const Judge = require('../models/Judge');

exports.getOverview = async (req, res, next) => {
  try {
    const totalEvents = await Event.countDocuments();
    const totalParticipants = await Registration.countDocuments();
    const totalJudges = await Judge.countDocuments();
    res.json({ totalEvents, totalParticipants, totalJudges });
  } catch (err) { next(err); }
};
