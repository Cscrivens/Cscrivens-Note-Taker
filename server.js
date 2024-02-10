const express = require('express');
const path = require('path');
const apiRoutes = require('./routes/apiRoutes'); // Import the apiRoutes

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to handle JSON parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static('public'));

// Use the apiRoutes for handling API requests
app.use(apiRoutes);

// HTML Routes
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
