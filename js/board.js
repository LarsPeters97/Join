let tasklist = [{
    'progress': 'todo',
    'id': 0,
    'category': 'Design',
    'title': 'Website redesign',
    'description': 'lorem ipsum',
    'subtasks': ['lorem ipsum', 'lorem ipsum duo'],
    'completedtasks': ['lorem ipsum'],
    'assignedToIco': ['me', 'MK'],
    'assignetTo': ['me', 'Marcel Küpper'],
    'priority': 'high',
}];
let todos = [];
let inProgress = [];
let awaitFeedback = [];
let doneTasks = [];
let currentDraggedElement;

async function initBoard() {
    await loadAll()
    renderBoard();
}

async function loadAll(){
    /**await loadTasklist()*/
    loadTodos();
    loadInProgress();
    loadAwaitFeedback();
    loadDoneTasks();
}

async function save(){

}

async function loadTasklist(){
    
}

function loadTodos(){
    todos = tasklist.filter(t => t['progress'] == 'todo');
}

function loadInProgress(){
    inProgress = tasklist.filter(t => t['progress'] == 'inprogresss');
}

function loadAwaitFeedback(){
    awaitFeedback = tasklist.filter(t => t['progress'] == 'awaitfeedback');
}

function loadDoneTasks() {
    doneTasks = tasklist.filter(t => t['progress'] == 'donetask');
}

function renderBoard(){
    renderTodos()
    renderInProgress()
    renderAwaitFeedback()
    renderDoneTasks()
}

function renderTodos(){
    document.getElementById('toDos').innerHTML = ``;
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
        document.getElementById('toDos').innerHTML += toDoTemplate(id, category, title, description, subtasks, completedtasks, assignedIconToThree, priority)
    }
    document.getElementById('toDos').innerHTML += addDragarea('todo');
}

function renderInProgress(){
    document.getElementById('inProgress').innerHTML = ``;
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
        document.getElementById('inProgress').innerHTML += toDoTemplate(id, category, title, description, subtasks, completedtasks, assignedIconToThree, priority)
    }
    document.getElementById('inProgress').innerHTML += addDragarea('inprogresss');
}

function renderAwaitFeedback(){
    document.getElementById('awaitingFeedback').innerHTML = ``;
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
        document.getElementById('awaitingFeedback').innerHTML += toDoTemplate(id, category, title, description, subtasks, completedtasks, assignedIconToThree, priority)
    }
    document.getElementById('awaitingFeedback').innerHTML += addDragarea('awaitfeedback');
}

function renderDoneTasks(){
    document.getElementById('doneTasks').innerHTML = ``;
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
        document.getElementById('doneTasks').innerHTML += toDoTemplate(id, category, title, description, subtasks, completedtasks, assignedIconToThree, priority)
    }
    document.getElementById('doneTasks').innerHTML += addDragarea('donetask');
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
    return `
    <div class="todo" draggable=true ondragstart="startDragging(${id})">
        <div class="category${category}">${category}</div>
        <div class="title">${title}</div>
        <div class="description">${description}</div>
        <div class="subtaskbar">${completedtasks}/${subtasks} Done</div>
        <div class="todofooter"><div>${assignedIconToThree}</div><div>${priority}</div></div>
    </div>`
}

function addDragarea(id){
    return `
    <div id="${id}" class="dragarea" ondrop="drop('${id}')" ondragover="allowDrop(event); highlight('${id}')" ondragleave="removeHighlight('${id}')"></div>
    `
}

function startDragging(id){
    currentDraggedElement = id;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drop(destination){
    tasklist[currentDraggedElement]['progress'] = destination;
    /**save();*/
    loadAll();
    renderBoard();
}

function highlight(id){
    document.getElementById(id).classList.add('dragarea-highlight');
}

function removeHighlight(id){
    document.getElementById(id).classList.remove('dragarea-highlight');
}