let subtasksForCurrenttask = [];
let taskid;
let date;
let priorityNameForTask;
let tasklist = [];
let selectedCategoryColor;
let selectedTaskValues = [];
let selectedCategoryValues = [];
let assignedToContacts = [];
let contactsForCurrentTask = [];
let newCategoryName;
let categoryColors = ['#FC71FF', '#1FD7C1', '#8AA4FF', '#FF0000', '#2AD300', '#FF8A00', '#E200BE', '#0038FF'];
let userIconColors = ['#800000', '#3cb44b', '#000075', '#f58231', '#911eb4', '#000000', '##ffe119', '#9A6324', '#469990'];

let categories = [{
    'name': 'General topics',
    'color': '#FC71FF'
}];

let priorities = [
    {
        'name': 'urgent',
        'image': './assets/img/urgent.svg',
        'selected-image': './assets/img/urgent-white.svg',
        'color': '#FF3D00'
    },
    {
        'name': 'medium',
        'image': './assets/img/medium.svg',
        'selected-image': './assets/img/medium-white.svg',
        'color': '#FFA800'
    },
    {
        'name': 'low',
        'image': './assets/img/low.svg',
        'selected-image': './assets/img/low-white.svg',
        'color': '#7AE229'
    }
]

let contacts = [
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
/**
 * Displays the initials of a contact below the contacts dropdown when the contact is selected
 * Or it removes the initials from being displayed if the selection of the contact is removed
 * 
 * @param {Array} iconArray - the array in which the indexes of the selected users/contacts are save (can either be contacts or usersContact)
 * @param {number} i - index of the clicked contact 
 */

/**
 * Fills the currentTask with the values of the variables. The currentTask will be then added to the tasks created so far.
 */

function addTask() {
    let taskInputTitle = document.getElementById('input-title').value;
    let description = document.getElementById('description').value;
    let currentTask = {
        'progress': 'todo',
        'id': taskid,
        'category': {
            'color': selectedCategoryColor,
            'categoryName': newCategoryName,
        },
        'duedate': parseInt(date),
        'title': taskInputTitle,
        'description': description,
        'subtasks': {
            'tasks': subtasksForCurrenttask
        },
        'assignedTo': {
            'user': contactsForCurrentTask
        },
        'priority': priorityNameForTask,
    };
    tasklist.push(currentTask);
}

/**
 * Saves the categories on the local storage with the key 'task-category'. When add.task.html is loaded the categories are 
 * assigned to the selectedTaskValues array.
 */

async function initialize() {
    let categoriesasString = JSON.stringify(categories);
    localStorage.setItem('task-category', categoriesasString);
    selectedTaskValues = JSON.parse(localStorage.getItem('task-category'));
    renderPrioButtonsSection();
    category = await JSON.parse(backend.getItem('category')) || [];
}

/**
 * Changes the image from the clear Button, so it will be displayed in light blue whe the user hovers over the button.
 */

function showClearImgLightBlue() {
    document.getElementById('clear-img').src = './assets/img/clear-x-light-blue.svg';
}

/**
 * Is called with the event-handler onmouseout, so it will displayed a dark blue, if the user no longer hovers over the button.
 */

function showClearImgDarkBlue() {
    document.getElementById('clear-img').src = './assets/img/clear-x.svg';
}

/**
 * Checks if the category-container is open or not. It is checked with the classList.contains method. When it is open
 * and the user clicks, the if statement notes that the class List ist not been added, through which the else state is executed.
 */

function checkIfCategoryContainerOpen() {
    let newCategory = document.getElementById('new-category');
    if (newCategory.classList.contains('d-none')) {
        openNewCategoryAndExistingCategories();
    }
    else {
        closeNewCategoryAndExistingCategories();
    }
}

/**
 * Renders the already existing categories from the array selectedTaskValues, which is saved in the local storage.
 */

function openNewCategoryAndExistingCategories() {
    let existingCategories = document.getElementById('existing-categories');
    existingCategories.innerHTML = '';
    for (let i = 0; i < selectedTaskValues.length; i++) {
        let category = selectedTaskValues[i];
        existingCategories.innerHTML += templateExistingCategories(i, category);
    }
    removeClassDnone('new-category');
    removeClassDnone('existing-categories');
}

/**
 * Closes the categories by adding the class d-none (display: none).
 * The function is used in the function checkIfCategoryContainerOpen.
 */

function closeNewCategoryAndExistingCategories() {
    addClassDnone('existing-categories');
    addClassDnone('new-category');
}

/**
 * When on category is clicked, the clicked function is displayed in the category-field.
 * @param {number} i is the chosen category form the array categories
 */

function selectedCategory(i) {
    selectedCategoryVariables(i);
    addClassDnone('new-category');
    document.getElementById('existing-categories').innerHTML = '';
    let categoryContainer = document.getElementById('category-container');
    categoryContainer.innerHTML = templateSelectedCategory();
}

/**
 * Declares the global variables with newCategoryName and selectedCategoryColor with the selected category values.
 * @param {number} i is the chosen category form the array categories
 */

function selectedCategoryVariables(i) {
    newCategoryName = selectedTaskValues[i]['name'];
    selectedCategoryColor = selectedTaskValues[i]['color'];
}

/**
 * Sets the category input field ready to create a new category and declares the global variables with newCategoryName 
 * and selectedCategoryColor as undefined so that the variables can be new declared for the new category.
 */

function createNewCategory() {
    addClassDnone('new-category');
    addClassDnone('existing-categories');
    newCategoryName = undefined;
    selectedCategoryColor = undefined;
    colorsForNewCategory();
    let categoryContainer = document.getElementById('category-container');
    categoryContainer.innerHTML = templateCreateNewCategory();
}

/**
 * If the input field is set for a new category and the x is clicked, this function removes the input and sets the Categor field 
 * to its original version.
 */

function removeCategoryInput() {
    document.getElementById('categories-for-colors').classList.remove('colors');
    document.getElementById('mistake-category-fields').innerHTML = '';
    document.getElementById('categories-for-colors').innerHTML = '';
    document.getElementById('category-container').innerHTML = templateOriginalCategoryField();
}

/**
 * Renders the colors from the array categoryColors.
 */

function colorsForNewCategory() {
    let categoriesForColors = document.getElementById('categories-for-colors');
    categoriesForColors.classList.add('colors');
    for (let c = 0; c < categoryColors.length; c++) {
        categoryColor = categoryColors[c];
        categoriesForColors.innerHTML += templateColorsForNewCategory(c, categoryColor);
    }
}

/**
 * The global variable selectedCategoryColor gets the selected category color value and if not you get a request to select a color.
 * @param {*} categoryColor is the string of the hex color code on the current iteration
 * @param {*} colorIndex is the selected Color Number frm the array categoryColors
 */

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

/**
 * When selectedCategoryColor and newCategoryName are filled a new Category will be created. If not, 
 * the user gets explains which data is missing.
 */

function addNewCategory() {
    newCategoryName = document.getElementById('new-category-name').value;
    if (selectedCategoryColor && newCategoryName) {
        whenCategoryNameAndColorAreSelected();
    }
    else {
        whenCategoryNameOrColorMissing();
    }
}

/**
 * A new category is pushed in the array selectedTaskValues and the just now created category gets filled in the Category field.
 */

function whenCategoryNameAndColorAreSelected() {
    selectedTaskValues.push({
        'name': newCategoryName,
        'color': selectedCategoryColor
    });
    let TaskValuesAsString = JSON.stringify(selectedTaskValues);
    localStorage.setItem('task-category', TaskValuesAsString);
    document.getElementById('category-container').innerHTML = templateNewSelectedCategory();
    document.getElementById('categories-for-colors').innerHTML = '';
    document.getElementById('categories-for-colors').classList.remove('colors');
}

/**
 * If one of the variables are undefinded, respectively when color or name isnt filled yet.
 */

function whenCategoryNameOrColorMissing() {
    if (newCategoryName) {
        document.getElementById('mistake-category-fields').innerHTML = 'Please select the color for the new category.';
    }
    else {
        document.getElementById('mistake-category-fields').innerHTML = 'Please enter a new category name first.';
    }
}

/**
 * Reopens the original Select task category field and the existing categories.
 */

function reOpenExistigCategorys() {
    document.getElementById('category-container').innerHTML = templateOriginalCategoryField();
    openNewCategoryAndExistingCategories();
}


/**
 * Checks if contacts for Assignment are visible by using the classList.contains method.
 */

function checkIfAssignedToIsOpen() {
    let existingContacts = document.getElementById('existing-contacts');
    if (existingContacts.classList.contains('d-none')) {
        openExistingContacts();
    }
    else {
        addClassDnone('existing-contacts');
    }
}

/**
 * Renders the contacts from the array contacts and seperates them into the ones who are in the array assignedToContacts and who are not
 * this array. It is done to divide them, into the checked contacts, which the user has clicked on, and the contacts who aren´t checed.
 */


function openExistingContacts() {
    removeClassDnone('existing-contacts');
    let existingContacts = document.getElementById('existing-contacts');
    existingContacts.innerHTML = '';

    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        let findIndex = assignedToContacts.indexOf(i);
        if (assignedToContactIsInArray(findIndex)) {
            existingContacts.innerHTML += templateExistingContactsChecked(i, contact);
        }
        else {
            existingContacts.innerHTML += templateExistingContacts(i, contact);
        }
    }
}

