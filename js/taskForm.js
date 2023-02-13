/**
 * Renders the assigned users
 * @param {array} assignedTo Array of assigned persons
 */
function renderAssignedTo(assignedTo) {
  document.getElementById("assignedto").innerHTML = "";
  for (let i = 0; i < assignedTo["user"].length; i++) {
    let user = assignedTo["user"][i];
    document.getElementById("assignedto").innerHTML += `
        <div class="user"><div class="round-icon-name" style="background-color: ${user["iconcolor"]}">${user["icon"]}</div><div class="username">${user["name"]}</div></div>
        `;
  }
}

/**
 * Renders subtasks to detail-view
 * @param {integer} id Id of selected task
 */
function renderSubTasks(id) {
  document.getElementById("subtasks").innerHTML = ``;
  for (let i = 0; i < currentUser.tasks[id]["subtasks"]["tasks"].length; i++) {
    let subtask = currentUser.tasks[id]["subtasks"]["tasks"][i];
    if (subtask["completed"] == false) {
      document.getElementById("subtasks").innerHTML += `
        <div class="subtask"><input type="checkbox" id="${i}" onchange="taskStatusChange(${i}, ${id})"><label for="${i}">${subtask["task"]}</label></div>
        `;
    } else {
      document.getElementById("subtasks").innerHTML += `
        <div class="subtask"><input type="checkbox" id="${i}" onchange="taskStatusChange(${i}, ${id})" checked><label for="${i}">${subtask["task"]}</label></div>
        `;
    }
  }
}

/**
 * Renders the editable-view of the selected task
 * @param {integer} id Id of selected task
 */
async function renderEditTask(id) {
  task = currentUser.tasks.filter((t) => t["id"] == id);
  contactsForCurrentTask = task[0]["assignedTo"]["user"];
  let title = task[0]["title"];
  let description = task[0]["description"];
  let duedateunformated = task[0]["duedate"].toString();
  let year = duedateunformated.slice(0, 4);
  let month = duedateunformated.slice(4, 6);
  let day = duedateunformated.slice(6);
  let duedate = year + "-" + month + "-" + day;
  let priority = task[0]["priority"];
  let subtasks = task[0]["subtasks"]["tasks"];
  document.getElementById("Boardpopup").innerHTML = editTaskTemplate(id);
  document.getElementById("titleinput").value = title;
  document.getElementById("descriptioninput").value = description;
  document.getElementById("due-date").value = duedate;
  loadSubtasks(subtasks, id);
  loadAssignetPersons();
  selectPrio(priority);
  checkAndAddTOAssignedToContacts();
}

/**
 * Renders subtasks with edit buttons
 * @param {array} subtasks Array of added subtasks
 * @param {integer} id Id of selected task
 */
function loadSubtasks(subtasks, id) {
  document.getElementById("subtasks").innerHTML = "";
  for (let i = 0; i < subtasks.length; i++) {
    let subtask = subtasks[i];
    document.getElementById("subtasks").innerHTML += templateEditabelSubtask(subtask["task"], i, id);
  }
}

/**
 * Adds new subtask to selected task
 * @param {integer} id Id of selected task
 */
async function addNewSubask(id) {
  let newtask = document.getElementById("newsubtask").value;
  currentUser.tasks[id]["subtasks"]["tasks"].push({ task: newtask, completed: false });
  document.getElementById("newsubtask").value = "";
  await backend.setItem("users", JSON.stringify(users));
  await setTimeout(loadAll, 100);
  renderBoard();
  task = currentUser.tasks.filter((t) => t["id"] == id);
  let subtasks = task[0]["subtasks"]["tasks"];
  loadSubtasks(subtasks, id);
}

/**
 * Deletes subtask from selected task
 * @param {integer} index Index of selected subtask
 * @param {integer} id Id of selected task
 */
async function deleteSubtask(index, id) {
  task = currentUser.tasks.filter((t) => t["id"] == id);
  task[0]["subtasks"]["tasks"].splice(index, 1);
  let subtasks = task[0]["subtasks"]["tasks"];
  await backend.setItem("users", JSON.stringify(users));
  loadAll();
  renderBoard();
  loadSubtasks(subtasks, id);
}

