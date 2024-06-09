document.addEventListener('DOMContentLoaded', loadTasks);
document.getElementById('addTaskButton').addEventListener('click', addTask);
document.getElementById('taskInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => displayTask(task.text, task.completed));
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        return;
    }

    const task = { text: taskText, completed: false };
    saveTask(task);
    displayTask(task.text, task.completed);

    taskInput.value = '';
}

function displayTask(text, completed) {
    const taskList = document.getElementById('taskList');
    const listItem = document.createElement('li');
    listItem.className = `list-group-item d-flex justify-content-between align-items-center`;

    const taskSpan = document.createElement('span');
    taskSpan.textContent = text;
    taskSpan.classList.toggle('completed', completed);
    taskSpan.addEventListener('click', toggleComplete);

    const editButton = document.createElement('button');
    editButton.className = 'btn btn-warning btn-sm mr-2';
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => editTask(taskSpan));

    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-danger btn-sm';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', deleteTask);

    listItem.appendChild(taskSpan);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);
}

function toggleComplete(event) {
    const taskSpan = event.target;
    taskSpan.classList.toggle('completed');
    updateTaskStatus(taskSpan.textContent, taskSpan.classList.contains('completed'));
}

function editTask(taskSpan) {
    const newText = prompt('Edit your task:', taskSpan.textContent);
    if (newText) {
        updateTask(taskSpan.textContent, newText);
        taskSpan.textContent = newText;
    }
}

function deleteTask(event) {
    const listItem = event.target.parentElement;
    removeTask(listItem.firstChild.textContent);
    listItem.remove();
}

function saveTask(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTask(oldText, newText) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = tasks.find(task => task.text === oldText);
    if (task) {
        task.text = newText;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

function updateTaskStatus(text, completed) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = tasks.find(task => task.text === text);
    if (task) {
        task.completed = completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

function removeTask(text) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.text !== text);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
