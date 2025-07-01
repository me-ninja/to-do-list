document.getElementById("task-form").addEventListener("submit", async (e) => {e.preventDefault();

const title = document.getElementById("title").value.trim();
const dueDate = document.getElementById("due-date").value;
const priority = document.getElementById("priority").value;

if (!title) return alert("Title is required!");
const task = {title, due_date: dueDate, priority};

try {
    const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(task)
    });

    if (res.ok) {
        document.getElementById('task-form').reset();
        loadTasks(); //reload the updated list
    } 
    else {
        console.error('Failed to add task');
    } 
    }
    catch (err) {
        console.error(err);
    }
} );
//*************************** */
const taskInput = document.getElementById('task'); // your input field
const prioritySelect = document.getElementById('priority'); // your <select>

const taskText = taskInput.value;
const priority = prioritySelect.value.toLowerCase(); // "low", "medium", or "high"

// Create <li>
const li = document.createElement('li');
li.textContent = taskText;
li.classList.add('task'); // base class
li.classList.add(`${task.priority.toLowerCase()}-priority`);
//***************************** */



//Fetch all tasks from your backend

async function loadTasks() {
  try {
    const res = await fetch('/api/tasks');
    const tasks = await res.json();

    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // Clear old tasks

    tasks.forEach(task => {
      const li = document.createElement('li');
      li.className = 'task';
      if (task.completed) li.classList.add('completed');

      // 💡 Inject task HTML with ✔ button
      

      li.innerHTML = `
        <span>
          <strong>${task.title}</strong> 
          ${task.due_date ? `– due ${task.due_date}` : ''} 
          [${task.priority}]
        </span>
        <div>
          <button onclick="completeTask(${task.id})">✔</button>
          <button onclick="deleteTask(${task.id})">🗑</button>
        </div>
      `;

      taskList.appendChild(li);
    });
  } catch (err) {
    console.error('Failed to load tasks:', err);
  }
};


async function completeTask(id) {
  const res = await fetch(`/api/tasks/${id}/complete`, {
    method: 'PUT'
  });
  if (res.ok) {
    setTimeout(loadTasks, 400); // still good if you're animating
  } else {
    console.error('Server responded with error');
  }
}



async function deleteTask(id) {
  try {
    const res = await fetch(`/api/tasks/${id}`, {
      method: 'DELETE'
    });
    if (res.ok) {
      loadTasks(); // refresh list
    } else {
      console.error('Server failed to delete task');
    }
  } catch (err) {
    console.error('Deletion error:', err);
  }
}





window.addEventListener('DOMContentLoaded', loadTasks)

