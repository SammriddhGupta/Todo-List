//selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

const COMPLETED = "COMPLETED";

//event listeners
document.addEventListener('DOMContentLoaded', getTodos); // if content has loaded, execute getTodos function
todoButton.addEventListener('click', addTodo); // to add on clicking plus 
todoList.addEventListener('click', deleteCheck); // to delete and check off items in list
filterOption.addEventListener('click', filterTodo); // to switch/filter between views in list

//functions

// function 1 - to add item in todo list
function addTodo(event) {
    event.preventDefault(); // prevent the form from reloading when submitting it

    // creating todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //create List
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value; // grab the value entered in text field to be stored as list item
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    // adding the todo item to local storage
    saveLocalTodos(todoInput.value);

    //check off item -> completed button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //delete item -> trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //append to list
    todoList.appendChild(todoDiv); 

    // clear the text box after value has been entered
    todoInput.value=""; 
}

// function 2 - to delete and check off items from todo list
function deleteCheck(event) {
    const item = event.target;

    // delete item in list
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;

        // adding a falling down animation
        todo.classList.add("fall");
        removeLocalTodos(todo); // to remove the todo item from local storage
        todo.addEventListener('transitionend', function() {
            todo.remove();
        })
    }

    // check off item in list
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
        // also save the status to local storage
        saveLocalTodos(new TODOItem(todo.children[0].innerText, COMPLETED));
    }
}

// function 3 - to filter between views - all / completed / uncompleted
function filterTodo(event) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch(event.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                }
                else {
                    todo.style.display = "none";
                }
                break;
               
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                }
                else {
                    todo.style.display = "none";
                }
                break;
        }
    }); 
}

// function 4 - for enabling local storage
function saveLocalTodos(todo) {

    // checking if we already have items in the todo list
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

// function 5 - for implementing local storage
function getTodos(todo) {
    // checking if we already have items in the todo list
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){

        // creating todo div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        //create List
        const newTodo = document.createElement("li");
        newTodo.innerText = todo; // grab the value of todo from local storage
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        //check off item -> completed button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        //delete item -> trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        //append to list
        todoList.appendChild(todoDiv); 
    });
}
// function 6 - so that refreshing does not restore the deleted items 
function removeLocalTodos(todo) {

    // checking if we already have items in the todo list
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex = todo.children[0].innerText; // extract the item
    todos.splice(todos.indexOf(todoIndex), 1); // remove that specific 1 item which we deleted
    localStorage.setItem("todos", JSON.stringify(todos)); // set back the local storage to remaining todo items
}