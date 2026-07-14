const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const giftRoutes = require('./routes/giftRoutes');
const searchRoutes = require('./routes/searchRoutes');
const authRoutes = require('./routes/authRoutes');

// Gift item routes: /api/gifts and /api/gifts/:id
app.use('/', giftRoutes);

// Search route: /api/search
app.use('/api/search', searchRoutes);

// Auth routes: register, login, update user
app.use('/api/auth', authRoutes);

module.exports = app;