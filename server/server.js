const express = require('express');
const dotenv = require('dotenv');
const connectMongo = require('./config/mongo');
const sequelize = require('./config/sql');

// Route imports
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const submissionRoutes = require('./routes/submissionRoutes');
const announcementRoutes = require('./routes/announcementRoutes');
const authRoutes = require('./routes/auth'); // ✅ add this

dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB
connectMongo();

// Test SQL connection
sequelize.authenticate()
  .then(() => console.log('SQL DB connected'))
  .catch(err => console.error('SQL DB connection error:', err));

// Routes
app.use('/api/auth', authRoutes); // ✅ added auth
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/announcements', announcementRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
