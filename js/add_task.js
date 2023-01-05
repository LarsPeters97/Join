let tasks = [];

let categories = [{
    'name': 'General topics',
    'color': '#FC71FF'
}];

let priorities = [
    {
        'name': 'Urgent',
        'index': 0,
        'image': './assets/img/urgent.svg',
        'selected-image': './assets/img/urgent-white.svg',
        'color': '#FF3D00'
    },
    {
        'name': 'Medium',
        'index': 1,
        'image': './assets/img/medium.svg',
        'selected-image': './assets/img/medium-white.svg',
        'color': '#FFA800'
    },
    {
        'name': 'Low',
        'index': 2,
        'image': './assets/img/low.svg',
        'selected-image': './assets/img/low-white.svg',
        'color': '#7AE229'
    }
]

let contactExample = [
    {
        'name': 'me',
        'icon': 'ME',
        'iconcolor': '#800000'
    },
    {
        'name': 'Marcel Küpper',
        'icon': 'MK',
        'iconcolor': '#3cb44b'
    },
    {
        'name': 'Toni Jacobs',
        'icon': 'TJ',
        'iconcolor': '#000075'
    },
    {
        'name': 'Toni Jacobs',
        'icon': 'TJ',
        'iconcolor': '#000075'
    }];

let assignedToContacts = [];


let selectedCategoryColor;
let selectedTaskValues = [];
let selectedCategoryValues = [];
let categoryColors = ['#FC71FF', '#1FD7C1', '#8AA4FF', '#FF0000', '#2AD300', '#FF8A00', '#E200BE', '#0038FF'];
let userIconColors = ['#800000', '#3cb44b', '#000075', '#f58231', '#911eb4', '#000000', '##ffe119', '#9A6324', '#469990'];
let newCategoryName;


function addTask() {

    let taskInputTitle = document.getElementById('input-title').value;
    let description = document.getElementById('description').value;
    let dueDate = document.getElementById('due-date').value;
    tasks.push({
        taskTitle: taskInputTitle,
        taskDescription: description,
        toDueDate: dueDate,
        taskCategory: {
            Category: taskCategoryFinaly,
            TaskColor: taskCategoryColorFinaly
        },
        assignedTo: contactCheckedValue,
        subTask: checkedSubtaskValue,
        taskID: tasks.length,
        priority: prioritySelect
    });
    window.location.href = "board.html";
}


function initialize() {
    let categoriesasString = JSON.stringify(categories);
    localStorage.setItem('task-category', categoriesasString);
    selectedTaskValues = JSON.parse(localStorage.getItem('task-category'));
    renderPrioButtonsSection();
}


function showClearImgLightBlue() {
    document.getElementById('clear-img').src = './assets/img/clear-x-light-blue.svg';
}


function showClearImgDarkBlue() {
    document.getElementById('clear-img').src = './assets/img/clear-x.svg';
}


function openNewCategoryAndExistingCategories() {
    let existingCategories = document.getElementById('existing-categories');
    existingCategories.innerHTML = '';
    for (let i = 0; i < selectedTaskValues.length; i++) {
        let category = selectedTaskValues[i];
        existingCategories.innerHTML += templateExistingCategories(i, category);
    }
    document.getElementById('category-container').style.borderRadius = '9px 9px 0px 0px';
    document.getElementById('new-category').classList.remove('d-none');
    document.getElementById('existing-categories').classList.remove('d-none');
}


function closeNewCategoryAndExistingCategories() {
    document.getElementById('existing-categories').classList.add('d-none');
    document.getElementById('new-category').classList.add('d-none');
}

function checkIfCategoryContainerOpen() {
    let newCategory = document.getElementById('new-category');
    if (newCategory.classList.contains('d-none')) {
        openNewCategoryAndExistingCategories();
    }
    else {
        closeNewCategoryAndExistingCategories();
        document.getElementById('category-container').style.borderRadius = '9px 9px 9px 9px';
    }
}


