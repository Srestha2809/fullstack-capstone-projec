const express = require('express');
const router = express.Router();
const connectToDatabase = require('../db');

// This router is mounted at /api/search in app.js
// GET /api/search?category=Birthday - filter gift items by category
router.get('/', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('gifts');

    const { category } = req.query;
    let query = {};

    // Filter by category if one was provided (case-insensitive partial match)
    if (category && category.toLowerCase() !== 'all') {
      query.category = { $regex: category, $options: 'i' };
    }

    const results = await collection.find(query).toArray();
    res.json(results);
  } catch (e) {
    console.error('Error searching gifts:', e);
    res.status(500).send('Error performing search');
  }
});

module.exports = router;