/**
 * Adds inputfield for selected subtask for editing
 * @param {integer} index Index of selected subtask
 * @param {integer} id Id of selected task
 */
function editSubtask(index, id) {
  task = currentUser.tasks.filter((t) => t["id"] == id);
  let subtask = task[0]["subtasks"]["tasks"][index];
  document.getElementById(`subtask${index}`).innerHTML = templateEditabelSubtaskInput(subtask["task"], index, id);
}

/**
 * Saves the changes of the selected subtask to the selected task
 * @param {integer} index Index of selected subtask
 * @param {integer} id Id of selected task
 */
async function saveSubEdit(index, id) {
  newsubtask = document.getElementById(`subedit${index}`).value;
  currentUser.tasks[id]["subtasks"]["tasks"][index]["task"] = newsubtask;
  await backend.setItem("users", JSON.stringify(users));
  setTimeout(loadAll, 100);
  renderBoard();
  document.getElementById(`subtask${index}`).innerHTML = `
    <div><p>${newsubtask}</p></div>
    <div>
        <button onclick="deleteSubtask(${index}, ${id})">Delete</button>
        <button onclick="editSubtask(${index}, ${id})">Edit</button>
    </div>
    `;
}

/**
 * Cancels the editing of selected subtask
 * @param {integer} index Index of selected subtask
 * @param {integer} id Id of selected task
 */
function cancelSubEdit(index, id) {
  task = currentUser.tasks.filter((t) => t["id"] == id);
  let subtask = task[0]["subtasks"]["tasks"][index];
  document.getElementById(`subtask${index}`).innerHTML = `
    <div><p>${subtask["task"]}</p></div>
    <div>
        <button onclick="deleteSubtask(${index}, ${id})">Delete</button>
        <button onclick="editSubtask(${index}, ${id})">Edit</button>
    </div>
    `;
}

/**
 * Changes the completed status of selected subtask
 * @param {integer} task Index of selected subtask
 * @param {integer} id Id of selected task
 */
async function taskStatusChange(task, id) {
  if (currentUser.tasks[id]["subtasks"]["tasks"][task]["completed"] == true) {
    currentUser.tasks[id]["subtasks"]["tasks"][task]["completed"] = false;
  } else {
    currentUser.tasks[id]["subtasks"]["tasks"][task]["completed"] = true;
  }
  await backend.setItem("users", JSON.stringify(users));
  renderSubTasks(id);
  setTimeout(await initBoard, 50);
}

/**
 * Changes priority to selected priority
 * @param {string} prio Name of selectet priority
 */
function selectPrio(prio) {
  if (prio == "urgent") {
    setPrioUrgent();
  }
  if (prio == "medium") {
    setPrioMedium();
  }
  if (prio == "low") {
    setPrioLow();
  }
  selectedPrio = prio;
}

/**
 * Changes priority to urgent
 */
function setPrioUrgent() {
  document.getElementById("urgent").classList.add("urgent");
  document.getElementById("medium").classList.remove("medium");
  document.getElementById("low").classList.remove("low");
}

/**
 * Changes priority to medium
 */
function setPrioMedium() {
  document.getElementById("urgent").classList.remove("urgent");
  document.getElementById("medium").classList.add("medium");
  document.getElementById("low").classList.remove("low");
}

/**
 * Changes priority to low
 */
function setPrioLow() {
  document.getElementById("urgent").classList.remove("urgent");
  document.getElementById("medium").classList.remove("medium");
  document.getElementById("low").classList.add("low");
}

/**
 * Renders the assigned persons of the task
 * @param {integer} id Id of selected task
 */
