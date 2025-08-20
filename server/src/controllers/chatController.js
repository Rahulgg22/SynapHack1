const Chat = require('../models/mongodb/Chat');

exports.createMessage = async (req, res, next) => {
  try {
    const message = await Chat.create(req.body);
    res.status(201).json(message);
  } catch (err) { next(err); }
};

exports.getMessagesByEvent = async (req, res, next) => {
  try {
    const messages = await Chat.find({ event_id: req.params.event_id });
    res.json(messages);
  } catch (err) { next(err); }
};
