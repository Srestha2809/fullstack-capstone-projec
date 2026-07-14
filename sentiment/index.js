const express = require('express');
const cors = require('cors');
const natural = require('natural');

const app = express();
app.use(cors());
app.use(express.json());

const analyzer = new natural.SentimentAnalyzer('English', natural.PorterStemmer, 'afinn');
const tokenizer = new natural.WordTokenizer();

// POST /api/sentiment - analyze the sentiment of a piece of text (e.g., a gift review)
app.post('/api/sentiment', (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const tokens = tokenizer.tokenize(text);
    const score = analyzer.getSentiment(tokens);

    let sentiment = 'neutral';
    if (score > 0) sentiment = 'positive';
    if (score < 0) sentiment = 'negative';

    res.json({ text, score, sentiment });
  } catch (e) {
    console.error('Error analyzing sentiment:', e);
    res.status(500).json({ error: 'Error analyzing sentiment' });
  }
});

const PORT = process.env.SENTIMENT_PORT || 3001;
app.listen(PORT, () => {
  console.log(`Sentiment service running on port ${PORT}`);
});

module.exports = app;