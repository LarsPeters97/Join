function taskformTemplate(category, color, title, description, duedate, priority, id) {
    return `
<div class="background" onclick="closePopup()">
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
            <div class="close" onclick="closePopup()">x</div>
            <div class="edit" onclick="renderEditTask(${id})"><img src="../assets/img/edit-button.png" alt="edit"></div>
    </div>`;
}

function renderAssignedTo(assignedTo) {
    for (let i = 0; i < assignedTo['user'].length; i++) {
        let user = assignedTo['user'][i];
        document.getElementById('assignedto').innerHTML += `
        <div class="user"><div class="name" style="background-color: ${user['iconcolor']}">${user['icon']}</div>${user['name']}</div>
        `;
    };
}

function renderSubTasks(id) {
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
    document.getElementById('popup').innerHTML = editTaskTemplate(id);
    document.getElementById('titleinput').value = title;
    document.getElementById('descriptioninput').value = description;
    document.getElementById('duedate').value = duedate;
    loadSubtasks(subtasks, id);
    selectPrio(priority);
    loadAssignetPersons(id);
}

function editTaskTemplate(id) {
    return `
    <div class="background" onclick="closePopup()"></div>
    <div class="taskform">
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
        <div>
            <div class="close" onclick="closePopup()">x</div>
            <div class="editTask" onclick="editTask(${id})"><img src="../assets/img/check-button.png" alt="Ok"></div>
        </div
    </div>
    `;
}

function loadSubtasks(subtasks, id) {
    document.getElementById('subtasks').innerHTML = '';
    for (let i = 0; i < subtasks.length; i++) {
        let subtask = subtasks[i];
        document.getElementById('subtasks').innerHTML += `
        <div class="subtask" id="subtask${i}">
            <div><p>${subtask['task']}</p></div>
            <div>
                <button onclick="deleteSubtask(${i}, ${id})">Delete</button>
                <button onclick="editSubtask(${i}, ${id})">Edit</button>
            </div>
        </div>
        `
    }
}

function addNewSubask(id) {
    let newtask = document.getElementById('newsubtask').value;
    tasklist[id]['subtasks']['tasks'].push({ 'task': newtask, 'completed': false })
    document.getElementById('newsubtask').value = '';
    loadAll();
    renderBoard();
    task = tasklist.filter(t => t['id'] == id);
    let subtasks = task[0]['subtasks']['tasks'];
    loadSubtasks(subtasks, id);
}

function deleteSubtask(index, id) {
    task = tasklist.filter(t => t['id'] == id);
    task[0]['subtasks']['tasks'].splice(index, 1);
    let subtasks = task[0]['subtasks']['tasks'];
    save();
    loadAll();
    renderBoard();
    loadSubtasks(subtasks, id);
}

function editSubtask(index, id) {
    task = tasklist.filter(t => t['id'] == id);
    let subtask = task[0]['subtasks']['tasks'][index];
    document.getElementById(`subtask${index}`).innerHTML = `
    <textarea id="subedit${index}" cols="30" rows="10" minlength="2" maxlength="200">${subtask['task']}</textarea>
    <div>
        <button onclick="saveSubEdit(${index}, ${id})">Save</button>
        <button onclick="cancelSubEdit(${index}, ${id})">Cancel</button>
    </div>
    `
}

