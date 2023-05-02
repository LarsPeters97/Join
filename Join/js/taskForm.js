/**
 * Renders the assigned users.
 * @param {array} assignedTo of assigned persons.
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
 * Renders subtasks for the detail-view.
 * @param {number} id Id of selected task.
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
 * Renders the editable-view of the selected task.
 * @param {number} id of selected task.
 */

async function renderEditTask(id) {
  task = currentUser.tasks.filter((t) => t["id"] == id);
  contactsForCurrentTask = task[0]["assignedTo"]["user"];
  let title = task[0]["title"];
  let description = task[0]["description"];
  let duedate = dueDateTheOtherWayAround(task);
  let priority = task[0]["priority"];
  let subtasks = task[0]["subtasks"]["tasks"];
  document.getElementById("Boardpopup").innerHTML = editTaskTemplate(id);
  contentOfTheFieldsIsFilled(title, description, duedate, priority, subtasks, id);
}

/**
 * The fields get the content they had until then.
 * @param {string} title that the task has had so far.
 * @param {string} description that the task has had so far.
 * @param {string} duedate that the task has had so far.
 * @param {string} priority that the task has had so far.
 * @param {array} subtasks that the task has had so far.
 * @param {number} id of the task in the array of the current user tasks.
 */

function contentOfTheFieldsIsFilled(title, description, duedate, priority, subtasks, id) {
  document.getElementById("titleinput").value = title;
  document.getElementById("descriptioninput").value = description;
  document.getElementById("due-date").value = duedate;
  selectPrio(priority);
  loadAssignedPersons();
  checkAndAddTOAssignedToContacts();
  loadSubtasks(subtasks, id);
}

/**
 * @param {object} task which gets opened from the currentUser tasks array.
 * @returns the formatted date in YYYY-MM-DD.
 */

function dueDateTheOtherWayAround(task) {
  let duedateunformated = task[0]["duedate"].toString();
  let year = duedateunformated.slice(0, 4);
  let month = duedateunformated.slice(4, 6);
  let day = duedateunformated.slice(6);
  return `${year}-${month}-${day}`;
}

/**
 * Renders subtasks with edit buttons edit annd delete.
 * @param {array} subtasks of added subtasks.
 * @param {number} id of selected task.
 */

function loadSubtasks(subtasks, id) {
  document.getElementById("subtasks").innerHTML = "";
  for (let i = 0; i < subtasks.length; i++) {
    let subtask = subtasks[i];
    document.getElementById("subtasks").innerHTML += templateEditabelSubtask(subtask["task"], i, id);
  }
}

/**
 * Adds a new subtask to selected task.
 * @param {number} id of selected task.
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
 * Deletes a subtask from selected task.
 * @param {number} index of selected subtask.
 * @param {number} id of selected task.
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
 * Adds inputfield for selected subtask for editing.
 * @param {number} index of selected subtask.
 * @param {number} id of selected task.
 */

function editSubtask(index, id) {
  task = currentUser.tasks.filter((t) => t["id"] == id);
  let subtask = task[0]["subtasks"]["tasks"][index];
  document.getElementById(`subtask${index}`).innerHTML = templateEditabelSubtaskInput(subtask["task"], index, id);
}

/**
 * Saves the changes of the selected subtask to the selected task.
 * @param {number} index of selected subtask.
 * @param {number} id of selected task.
 */

async function saveSubEdit(index, id) {
  newsubtask = document.getElementById(`subedit${index}`).value;
  currentUser.tasks[id]["subtasks"]["tasks"][index]["task"] = newsubtask;
  await backend.setItem("users", JSON.stringify(users));
  setTimeout(loadAll, 100);
  renderBoard();
  document.getElementById(`subtask${index}`).innerHTML = templateEditabelSubtask(newsubtask, index, id);
}

/**
 * Cancels the editing of selected subtask.
 * @param {number} index of selected subtask.
 * @param {number} id of selected task.
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
 * Changes the completed status of selected subtask.
 * @param {number} task of selected subtask.
 * @param {number} id of selected task.
 */

async function taskStatusChange(task, id) {
  currentUser.tasks[id]["subtasks"]["tasks"][task]["completed"] = !currentUser.tasks[id]["subtasks"]["tasks"][task]["completed"];
  await backend.setItem("users", JSON.stringify(users));
  renderSubTasks(id);
  setTimeout(await initBoard, 50);
}

/**
 * Changes priority to selected priority.
 * @param {string} prio name of selectet priority.
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
 * Changes priority to urgent.
 */

function setPrioUrgent() {
  document.getElementById("urgent").classList.add("urgent");
  document.getElementById("medium").classList.remove("medium");
  document.getElementById("low").classList.remove("low");
}

