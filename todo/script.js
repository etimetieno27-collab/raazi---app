// DOM Elements
const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const clearBtn = document.getElementById('clearBtn');
const emptyState = document.getElementById('emptyState');
const filterBtns = document.querySelectorAll('.filter-btn');
const totalTasksSpan = document.getElementById('totalTasks');
const completedTasksSpan = document.getElementById('completedTasks');
const remainingTasksSpan = document.getElementById('remainingTasks');

// State
let todos = [];
let currentFilter = 'all';
const STORAGE_KEY = 'todos';

// Load todos from localStorage on page load
function loadTodos() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        todos = JSON.parse(saved);
    }
}

// Save todos to localStorage
function saveTodos() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// Add a new todo
function addTodo() {
    const text = todoInput.value.trim();
    
    if (text === '') {
        alert('Please enter a task!');
        return;
    }

    const todo = {
        id: Date.now(),
        text: text,
        completed: false,
        createdAt: new Date().toLocaleString()
    };

    todos.push(todo);
    saveTodos();
    todoInput.value = '';
    todoInput.focus();
    renderTodos();
    updateStats();
}

// Delete a todo
function deleteTodo(id) {
    if (confirm('Are you sure you want to delete this task?')) {
        todos = todos.filter(todo => todo.id !== id);
        saveTodos();
        renderTodos();
        updateStats();
    }
}

// Toggle todo completion
function toggleTodo(id) {
    todos = todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    saveTodos();
    renderTodos();
    updateStats();
}

// Edit a todo
function editTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    const newText = prompt('Edit task:', todo.text);
    if (newText !== null && newText.trim() !== '') {
        todo.text = newText.trim();
        saveTodos();
        renderTodos();
    }
}

// Render todos based on filter
function renderTodos() {
    todoList.innerHTML = '';

    let filteredTodos = todos;

    if (currentFilter === 'active') {
        filteredTodos = todos.filter(todo => !todo.completed);
    } else if (currentFilter === 'completed') {
        filteredTodos = todos.filter(todo => todo.completed);
    }

    if (filteredTodos.length === 0) {
        emptyState.classList.add('show');
        todoList.style.display = 'none';
    } else {
        emptyState.classList.remove('show');
        todoList.style.display = 'block';

        filteredTodos.forEach(todo => {
            const li = document.createElement('li');
            li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            li.innerHTML = `
                <input 
                    type="checkbox" 
                    class="checkbox" 
                    ${todo.completed ? 'checked' : ''}
                    onchange="toggleTodo(${todo.id})"
                >
                <span class="todo-text">${escapeHtml(todo.text)}</span>
                <div class="todo-actions">
                    <button class="edit-btn" onclick="editTodo(${todo.id})">Edit</button>
                    <button class="delete-btn" onclick="deleteTodo(${todo.id})">Delete</button>
                </div>
            `;
            todoList.appendChild(li);
        });
    }
}

// Update statistics
function updateStats() {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const remaining = total - completed;

    totalTasksSpan.textContent = total;
    completedTasksSpan.textContent = completed;
    remainingTasksSpan.textContent = remaining;
}

// Clear all completed todos
function clearCompleted() {
    if (todos.some(todo => todo.completed)) {
        if (confirm('Delete all completed tasks?')) {
            todos = todos.filter(todo => !todo.completed);
            saveTodos();
            renderTodos();
            updateStats();
        }
    } else {
        alert('No completed tasks to clear!');
    }
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Event Listeners
addBtn.addEventListener('click', addTodo);
clearBtn.addEventListener('click', clearCompleted);

todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderTodos();
    });
});

// Initialize app
loadTodos();
renderTodos();
updateStats();
todoInput.focus();