function saveSubEdit(index, id) {
    newsubtask = document.getElementById(`subedit${index}`).value;
    tasklist[id]['subtasks']['tasks'][index]['task'] = newsubtask;
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

function taskStatusChange(task, id) {
    if (tasklist[id]['subtasks']['tasks'][task]['completed'] == true) {
        tasklist[id]['subtasks']['tasks'][task]['completed'] = false;
    } else {
        tasklist[id]['subtasks']['tasks'][task]['completed'] = true;
    }
    save();
    loadAll();
    renderBoard();
}

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

function loadAssignetPersons(id) {
    document.getElementById('assignedpersons').innerHTML = ``;
    for (let i = 0; i < assignetcontacts.length; i++) {
        let assignetperson = assignetcontacts[i];
        document.getElementById('assignedpersons').innerHTML += `<div class="name" style="background-color: ${assignetperson['iconcolor']}">${assignetperson['icon']}</div>`
    }
}

function openDropdownAssignTo(id) {
    task = tasklist.filter(t => t['id'] == id);
    document.getElementById('assign-container').innerHTML = `
    <div onclick="closeDropdownAssignTo(${id})">
        <span class="flex">Select contacts to assign</span>
        <img src="./assets/img/vector-2.png" alt="klick">
    </div>`;
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        if (checkOnAssigned(contact) != false) {
            document.getElementById('assign-container').innerHTML += `
        <div class="contact">
            <label for="contact${i}">${contact['name']}</label>
            <input type="checkbox" id="contact${i}" onchange="assignChange('${contact['name']}', '${contact['icon']}', '${contact['iconcolor']}', ${id})" checked>
        </div>`;
        } else {
            document.getElementById('assign-container').innerHTML += `
        <div class="contact">
            <label for="contact${i}">${contact['name']}</label>
            <input type="checkbox" id="contact${i}" onchange="assignChange('${contact['name']}', '${contact['icon']}', '${contact['iconcolor']}', ${id})">
        </div>`;
        }
    }
    for (let j = 0; j < assignetcontacts.length; j++) {
        let contact = assignetcontacts[j];
        if (checkOnContact(contact) == false) {
            document.getElementById('assign-container').innerHTML += `
        <div class="contact">
            <label for="contact${j+contacts.length}">${contact['name']}</label>
            <input type="checkbox" id="contact${j+contacts.length}" onchange="assignChange('${contact['name']}', '${contact['icon']}', '${contact['iconcolor']}', ${id})" checked>
        </div>`;
        }
    }
    document.getElementById('assign-container').innerHTML += `
    <div class="contact" onclick="assignNewContact(${id})">
        <span>Invite new contact</span>
        <img src="./assets/img/contact-icon.png">
    </div>
    `;
}

function assignChange(name, icon, color, id) {
    let contact = {'name': name, 'icon': icon, 'iconcolor': color}
    let index = indexOfAssigned(contact);
    if (checkOnAssigned(contact) == true){
        assignetcontacts.splice(index, 1);
    } else {
        assignetcontacts.push({'name': name, 'icon': icon, 'iconcolor': color});
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

function addNewContact(id) {
    let email = document.getElementById('email').value;
    let name = email.split('@');
    let icon = email.slice(0, 2);
    let color = getRandomColor();
    assignetcontacts.push({'name': name, 'icon': icon, 'iconcolor': color,});
    /**email needs to be send to new contact*/
    document.getElementById('assign-container').innerHTML = `
    <div onclick="openDropdownAssignTo(${id})">
        <span class="flex">Select contacts to assign</span>
        <img src="./assets/img/vector-2.png" alt="klick">
    </div>
    `;
    loadAssignetPersons(id);
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function checkOnContact(contact) {
    for (let i = 0; i < contacts.length; i++) {
        let name = contacts[i]['name'];
        if (name == contact['name']) {
            return true;
        }
    }
    return false;
}

function checkOnAssigned(contact) {
    for (let i = 0; i < assignetcontacts.length; i++) {
        let name = assignetcontacts[i]['name'];
        if (name == contact['name']) {
            return true;
        }
    }
    return false;
}

function indexOfAssigned(contact) {
    for (let i = 0; i < assignetcontacts.length; i++) {
        let name = assignetcontacts[i]['name'];
        if (name == contact['name']) {
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

function editTask(id) {
    let newTitle = document.getElementById('titleinput').value;
    let newDescription = document.getElementById('descriptioninput').value;
    let newDate = document.getElementById('duedate').value;
    let year = newDate.slice(0, 4);
    let month = newDate.slice(5, 7);
    let day = newDate.slice(8);
    let newDuedate = year + month + day;
    tasklist[id]['title'] = newTitle;
    tasklist[id]['description'] = newDescription;
    tasklist[id]['duedate'] = newDuedate;
    tasklist[id]['priority'] = selectedPrio;
    tasklist[id]['assignedTo']['user'] = assignetcontacts;
    initBoard();
}