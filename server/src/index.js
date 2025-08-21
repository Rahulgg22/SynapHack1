require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectMongoDB } = require('./config/mongodb');
const { connectAzureSQL } = require('./config/azure');
const app = express();
// Enable CORS for frontend
app.use(cors({
  origin: "https://synap-hack1.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

const { PORT = 5000, MONGODB_URI } = process.env;

// Middleware

app.use(express.json());

// Connect to MongoDB
connectMongoDB();

// Connect to Azure SQL
connectAzureSQL();

// Routes
app.use('/api/scores', require('./routes/azureScores'));
app.use('/api/user-event-roles', require('./routes/azureUserEventRoles'));
app.use('/api/team-members', require('./routes/azureTeamMembers'));
app.use('/api/teams', require('./routes/azureTeams'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/azure-auth', require('./routes/azureAuth'));
app.use('/api/events', require('./routes/azureEvents'));
app.use('/api/registrations', require('./routes/registrations'));
app.use('/api/announcements', require('./routes/announcements'));
app.use('/api/submissions', require('./routes/submissions'));
app.use('/api/chat', require('./routes/chat'));
app.use('/api/judges', require('./routes/judges'));
app.use('/api/analytics', require('./routes/analytics'));
app.use('/api/organizer', require('./routes/organizer'));

// Error handler
app.use(require('./middleware/errorHandler'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
