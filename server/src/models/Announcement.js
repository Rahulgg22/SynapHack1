const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  event_id: Number, // Azure SQL event_id
  message: String,
  created_by: Number, // Azure SQL user_id
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Announcement || mongoose.model('Announcement', announcementSchema);
