// Mongo Submission model
const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  projectUrl: { type: String, required: true },
  score: { type: Number },
  feedback: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Submission', SubmissionSchema);
