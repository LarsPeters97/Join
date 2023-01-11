/**
 * Gets contacts for further rendering
 */
async function loadContactsforTasks() {
    setURL("https://gruppe-397.developerakademie.net/smallest_backend_ever");
    await downloadFromServer();
    contacts = JSON.parse(backend.getItem("contacts")) || [];
}

function taskformTemplate(category, color, title, description, duedate, priority, id) {
    return `
<div class="background" onclick="closeBoardPopup()">
</div>
    <div class="taskform">
        <div>
            <div class="category" style="background-color: ${color}">${category}</div>
            <h2>${title}</h2>
            <p>${description}</p>
            <div class="duedate"><b>Due date:</b> ${duedate}</div>
            <div class="priority"><b>Priority:</b><div class="prioicon ${priority}">${priority}<img src="assets/img/${priority}.svg"></div></div>
            <div class="subtasks"><b>Subtasks:</b></div>
            <div class="subtaskwindow" id="subtasks"></div>
            <div class="assignedto"><b>Assigned To:</b>
                <div id="assignedto"></div>
            </div>
        </div>
            <div class="close" onclick="closeBoardPopup()">x</div>
            <div class="edit" onclick="renderEditTask(${id})"><img src="./assets/img/edit-button.png" alt="edit"></div>
    </div>`;
}

/**
 * Renders the assigned users
 * @param {array} assignedTo Array of assigned persons
 */
function renderAssignedTo(assignedTo) {
    for (let i = 0; i < assignedTo['user'].length; i++) {
        let user = assignedTo['user'][i];
        document.getElementById('assignedto').innerHTML += `
        <div class="user"><div class="name" style="background-color: ${user['iconcolor']}">${user['icon']}</div>${user['name']}</div>
        `;
    };
}

/**
 * Renders subtasks to detail-view
 * @param {integer} id Id of selected task
 */
function renderSubTasks(id) {
    document.getElementById('subtasks').innerHTML = ``;
    for (let i = 0; i < tasklist[id]['subtasks']['tasks'].length; i++) {
        let subtask = tasklist[id]['subtasks']['tasks'][i];
        if (subtask['completed'] == false) {
            document.getElementById('subtasks').innerHTML += `
        <div class="subtask"><input type="checkbox" id="${i}" onchange="taskStatusChange(${i}, ${id})"><label for="${i}">${subtask['task']}</label></div>
        `;
        } else {
            document.getElementById('subtasks').innerHTML += `
        <div class="subtask"><input type="checkbox" id="${i}" onchange="taskStatusChange(${i}, ${id})" checked><label for="${i}">${subtask['task']}</label></div>
        `;
        }
    }
}

/**
 * Renders the editable-view of the selected task
 * @param {integer} id Id of selected task
 */
function renderEditTask(id) {
    task = tasklist.filter(t => t['id'] == id);
    assignetcontacts = task[0]['assignedTo']['user'];
    let title = task[0]['title'];
    let description = task[0]['description'];
    let duedateunformated = JSON.stringify(task[0]['duedate']);
    let year = duedateunformated.slice(0, 4);
    let month = duedateunformated.slice(4, 6);
    let day = duedateunformated.slice(6);
    let duedate = year + '-' + month + '-' + day;
    let priority = task[0]['priority'];
    let subtasks = task[0]['subtasks']['tasks'];
    document.getElementById('Boardpopup').innerHTML = editTaskTemplate(id);
    document.getElementById('titleinput').value = title;
    document.getElementById('descriptioninput').value = description;
    document.getElementById('duedate').value = duedate;
    loadSubtasks(subtasks, id);
    selectPrio(priority);
    loadAssignetPersons(id);
    loadContactsforTasks();
}

