let todos = [];
let inProgress = [];
let awaitFeedback = [];
let doneTasks = [];
let currentDraggedElement;
let assignetContacts = [];
let assignetContactsTemp = [];
let selectedPrio = [];
let searchTodos = [];
let searchInProgress = [];
let searchAwaitFeedback = [];
let searchDoneTasks = [];

/**
 * Initialazing of the board. Loads the JSON stored in the backend. Checks the currentUser and filters the tasks in the processing steps.
 */

async function initBoard() {
  await initGeneral();
  loadAll();
  renderBoard();
  setTimeout(boardPage, 500);
}

/**
 * The background color of the sidebar gets darker in the area of the summary button.
 */

function boardPage() {
  document.getElementById("sidebar_board_mobile").classList.add("background-color");
  document.getElementById("sidebar_board").classList.add("background-color");
}

/**
 * Loads the tasks an orders them in the processing steps.
 */

function loadAll() {
  loadTodos();
  loadInProgress();
  loadAwaitFeedback();
  loadDoneTasks();
}

/**
 * Filters for progress "todo".
 */

function loadTodos() {
  todos = currentUser.tasks.filter((t) => t["progress"] == "todo");
}

/**
 * Filters for progress "in progress".
 */

function loadInProgress() {
  inProgress = currentUser.tasks.filter((t) => t["progress"] == "inprogress");
}

/**
 * Filters for progress "awaiting feedback".
 */

function loadAwaitFeedback() {
  awaitFeedback = currentUser.tasks.filter((t) => t["progress"] == "awaitfeedback");
}

/**
 * Filters for progress "done task".
 */

function loadDoneTasks() {
  doneTasks = currentUser.tasks.filter((t) => t["progress"] == "donetask");
}

/**
 * Loads the render functions for the board tasks.
 */

function renderBoard() {
  renderTodos("toDos", "todo", todos, "inprogress", "todo");
  renderTodos("inProgress", "inprogress", inProgress, "awaitfeedback", "todo");
  renderTodos("awaitingFeedback", "awaitfeedback", awaitFeedback, "donetask", "inprogress");
  renderTodos("doneTasks", "donetask", doneTasks, "donetask", "awaitfeedback");
}

/**
 * Renders the tasks for the board.
 * @param {string} boxid Id of the div container.
 * @param {string} progression Name of the progression.
 * @param {array} array of the progression.
 */

function renderTodos(boxid, progression, array, next, previus) {
  document.getElementById(`${boxid}`).innerHTML = ``;
  for (let i = 0; i < array.length; i++) {
    let toDo = array[i];
    let id = toDo["id"];
    let color = toDo["category"]["color"];
    let category = toDo["category"]["categoryName"];
    let title = toDo["title"];
    let description = toDo["description"];
    let subtasks = toDo["subtasks"]["tasks"].length;
    let completedtasks = 0;
    for (let j = 0; j < toDo["subtasks"]["tasks"].length; j++) {
      let task = toDo["subtasks"]["tasks"][j];
      if (task["completed"]) {
        completedtasks++;
      }
    }
    let assignedIconToThree = assignedTo(toDo["assignedTo"]["user"]);
    let priority = toDo["priority"];
    document.getElementById(`${boxid}`).innerHTML += toDoTemplate(id, color, category, title, description, subtasks, completedtasks, assignedIconToThree, priority, next, previus);
  }
  document.getElementById(`${boxid}`).innerHTML += addDragarea(progression);
}

/**
 * Shortening and returning the template of assigned users.
 * @param {array} assignedTo Array of assigned users.
 * @returns Shortent template of assignet users.
 */

function assignedTo(assignedTo) {
  if (assignedTo.length == 0) {
    return noAssignedPersonsTemplate();
  }
  if (assignedTo.length == 1) {
    return oneAssignedPersonsTemplate(assignedTo);
  }
  if (assignedTo.length == 2) {
    return twoAssignedPersonsTemplate(assignedTo);
  }
  if (assignedTo.length == 3) {
    return threeAssignedPersonsTemplate(assignedTo);
  } else {
    return moreAssignedPersonsTemplate(assignedTo);
  }
}

/**
 * Moves a task to a progress destination.
 * @param {number} id Id from selected task.
 * @param {string} destination Name of the progress destination.
 */

async function moveTask(id, destination) {
  currentUser.tasks[id].progress = destination;
  await backend.setItem("users", JSON.stringify(users));
  setTimeout(await initBoard, 200);
}

/**
 *
 * @param {number} id of the task which is dragged.
 */

function startDragging(id) {
  currentDraggedElement = id;
}

/**
 * Allows the drop event.
 */

function allowDrop(ev) {
  ev.preventDefault();
}

/**
 * Moves a task to a progress destination via drag and drop.
 * @param {string} destination Name of the progress destination.
 */

async function drop(destination) {
  currentUser.tasks[currentDraggedElement].progress = destination;
  await backend.setItem("users", JSON.stringify(users));
  setTimeout(await initBoard, 200);
}

/**
 * Highlights the droparea when hovering over it
 * @param {string} id of the dragarea.
 */

function highlight(id) {
  document.getElementById(id).classList.add("dragarea-highlight");
}

