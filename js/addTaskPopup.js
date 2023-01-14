let category = [];
let categoryColor = [];
let description = [];
let title = [];
let assignedPeople = [];
let contactList = [];
let duedate = [];
let newSelectedPrio = [];
let subtasks = [];
let tempTasklist = [];
let taskId = [];
let categorys = [];
let tempCategorys = [];
let categoryColors = ['#FC71FF', '#1FD7C1', '#8AA4FF', '#FF0000', '#2AD300', '#FF8A00', '#E200BE', '#0038FF'];


/**
 * Initilasing the add Task Popup-menu
 */
async function initAddTaskPopup() {
    await loadTasklistForId();
    await loadContacts();
    await loadCategorys();
}

/**
 * Gets "tasklist" from the server
 */
async function loadTasklistForId() {
    setURL("https://gruppe-397.developerakademie.net/smallest_backend_ever");
    await downloadFromServer();
    tempTasklist = JSON.parse(backend.getItem("tasklist")) || [];
}

/**
 * Gets "contacts" from the server
 */
async function loadContacts() {
    setURL("https://gruppe-397.developerakademie.net/smallest_backend_ever");
    await downloadFromServer();
    contactList = JSON.parse(backend.getItem("contacts")) || [];
}

/**
 * Gets "categorys" from the server
 */
async function loadCategorys() {
    setURL("https://gruppe-397.developerakademie.net/smallest_backend_ever");
    await downloadFromServer();
    categorys = JSON.parse(backend.getItem("categorys")) || [{ 'name': 'General Topics', 'color': '#FC71FF' }];
    tempCategorys = JSON.parse(backend.getItem("categorys")) || [{ 'name': 'General Topics', 'color': '#FC71FF' }];
}

/**
 * sets "taskid" as running number
 */
function getIdFromTasklist() {
    taskid = tempTasklist.length;
}

/**
 * fills "category_selection" with an open category-dropdown
 */
function openCategorySelection() {
    document.getElementById('category_selection').innerHTML = templateOpenCategorySelection();
    for (let i = 0; i < tempCategorys.length; i++) {
        let categorySelect = categorys[i];
        document.getElementById('category_selection').innerHTML += templateCategoryOption(i, categorySelect['name'], categorySelect['color']);
    }
}

/**
 * creates a category option
 * 
 * @param {integer} i index of the option
 * @param {string} name name of the option
 * @param {string} color affiliated color of the option
 * @returns template
 */
function templateCategoryOption(i, name, color) {
    return `
        <div class="category_option" onclick="selectCategory(${i})">
        <span>${name}<span class="all-colors" style="background-color: ${color}"></span></span>
        </div>`
}

/**
 * template for open category dropdown
 * 
 * @returns template
 */
function templateOpenCategorySelection() {
    return `
    <div class="selection" onclick="closeCategorySelection()">
        <span>Select task category</span>
        <img class="dropdown-img" src="./assets/img/vector-2.png" alt="klick">
    </div>
    <div class="category_option" onclick="createNewCategory()">
        <span>New category</span>
    </div>`
}

/**
 * closes dropdown of the category selection
 */
function closeCategorySelection() {
    document.getElementById('category_selection').innerHTML = `
    <div class="selection" onclick="openCategorySelection()">
        <span>Select task category</span>
        <img class="dropdown-img" src="./assets/img/vector-2.png" alt="klick">
    </div>`
}

/**
 * loads the create-input of a new category with the color-selection
 */
function createNewCategory() {
    document.getElementById('category_selection').innerHTML = templateCreateNewCategoryInput();
    for (let i = 0; i < categoryColors.length; i++) {
        let color = categoryColors[i];
        document.getElementById('category_colors').innerHTML += `
        <span class="all-colors" style="background-color: ${color}" 
        id="selected-color-${i}" onclick="newCategoryColor('${color}', ${i})"></span>`;
    }
}

/**
 * template of the category inputfield
 * 
 * @returns template
 */