/**
 * Changes priority to medium.
 */

function setPrioMedium() {
  document.getElementById("urgent").classList.remove("urgent");
  document.getElementById("medium").classList.add("medium");
  document.getElementById("low").classList.remove("low");
}

/**
 * Changes priority to low.
 */

function setPrioLow() {
  document.getElementById("urgent").classList.remove("urgent");
  document.getElementById("medium").classList.remove("medium");
  document.getElementById("low").classList.add("low");
}

/**
 * Renders the assigned persons of the task.
 * @param {number} id of selected task.
 */

function loadAssignedPersons() {
  document.getElementById("assigned-to-icons-section").innerHTML = ``;
  for (let i = 0; i < contactsForCurrentTask.length; i++) {
    let assignetperson = contactsForCurrentTask[i];
    document.getElementById("assigned-to-icons-section").innerHTML += `<div class="round-icon-name icons-add-task" style="background-color: 
        ${assignetperson["iconcolor"]}">${assignetperson["icon"]}</div>`;
  }
}

/**
 * Checks at which position number of the array contacts a contact of the current task is and if the number isn´t in the array assignedToContacts,
 * it gets pushed in it.
 */

function checkAndAddTOAssignedToContacts() {
  assignedToContacts = [];
  const namesOfCurrentUserContacts = currentUser.contacts.map((fullName) => {
    return fullName.name;
  });
  for (let x = 0; x < contactsForCurrentTask.length; x++) {
    let currentTaskName = contactsForCurrentTask[x].name;
    let indexPostition = namesOfCurrentUserContacts.indexOf(currentTaskName);
    assignedToContacts.push(indexPostition);
  }
}

/**
 * Filtering the array for the value in progress.
 */

function loadInProgress() {
  inProgress = currentUser.tasks.filter((t) => t["progress"] == "inprogress");
  document.getElementById("amount-progress").innerHTML = `<b>${inProgress.length}</b>`;
}

/**
 * Changes the assign-status of selected contact.
 * @param {string} name of selectet contact.
 * @param {string} icon of selected contact.
 * @param {string} color of selected contact.
 * @param {number} id of selected task.
 */

function assignChange(name, icon, color, id) {
  let contact = { name: name, icon: icon, iconcolor: color };
  let index = indexOfAssigned(contact);
  if (checkOnAssignedContacts(contact["icon"]) == true) {
    assignetContactsTemp.splice(index, 1);
  } else {
    assignetContactsTemp.push({ name: name, icon: icon, iconcolor: color });
  }
  loadAssignedPersons(id);
}

/**
 * Checks array for containing a spesific contact.
 * @param {string} contact name of contact.
 * @returns status of containing the contact.
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
 * Checks array for containing a specific contact.
 * @param {string} contact Name of contact.
 * @returns status of containing the contact.
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
 * Checks position in array of a spesific contact.
 * @param {string} icon of contact.
 * @returns position in array of contact.
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
 * Saves changes of selected task.
 * @param {number} id of selected task.
 */

async function editTask(id) {
  formValidation = true;
  let taskInputTitle = document.getElementById("titleinput").value;
  let description = document.getElementById("descriptioninput").value;
  performValidationEditTask(taskInputTitle, description);
  if (formValidation) {
    assignedToContactsForCurrentTask();
    newValuesForEditedTask(id, taskInputTitle, description);
    await backend.setItem("users", JSON.stringify(users));
    setTimeout(await initBoard, 100);
    closesPopupAddTask();
    setBack();
  }
}

/**
 * The edited task gets the new edited values.
 * @param {number} id of the edited task from the current user array.
 * @param {string} taskInputTitle of the edited task.
 * @param {string} description of the edited task.
 */

function newValuesForEditedTask(id, taskInputTitle, description) {
  currentUser.tasks[id]["title"] = taskInputTitle;
  currentUser.tasks[id]["description"] = description;
  currentUser.tasks[id]["assignedTo"]["user"] = contactsForCurrentTask;
  currentUser.tasks[id]["duedate"] = date;
  currentUser.tasks[id]["priority"] = selectedPrio;
}

/**
 * Performs validation of the edit task fields and if a default is not met there, the boolean variable is set to false.
 * @param {string} taskInputTitle is the entering title of the task.
 * @param {string} description is the entering description of the task.
 */

function performValidationEditTask(taskInputTitle, description) {
  convertDate();
  checkInput("title", taskInputTitle);
  checkInput("description", description);
  checkDueDate();
  checkAssigned();
}

/**
 * The arrays for the assigned contacts are emptied.
 */

function setBack() {
  contactsForCurrentTask = [];
  assignedToContacts = [];
}
