/**
 *
 * @param {string} task is the current rendered subtask value.
 * @param {number} i is the subtask number from the current subtask iteration.
 * @param {number} task_id of selected task.
 * @returns the view of the subtasks which can be edited or deleted.
 */

function templateEditabelSubtask(task, i, task_id) {
  return /*html*/ `
    <div class="subtask" id="subtask${i}">
        <div style="width: 70%;"><p class="subtasktext">${task}</p></div>
        <div style="width: 30%;">
            <button onclick="deleteSubtask(${i}, ${task_id})">Delete</button>
            <button onclick="editSubtask(${i}, ${task_id})">Edit</button>
        </div>
    </div>`;
}

/**
 *
 * @param {string} task is the current rendered subtask value.
 * @param {number} i is the subtask number from the current subtask iteration.
 * @param {number} task_id of selected task.
 * @returns the view of the subtasks which can be edited or the edited can be canceled.
 */

function templateEditabelSubtaskInput(task, i, task_id) {
  return /*html*/ `
    <textarea class="subtask-edit-text" id="subedit${i}" cols="30" rows="10" minlength="2" maxlength="250">${task}</textarea>
    <div style="width:22%;">
        <button onclick="saveSubEdit(${i}, ${task_id})">Save</button>
        <button onclick="cancelSubEdit(${i}, ${task_id})">Cancel</button>
    </div>`;
}

/**
 * @param {number} id of selected task.
 * @returns the html template to edit the task.
 */

function editTaskTemplate(id) {
  return /*html*/ `
    <div class="background" onclick="closesPopupAddTask()"></div>
    <div id="add-contact-section"></div>
    <div class="taskform">
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
    </div>`;
}

/**
 *
 * @param {string} category name of the selected task.
 * @param {string} color code of the selected category.
 * @param {string} title of the selected task.
 * @param {string} description of the selected task.
 * @param {string} duedate of the selected task in the format DD-MM-YYYY.
 * @param {string} priority of the selected task.
 * @param {number} id of selected task.
 * @returns the html template where the detailed task values can be seen.
 */

function taskformTemplate(category, color, title, description, duedate, priority, id) {
  return /*html*/ `
    <div class="background" onclick="closesPopupAddTask()"></div>
    <div class="taskform">
        <div class="inner-taskform">
            <div class="category" style="background-color: ${color}">${category}</div>
            <h2>${title}</h2>
            <p>${description}</p>
            <div class="duedate"><b>Due date:</b> ${duedate}</div>
            <div class="priority"><b>Priority:</b><div class="prioicon ${priority}">${priority}<img src="assets/img/${priority}.svg"></div></div>
            <div class="subtasks"><b>Subtasks:</b></div>
            <div class="subtaskwindow" id="subtasks"></div>
            <div class="flex assigned-and-edit-button">
                <div class="assignedto"><b>Assigned To:</b>
                    <div id="assignedto"></div>
                </div>
                <div class="edit" onclick="renderEditTask(${id})"><img src="./assets/img/edit-button.png" alt="edit"></div>
            </div>
        </div>
        <div class="close" onclick="closesPopupAddTask()">x</div>
    </div>`;
}
