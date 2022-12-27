let categories = [{
    'name': 'General topics',
    'color': '#FC71FF'
}];

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
    <span class="dot" id="selected-color" style="margin-left: 16px;"></span>
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
    <div class="flex input-section" onclick="abc()" id="input-section">
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
    id="selected-color-${colorIndex}" onclick="addNewCategoryColor('${categoryColor}')"></span>`;
}


function addNewCategoryColor(categoryColor) {
    if (document.getElementById('new-category-name').value) {
        selectedCategoryColor = categoryColor;
        document.getElementById('selected-color').style.backgroundColor = `${categoryColor}`;
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
    document.getElementById('category-container').innerHTML = ` <div class="flex input-section" onclick="abc()" id="input-section">
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
        existingContacts.innerHTML += templateExistingContacts(i, contact);
    }
}


function templateExistingContacts(i, contact) {
    return /*html*/`
    <div class="dropdown-category-existing select-bg-color flex">
        <label for="checkbox${i}" class="flex checkbox-style">    
                    <span>${contact['name']}</span>
                    <input value="${i}" class="contacts-cb" id="checkbox${i}" type="checkbox" 
                    onclick="checkAssignedToIcons(${i})">
            </label>      
    </div>`;
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
    for(let i = 0; i < assignedToContacts.length; i++) {
        assignedToIndex = assignedToContacts[i];
        assignedToIconsSection.innerHTML += templateAssignedToContactIcons(assignedToIndex);
    }

    
}


function templateAssignedToContactIcons(assignedToIndex) {
    return /*html*/`
    <div class="name icons-add-task" style="background-color: ${contactExample[assignedToIndex]['iconcolor']}">
    ${contactExample[assignedToIndex]['icon']}</div>`;
}