function loadAssignetPersons() {
  document.getElementById("assigned-to-icons-section").innerHTML = ``;
  for (let i = 0; i < contactsForCurrentTask.length; i++) {
    let assignetperson = contactsForCurrentTask[i];
    document.getElementById("assigned-to-icons-section").innerHTML += `<div class="round-icon-name icons-add-task" style="background-color: 
        ${assignetperson["iconcolor"]}">${assignetperson["icon"]}</div>`;
  }
}

/**
 * Checks at which position number of the array contacts a contact of the current task is and if the number isn´t in the array assignedToContacts, it gets pushed
 * in it.
 */

function checkAndAddTOAssignedToContacts() {
  for (let a = 0; a < currentUser.contacts.length; a++) {
    let contact = currentUser.contacts[a];
    if (contactsForCurrentTask[0]["name"] === contact["name"]) {
      assignedToContacts.push(a);
    }
  }
}

/**
 * @param {number} a is the iterationen number from the array contacts
 * @param {array} assignedToContacts
 * @returns
 */

function isValueInArray(a, assignedToContacts) {
  return assignedToContacts.includes(a);
}

/**
 * Changes the assign-status of selected contact
 * @param {string} name Name of selectet contact
 * @param {string} icon Icon of selected contact
 * @param {string} color Iconcolor of selected contact
 * @param {integer} id Id of selected task
 */
function assignChange(name, icon, color, id) {
  let contact = { name: name, icon: icon, iconcolor: color };
  let index = indexOfAssigned(contact);
  if (checkOnAssignedContacts(contact["icon"]) == true) {
    assignetContactsTemp.splice(index, 1);
  } else {
    assignetContactsTemp.push({ name: name, icon: icon, iconcolor: color });
  }
  loadAssignetPersons(id);
}

/**
 * Creates new contact based on the email
 * @param {integer} id Id of selected task
 */
function addNewContact(id) {
  assignNewPerson();
  showAddcontact();
  document.getElementById("assign-container").innerHTML = templateOfClosedDropdownAssignTo(id);
  loadAssignetPersons();
}

/**
 * Creates a random colorcode
 * @returns Random generated color
 */
function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

/**
 * Checks array for containing a spesific contact
 * @param {string} contact Name of contact
 * @returns status of containing the contact
 */
function checkOnContact(contact) {
  for (let i = 0; i < contacts.length; i++) {
    let name = contacts[i]["name"];
    if (name == contact) {
      return true;
    }
  }
  return false;
}

/**
 * Checks array for containing a spesific contact
 * @param {string} contact Name of contact
 * @returns status of containing the contact
 */
function checkOnAssignedContacts(contact) {
  for (let i = 0; i < assignetContactsTemp.length; i++) {
    let check = assignetContactsTemp[i]["icon"];
    if (check == contact) {
      return true;
    }
  }
  return false;
}

/**
 * Checks position in array of a spesific contact
 * @param {string} icon Icon of contact
 * @returns position in array of contact
 */
function indexOfAssigned(icon) {
  for (let i = 0; i < assignetContactsTemp.length; i++) {
    let name = assignetContactsTemp[i]["icon"];
    if (name == icon) {
      return i;
    }
  }
}

/**
 * Saves changes of selected task
 * @param {integer} id Id of selected task
 */
async function editTask(id) {
  formValidation = true;
  let taskInputTitle = document.getElementById("titleinput").value;
  let description = document.getElementById("descriptioninput").value;
  convertDate();
  checkInput("title", taskInputTitle);
  checkInput("description", description);
  checkDueDate();
  checkAssigned();
  if (formValidation) {
    assignedToContactsForCurrentTask();
    currentUser.tasks[id]["title"] = taskInputTitle;
    currentUser.tasks[id]["description"] = description;
    currentUser.tasks[id]["assignedTo"]["user"] = contactsForCurrentTask;
    currentUser.tasks[id]["duedate"] = date;
    currentUser.tasks[id]["priority"] = selectedPrio;
    await backend.setItem("users", JSON.stringify(users));
    setTimeout(await initBoard, 100);
    closeBoardPopup();
    setBack();
  }
}

function setBack() {
  contactsForCurrentTask = [];
  assignedToContacts = [];
}