function templateCreateNewCategoryInput() {
    return `
    <div class="category-input">
    <input class="input-category" type="text" placeholder="New Category Name" min="3" maxlength="32" required id="new-category-name">
    <span class="all-colors" id="selected-color"></span>
    <div class="category-icons">
        <img src="./assets/img/false-x.png" class="false-x" onclick="removeCategoryInput()"> | 
        <img src="./assets/img/checkmark.png" class="checkmark" onclick="addNewCategory()">
    </div></div>`
}

/**
 * selects category color
 * 
 * @param {string} color selected color
 * @param {integer} i index of selected color
 */
function newCategoryColor(color, i) {
    categoryColor = color
    for (let j = 0; j < categoryColors.length; j++) {
        document.getElementById(`selected-color-${j}`).classList.remove('selectedColor');
    }
    document.getElementById(`selected-color-${i}`).classList.add('selectedColor');
    document.getElementById('selected-color').style.backgroundColor = color;
}

function selectCategory(index) {
    category = categorys[index];
    document.getElementById('category_selection').innerHTML = `
    <span class="selectet_category" onclick="openCategorySelection()">${categorys[index]['name']}
    <span class="all-colors" id="selected-color" style="background-color: ${categorys[index]['color']}"></span></span>`
}

function addNewCategory() {
    newCategoryName = document.getElementById('new-category-name').value;
    if (categoryColor && newCategoryName) {
        category = ({
            'name': newCategoryName,
            'color': categoryColor
        });
        tempCategorys.push(category)
        document.getElementById('category_selection').innerHTML = templateNewCategory(category['name'], category['color'])
        document.getElementById('category_colors').innerHTML = ``;
    } else if (newCategoryName) {
        document.getElementById('mistake-category-fields').innerHTML = 'Please select the color for the new category.';
    } else {
        document.getElementById('mistake-category-fields').innerHTML = 'Please enter a new category name.';
    }
}

function templateNewCategory(name, color) {
    return `
        <span class="selectet_category" onclick="openCategorySelection()">${name}
        <span class="all-colors" id="selected-color" style="background-color: ${color}"></span></span>`;
}

function closePopup() {
    category = [];
    categoryColor = [];
    description = [];
    title = [];
    assignedPeople = [];
    duedate = [];
    newSelectedPrio = [];
    subtasks = [];
    closeBoardPopup();
}

function templateOpenAssignToSelection() {
    return `
    <div class="selection" onclick="closeAssignToSelection()">
        <span class="flex">Select contacts to assign</span>
        <img src="./assets/img/vector-2.png" alt="klick">
    </div>`
}

function templateAssignedContactSelection(i, name, icon, iconcolor){
    return `
        <div class="contact_selection">
            <label for="contact${i}">${name}</label>
            <input type="checkbox" id="contact${i}" onchange="assignContact('${name}', '${icon}', '${iconcolor}')" checked>
        </div>`;
}

function templateNotAssignedContactSelection(i, name, icon, iconcolor){
    return `
        <div class="contact_selection">
            <label for="contact${i}">${name}</label>
            <input type="checkbox" id="contact${i}" onchange="assignContact('${name}', '${icon}', '${iconcolor}')">
        </div>`;
}

function openAssignToSelection() {
    document.getElementById('assign-container').innerHTML = templateOpenAssignToSelection();
    for (let i = 0; i < contactList.length; i++) {
        let contact = contactList[i];
        if (checkOnAssigned(contact['icon']) == true) {
            document.getElementById('assign-container').innerHTML += templateAssignedContactSelection(i, contact['name'], contact['icon'], contact['iconcolor']);
        } else {
            document.getElementById('assign-container').innerHTML += templateNotAssignedContactSelection(i, contact['name'], contact['icon'], contact['iconcolor']);
        }
    }
    for (let j = 0; j < assignedPeople.length; j++) {
        let contact = assignedPeople[j];
        if (checkOnContacts(contact['icon']) == false) {
            let index = j + contacts.length
            document.getElementById('assign-container').innerHTML += templateAssignedContactSelection(index, contact['name'], contact['icon'], contact['iconcolor']);
        }
    }
    document.getElementById('assign-container').innerHTML += templateInvitePerson();
}