/**
 * 
 * @param {number} findIndex is the result of the indexOf mehthod used for the array assignedToContacts.
 * @returns -1 if the number of the contact i isn´t in the array assignedToContacts. 
 * And if it is, it returns the place, where the i is in the array.
 */

function assignedToContactIsInArray(findIndex) {
    return findIndex > -1;
}

/**
 * checks if the contact is already in the array assignedToContacts or not. After that the selected Contacts gets rendered.
 * @param {number} i is the number in which position the clicked contact i the array is.
 */

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

/**
 * Deletes the i from the array assignedToContacts on the position of findIndex.
 * @param {number} findIndex is the result of the indexOf method used for the array assignedToContacts.
 */

function removeAssignedToIcon(findIndex) {
    assignedToContacts.splice(findIndex, 1);
}

/**
 * I from the array contacts is pushed in the array assignedToContacts.
 * @param {number} i is the number in which position the clicked contact i the array is.
 */

function addAssignedToIcon(i) {
    assignedToContacts.push(i);
}

/**
 * When the current task is created, the selected numbers from the assignedToContacts Array are used to get the whole contact Object from
 * the JSON contacts array and they are pushed in the array contactsForCurrentTask.
 */

function assignedToContactsForCurrentTask() {
    for (let i = 0; i < assignedToContacts.length; i++) {
        let contactNumber = assignedToContacts[i];
        contactsForCurrentTask.push(contacts[contactNumber]);
    }
}

