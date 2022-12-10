let tasklist= [];
let todos = [];
let inProgress = [];
let awaitFeedback = [];
let doneTasks = [];

async function initBoard() {
    await loadTasklist()
    loadTodos();
    loadInProgress();
    loadAwaitFeedback();
    loadDoneTasks();
    renderBoard();
}

async function loadTasklist(){
    
}

function loadTodos(){
    todos = tasklist.filter(t => t['progress'] == 'toDo');
}

function loadInProgress(){
    inProgress = tasklist.filter(t => t['progress'] == 'inProgress');
}

function loadAwaitFeedback(){
    awaitFeedback = tasklist.filter(t => t['progress'] == 'awaitFeedback');
}

function loadDoneTasks() {
    doneTasks = tasklist.filter(t => t['progress'] == 'doneTask');
}

function renderBoard(){
    renderTodos()
    renderInProgress()
    renderAwaitFeedback()
    renderDoneTasks()
}

function renderTodos(){
    document.getElementById('toDo').innerHTML = ``;
    for (let i = 0; i < todos.length; i++) {
        let toDo = todos[i];
        let id = toDo['id'];
        let category = toDo['category'];
        let title = toDo['title'];
        let description = toDo['description'];
        let subtasks = toDo['subtasks'].length;
        let completedtasks = toDo['completedtasks'].length;
        let assignedIconToThree = assignedTo(toDo['assignedToIco']);
        let priority = toDo['priority'];
        document.getElementById('toDo').innerHTML += toDoTemplate(id, category, title, description, subtasks, completedtasks, assignedIconToThree, priority)
    }
}

function renderInProgress(){
    document.getElementById('toDo').innerHTML = ``;
    for (let i = 0; i < inProgress.length; i++) {
        let toDo = inProgress[i];
        let id = toDo['id'];
        let category = toDo['category'];
        let title = toDo['title'];
        let description = toDo['description'];
        let subtasks = toDo['subtasks'].length;
        let completedtasks = toDo['completedtasks'].length;
        let assignedIconToThree = assignedTo(toDo['assignedToIco']);
        let priority = toDo['priority'];
        document.getElementById('toDo').innerHTML += toDoTemplate(id, category, title, description, subtasks, completedtasks, assignedIconToThree, priority)
    }
}

function renderAwaitFeedback(){
    document.getElementById('toDo').innerHTML = ``;
    for (let i = 0; i < awaitFeedback.length; i++) {
        let toDo = awaitFeedback[i];
        let id = toDo['id'];
        let category = toDo['category'];
        let title = toDo['title'];
        let description = toDo['description'];
        let subtasks = toDo['subtasks'].length;
        let completedtasks = toDo['completedtasks'].length;
        let assignedIconToThree = assignedTo(toDo['assignedToIco']);
        let priority = toDo['priority'];
        document.getElementById('toDo').innerHTML += toDoTemplate(id, category, title, description, subtasks, completedtasks, assignedIconToThree, priority)
    }
}

function renderDoneTasks(){
    document.getElementById('toDo').innerHTML = ``;
    for (let i = 0; i < doneTasks.length; i++) {
        let toDo = doneTasks[i];
        let id = toDo['id'];
        let category = toDo['category'];
        let title = toDo['title'];
        let description = toDo['description'];
        let subtasks = toDo['subtasks'].length;
        let completedtasks = toDo['completedtasks'].length;
        let assignedIconToThree = assignedTo(toDo['assignedToIco']);
        let priority = toDo['priority'];
        document.getElementById('toDo').innerHTML += toDoTemplate(id, category, title, description, subtasks, completedtasks, assignedIconToThree, priority)
    }
}

function assignedTo(assignedToIco){
    if (assignedToIco.length <= 3){
        return assignedToIco
    }else {
        let number = assignedToIco.length - 2
        return assignedToIco[1] + assignedToIco[2] + number
    }
}

function toDoTemplate(id, category, title, description, subtasks, completedtasks, assignedIconToThree, priority){
    return html`
    <div class="todo" ondragstart="startDragging(${id})">
        <div class="category${category}">${category}</div>
        <div class="title">${title}</div>
        <div class="description">${description}</div>
        <div class="subtaskbar">${completedtasks}/${subtasks} Done</div>
        <div class="todofooter"><div>${assignedIconToThree}</div><div>${priority}</div></div>
    </div>`
}