let categories = [{
    'name': 'Sales',
    'color': '#FC71FF'
},
{
    'name': 'Backoffice',
    'color': '#1FD7C1'
}];


let selectedCategoryColor;
let selectedTaskValues = [];
let selectedCategoryValues = [];
let taskCategoryFinaly = [];
let taskCategoryColorFinaly = [];
let categoryColors = ['#FC71FF', '#1FD7C1', '#8AA4FF', '#FF0000', '#2AD300', '#FF8A00', '#E200BE', '#0038FF'];
let newCategoryName = [];


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
            subTask: checkedSubtaskValue,
            taskID: tasks.length,
            priority: prioritySelect,
            assignedTo: contactCheckedValue,
            taskStatus: selectedTaskStatus,
        });
        window.location.href = "board.html";
}

async function init() {
    await downloadFromServer();
    categories = JSON.parse(backend.getItem("categories")) || [];
}


function showClearImgLightBlue() {
    document.getElementById('clear-img').src = './assets/img/clear-x-light-blue.svg';
}


function showClearImgDarkBlue() {
    document.getElementById('clear-img').src = './assets/img/clear-x.svg';
}


function openNewCategoryAndExistingCategories() {
    document.getElementById('new-category').classList.remove('d-none');
    let existingCategories = document.getElementById('existing-categories');
    existingCategories.innerHTML = '';
    for (let i = 0; i < categories.length; i++) {
        let category = categories[i];
        existingCategories.innerHTML += templateExistingCategories(i, category);
    }
}


function templateExistingCategories(i, category) {
    return /*html*/`
    <div class="dropdown-category-existing select-bg-color" onclick="selectedCategory(${i})">
        <span class="flex">${category['name']}</span><span class="dot" style="background-color: ${category['color']}"></span>        
    </div>`;
}


function selectedCategory(i) {
    document.getElementById('new-category').classList.add('d-none');
    document.getElementById('category-container').style.borderRadius = '9px';
    let existingCategories = document.getElementById('existing-categories');
    existingCategories.innerHTML = '';
    let categoryContainer = document.getElementById('category-container');
    categoryContainer.innerHTML = templateSelectedCategory(i);
}


function templateSelectedCategory(i) {
    return /*html*/`
        <span class="flex">Category: ${categories[i]['name']}</span>
        <span class="dot" style="background-color: ${categories[i]['color']}"></span>`;
}


function createNewCategory() {
    document.getElementById('new-category').classList.add('d-none');
    document.getElementById('existing-categories').classList.add('d-none');
    document.getElementById('category-container').style.borderRadius = '9px';
    colorsForNewCategory();

    let categoryContainer = document.getElementById('category-container');
    categoryContainer.innerHTML = templateCreateNewCategory();
}


function templateCreateNewCategory() {
    return /*html*/`
    <input class="input-category" type="text" placeholder="New Category Name" min="3" maxlength="32" required id="new-category-name">
    <span class="dot" id="selected-color" style="margin-left: 16px;"></span>
    <div class="flex category-icons">
        <img src="./assets/img/false-x.png" class="false-x"> | <img src="./assets/img/checkmark.png" class="checkmark" onclick="addNewCategory()">
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
        document.getElementById('categories-for-colors').innerHTML = '';
        document.getElementById('selected-color').style.backgroundColor = `${categoryColor}`;
        document.getElementById('mistake-category-fields').innerHTML = '';
    }
    else {
        document.getElementById('mistake-category-fields').innerHTML = 'Please enter a new category name first.';
    }
}


function addNewCategory() {
    newCategoryName = document.getElementById('new-category-name').value;
    if(selectedCategoryColor && newCategoryName) {
        selectedTaskValues = JSON.parse(localStorage.getItem("task-category")) || [];
        selectedTaskValues.push({
            taskCategoryName: newCategoryName,
            taskColor: selectedCategoryColor
        });
        document.getElementById('category-container').innerHTML = `<span class="flex" id="dropdown-category">${newCategoryName} <span class="all-colors" style="background-color: ${selectedCategoryColor}"></span></span><img src="./assets/img/vector-2.png" alt="klick" onclick="reopenExistigCategorys()">`;
    }
    else {
        document.getElementById('mistake-category-fields').innerHTML = 'Please select the color for the new category.';
    }
}

function reopenExistigCategorys() {
    
}