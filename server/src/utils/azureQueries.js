// Utility functions for Azure SQL queries for all main tables
const sql = require('mssql');

// Get the connection pool
let pool = null;

const getPool = async () => {
  if (!pool) {
    pool = await sql.connect({






















      
      user: process.env.AZURE_SQL_USER,
      password: process.env.AZURE_SQL_PASSWORD,
      server: process.env.AZURE_SQL_SERVER,
      database: process.env.AZURE_SQL_DATABASE,
      options: {
        encrypt: true, // required for Azure
        trustServerCertificate: false,
      },
    });
  }
  return pool;
};

// USERS
exports.createUser = async (user) => {
  const sqlPool = await getPool();
  const result = await sqlPool.request()
    .input('name', sql.NVarChar, user.name)
    .input('email', sql.NVarChar, user.email)
    .input('password_hash', sql.NVarChar, user.password_hash)
    .input('profile_pic_url', sql.NVarChar, user.profile_pic_url)
    .input('bio', sql.NVarChar, user.bio)
    .input('social_links', sql.NVarChar, user.social_links)
    .input('university', sql.NVarChar, user.university)
    .input('organization', sql.NVarChar, user.organization)
    .input('is_verified', sql.Bit, user.is_verified)
    .query(`
      INSERT INTO Users (name, email, password_hash, profile_pic_url, bio, social_links, university, organization, is_verified)
      VALUES (@name, @email, @password_hash, @profile_pic_url, @bio, @social_links, @university, @organization, @is_verified)
      SELECT SCOPE_IDENTITY() AS user_id
    `);
  return result.recordset[0];
};

exports.getUserByEmail = async (email) => {
  const sqlPool = await getPool();
  const result = await sqlPool.request()
    .input('email', sql.NVarChar, email)
    .query('SELECT * FROM Users WHERE email = @email');
  return result.recordset[0];
};

exports.getUserById = async (user_id) => {
  const sqlPool = await getPool();
  const result = await sqlPool.request()
    .input('user_id', sql.Int, user_id)
    .query('SELECT * FROM Users WHERE user_id = @user_id');
  return result.recordset[0];
};

// EVENTS
exports.createEvent = async (event) => {
  const sqlPool = await getPool();
  const result = await sqlPool.request()
    .input('title', sql.NVarChar, event.title)
    .input('theme', sql.NVarChar, event.theme)
    .input('description', sql.NVarChar, event.description)
    .input('mode', sql.NVarChar, event.mode)
    .input('start_date', sql.DateTime, event.start_date)
    .input('end_date', sql.DateTime, event.end_date)
    .input('registration_deadline', sql.DateTime, event.registration_deadline)
    .input('max_team_size', sql.Int, event.max_team_size)
    .input('status', sql.NVarChar, event.status)
    .input('rules', sql.NVarChar, event.rules)
    .input('prizes', sql.NVarChar, event.prizes)
    .input('sponsor_info', sql.NVarChar, event.sponsor_info)
    .input('banner_url', sql.NVarChar, event.banner_url)
    .input('location', sql.NVarChar, event.location)
    .input('created_by', sql.Int, event.created_by)
    .query(`
      INSERT INTO Events (title, theme, description, mode, start_date, end_date, registration_deadline, max_team_size, status, rules, prizes, sponsor_info, banner_url, location, created_by)
      VALUES (@title, @theme, @description, @mode, @start_date, @end_date, @registration_deadline, @max_team_size, @status, @rules, @prizes, @sponsor_info, @banner_url, @location, @created_by)
      SELECT SCOPE_IDENTITY() AS event_id
    `);
  return result.recordset[0];
};