function templateInvitePerson() {
    return `
    <div class="contact_selection" onclick="assignNewPerson()">
        <span>Invite new contact</span>
        <img src="./assets/img/contact-icon.png">
    </div>
    `;
}

function checkOnAssignedpeople(contact) {
    for (let i = 0; i < assignedPeople.length; i++) {
        let name = assignedPeople[i]['name'];
        if (name == contact['name']) {
            return true;
        }
    }
    return false;
}

function assignNewPerson() {
    document.getElementById('assign-container').innerHTML = `
    <div class="newcontact">
        <input type="email" placeholder="Contact email" id="email">
        <div class="check">
            <img src="./assets/img/false-x.png" onclick="exitNewPerson()">
            |
            <img src="./assets/img/checkmark.png" onclick="addNewPerson()">
        </div>
    </div>
    `
}

function exitNewPerson() {
    document.getElementById('assign-container').innerHTML = `
    <div class="selection" onclick="openAssignToSelection()">
        <span class="flex">Select contacts to assign</span>
        <img src="./assets/img/vector-2.png" alt="klick">
    </div>
    `;
}

function addNewPerson() {
    let email = document.getElementById('email').value;
    let name = email.split('@');
    let icon = email.slice(0, 2);
    let color = getRandomColor();
    assignedPeople.push({ 'name': name, 'icon': icon, 'iconcolor': color, });
    document.getElementById('assign-container').innerHTML = templateOfClosedDropdownAssignToSelection();
    loadAssignedPeople();
}

function templateOfClosedDropdownAssignToSelection() {
    return `
    <div class="selection" onclick="openAssignToSelection()">
        <span class="flex">Select contacts to assign</span>
        <img src="./assets/img/vector-2.png" alt="klick">
    </div>`;
}

function loadAssignedPeople() {
    document.getElementById('assignedpersons').innerHTML = ``;
    for (let i = 0; i < assignedPeople.length; i++) {
        let assigned = assignedPeople[i];
        document.getElementById('assignedpersons').innerHTML += `<div class="name" style="background-color: ${assigned['iconcolor']}">${assigned['icon']}</div>`
    }
}

function assignContact(name, icon, color) {
    let contact = { 'name': name, 'icon': icon, 'iconcolor': color }
    let index = indexOfAssign(contact);
    if (checkOnAssign(contact['icon']) == true) {
        assignedPeople.splice(index, 1);
    } else {
        assignedPeople.push({ 'name': name, 'icon': icon, 'iconcolor': color });
    }
    loadAssignedPeople();
}

function indexOfAssign(contact) {
    for (let i = 0; i < assignedPeople.length; i++) {
        let name = assignedPeople[i]['name'];
        if (name == contact['name']) {
            return i;
        }
    }
}

function checkOnAssign(contact) {
    for (let i = 0; i < assignedPeople.length; i++) {
        let name = assignedPeople[i]['icon'];
        if (name == contact) {
            return true;
        }
    }
    return false;
}

function checkOnAssigned(contact) {
    for (let i = 0; i < assignedPeople.length; i++) {
        let name = assignedPeople[i]['icon'];
        if (name == contact) {
            return true;
        }
    }
    return false;
}

function checkOnContacts(contact) {
    for (let i = 0; i < contactList.length; i++) {
        let name = contactList[i]['icon'];
        if (name == contact) {
            return true;
        }
    }
    return false;
}

function closeAssignToSelection() {
    document.getElementById('assign-container').innerHTML = `
    <div class="selection" onclick="openAssignToSelection()">
        <span class="flex">Select contacts to assign</span>
        <img src="./assets/img/vector-2.png" alt="klick">
    </div>`
}

function selectPriority(prio) {
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
    newSelectedPrio = prio;
}

