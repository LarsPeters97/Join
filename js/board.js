
let contacts = [];
let todos = [];
let inProgress = [];
let awaitFeedback = [];
let doneTasks = [];
let currentDraggedElement;
let assignetcontacts = [];
let selectedPrio = [];
let searchTodos = [];
let searchInProgress = [];
let searchAwaitFeedback = [];
let searchDoneTasks = [];


async function initBoard() {
    await loadAll();
    renderBoard();
}

async function loadAll() {
    await loadTasklist()
    loadTodos();
    loadInProgress();
    loadAwaitFeedback();
    loadDoneTasks();
}

function saveBoard() {
    let tasklistAsString = JSON.stringify(tasklist);
    backend.setItem("tasklist", tasklistAsString);
}

async function loadTasklist() {
    setURL("https://gruppe-397.developerakademie.net/smallest_backend_ever");
    await downloadFromServer();
    tasklist = JSON.parse(backend.getItem("tasklist")) || [];
}

function loadTodos() {
    todos = tasklist.filter(t => t['progress'] == 'todo');
}

function loadInProgress() {
    inProgress = tasklist.filter(t => t['progress'] == 'inprogresss');
}

function loadAwaitFeedback() {
    awaitFeedback = tasklist.filter(t => t['progress'] == 'awaitfeedback');
}

function loadDoneTasks() {
    doneTasks = tasklist.filter(t => t['progress'] == 'donetask');
}

function renderBoard() {
    renderTodos()
    renderInProgress()
    renderAwaitFeedback()
    renderDoneTasks()
}

function renderTodos() {
    document.getElementById('toDos').innerHTML = ``;
    for (let i = 0; i < todos.length; i++) {
        let toDo = todos[i];
        let id = toDo['id'];
        let color = toDo['category']['color'];
        let category = toDo['category']['categoryName'];
        let title = toDo['title'];
        let description = toDo['description'];
        let subtasks = toDo['subtasks']['tasks'].length;
        let completedtasks = 0;
        for (let j = 0; j < toDo['subtasks']['tasks'].length; j++) {
            let task = toDo['subtasks']['tasks'][j];
            if (task['completed']) {
                completedtasks++
            }
        }
        let assignedIconToThree = assignedTo(toDo['assignedTo']['user']);
        let priority = toDo['priority'];
        document.getElementById('toDos').innerHTML += toDoTemplate(id, color, category, title, description, subtasks, completedtasks, assignedIconToThree, priority)
    }
    document.getElementById('toDos').innerHTML += addDragarea('todo');
}

function renderInProgress() {
    document.getElementById('inProgress').innerHTML = ``;
    for (let i = 0; i < inProgress.length; i++) {
        let toDo = inProgress[i];
        let id = toDo['id'];
        let color = toDo['category']['color'];
        let category = toDo['category']['categoryName'];
        let title = toDo['title'];
        let description = toDo['description'];
        let subtasks = toDo['subtasks']['tasks'].length;
        let completedtasks = 0;
        for (let j = 0; j < toDo['subtasks']['tasks'].length; j++) {
            let task = toDo['subtasks']['tasks'][j];
            if (task['completed']) {
                completedtasks++
            }
        }
        let assignedIconToThree = assignedTo(toDo['assignedTo']['user']);
        let priority = toDo['priority'];
        document.getElementById('inProgress').innerHTML += toDoTemplate(id, color, category, title, description, subtasks, completedtasks, assignedIconToThree, priority)
    }
    document.getElementById('inProgress').innerHTML += addDragarea('inprogresss');
}

function renderAwaitFeedback() {
    document.getElementById('awaitingFeedback').innerHTML = ``;
    for (let i = 0; i < awaitFeedback.length; i++) {
        let toDo = awaitFeedback[i];
        let id = toDo['id'];
        let color = toDo['category']['color'];
        let category = toDo['category']['categoryName'];
        let title = toDo['title'];
        let description = toDo['description'];
        let subtasks = toDo['subtasks']['tasks'].length;
        let completedtasks = 0;
        for (let j = 0; j < toDo['subtasks']['tasks'].length; j++) {
            let task = toDo['subtasks']['tasks'][j];
            if (task['completed']) {
                completedtasks++
            }
        }
        let assignedIconToThree = assignedTo(toDo['assignedTo']['user']);
        let priority = toDo['priority'];
        document.getElementById('awaitingFeedback').innerHTML += toDoTemplate(id, color, category, title, description, subtasks, completedtasks, assignedIconToThree, priority)
    }
    document.getElementById('awaitingFeedback').innerHTML += addDragarea('awaitfeedback');
}