/**
 * Renders the Icons from the assignedToContacts Array.
 */

function renderAssignedToIconsSection() {
    let assignedToIconsSection = document.getElementById('assigned-to-icons-section');
    assignedToIconsSection.innerHTML = '';
    for (let i = 0; i < assignedToContacts.length; i++) {
        assignedToIndex = assignedToContacts[i];
        assignedToIconsSection.innerHTML += templateAssignedToContactIcons(assignedToIndex);
    }
}

/**
 * Converts the date to a string with the year first, the month second, and the days third.
 */

function convertDate() {
    let dueDate = document.getElementById('due-date').value;
    let year = dueDate.slice(0, 4);
    let month = dueDate.slice(5, 7);
    let day = dueDate.slice(8, 10);
    date = year + month + day;
}

/**
 * Renders the priority buttons from the array priorities.
 */

function renderPrioButtonsSection() {
    let prioButtonsSection = document.getElementById('prio-buttons-section');
    prioButtonsSection.innerHTML = '';
    for (let i = 0; i < priorities.length; i++) {
        prioButtonsSection.innerHTML += templatePrioButtonsSection(i);
    }
}

/**
 * Selected pririty button gets highlighted and if another button was clicked before, the button returns to his original design.
 * @param {number} i is the selected position from the array priorities
 */

