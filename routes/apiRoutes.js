const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');



// Path to the db.json file
const dbFilePath = path.join(__dirname, '../db/db.json');

// GET /api/notes
router.get('/api/notes', (req, res) => {
  // Read the db.json file and return all saved notes as JSON
  fs.readFile(dbFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const notes = JSON.parse(data);
    res.json(notes);
  });
});

// POST /api/notes
router.post('/api/notes', (req, res) => {
  // Receive a new note in the request body
  const newNote = req.body;

  // Read existing notes from the db.json file
  fs.readFile(dbFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const notes = JSON.parse(data);

    // Give the new note a unique ID
    newNote.id = generateUniqueId();

    // Add the new note to the array
    notes.push(newNote);

    // Write the updated notes array back to the db.json file
    fs.writeFile(dbFilePath, JSON.stringify(notes, null, 2), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      // Return the new note to the client
      res.json(newNote);
    });
  });
});

// Function to generate a unique ID
function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

module.exports = router;