function templateExistingCategories(i, category) {
    return /*html*/`
    <div class="dropdown-category-existing select-bg-color" onclick="selectedCategory(${i})">
        <span class="flex">${category['name']}<span class="dot margin-color" style="background-color: ${category['color']}"></span></span>        
    </div>`;
}


function selectedCategory(i) {
    newCategoryName = selectedTaskValues[i]['name'];
    selectedCategoryColor = selectedTaskValues[i]['color'];
    document.getElementById('new-category').classList.add('d-none');
    document.getElementById('category-container').style.borderRadius = '9px';
    let existingCategories = document.getElementById('existing-categories');
    existingCategories.innerHTML = '';
    let categoryContainer = document.getElementById('category-container');
    categoryContainer.innerHTML = templateSelectedCategory();
}


function templateSelectedCategory() {
    return /*html*/`
    <div class="flex input-section" onclick="reopenExistigCategorys()">
        <span class="flex" id="dropdown-category">${newCategoryName} 
        <span class="dot margin-color" style="background-color: ${selectedCategoryColor}"></span></span>
        <img class="dropdown-img" src="./assets/img/vector-2.png" alt="klick">
    </div>`;
}


function createNewCategory() {
    document.getElementById('new-category').classList.add('d-none');
    document.getElementById('existing-categories').classList.add('d-none');
    document.getElementById('category-container').style.borderRadius = '9px';
    newCategoryName = undefined;
    selectedCategoryColor = undefined;
    colorsForNewCategory();

    let categoryContainer = document.getElementById('category-container');
    categoryContainer.innerHTML = templateCreateNewCategory();
}


function templateCreateNewCategory() {
    return /*html*/`
    <input class="input-category" type="text" placeholder="New Category Name" min="3" maxlength="32" required id="new-category-name">
    <div class="flex category-icons">
        <img src="./assets/img/false-x.png" class="false-x" onclick="removeCategoryInput()"> | 
        <img src="./assets/img/checkmark.png" class="checkmark" onclick="addNewCategory()">
    </div>`;
}


function removeCategoryInput() {
    document.getElementById('category-container').style.borderRadius = '9px 9px 9px 9px';
    document.getElementById('mistake-category-fields').innerHTML = '';
    document.getElementById('categories-for-colors').innerHTML = '';
    document.getElementById('category-container').innerHTML = `
    <div class="flex input-section" id="input-section" onclick="checkIfCategoryContainerOpen()">
    <span class="flex" id="dropdown-category">Select task category</span>
    <img class="dropdown-img" src="./assets/img/vector-2.png" alt="klick">
    </div>`;

}


function colorsForNewCategory() {
    let categoriesForColors = document.getElementById('categories-for-colors');
    for (let c = 0; c < categoryColors.length; c++) {
        categoryColor = categoryColors[c];
        categoriesForColors.innerHTML += templateColorsForNewCategory(c, categoryColor);
    }
}


function templateColorsForNewCategory(colorIndex, categoryColor) {
    return /*html*/`
    <span class="all-colors" style="background-color: ${categoryColor}" 
    id="selected-color-${colorIndex}" onclick="addNewCategoryColor('${categoryColor}', ${colorIndex})"></span>`;
}


function addNewCategoryColor(categoryColor, colorIndex) {
    if (document.getElementById('new-category-name').value) {
        selectedCategoryColor = categoryColor;
        document.getElementById(`selected-color-${colorIndex}`).style.backgroundColor = `${categoryColor}`;
        document.getElementById('mistake-category-fields').innerHTML = '';
    }
    else {
        document.getElementById('mistake-category-fields').innerHTML = 'Please enter a new category name first.';
    }
}