/**
 * Removes the highlighted droparea.
 * @param {string} id of the dragarea.
 */

function removeHighlight(id) {
  document.getElementById(id).classList.remove("dragarea-highlight");
}

/**
 * Opens the add task Popup.
 */

function taskPopup(progressStatus) {
  document.getElementById("Boardpopup").innerHTML = addTaskPopupTemplate(progressStatus);
  includeHTML();
  document.getElementById("Boardpopup").classList.remove("d-none");
  document.getElementById("Boardpopup").style.overflow = "scroll";
  initialize();
}

/**
 * Opens the detail-view of selected task.
 * @param {number} id Id of the task.
 */

function openTask(id) {
  document.getElementById("Boardpopup").classList.remove("d-none");
  task = currentUser.tasks.filter((t) => t["id"] == id);
  let category = task[0]["category"]["categoryName"];
  let color = task[0]["category"]["color"];
  let title = task[0]["title"];
  let description = task[0]["description"];
  let duedate = dueDate(task);
  let priority = task[0]["priority"];
  let assignedTo = task[0]["assignedTo"];
  document.getElementById("Boardpopup").innerHTML = taskformTemplate(category, color, title, description, duedate, priority, id);
  renderAssignedTo(assignedTo);
  renderSubTasks(id);
}

/**
 * Opens the filter and render functions of the search.
 * @param {number} id Id of the task
 */

function findTask(id) {
  let search = document.getElementById(id).value.toLowerCase();
  searchInTodos(search);
  searchInInProgress(search);
  searchInAwaitFeedback(search);
  searchInDoneTasks(search);
  rendersearchedTodos(searchTodos, "toDos", "todo", "inprogress", "todo");
  rendersearchedTodos(searchInProgress, "inProgress", "inprogress", "awaitfeedback", "todo");
  rendersearchedTodos(searchAwaitFeedback, "awaitingFeedback", "awaitfeedback", "donetask", "inprogress");
  rendersearchedTodos(searchDoneTasks, "doneTasks", "donetask", "donetask", "awaitfeedback");
}

/**
 * Search function for the todo tasks.
 * @param {string} search input of the searchbar.
 */

function searchInTodos(search) {
  searchTodos = [];
  for (let i = 0; i < todos.length; i++) {
    let todo = todos[i];
    if (todo["title"].toLowerCase().includes(search)) {
      searchTodos.push(todo);
    } else if (todo["description"].toLowerCase().includes(search)) {
      searchTodos.push(todo);
    }
  }
}

/**
 * Search function for the in progress tasks.
 * @param {string} search input of the searchbar.
 */

function searchInInProgress(search) {
  searchInProgress = [];
  for (let i = 0; i < inProgress.length; i++) {
    let todo = inProgress[i];
    if (todo["title"].toLowerCase().includes(search)) {
      searchInProgress.push(todo);
    } else if (todo["description"].toLowerCase().includes(search)) {
      searchInProgress.push(todo);
    }
  }
}

/**
 * Search function for the in await feedback tasks.
 * @param {string} search input of the searchbar.
 */

function searchInAwaitFeedback(search) {
  searchAwaitFeedback = [];
  for (let i = 0; i < awaitFeedback.length; i++) {
    let todo = awaitFeedback[i];
    if (todo["title"].toLowerCase().includes(search)) {
      searchAwaitFeedback.push(todo);
    } else if (todo["description"].toLowerCase().includes(search)) {
      searchAwaitFeedback.push(todo);
    }
  }
}

/**
 * Search function for the done tasks.
 * @param {string} search input of the searchbar.
 */

function searchInDoneTasks(search) {
  searchDoneTasks = [];
  for (let i = 0; i < doneTasks.length; i++) {
    let todo = doneTasks[i];
    if (todo["title"].toLowerCase().includes(search)) {
      searchDoneTasks.push(todo);
    } else if (todo["description"].toLowerCase().includes(search)) {
      searchDoneTasks.push(todo);
    }
  }
}

/**
 * Renders the found tasks of the four processing steps.
 * @param {array} array Searched progress array.
 * @param {string} id1 Id of searched progress.
 * @param {string} id2 Id of dragarea progress.
 */

function rendersearchedTodos(array, id1, id2, next, previus) {
  document.getElementById(id1).innerHTML = ``;
  for (let i = 0; i < array.length; i++) {
    let toDo = array[i];
    let id = toDo["id"];
    let color = toDo["category"]["color"];
    let category = toDo["category"]["categoryName"];
    let title = toDo["title"];
    let description = toDo["description"];
    let subtasks = toDo["subtasks"]["tasks"].length;
    let completedtasks = 0;
    for (let j = 0; j < toDo["subtasks"]["tasks"].length; j++) {
      let task = toDo["subtasks"]["tasks"][j];
      if (task["completed"]) {
        completedtasks++;
      }
    }
    let assignedIconToThree = assignedTo(toDo["assignedTo"]["user"]);
    let priority = toDo["priority"];
    document.getElementById(id1).innerHTML += toDoTemplate(id, color, category, title, description, subtasks, completedtasks, assignedIconToThree, priority, next, previus);
  }
  document.getElementById(id1).innerHTML += addDragarea(id2);
}
