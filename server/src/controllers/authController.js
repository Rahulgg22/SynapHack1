const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sql = require('mssql'); // make sure you're using this pool in db.js

// Register user
exports.register = async (req, res) => {
  try {
    const { name, email, password, university, organization, role } = req.body;

    // check if email already exists
    const check = await sql.query`SELECT * FROM Users WHERE email = ${email}`;
    if (check.recordset.length > 0) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // hash password
    const hash = await bcrypt.hash(password, 10);

    // insert user into Users table
    const result = await sql.query`
      INSERT INTO Users (name, email, password_hash, university, organization, is_verified)
      OUTPUT INSERTED.user_id, INSERTED.name, INSERTED.email, INSERTED.university, INSERTED.organization
      VALUES (${name}, ${email}, ${hash}, ${university || null}, ${organization || null}, 0)
    `;

    const user = result.recordset[0];
    res.status(201).json({ message: 'User registered successfully', user });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login user
exports.login = async (req, res) => {
  console.log("Login request body:", req.body); // Debugging: log the request body
  try {
    const { email, password } = req.body;

    const result = await sql.query`SELECT * FROM Users WHERE email = ${email}`;
    if (result.recordset.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const user = result.recordset[0];

  // Debugging logs
  console.log("User from DB:", user);
  console.log("Plain password:", password);
  console.log("DB password:", user.password_hash);



    let match = false;
    try {
      match = await bcrypt.compare(password, user.password_hash);
      console.log("bcrypt.compare result:", match);
    } catch (e) {
      console.log("bcrypt.compare error:", e);
      match = false;
    }
    // Fallback: allow plain text match for legacy users (temporary)
    if (!match && password === user.password_hash) {
      console.log("Plain text password matched DB password (legacy user)");
      match = true;
    }
    if (!match) {
      console.log("Password did not match (neither bcrypt nor plain)");
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.user_id, role: 'user' }, // default role can be managed separately in UserEventRoles
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user.user_id,
        name: user.name,
        email: user.email,
        university: user.university,
        organization: user.organization,
        is_verified: user.is_verified
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get logged in user
exports.me = async (req, res) => {
  try {
    const result = await sql.query`SELECT user_id, name, email, university, organization, is_verified FROM Users WHERE user_id = ${req.user.id}`;
    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user: result.recordset[0] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

