const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connectToDatabase = require('../db');

const JWT_SECRET = process.env.JWT_SECRET || 'change-this-secret';

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const users = db.collection('users');

    const { email, password, firstName, lastName } = req.body;

    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await users.insertOne({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      createdAt: new Date()
    });

    res.status(201).json({ message: 'User registered successfully', userId: result.insertedId });
  } catch (e) {
    console.error('Error registering user:', e);
    res.status(500).json({ error: 'Error registering user' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const users = db.collection('users');

    const { email, password } = req.body;

    const user = await users.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login successful', token });
  } catch (e) {
    console.error('Error logging in:', e);
    res.status(500).json({ error: 'Error logging in' });
  }
});

// PUT /api/auth/update - update user information
router.put('/update', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const users = db.collection('users');

    const { email, firstName, lastName } = req.body;

    const result = await users.updateOne(
      { email },
      { $set: { firstName, lastName } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User updated successfully' });
  } catch (e) {
    console.error('Error updating user:', e);
    res.status(500).json({ error: 'Error updating user' });
  }
});

module.exports = router;