function renderDoneTasks() {
    document.getElementById('doneTasks').innerHTML = ``;
    for (let i = 0; i < doneTasks.length; i++) {
        let toDo = doneTasks[i];
        let id = toDo['id'];
        let color = toDo['category']['color'];
        let category = toDo['category']['categoryName'];
        let title = toDo['title'];
        let description = toDo['description'];
        let subtasks = toDo['subtasks']['tasks'].length;
        let completedtasks = 0;
        for (let j = 0; j < toDo['subtasks']['tasks'].length; j++) {
            let task = toDo['subtasks']['tasks'][j];
            if (task['completed']) {
                completedtasks++
            }
        }
        let assignedIconToThree = assignedTo(toDo['assignedTo']['user']);
        let priority = toDo['priority'];
        document.getElementById('doneTasks').innerHTML += toDoTemplate(id, color, category, title, description, subtasks, completedtasks, assignedIconToThree, priority)
    }
    document.getElementById('doneTasks').innerHTML += addDragarea('donetask');
}

function assignedTo(assignedTo) {
    if (assignedTo.length == 1) {
        return `<div class="name" style="background-color: ${assignedTo[0]['iconcolor']}">${assignedTo[0]['icon']}</div>`
    }
    if (assignedTo.length == 2) {
        return `<div class="name" style="background-color: ${assignedTo[0]['iconcolor']}">${assignedTo[0]['icon']}</div><div class="name" style="background-color: ${assignedTo[1]['iconcolor']}">${assignedTo[1]['icon']}</div>`
    }
    if (assignedTo.length == 3) {
        return `<div class="name" style="background-color: ${assignedTo[0]['iconcolor']}">${assignedTo[0]['icon']}</div><div class="name" style="background-color: ${assignedTo[1]['iconcolor']}">${assignedTo[1]['icon']}</div><div class="name" style="background-color: ${assignedTo[2]['iconcolor']}">${assignedTo[2]['icon']}</div>`
    } else {
        let number = assignedTo.length - 2
        return `<div class="name" style="background-color: ${assignedTo[0]['iconcolor']}">${assignedTo[0]['icon']}</div><div class="name" style="background-color: ${assignedTo[1]['iconcolor']}">${assignedTo[1]['icon']}</div><div class="number">+${number}</div>`
    }
}

function toDoTemplate(id, color, category, title, description, subtasks, completedtasks, assignedIconToThree, priority) {
    let width = completedtasks / subtasks * 100
    return `
    <div class="todo" draggable=true ondragstart="startDragging(${id})" onclick="openTask(${id})">
        <div class="category" style="background-color: ${color}">${category}</div>
        <div class="title">${title}</div>
        <div class="description">${description.slice(0, 50)}</div>
        <div class="subtaskbar">
            <div class="progress">
                <div class="progress-bar" style="width: ${width}%">
                </div>
            </div>${completedtasks}/${subtasks} Done
        </div>
        <div class="todofooter">
            <div class="assigned">${assignedIconToThree}
            </div>
            <img src="assets/img/${priority}.png" alt="${priority}">
        </div>
    </div>`
}

function addDragarea(id) {
    return `
    <div id="${id}" class="dragarea" ondrop="drop('${id}')" ondragover="allowDrop(event); highlight('${id}')" ondragleave="removeHighlight('${id}')"></div>
    `
}

function startDragging(id) {
    currentDraggedElement = id;
}

function allowDrop(ev) {
    ev.preventDefault();
}

async function drop(destination) {
    tasklist[currentDraggedElement]['progress'] = destination;
    await saveBoard();
    setTimeout(await initBoard, 100);
}