function editTaskTemplate(id) {
    return `
    <div class="background" onclick="closeBoardPopup()"></div>
    <div class="taskform edittaskform">
        <div>
            <div class="edittitle">Title <input type="text" required placeholder="Enter a Title" id="titleinput"></div>
            <div class="editdescription">Description <textarea id="descriptioninput" placeholder="Enter a Description" required></textarea></div>
            <div class="duedate">Due Date <input type="date" id="duedate" placeholder="dd/mm/yyyy" required></div>
            <div class="prio">Prio 
                <div class="prioselect">
                    <div class="prio-urgent" id="urgent" onclick="selectPrio('urgent')">Urgent <img src="assets/img/urgent.svg"></div>
                    <div class="prio-medium" id="medium" onclick="selectPrio('medium')">Medium <img src="assets/img/medium.svg"></div>
                    <div class="prio-low" id="low" onclick="selectPrio('low')">Low <img src="assets/img/low.svg"></div>
                </div>
            </div>
            <div class="editsubtask">
                Subtasks
                <div class="subtaskedit">
                    <input class="input-subtask" type="text" min="2" max="200" required
                    placeholder="Add new subtask" id="newsubtask">
                    <img src="./assets/img/plus-subtask.png" alt="Add" onclick="addNewSubask(${id})">
                </div>
                <div id="subtasks"></div>
            </div>
            <div class="assignedto" id="assignedto">Assigned to 
            <div class="dropdown-assign" id="assign-container">
                <div onclick="openDropdownAssignTo(${id})">
                    <span class="flex">Select contacts to assign</span>
                    <img src="./assets/img/vector-2.png" alt="klick">
                </div>
            </div>
            <div class="assignedpersons" id="assignedpersons"></div>
            </div>
        </div>
        <div class="close" onclick="closeBoardPopup()">x</div>
        <div class="editTask" onclick="editTask(${id})"><img src="./assets/img/check-button.png" alt="Ok"></div>
    </div>
    `;
}

/**
 * Renders subtasks with edit buttons
 * @param {array} subtasks Array of added subtasks
 * @param {integer} id Id of selected task
 */
function loadSubtasks(subtasks, id) {
    document.getElementById('subtasks').innerHTML = '';
    for (let i = 0; i < subtasks.length; i++) {
        let subtask = subtasks[i];
        document.getElementById('subtasks').innerHTML += templateEditabelSubtask(subtask['task'], i, id);
    }
}

function templateEditabelSubtask(task, i, task_id) {
    return `
        <div class="subtask" id="subtask${i}">
            <div><p class="subtasktext">${task}</p></div>
            <div>
                <button onclick="deleteSubtask(${i}, ${task_id})">Delete</button>
                <button onclick="editSubtask(${i}, ${task_id})">Edit</button>
            </div>
        </div>
        `;
}

function templateEditabelSubtaskInput(task, index, task_id) {
    return `
    <textarea id="subedit${index}" cols="30" rows="10" minlength="2" maxlength="200">${task}</textarea>
    <div>
        <button onclick="saveSubEdit(${index}, ${task_id})">Save</button>
        <button onclick="cancelSubEdit(${index}, ${task_id})">Cancel</button>
    </div>
    `;
}

/**
 * Adds new subtask to selected task
 * @param {integer} id Id of selected task
 */
function addNewSubask(id) {
    let newtask = document.getElementById('newsubtask').value;
    tasklist[id]['subtasks']['tasks'].push({ 'task': newtask, 'completed': false })
    document.getElementById('newsubtask').value = '';
    saveBoard();
    loadAll();
    renderBoard();
    task = tasklist.filter(t => t['id'] == id);
    let subtasks = task[0]['subtasks']['tasks'];
    loadSubtasks(subtasks, id);
}

/**
 * Deletes subtask from selected task
 * @param {integer} index Index of selected subtask
 * @param {integer} id Id of selected task
 */
function deleteSubtask(index, id) {
    task = tasklist.filter(t => t['id'] == id);
    task[0]['subtasks']['tasks'].splice(index, 1);
    let subtasks = task[0]['subtasks']['tasks'];
    saveBoard();
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
    task = tasklist.filter(t => t['id'] == id);
    let subtask = task[0]['subtasks']['tasks'][index];
    document.getElementById(`subtask${index}`).innerHTML = templateEditabelSubtaskInput(subtask['task'], index, id);
}

/**
 * Saves the changes of the selected subtask to the selected task
 * @param {integer} index Index of selected subtask
 * @param {integer} id Id of selected task
 */
function saveSubEdit(index, id) {
    newsubtask = document.getElementById(`subedit${index}`).value;
    tasklist[id]['subtasks']['tasks'][index]['task'] = newsubtask;
    saveBoard();
    loadAll();
    renderBoard();
    document.getElementById(`subtask${index}`).innerHTML = `
    <div><p>${newsubtask}</p></div>
    <div>
        <button onclick="deleteSubtask(${index}, ${id})">Delete</button>
        <button onclick="editSubtask(${index}, ${id})">Edit</button>
    </div>
    `
}

