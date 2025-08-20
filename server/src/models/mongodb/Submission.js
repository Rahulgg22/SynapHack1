const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  event_id: Number, // Azure SQL event_id
  team_id: Number,  // Azure SQL team_id
  project_name: String,
  github_url: String,
  demo_video_url: String,
  files: [String], // URLs or file references
  submitted_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Submission', submissionSchema);
