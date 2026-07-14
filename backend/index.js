const natural = require('natural');
const app = require('./app');

const PORT = process.env.PORT || 3000;

// Example use of the natural package: a stemmer that could later power
// smarter, fuzzy search matching (e.g., "gift" and "gifts" treated the same)
const stemmer = natural.PorterStemmer;
console.log('NLP stemmer ready. Example stem("gifts") =', stemmer.stem('gifts'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});