//selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');

//event listeners
todoButton.addEventListener('click', addTodo); // to add on clicking plus 
todoList.addEventListener('click', deleteCheck); // to delete and check off items in list

//functions

// function to add item in todo list
function addTodo(event) {
    event.preventDefault(); // prevent form from submitting

    // creating todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //create List
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value; // grab the value entered in text field to be stored as list item
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    // clear the text box after value has been entered
    todoInput.value=""; 

    //completed button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //append to list
    todoList.appendChild(todoDiv); 
   
}

// function to delete and check off items from todo list
function deleteCheck(event) {
    const item = event.target;

    // delete item in list
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;

        // adding a falling down animation
        todo.classList.add("fall");
        todo.addEventListener('transitionend', function() {
            todo.remove();
        })
    }

    // check off item in list
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}