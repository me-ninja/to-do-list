// server.js SEt up the server
const express = require('express');
const path = require('path');
const db = require('./db');
const app = express();
//const PORT = 3000;
const PORT = 4000;

app.use(express.json());
app.use(express.static('public')); //sertver frontend

//GET all task
app.get('/api/tasks', (req, res) => {
    db.getAllTasks((err, tasks) => {
        if (err) return res.status(500).json({error: 'Database error'});
        res.json(tasks);
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

// server.js (add below GET /api/tasks)
app.post('/api/tasks', (req, res) => {
  const { title, due_date, priority } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });

  db.addTask({ title, due_date, priority }, (err, newTask) => {
    if (err) return res.status(500).json({ error: 'Failed to add task' });
    res.status(201).json(newTask);
  });
});

//Add Route in server.js
app.put('/api/tasks/:id/complete', (req, res) => {
  const { id } = req.params;
  console.log('Completing task with ID:', id); // add this!
  db.completeTask(id, (err) => {
    if (err) {
      console.error('DB error:', err);
      return res.status(500).json({ error: 'DB failure' });
    }
    res.json({ success: true });
  });
});

//Add this route beneath
app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  db.deleteTask(id, (err) => {
    if (err) {
      console.error('Failed to delete task:', err);
      return res.status(500).json({ error: 'Deletion failed' });
    }
    res.json({ success: true });
  });
});