function selectedPriority(i) {
    changeStyleOfSelectedButton(i);
    resetOtherPriorityButtons(i);
}

/**
 * Changes background color and font color from the selected priority button or removes the style when selected buttn gets clicked again.
 * @param {number} i is the selected position from the array priorities
 */

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

/**
 * Styles the clicked button with a new background color and the font color white.
 * @param {string} button is the id name of the clicked element, e.g.urgent 
 * @param {number} i is the position of the clicked button in the array priorities
 */

function addSelectedButtonStyle(button, i) {
    button.style.backgroundColor = `${priorities[i]['color']}`;
    button.classList.add('white');
    document.getElementById(`img-${i}`).src = `${priorities[i]['selected-image']}`;
}

/**
 * Checks if a button was clicked before another button has been clicked.
 * @param {number} i is the position of the unclicked button in the array priorities.
 */

function resetOtherPriorityButtons(i) {
    for (let p = 0; p < priorities.length; p++) {
        let priorityId = priorities[p]['name'];
        let button = document.getElementById(priorityId);
        if (p != i && button.classList.contains('white')) {
            removeStyleOfUnclickedButton(button, p);
        }
    }
}

/**  
 * Removes the style of the unclicked button to his original style.
 * @param {string} button is the id name of the unclicked element, e.g.urgent.
 * @param {number} p is the position of the unclicked button in the array priorities
 */

function removeStyleOfUnclickedButton(button, p) {
    document.getElementById(`img-${p}`).src = `${priorities[p]['image']}`;
    button.style.backgroundColor = 'white';
    button.classList.remove('white');
}

/**
 * When the task gets created, the current clicked priority button which is stored in the variable priorityId is assigned to the 
 * global variable priorityNameForTask.
 */

function priorityForCurrentTask() {
    for (let i = 0; i < priorities.length; i++) {
        let priorityId = priorities[i]['name'];
        let button = document.getElementById(priorityId);
        if (button.classList.contains('white')) {
            priorityNameForTask = priorityId;
        }
    }
}

/**
 * Changes the input field to the actual input field, where the subtask can be entered or removed.
 */

function changeSubtaskInputField() {
    addClassDnone('subtask-before');
    removeClassDnone('subtask-after');
    focusOnField('input-subtask-area');
}

/**
 * Focus on the input field is highlighted.
 * @param {string} idElement gets the id of a Document Object Model Element.
 */

function focusOnField(idElement) {
    document.getElementById(idElement).focus();
}

/**
 * Closes the SubtaskInput Field by showing the original div with the id 'subtask-before'.
 */

function closeSubtaskInputField() { 
    removeClassDnone('subtask-before');
    addClassDnone('subtask-after');
    document.getElementById('subtask-to-short').innerHTML = '';
    document.getElementById('input-subtask-area').value = '';
}

/**
 * If the value of the subtask input is bigger than 3, the subtask will be added with the function addSubtask. If not, an 
 * error message is displayed.
 */

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

/**
 * Pushes the input of the subtask in the array subtasksForCurrenttask. Since the task is not yet processed the completeted variable is
 * is set to false.
 * @param {string} inputSubtask is the value of the input subtask field which the user has entered.
 */

function addSubtask(inputSubtask) {
    subtasksForCurrenttask.push({ task: inputSubtask, completed: false });
    renderSubtasks();
}

