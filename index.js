
const todoNameInput = document.getElementById('todoName');
const todoDueDateInput = document.getElementById('todoDueDate');
const addTodoButton = document.getElementById('addBtn');
const errorAlert = document.getElementById('error-alert');
const todoTable = document.getElementById('todo-table');
const deleteAllBtn = document.getElementById("delete-all")

const todos = [];

const addTodo = () => {
    const todoName = todoNameInput.value;
    const todoDueDate = todoDueDateInput.value;

    if (!todoName || !todoDueDate) {
        errorAlert.style.display = 'block';
        return;
    }

    const todo = {
        name: todoName,
        dueDate: todoDueDate,
        completed: false
    };

    todos.push(todo);

    todoNameInput.value = "";
    todoDueDateInput.value = "";

    errorAlert.style.display = 'none';

    displayTodos();
};

const displayTodos = (data = []) => {
    todoTable.innerHTML = '';

    const newTodos = data.length ? data : todos;

    newTodos.forEach((todo, index) => {
        const todoRow = document.createElement('tr');

        todoRow.innerHTML = `
            <td>${todo.name}</td>
            <td>${new Date(todo.dueDate).toLocaleString()}</td>
            <td>${todo.completed ? 'Completed' : 'Pending'}</td>
            <td>
                <button onclick="toggleCompleted(${index})"><i class="fa-solid fa-square-check" style="color: #17d214;"></i></button>
                <button onclick="deleteTodo(${index})"><i class="fa-solid fa-trash"></i></button>
                <button onclick="editTodo(${index})"><i class="fa-regular fa-pen-to-square" style="color: #74C0FC;"></i></button>
            </td>
        `;

        todoTable.appendChild(todoRow);
    });
};
const editTodo = (index) => {
    const todo = todos[index];
    todoNameInput.value = todo.name;
    todoDueDateInput.value = todo.dueDate;
    deleteTodo(index);
}

const filterTodos = (status) => {
    let filteredTodos = [];
    if(status === 'all') {
        filteredTodos = todos;
    } else if(status === 'completed') {
        filteredTodos = todos.filter(todo => todo.completed === true);
    } else if(status === 'pending') {
        filteredTodos = todos.filter(todo => todo.completed === false);
    } else {
        filteredTodos = todos;
    }
    // const filteredTodos = todos.filter(todo => todo.completed === status);
    displayTodos(filteredTodos);
}

const toggleCompleted = (index) => {
    todos[index].completed = !todos[index].completed;
    displayTodos();
};

const deleteTodo = (index) => {
    todos.splice(index, 1);
    displayTodos();
};

const deleteAllTodos = () => {
    todos.splice(0, todos.length);
    displayTodos();
};

deleteAllBtn.addEventListener('click', deleteAllTodos);
addTodoButton.addEventListener('click', addTodo);
