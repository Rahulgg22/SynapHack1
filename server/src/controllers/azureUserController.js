const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const azure = require('../utils/azureQueries');

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, ...rest } = req.body;
    const existing = await azure.getUserByEmail(email);
    if (existing) return res.status(400).json({ message: 'Email already exists' });
    const password_hash = await bcrypt.hash(password, 10);
    const user = await azure.createUser({ name, email, password_hash, ...rest });
    res.status(201).json({ message: 'User registered', user });
  } catch (err) { next(err); }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await azure.getUserByEmail(email);
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });
    // Elevate to judge if any active judge assignment exists
    const isJudge = await azure.isUserJudge(user.user_id);
    const role = isJudge ? 'judge' : 'user';
    const token = jwt.sign({ id: user.user_id, role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user, role });
  } catch (err) { next(err); }
};

exports.me = async (req, res, next) => {
  try {
    const user = await azure.getUserById(req.user.user_id);
    res.json({ user });
  } catch (err) { next(err); }
};