/**
 * Renders the elements depending on the completet status. If the completed status is false the function templateRenderSubtasksNotCompleted
 * is executed. And if the completed status is true the function templateRenderSubtasksWhichAreCompleted is executed.
 */

function renderSubtasks() {
    let subtaskList = document.getElementById('subtask-list');
    subtaskList.innerHTML = '';
    for (let i = 0; i < subtasksForCurrenttask.length; i++) {
        let taskElement = subtasksForCurrenttask[i];
        if (checkCompletedStatus(i) == false) {
            subtaskList.innerHTML += templateRenderSubtasksNotCompleted(taskElement, i);
        }
        else {
            subtaskList.innerHTML += templateRenderSubtasksWhichAreCompleted(taskElement, i);
        }
    }
}

/**
 * @param {number} i is the position of the selected subtask in the array subtasksForCurrenttask.
 * @returns the Boolean value of completed in the array subtasksForCurrenttask at the position i.
 */

function checkCompletedStatus(i) {
    if (!subtasksForCurrenttask[i].completed) {
        return false;
    }
    else {
        return true;
    }
}

/**
 * The completed boolean value gets changed in dependence of the currentCheckbox status at the position if, when the input checkbox
 * gets clicked.
 * @param {number*} i is the position of the selected subtask in the array subtasksForCurrenttask.
 */

function changeCurrentCompleteStatus(i) {
    let currentCheckbox = document.getElementById(`checkbox-${i}`);
    if (currentCheckbox.checked) {
        subtasksForCurrenttask[i].completed = true;
    }
    else {
        subtasksForCurrenttask[i].completed = false;
    }
}

/**
 * Clears the Fields that are already filled and the arrays for the currentTask gets cleared too.
 */

function clearTask() {
    deleteInputandTextareaValues();
    removeCategoryInput();
    assignedToContacts = [];
    contactsForCurrentTask = [];
    addClassDnone('existing-contacts');
    renderAssignedToIconsSection();
    renderPrioButtonsSection();
    closeSubtaskInputField();
    subtasksForCurrenttask = [];
    renderSubtasks();
    focusOnField('input-title');
}

/**
 * Clears the input fields values.
 */

function deleteInputandTextareaValues() {
    document.getElementById('input-title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('due-date').value = '';
    document.getElementById('input-subtask-area').value = '';
}

/**
 * Creates and saves the just created task and clears the task fields again. At the end it will be redirected to the page board.html .
 */

async function createNewTask() {
    await loadTasklistForId();
    assignedToContactsForCurrentTask();
    priorityForCurrentTask();
    addTask();
    saveCurrentTask();
    clearTask();
    redirectToBoardPage();
}

/**
 * Taskid gets the number from the tasklist.length. This will be the identification number for the current task.
 */

function getIdFromTasklist() {
    taskid = tasklist.length
}

/**
 * All tasks already created are loaded from the server to get the id number for the currentTask with the function getIdFromTasklist.
 */

async function loadTasklistForId() {
    setURL("https://gruppe-397.developerakademie.net/smallest_backend_ever");
    await downloadFromServer();
    tasklist = JSON.parse(backend.getItem("tasklist")) || [];
    getIdFromTasklist();
}

/**
 * Saves all tasks in the backend with the key "tasklist". 
 */

function saveCurrentTask() {
    let tasklistAsString = JSON.stringify(tasklist);
    backend.setItem("tasklist", tasklistAsString);
}

/**
 * User is redirected to board.html.
 */

function redirectToBoardPage() {
    window.location.pathname = "./board.html";
}

/**
 * This function removes the class d-none, so the Element is there.
 * @param {string} idElement is the id of the HTML-Element
 */

function removeClassDnone(idElement) {
    document.getElementById(idElement).classList.remove('d-none');
}

/**
 This function adds the class d-none, so the Element is not there.
 * @param {string} idElement is the id of the HTML-Element
 */

function addClassDnone(idElement) {
    document.getElementById(idElement).classList.add('d-none');
}
