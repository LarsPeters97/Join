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
let categoryColors = ['#FC71FF', '#1FD7C1', '#8AA4FF', '#FF0000', '#2AD300', '#FF8A00', '#E200BE', '#0038FF'];

async function initAddTaskPopup(){
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
    categorys = JSON.parse(backend.getItem("categorys")) || [{'name': 'General Topics', 'color': '#FC71FF'}];
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
    <div class="category" onclick="createNewCategory()">
        <span>New category</span>
    </div>`;
    for (let i = 0; i < categorys.length; i++) {
        let category_select = categorys[i];
        document.getElementById('category_selection').innerHTML += `
        <div class="category" onclick="selectCategory(${i})">
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

function closePopup() {
    closeBoardPopup();
}