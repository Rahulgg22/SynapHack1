const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  event_id: Number, // Azure SQL event_id
  user_id: Number,  // Azure SQL user_id
  message: String,
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Chat', chatSchema);