/**
 * Cancels the editing of selected subtask
 * @param {integer} index Index of selected subtask
 * @param {integer} id Id of selected task
 */
function cancelSubEdit(index, id) {
    task = tasklist.filter(t => t['id'] == id);
    let subtask = task[0]['subtasks']['tasks'][index];
    document.getElementById(`subtask${index}`).innerHTML = `
    <div><p>${subtask['task']}</p></div>
    <div>
        <button onclick="deleteSubtask(${index}, ${id})">Delete</button>
        <button onclick="editSubtask(${index}, ${id})">Edit</button>
    </div>
    `
}

/**
 * Changes the completed status of selected subtask
 * @param {integer} task Index of selected subtask
 * @param {integer} id Id of selected task
 */
async function taskStatusChange(task, id) {
    if (tasklist[id]['subtasks']['tasks'][task]['completed'] == true) {
        tasklist[id]['subtasks']['tasks'][task]['completed'] = false;
    } else {
        tasklist[id]['subtasks']['tasks'][task]['completed'] = true;
    }
    await saveBoard();
    renderSubTasks(id);
    setTimeout(await initBoard, 50);
}

/**
 * Changes priority to selected priority
 * @param {string} prio Name of selectet priority
 */
function selectPrio(prio) {
    if (prio == 'urgent') {
        document.getElementById('urgent').classList.add('urgent');
        document.getElementById('medium').classList.remove('medium');
        document.getElementById('low').classList.remove('low');
    }
    if (prio == 'medium') {
        document.getElementById('urgent').classList.remove('urgent');
        document.getElementById('medium').classList.add('medium');
        document.getElementById('low').classList.remove('low');
    }
    if (prio == 'low') {
        document.getElementById('urgent').classList.remove('urgent');
        document.getElementById('medium').classList.remove('medium');
        document.getElementById('low').classList.add('low');
    }
    selectedPrio = prio;
}

/**
 * Renders the assigned persons of the task
 * @param {integer} id Id of selected task
 */
function loadAssignetPersons(id) {
    document.getElementById('assignedpersons').innerHTML = ``;
    for (let i = 0; i < assignetcontacts.length; i++) {
        let assignetperson = assignetcontacts[i];
        document.getElementById('assignedpersons').innerHTML += `<div class="name" style="background-color: ${assignetperson['iconcolor']}">${assignetperson['icon']}</div>`
    }
}

/**
 * Renders the open dropdown-menu for assigning contacts
 * @param {integer} id Id of selected task
 */
function openDropdownAssignTo(id) {
    task = tasklist.filter(t => t['id'] == id);
    document.getElementById('assign-container').innerHTML = templateOfOpenDropdownAssignTo(id)
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        if (checkOnAssignedContacts(contact) != false) {
            document.getElementById('assign-container').innerHTML += templateAssignedContact(i, contact['name'], contact['icon'], contact['iconcolor'], id);
        } else {
            document.getElementById('assign-container').innerHTML += templateNotAssignedContact(i, contact['name'], contact['icon'], contact['iconcolor'], id);
        }
    }
    for (let j = 0; j < assignetcontacts.length; j++) {
        let contact = assignetcontacts[j];
        if (checkOnContact(contact) == false) {
            let index = j + contacts.length
            document.getElementById('assign-container').innerHTML += templateAssignedContact(index, contact['name'], contact['icon'], contact['iconcolor'], id);
        }
    }
    document.getElementById('assign-container').innerHTML += templateInviteContact(id);
}

function templateAssignedContact(i, name, icon, iconcolor, id) {
    return `
        <div class="contact">
            <label for="contact${i}">${name}</label>
            <input type="checkbox" id="contact${i}" onchange="assignChange('${name}', '${icon}', '${iconcolor}', ${id})" checked>
        </div>`;
}

function templateNotAssignedContact(i, name, icon, iconcolor, id) {
    return `
        <div class="contact">
            <label for="contact${i}">${name}</label>
            <input type="checkbox" id="contact${i}" onchange="assignChange('${name}', '${icon}', '${iconcolor}', ${id})">
        </div>`;
}

function templateOfOpenDropdownAssignTo(id) {
    return `
    <div onclick="closeDropdownAssignTo(${id})">
        <span class="flex">Select contacts to assign</span>
        <img src="./assets/img/vector-2.png" alt="klick">
    </div>`;
}