function addInput() {
    document.getElementById('subtaskinput').innerHTML = `
    <input class="inputarea_subtask" type="text" minlength="2" maxlength="100" id="input-subtask">
    <div id="subtask-icons" class="subtask_icons">
        <img src="./assets/img/false-x.png" class="false-x" onclick="clearSubtaskInput()">
        |
        <img src="./assets/img/checkmark.png" class="checkmark" onclick="checkSubtaskInput()">
    </div>
    `;
}

function clearSubtaskInput() {
    document.getElementById('input-subtask').value = ``;
}

function checkSubtaskInput() {
    let inputSubtask = document.getElementById('input-subtask');
    if (inputSubtask.value.length > 3) {
        addSubtask(inputSubtask.value);
        document.getElementById('input-subtask').value = '';
    }
}

function addSubtask(inputSubtask) {
    subtasks.push({ 'task': inputSubtask, 'completed': false });
    renderSubtasks();
}

function renderSubtasks() {
    let subtaskList = document.getElementById('subtasks');
    subtaskList.innerHTML = '';
    for (let i = 0; i < subtasks.length; i++) {
        let taskElement = subtasks[i];
        if (subtasks[i]['completed'] == false) {
            subtaskList.innerHTML += templateSubtasks(taskElement, i);
        }
        else {
            subtaskList.innerHTML += templateSubtasksCompleted(taskElement, i);
        }
    }
}

function templateSubtasks(taskElement, i) {
    return /*html*/`
        <div class="subtask_checkbox"> 
            <input type="checkbox" id="checkbox-${i}" class="input_subtask" onchange="changeCompleteStatus(${i})">
            <label for="checkbox-${i}" class="margin-checkbox">${taskElement['task']}</label>
        </div>
        `;
}

function templateSubtasksCompleted(taskElement, i) {
    return /*html*/`
        <div class="subtask_checkbox"> 
            <input type="checkbox" id="checkbox-${i}" class="input_subtask" onchange="changeCompleteStatus(${i})" checked>
            <label for="checkbox-${i}" class="margin-checkbox">${taskElement['task']}</label>
        </div>
        `;
}

function changeCompleteStatus(i) {
    if (subtasks[i]['completed']) {
        subtasks[i]['completed'] = false;
    }
    else {
        subtasks[i]['completed'] = true;
    }
}

async function createTask() {
    title = document.getElementById('title_input').value;
    description = document.getElementById('description_input').value;
    duedate = transformDuedate();
    getIdFromTasklist()
    if (title && description && category && assignedPeople.length > 0 && duedate && newSelectedPrio) {
        temptasklist.push({
            'progress': 'todo',
            'id': taskid,
            'category': {
                'color': category['color'],
                'categoryName': category['name'],
            },
            'duedate': duedate,
            'title': title,
            'description': description,
            'subtasks': {
                'tasks': [],
            },
            'assignedTo': {
                'user': assignedPeople,
            },
            'priority': newSelectedPrio,
        },);
        for (let i = 0; i < subtasks.length; i++) {
            let subtask = subtasks[i];
            tempTasklist[taskid]['subtasks']['tasks'].push(subtask);
        }
        let tasksAsString = JSON.stringify(tempTasklist);
        await backend.setItem('tasklist', tasksAsString);
        await checkCategoryNew();
        closePopup();
        initBoard();
    }
}

async function checkCategoryNew() {
    for (let i = 0; i < categorys.length; i++) {
        let category1 = categorys[i];
        if (category1['name'] == category['name']) {
            return false
        }
    }
    categorys.push({
        'color': category['color'],
        'name': category['name'],
    },);
    categoryAsString = JSON.stringify(categorys);
    await backend.setItem('categorys', categoryAsString);
}

function transformDuedate() {
    let mynewDate = document.getElementById('duedate').value
    let year = mynewDate.slice(0, 4);
    let month = mynewDate.slice(5, 7);
    let day = mynewDate.slice(8);
    let newDuedate = year + month + day;
    return parseInt(newDuedate)
}
