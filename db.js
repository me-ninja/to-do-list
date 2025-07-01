//db.js Create the Database Layer
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('task.db');

//create the table
db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    due_date TEXT,
    priority TEXT,
    completed INTEGER DEFAULT 0
    )
    `);

module.exports = {
  getAllTasks(callback) {
    db.all('SELECT * FROM tasks ORDER BY id DESC', [], (err, rows) => {
      callback(err, rows);
    });
  },

  addTask(task, callback) {
    const { title, due_date, priority } = task;
    const sql = 'INSERT INTO tasks (title, due_date, priority) VALUES (?, ?, ?)';
    db.run(sql, [title, due_date, priority], function (err) {
      callback(err, { id: this.lastID, ...task, completed: 0 });
    });
  },

completeTask(id, callback) {
  const sql = 'UPDATE tasks SET completed = 1 WHERE id = ?';
  db.run(sql, [id], function (err) {
    if (err) console.error('SQLite error during UPDATE:', err);
    callback(err);
  });
},

deleteTask(id, callback) {
  const sql = 'DELETE FROM tasks WHERE id = ?';
  db.run(sql, [id], function (err) {
    callback(err);
  });
}



};




