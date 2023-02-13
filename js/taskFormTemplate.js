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

function editTaskTemplate(id) {
  return /*html*/ `
    <div class="background" onclick="closeBoardPopup()"></div>
    <div id="add-contact-section"></div>
    <div class="taskform edittaskform">
        <div class="flex column" style="height: fit-content; position: relative; width:100%;">
            <div class="edittitle">Title <input type="text" required placeholder="Enter a Title" id="titleinput"></div>
            <span id="title-required" class="mistake-category-fields"></span>
            <div class="editdescription flex column">Description <textarea id="descriptioninput" placeholder="Enter a Description" required></textarea></div>
            <span id="description-required" class="mistake-category-fields"></span>
            <div class="duedate">Due Date <input type="date" id="due-date" placeholder="dd/mm/yyyy" required></div>
            <span id="date-required" class="mistake-category-fields"></span>
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
            <div class="flex column margin-for-fields">
                        <span class="header-for-fields">Assigned to</span>
                        <div class="dropdown-category-container" id="assigned-container" style="width: 100%;">
                            <div class="dropdown-category border-radius-fields" id="contact-container">
                                <div class="flex input-section" onclick="checkIfAssignedToIsOpen()"
                                    id="assigned-contacts">
                                    <span class="flex">Select contacts to assign</span>
                                    <img class="dropdown-img" src="./assets/img/vector-2.png" alt="klick">
                                </div>
                            </div>
                            <div id="existing-contacts" class="d-none max-height-and-scroll"></div>
                        </div>
                        <div id="assigned-to-icons-section" class="flex width-f"></div>
                        <span id="assigned-to-contacts-required" class="mistake-category-fields"></span>
                    </div>
                    <div class="edit-task-section">
                    <div class="editTask" onclick="editTask(${id})"><img src="./assets/img/check-button.png" alt="Ok"></div>
                    </div>
                </div>
        </div>    
    </div>
    `;
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

function templateOfClosedDropdownAssignTo() {
  return `
    <div onclick="openExistingContacts()">
        <span class="flex">Select contacts to assign</span>
        <img src="./assets/img/vector-2.png" alt="klick">
    </div>`;
}