function addNewCategory() {
    newCategoryName = document.getElementById('new-category-name').value;
    if (selectedCategoryColor && newCategoryName) {
        selectedTaskValues.push({
            'name': newCategoryName,
            'color': selectedCategoryColor
        });
        let TaskValuesAsString = JSON.stringify(selectedTaskValues);
        localStorage.setItem('task-category', TaskValuesAsString);
        document.getElementById('category-container').innerHTML = `
        <div class="flex input-section" onclick="reopenExistigCategorys()"><span class="flex" id="dropdown-category">${newCategoryName} 
        <span class="dot margin-color" style="background-color: ${selectedCategoryColor}"></span></span>
        <img class="dropdown-img" src="./assets/img/vector-2.png" alt="klick">`;
        document.getElementById('categories-for-colors').innerHTML = '';
    }
    else if (newCategoryName) {
        document.getElementById('mistake-category-fields').innerHTML = 'Please select the color for the new category.';
    }
    else {
        document.getElementById('mistake-category-fields').innerHTML = 'Please enter a new category name first.';
    }
}


function reopenExistigCategorys() {
    document.getElementById('new-category').classList.remove('d-none');
    document.getElementById('existing-categories').classList.remove('d-none');
    document.getElementById('category-container').innerHTML = ` <div class="flex input-section" id="input-section">
    <span class="flex" id="dropdown-category">Select task category</span>
    <img class="dropdown-img" src="./assets/img/vector-2.png" alt="klick">
</div>`;
    let existingCategories = document.getElementById('existing-categories');
    existingCategories.innerHTML = '';
    for (let i = 0; i < selectedTaskValues.length; i++) {
        let category = selectedTaskValues[i];
        existingCategories.innerHTML += templateExistingCategories(i, category);
    }
}


function closeDropdownCategory() {
    document.getElementById('new-category').classList.add('d-none');
    document.getElementById('existing-categories').classList.add('d-none');
    document.getElementById('category-container').innerHTML = `<span class="flex" id="dropdown-category">${newCategoryName} 
    <span class="all-colors" style="background-color: ${selectedCategoryColor}"></span></span>
    <img class="dropdown-img" src="./assets/img/vector-2.png" alt="klick" onclick="reopenExistigCategorys()">`;
}


function checkIfAssignedToIsOpen() {
    let existingContacts = document.getElementById('existing-contacts');
    if (existingContacts.classList.contains('d-none')) {
        openExistingContacts();
    }
    else {
        closeExistingContacts();
    }
}


function openExistingContacts() {
    document.getElementById('existing-contacts').classList.remove('d-none');
    let existingContacts = document.getElementById('existing-contacts');
    existingContacts.innerHTML = '';

    for (let i = 0; i < contactExample.length; i++) {
        let contact = contactExample[i];
        let findIndex = assignedToContacts.indexOf(i);
        if (assignedToContactIsInArray(findIndex)) {
            existingContacts.innerHTML += templateExistingContactsChecked(i, contact);
        }
        else {
            existingContacts.innerHTML += templateExistingContacts(i, contact);
        }
    }
}


function templateExistingContactsChecked(i, contact) {
    return /*html*/`

        <label for="checkbox${i}" class="flex checkbox-style dropdown-category-existing select-bg-color flex">    
                    <span>${contact['name']}</span>
                    <input value="${i}" id="checkbox${i}" type="checkbox" name="checkbox" checked
                    onclick="checkAssignedToIcons(${i})">
            </label>      
   `;
}


function templateExistingContacts(i, contact) {
    return /*html*/`

        <label for="checkbox${i}" class="flex checkbox-style dropdown-category-existing select-bg-color flex">    
                    <span>${contact['name']}</span>
                    <input value="${i}" id="checkbox${i}" type="checkbox" name="checkbox"
                    onclick="checkAssignedToIcons(${i})">
            </label>      
   `;
}


function closeExistingContacts() {
    document.getElementById('existing-contacts').classList.add('d-none');
}


function checkAssignedToIcons(i) {
    let findIndex = assignedToContacts.indexOf(i);
    if (assignedToContactIsInArray(findIndex)) {
        removeAssignedToIcon(findIndex);
    }
    else {
        addAssignedToIcon(i);
    }
    renderAssignedToIconsSection();
}