// Create event and assign organizer role in one transaction
exports.createEventWithOrganizer = async (event, user_id) => {
  const sqlPool = await getPool();
  const transaction = new sql.Transaction(sqlPool);
  
  try {
    await transaction.begin();
    
    // Create the event
    const eventResult = await transaction.request()
      .input('title', sql.NVarChar, event.title)
      .input('theme', sql.NVarChar, event.theme)
      .input('description', sql.NVarChar, event.description)
      .input('mode', sql.NVarChar, event.mode)
      .input('start_date', sql.DateTime, event.start_date)
      .input('end_date', sql.DateTime, event.end_date)
      .input('registration_deadline', sql.DateTime, event.registration_deadline)
      .input('max_team_size', sql.Int, event.max_team_size)
      .input('status', sql.NVarChar, event.status)
      .input('rules', sql.NVarChar, event.rules)
      .input('prizes', sql.NVarChar, event.prizes)
      .input('sponsor_info', sql.NVarChar, event.sponsor_info)
      .input('banner_url', sql.NVarChar, event.banner_url)
      .input('location', sql.NVarChar, event.location)
      .input('user_id', sql.Int, user_id)
      .query(`
        INSERT INTO Events (title, theme, description, mode, start_date, end_date, registration_deadline, max_team_size, status, rules, prizes, sponsor_info, banner_url, location, created_by)
        VALUES (@title, @theme, @description, @mode, @start_date, @end_date, @registration_deadline, @max_team_size, @status, @rules, @prizes, @sponsor_info, @banner_url, @location, @user_id)
        SELECT SCOPE_IDENTITY() AS event_id
      `);
    
    const event_id = eventResult.recordset[0].event_id;
    
    // Assign organizer role to the creator
    await transaction.request()
      .input('user_id', sql.Int, user_id)
      .input('event_id', sql.Int, event_id)
      .input('role', sql.NVarChar, 'organizer')
      .input('permissions', sql.NVarChar, 'full')
      .query(`
        INSERT INTO UserEventRoles (user_id, event_id, role, permissions)
        VALUES (@user_id, @event_id, @role, @permissions)
      `);
    
    await transaction.commit();
    return { event_id, user_id, role: 'organizer' };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

exports.getEventById = async (event_id) => {
  const sqlPool = await getPool();
  const result = await sqlPool.request()
    .input('event_id', sql.Int, event_id)
    .query('SELECT * FROM Events WHERE event_id = @event_id');
  return result.recordset[0];
};

exports.getAllEvents = async () => {
  try {
    console.log('[Azure] getAllEvents called');
    const sqlPool = await getPool();
    console.log('[Azure] Got connection pool');
    const result = await sqlPool.request().query('SELECT * FROM Events');
    console.log('[Azure] Query executed, records found:', result.recordset.length);
    console.log('[Azure] Events:', result.recordset);
    return result.recordset;
  } catch (error) {
    console.error('[Azure] Error in getAllEvents:', error);
    throw error;
  }
};

// Get all events where user is an organizer
exports.getEventsByOrganizer = async (user_id) => {
  const sqlPool = await getPool();
  const result = await sqlPool.request()
    .input('user_id', sql.Int, user_id)
    .query(`
      SELECT e.* FROM Events e
      INNER JOIN UserEventRoles uer ON e.event_id = uer.event_id
      WHERE uer.user_id = @user_id AND uer.role = 'organizer'
    `);
  return result.recordset;
};

// Check if user is an organizer for any event
exports.isUserOrganizer = async (user_id) => {
  const sqlPool = await getPool();
  const result = await sqlPool.request()
    .input('user_id', sql.Int, user_id)
    .query(`
      SELECT COUNT(*) as count FROM UserEventRoles 
      WHERE user_id = @user_id AND role = 'organizer'
    `);
  return result.recordset[0].count > 0;
};

// Get user's role for a specific event
exports.getUserRoleForEvent = async (user_id, event_id) => {
  const sqlPool = await getPool();
  const result = await sqlPool.request()
    .input('user_id', sql.Int, user_id)
    .input('event_id', sql.Int, event_id)
    .query(`
      SELECT role FROM UserEventRoles 
      WHERE user_id = @user_id AND event_id = @event_id
    `);
  return result.recordset[0]?.role || null;
};

// TEAMS
exports.createTeam = async (team) => {
  const sqlPool = await getPool();
  const result = await sqlPool.request()
    .input('event_id', sql.Int, team.event_id)
    .input('team_name', sql.NVarChar, team.team_name)
    .input('project_name', sql.NVarChar, team.project_name)
    .input('submission_status', sql.NVarChar, team.submission_status)
    .input('github_repo_url', sql.NVarChar, team.github_repo_url)
    .input('demo_video_url', sql.NVarChar, team.demo_video_url)
    .query(`
      INSERT INTO Teams (event_id, team_name, project_name, submission_status, github_repo_url, demo_video_url)
      VALUES (@event_id, @team_name, @project_name, @submission_status, @github_repo_url, @demo_video_url)
      SELECT SCOPE_IDENTITY() AS team_id
    `);
  return result.recordset[0];
};

exports.getTeamById = async (team_id) => {
  const sqlPool = await getPool();
  const result = await sqlPool.request()
    .input('team_id', sql.Int, team_id)
    .query('SELECT * FROM Teams WHERE team_id = @team_id');
  return result.recordset[0];
};

// TEAM MEMBERS
exports.addTeamMember = async (member) => {
  const sqlPool = await getPool();
  await sqlPool.request()
    .input('team_id', sql.Int, member.team_id)
    .input('user_id', sql.Int, member.user_id)
    .input('role_in_team', sql.NVarChar, member.role_in_team)
    .input('is_leader', sql.Bit, member.is_leader)
    .query(`
      INSERT INTO TeamMembers (team_id, user_id, role_in_team, is_leader)
      VALUES (@team_id, @user_id, @role_in_team, @is_leader)
    `);
};

exports.getTeamMembers = async (team_id) => {
  const sqlPool = await getPool();
  const result = await sqlPool.request()
    .input('team_id', sql.Int, team_id)
    .query('SELECT * FROM TeamMembers WHERE team_id = @team_id');
  return result.recordset;
};

// USER_EVENT_ROLES
exports.addUserEventRole = async (role) => {
  const sqlPool = await getPool();
  await sqlPool.request()
    .input('user_id', sql.Int, role.user_id)
    .input('event_id', sql.Int, role.event_id)
    .input('role', sql.NVarChar, role.role)
    .input('permissions', sql.NVarChar, role.permissions)
    .query(`
      INSERT INTO UserEventRoles (user_id, event_id, role, permissions)
      VALUES (@user_id, @event_id, @role, @permissions)
    `);
};

exports.getUserEventRoles = async (user_id, event_id) => {
  const sqlPool = await getPool();
  const result = await sqlPool.request()
    .input('user_id', sql.Int, user_id)
    .input('event_id', sql.Int, event_id)
    .query('SELECT * FROM UserEventRoles WHERE user_id = @user_id AND event_id = @event_id');
  return result.recordset;
};

// SCORES
exports.createScore = async (score) => {
  const sqlPool = await getPool();
  const result = await sqlPool.request()
    .input('submission_id', sql.Int, score.submission_id)
    .input('judge_id', sql.Int, score.judge_id)
    .input('event_id', sql.Int, score.event_id)
    .input('round_number', sql.Int, score.round_number)
    .input('criteria', sql.NVarChar, score.criteria)
    .input('score', sql.Decimal, score.score)
    .input('total_score', sql.Decimal, score.total_score)
    .input('feedback', sql.NVarChar, score.feedback)
    .input('status', sql.NVarChar, score.status)
    .query(`
      INSERT INTO Scores (submission_id, judge_id, event_id, round_number, criteria, score, total_score, feedback, status)
      VALUES (@submission_id, @judge_id, @event_id, @round_number, @criteria, @score, @total_score, @feedback, @status)
      SELECT SCOPE_IDENTITY() AS score_id
    `);
  return result.recordset[0];
};

exports.getScoresByEvent = async (event_id) => {
  const sqlPool = await getPool();
  const result = await sqlPool.request()
    .input('event_id', sql.Int, event_id)
    .query('SELECT * FROM Scores WHERE event_id = @event_id');
  return result.recordset;
};
