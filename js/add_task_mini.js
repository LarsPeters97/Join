let category = [];
let category_color = [];
let description = [];
let title = [];
let assignedpeople = [];
let contactlist = [];
let duedate = [];
let newselectedPrio = [];
let subtasks = [];
let temptasklist = [];
let taskid = [];
let categorys = [];
let tempcategorys = [];
let categoryColors = ['#FC71FF', '#1FD7C1', '#8AA4FF', '#FF0000', '#2AD300', '#FF8A00', '#E200BE', '#0038FF'];

async function initAddTaskPopup() {
    await loadTasklistForId();
    await loadContacts();
    await loadCategorys();
}

async function loadTasklistForId() {
    setURL("https://gruppe-397.developerakademie.net/smallest_backend_ever");
    await downloadFromServer();
    temptasklist = JSON.parse(backend.getItem("tasklist")) || [];
}

async function loadContacts() {
    setURL("https://gruppe-397.developerakademie.net/smallest_backend_ever");
    await downloadFromServer();
    contactlist = JSON.parse(backend.getItem("contacts")) || [];
}

async function loadCategorys() {
    setURL("https://gruppe-397.developerakademie.net/smallest_backend_ever");
    await downloadFromServer();
    categorys = JSON.parse(backend.getItem("categorys")) || [{ 'name': 'General Topics', 'color': '#FC71FF' }];
    tempcategorys = categorys;
}

function getIdFromTasklist() {
    taskid = tasklist.length;
}

function openCategorySelection() {
    document.getElementById('category_selection').innerHTML = `
    <div class="selection" onclick="closeCategorySelection()">
        <span>Select task category</span>
        <img class="dropdown-img" src="./assets/img/vector-2.png" alt="klick">
    </div>`;
    document.getElementById('category_selection').innerHTML += `
    <div class="category_option" onclick="createNewCategory()">
        <span>New category</span>
    </div>`;
    for (let i = 0; i < tempcategorys.length; i++) {
        let category_select = categorys[i];
        document.getElementById('category_selection').innerHTML += `
        <div class="category_option" onclick="selectCategory(${i})">
        <span>${category_select['name']}<span class="all-colors" style="background-color: ${category_select['color']}"></span></span>
        </div>`
    }
}

function closeCategorySelection() {
    document.getElementById('category_selection').innerHTML = `
    <div class="selection" onclick="openCategorySelection()">
        <span>Select task category</span>
        <img class="dropdown-img" src="./assets/img/vector-2.png" alt="klick">
    </div>`;
}

function createNewCategory() {
    document.getElementById('category_selection').innerHTML = `
    <div class="category-input">
    <input class="input-category" type="text" placeholder="New Category Name" min="3" maxlength="32" required id="new-category-name">
    <span class="all-colors" id="selected-color"></span>
    <div class="category-icons">
        <img src="./assets/img/false-x.png" class="false-x" onclick="removeCategoryInput()"> | 
        <img src="./assets/img/checkmark.png" class="checkmark" onclick="addNewCategory()">
    </div></div>`;
    for (let i = 0; i < categoryColors.length; i++) {
        let color = categoryColors[i];
        document.getElementById('category_colors').innerHTML += `
        <span class="all-colors" style="background-color: ${color}" 
        id="selected-color-${i}" onclick="newCategoryColor('${color}', ${i})"></span>`;
    }
}

function newCategoryColor(color, i) {
    category_color = color
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
    if (category_color && newCategoryName) {
        category = ({
            'name': newCategoryName,
            'color': category_color
        });
        tempcategorys.push(category)
        document.getElementById('category_selection').innerHTML = `
        <span class="selectet_category" onclick="openCategorySelection()">${category['name']}
        <span class="all-colors" id="selected-color" style="background-color: ${category['color']}"></span></span>`;
        document.getElementById('category_colors').innerHTML = ``;
    }
    else if (newCategoryName) {
        document.getElementById('mistake-category-fields').innerHTML = 'Please select the color for the new category.';
    }
    else {
        document.getElementById('mistake-category-fields').innerHTML = 'Please enter a new category name.';
    }
}

function reopenExistigCategorys() {
    document.getElementById('category_selection').innerHTML = ` <div class="flex input-section" id="input-section">
    <span class="flex" id="dropdown-category">Select task category</span>
    <img class="dropdown-img" src="./assets/img/vector-2.png" alt="klick">
</div>`;
    existingCategories.innerHTML = '';
    for (let i = 0; i < selectedTaskValues.length; i++) {
        let category = selectedTaskValues[i];
        existingCategories.innerHTML += templateExistingCategories(i, category);
    }
}

function closePopup() {
    category = [];
    category_color = [];
    description = [];
    title = [];
    assignedpeople = [];
    duedate = [];
    newselectedPrio = [];
    subtasks = [];
    closeBoardPopup();
}