function highlight(id) {
    document.getElementById(id).classList.add('dragarea-highlight');
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('dragarea-highlight');
}

function taskPopup() {
    document.getElementById('Boardpopup').innerHTML = `
    <div w3-include-html="/assets/templates/add_task_mini.html"></div>
    `;
    includeHTML();
    initAddTaskPopup();
}

function openTask(id) {
    task = tasklist.filter(t => t['id'] == id);
    let category = task[0]['category']['categoryName'];
    let color = task[0]['category']['color'];
    let title = task[0]['title'];
    let description = task[0]['description'];
    let duedateunformated = JSON.stringify(task[0]['duedate']);
    let year = duedateunformated.slice(0, 4);
    let month = duedateunformated.slice(4, 6);
    let day = duedateunformated.slice(6);
    let duedate = day + '.' + month + '.' + year;
    let priority = task[0]['priority'];
    let assignedTo = task[0]['assignedTo'];
    document.getElementById('Boardpopup').innerHTML = taskformTemplate(category, color, title, description, duedate, priority, id);
    renderAssignedTo(assignedTo);
    renderSubTasks(id);
}

function closeBoardPopup() {
    document.getElementById('Boardpopup').innerHTML = '';
}

function findTask(id) {
    let search = document.getElementById(id).value;
    searchInTodos(search);
    searchInInProgress(search);
    searchInAwaitFeedback(search);
    searchInDoneTasks(search);
    rendersearchedTodos(searchTodos, 'toDos', 'todo');
    rendersearchedTodos(searchInProgress, 'inProgress', 'inprogresss');
    rendersearchedTodos(searchAwaitFeedback, 'awaitingFeedback', 'awaitfeedback');
    rendersearchedTodos(searchDoneTasks, 'doneTasks', 'donetask');
}

function searchInTodos(search) {
    searchTodos = [];
    for (let i = 0; i < todos.length; i++) {
        let todo = todos[i];
        if (todo['title'].includes(search)){
            searchTodos.push(todo)
        }else if (todo['description'].includes(search)){
            searchTodos.push(todo)
        }
    }
}

function searchInInProgress(search) {
    searchInProgress = [];
    for (let i = 0; i < inProgress.length; i++) {
        let todo = inProgress[i];
        if (todo['title'].includes(search)){
            searchInProgress.push(todo)
        }else if (todo['description'].includes(search)){
            searchInProgress.push(todo)
        }
    }
}

function searchInAwaitFeedback(search) {
    searchAwaitFeedback = [];
    for (let i = 0; i < awaitFeedback.length; i++) {
        let todo = awaitFeedback[i];
        if (todo['title'].includes(search)){
            searchAwaitFeedback.push(todo)
        }else if (todo['description'].includes(search)){
            searchAwaitFeedback.push(todo)
        }
    }
}

function searchInDoneTasks(search) {
    searchDoneTasks = [];
    for (let i = 0; i < doneTasks.length; i++) {
        let todo = doneTasks[i];
        if (todo['title'].includes(search)){
            searchDoneTasks.push(todo)
        }else if (todo['description'].includes(search)){
            searchDoneTasks.push(todo)
        }
    }
}

function rendersearchedTodos(array, id1, id2) {
    document.getElementById(id1).innerHTML = ``;
    for (let i = 0; i < array.length; i++) {
        let toDo = array[i];
        let id = toDo['id'];
        let color = toDo['category']['color'];
        let category = toDo['category']['categoryName'];
        let title = toDo['title'];
        let description = toDo['description'];
        let subtasks = toDo['subtasks']['tasks'].length;
        let completedtasks = 0;
        for (let j = 0; j < toDo['subtasks']['tasks'].length; j++) {
            let task = toDo['subtasks']['tasks'][j];
            if (task['completed']) {
                completedtasks++
            }
        }
        let assignedIconToThree = assignedTo(toDo['assignedTo']['user']);
        let priority = toDo['priority'];
        document.getElementById(id1).innerHTML += toDoTemplate(id, color, category, title, description, subtasks, completedtasks, assignedIconToThree, priority)
    }
    document.getElementById(id1).innerHTML += addDragarea(id2);
}