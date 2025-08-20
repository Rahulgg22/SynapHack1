const Announcement = require('../models/mongodb/Announcement');

exports.createAnnouncement = async (req, res, next) => {
  try {
    const announcement = await Announcement.create(req.body);
    res.status(201).json(announcement);
  } catch (err) { next(err); }
};

exports.getAnnouncementsByEvent = async (req, res, next) => {
  try {
    const announcements = await Announcement.find({ event_id: req.params.event_id });
    res.json(announcements);
  } catch (err) { next(err); }
};