function assignedToContactIsInArray(findIndex) {
    return findIndex > -1;
}


function removeAssignedToIcon(findIndex) {
    assignedToContacts.splice(findIndex, 1);
}


function addAssignedToIcon(i) {
    assignedToContacts.push(i);
}


function renderAssignedToIconsSection() {
    let assignedToIconsSection = document.getElementById('assigned-to-icons-section');
    assignedToIconsSection.innerHTML = '';
    for (let i = 0; i < assignedToContacts.length; i++) {
        assignedToIndex = assignedToContacts[i];
        assignedToIconsSection.innerHTML += templateAssignedToContactIcons(assignedToIndex);
    }
}


function templateAssignedToContactIcons(assignedToIndex) {
    return /*html*/`
    <div class="name icons-add-task" style="background-color: ${contactExample[assignedToIndex]['iconcolor']}">
    ${contactExample[assignedToIndex]['icon']}</div>`;
}


function convertDate() {
    let dueDate = document.getElementById('due-date').value;
    let year = dueDate.slice(0, 4);
    let month = dueDate.slice(5, 7);
    let day = dueDate.slice(8, 10);
    let date = year + month + day;
    console.log(date);
}


function renderPrioButtonsSection() {
    let prioButtonsSection = document.getElementById('prio-buttons-section');
    prioButtonsSection.innerHTML = '';
    for (let i = 0; i < priorities.length; i++) {
        prioButtonsSection.innerHTML += templatePrioButtonsSection(i);
    }
}


function templatePrioButtonsSection(i) {
    return /*html*/`
     <button id="${priorities[i]['name']}" type="button" class="prio-btns" onclick="selectedPriority(${i})">${priorities[i]['name']} 
     <img src="${priorities[i]['image']}" id="img-${i}"></button>`;
}


function selectedPriority(i) {
    changeStyleOfSelectedButton(i);
    resetOtherPriorityButtons(i);
}


function changeStyleOfSelectedButton(i) {
    let id = priorities[i]['name'];
    let button = document.getElementById(id);
    if (!button.classList.contains('white')) {
        addSelectedButtonStyle(button, i);
    }
    else {
        removeStyleOfUnclickedButton(button, i);
    }
}


function addSelectedButtonStyle(button, i) {
    button.style.backgroundColor = `${priorities[i]['color']}`;
    button.classList.add('white');
    document.getElementById(`img-${i}`).src = `${priorities[i]['selected-image']}`;
}


function resetOtherPriorityButtons(i) {
    for (let j = 0; j < priorities.length; j++) {
        let id = priorities[j]['name'];
        let button = document.getElementById(id);
        if (j != i && button.classList.contains('white')) {
            removeStyleOfUnclickedButton(button, j);
        }
    }
}


function removeStyleOfUnclickedButton(button, j) {
    document.getElementById(`img-${j}`).src = `${priorities[j]['image']}`;
    button.style.backgroundColor = 'white';
    button.classList.remove('white');
}


function changeSubtaskInputField() {
    document.getElementById('subtask-before').classList.add('d-none');
    document.getElementById('subtask-after').classList.remove('d-none');
    focusOnField('input-subtask-area');
}


function focusOnField(idElement) {
    document.getElementById(idElement).focus();
}


function closeSubtaskInputField() {
    document.getElementById('subtask-before').classList.remove('d-none');
    document.getElementById('subtask-after').classList.add('d-none');
}





function checkSubtaskInputValue() {
    let inputSubtask = document.getElementById('input-subtask-area');
    let subtaskToShort = document.getElementById('subtask-to-short');
    if (inputSubtask.value.length < 3) {
        subtaskToShort.innerHTML = 'Your entry must be at least 3 characters long.';
    }
    else {
        subtaskToShort.innerHTML = '';
        addSubtask(inputSubtask.value);
        document.getElementById('input-subtask-area').value = '';
        closeSubtaskInputField();
    }
}

