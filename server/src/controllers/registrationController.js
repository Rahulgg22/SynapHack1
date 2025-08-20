const Registration = require('../models/Registration');

exports.registerForEvent = async (req, res, next) => {
  try {
    const { event, teamName } = req.body;
    const registration = await Registration.create({ user: req.user._id, event, teamName });
    res.status(201).json(registration);
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