function templateInviteContact(id) {
    return `
    <div class="contact" onclick="assignNewContact(${id})">
        <span>Invite new contact</span>
        <img src="./assets/img/contact-icon.png">
    </div>
    `;
}

/**
 * Changes the assign-status of selected contact
 * @param {string} name Name of selectet contact
 * @param {string} icon Icon of selected contact
 * @param {string} color Iconcolor of selected contact
 * @param {integer} id Id of selected task
 */
function assignChange(name, icon, color, id) {
    let contact = { 'name': name, 'icon': icon, 'iconcolor': color }
    let index = indexOfAssigned(contact);
    if (checkOnAssignedContacts(contact['icon']) == true) {
        assignetcontacts.splice(index, 1);
    } else {
        assignetcontacts.push({ 'name': name, 'icon': icon, 'iconcolor': color });
    }
    loadAssignetPersons(id);
}

function assignNewContact(id) {
    document.getElementById('assign-container').innerHTML = `
    <div class="newcontact">
        <input type="email" placeholder="Contact email" id="email">
        <div class="check">
            <img src="./assets/img/false-x.png" onclick="exitNewContact(${id})">
            |
            <img src="./assets/img/checkmark.png" onclick="addNewContact(${id})">
        </div>
    </div>
    `;
}


function exitNewContact(id) {
    document.getElementById('assign-container').innerHTML = `
    <div onclick="openDropdownAssignTo(${id})">
        <span class="flex">Select contacts to assign</span>
        <img src="./assets/img/vector-2.png" alt="klick">
    </div>
    `;
}

/**
 * Creates new contact based on the email
 * @param {integer} id Id of selected task
 */
function addNewContact(id) {
    let email = document.getElementById('email').value;
    let name = email.split('@');
    let icon = email.slice(0, 2);
    let color = getRandomColor();
    assignetcontacts.push({ 'name': name, 'icon': icon, 'iconcolor': color, });
    document.getElementById('assign-container').innerHTML = templateOfClosedDropdownAssignTo(id)
    loadAssignetPersons(id);
}

function templateOfClosedDropdownAssignTo(id) {
    return `
    <div onclick="openDropdownAssignTo(${id})">
        <span class="flex">Select contacts to assign</span>
        <img src="./assets/img/vector-2.png" alt="klick">
    </div>`;
}

/**
 * Creates a random colorcode
 * @returns Random generated color
 */
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
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
        let name = contacts[i]['name'];
        if (name == contact) {
            return true;
        }
    }
    return false;
}

/**
 * Checks array for containing a spesific contact
 * @param {string} icon Icon of contact
 * @returns status of containing the contact
 */
function checkOn(icon) {
    for (let i = 0; i < assignetcontacts.length; i++) {
        let name = assignetcontacts[i]['icon'];
        if (name == icon) {
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
    for (let i = 0; i < assignetcontacts.length; i++) {
        let check = assignetcontacts[i]['icon'];
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
    for (let i = 0; i < assignetcontacts.length; i++) {
        let name = assignetcontacts[i]['icon'];
        if (name == icon) {
            return i;
        }
    }
}

function closeDropdownAssignTo(id) {
    document.getElementById('assign-container').innerHTML = `
    <div onclick="openDropdownAssignTo(${id})">
        <span class="flex">Select contacts to assign</span>
        <img src="./assets/img/vector-2.png" alt="klick">
    </div>`
}

/**
 * Saves changes of selected task
 * @param {integer} id Id of selected task 
 */
async function editTask(id) {
    let newTitle = document.getElementById('titleinput').value;
    let newDescription = document.getElementById('descriptioninput').value;
    let mynewDate = document.getElementById('duedate').value;
    let year = mynewDate.slice(0, 4);
    let month = mynewDate.slice(5, 7);
    let day = mynewDate.slice(8);
    let newDuedate = year + month + day;
    tasklist[id]['title'] = newTitle;
    tasklist[id]['description'] = newDescription;
    tasklist[id]['duedate'] = parseInt(newDuedate);
    tasklist[id]['priority'] = selectedPrio;
    if (assignetcontacts){
        tasklist[id]['assignedTo']['user'] = assignetcontacts;
    }
    await saveBoard();
    setTimeout(await initBoard, 100);
    closeBoardPopup();
}