function addSubtask(inputSubtask) {
    tasks.push({ task: inputSubtask, completed: false });
    renderSubtasks();
}


function renderSubtasks() {
    let subtaskList = document.getElementById('subtask-list');
    subtaskList.innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {
        let taskElement = tasks[i];
        checkCompletedStatus(i);
        if (checkCompletedStatus(i) == false) {
            subtaskList.innerHTML += templateRenderSubtasksNotCompleted(taskElement, i);
        }
        else {
            subtaskList.innerHTML += templateRenderSubtasksWichAreCompleted(taskElement, i);
        }
    }
}


function templateRenderSubtasksNotCompleted(taskElement, i) {
    return /*html*/`
        <div class="flex"> 
            <label for="checkbox-${i}" class="flex margin-checkbox">
                <input type="checkbox" id="checkbox-${i}" class="input-subtask" onclick="changeCurrentCompleteStatus(${i})">
            </label>
            <div>${taskElement.task}</div>
        </div>
        `;
}


function templateRenderSubtasksWichAreCompleted(taskElement, i) {
    return /*html*/`
    <div class="flex"> 
            <label for="checkbox-${i}" class="flex margin-checkbox">
                <input onclick="changeCurrentCompleteStatus(${i})" type="checkbox" id="checkbox-${i}" class="input-subtask" checked>
            </label>
            <div>${taskElement.task}</div>
        </div>`;
}

{/* <label for="checkbox${i}" class="flex checkbox-style dropdown-category-existing select-bg-color flex">    
                    <span>${contact['name']}</span>
                    <input value="${i}" id="checkbox${i}" type="checkbox" name="checkbox" checked
                    onclick="checkAssignedToIcons(${i})">
            </label>       */}


function checkCompletedStatus(i) {
    if (!tasks[i].completed) {
        return false;
    }
    else {
        return true;
    }
}


function changeCurrentCompleteStatus(i) {
    let currentCheckbox = document.getElementById(`checkbox-${i}`);
    if (currentCheckbox.checked) {
        tasks[i].completed = true;
    }
    else {
        tasks[i].completed = false;
    }
}


function clearTask() {
    removeAllFields();
    addRequiredAttributeToEnableFormValidation();
}


function removeAllFields() {
    removeRequiredAttributeToDisableFormValidation();
    deleteInputandTextareaValues();
    removeCategoryInput();
    selectedTaskValues = [];
    assignedToContacts = [];
    closeExistingContacts();
    renderAssignedToIconsSection();
    renderPrioButtonsSection();
    closeSubtaskInputField();
    tasks = [];
    renderSubtasks();
    focusOnField('input-title');
}

function removeRequiredAttributeToDisableFormValidation() {
    let inputsAndTextareas = getInputsAndTextaresInOneArray();
    for (let i = 0; i < inputsAndTextareas.length; i++) {
        if (inputsAndTextareas[i].hasAttribute('required')) {
            inputsAndTextareas[i].removeAttribute('required');
        }
    }
}


function addRequiredAttributeToEnableFormValidation() {
    let inputsAndTextareas = getInputsAndTextaresInOneArray();
    for (let i = 0; i < inputsAndTextareas.length; i++) {
        if (!inputsAndTextareas[i].hasAttribute('required')) {
            inputsAndTextareas[i].setAttribute('required', '');
        }
    }
}


function getInputsAndTextaresInOneArray() {
    let inputs = document.getElementsByTagName('input');
    let textareas = document.getElementsByTagName('textarea');
    let arrayOfInputsAndTextareas = [...inputs, ...textareas];
    return arrayOfInputsAndTextareas;
}


function deleteInputandTextareaValues() {
    document.getElementById('input-title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('due-date').value = '';
    document.getElementById('input-subtask-area').value = '';
}

function createNewTask() {

}


