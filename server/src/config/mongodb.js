// MongoDB connection setup
const mongoose = require('mongoose');

function connectMongoDB() {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));
}

module.exports = { mongoose, connectMongoDB };