function openAssignToSelection() {
    document.getElementById('assign-container').innerHTML = `
    <div class="selection" onclick="closeAssignToSelection()">
        <span class="flex">Select contacts to assign</span>
        <img src="./assets/img/vector-2.png" alt="klick">
    </div>`;
    for (let i = 0; i < contactlist.length; i++) {
        let contact = contactlist[i];
        if (checkOnAssigned(contact) != false) {
            document.getElementById('assign-container').innerHTML += `
        <div class="contact">
            <label for="contact${i}">${contact['name']}</label>
            <input type="checkbox" id="contact${i}" onchange="assignContact('${contact['name']}', '${contact['icon']}', '${contact['iconcolor']}')" checked>
        </div>`;
        } else {
            document.getElementById('assign-container').innerHTML += `
        <div class="contact">
            <label for="contact${i}">${contact['name']}</label>
            <input type="checkbox" id="contact${i}" onchange="assignContact('${contact['name']}', '${contact['icon']}', '${contact['iconcolor']}')">
        </div>`;
        }
    }
    for (let j = 0; j < assignedpeople.length; j++) {
        let contact = assignedpeople[j];
        if (checkOnContacts(contact) == false) {
            document.getElementById('assign-container').innerHTML += `
        <div class="contact">
            <label for="contact${j + contacts.length}">${contact['name']}</label>
            <input type="checkbox" id="contact${j + contacts.length}" onchange="assignContact('${contact['name']}', '${contact['icon']}', '${contact['iconcolor']}')" checked>
        </div>`;
        }
    }
    document.getElementById('assign-container').innerHTML += `
    <div class="contact" onclick="assignNewPerson()">
        <span>Invite new contact</span>
        <img src="./assets/img/contact-icon.png">
    </div>
    `;
}

function checkOnAssignedpeople(contact) {
    for (let i = 0; i < assignedpeople.length; i++) {
        let name = assignedpeople[i]['name'];
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
    <div onclick="openAssignToSelection()">
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
    assignedpeople.push({ 'name': name, 'icon': icon, 'iconcolor': color, });
    /**email needs to be send to new contact*/
    document.getElementById('assign-container').innerHTML = `
    <div onclick="openAssignToSelection()">
        <span class="flex">Select contacts to assign</span>
        <img src="./assets/img/vector-2.png" alt="klick">
    </div>
    `;
    loadAssignedPeople();
}

function loadAssignedPeople() {
    document.getElementById('assignedpersons').innerHTML = ``;
    for (let i = 0; i < assignedpeople.length; i++) {
        let assigned = assignedpeople[i];
        document.getElementById('assignedpersons').innerHTML += `<div class="name" style="background-color: ${assigned['iconcolor']}">${assigned['icon']}</div>`
    }
}

function assignContact(name, icon, color) {
    let contact = { 'name': name, 'icon': icon, 'iconcolor': color }
    let index = indexOfAssign(contact);
    if (checkOnAssign(contact) == true) {
        assignetcontacts.splice(index, 1);
    } else {
        assignetcontacts.push({ 'name': name, 'icon': icon, 'iconcolor': color });
    }
    loadAssignedPeople();
}

function indexOfAssign(contact) {
    for (let i = 0; i < assignedpeople.length; i++) {
        let name = assignedpeople[i]['name'];
        if (name == contact['name']) {
            return i;
        }
    }
}

function checkOnAssign(contact) {
    for (let i = 0; i < assignedpeople.length; i++) {
        let name = assignedpeople[i]['name'];
        if (name == contact['name']) {
            return true;
        }
    }
    return false;
}

function checkOnContacts(contact) {
    for (let i = 0; i < contacts.length; i++) {
        let name = contacts[i]['name'];
        if (name == contact['name']) {
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
    newselectedPrio = prio;
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
    if (title && description && category && assignedpeople && duedate && newselectedPrio) {
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
                'user': assignedpeople,
            },
                'priority': newselectedPrio,
        },);
        for (let i = 0; i < subtasks.length; i++) {
            let subtask = subtasks[i];
            temptasklist[taskid]['subtasks']['tasks'].push(subtask);
        }
        let tasksasstring = JSON.stringify(temptasklist);
        await backend.setItem('tasklist', tasksasstring);
        checkCategoryNew();
        closePopup();
        initBoard();
    }
}

function checkCategoryNew() {
    if (categorys.includes(category)) {
    } else {
        categorys.push(category);
        categoryasstring = JSON.stringify(categorys);
        backend.setItem('categorys', categoryasstring);
    }
}

function transformDuedate() {
    let mynewDate = document.getElementById('duedate').value
    let year = mynewDate.slice(0, 4);
    let month = mynewDate.slice(5, 7);
    let day = mynewDate.slice(8);
    let newDuedate = year + month + day;
    return parseInt(newDuedate)
}
