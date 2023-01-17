/**
 * Fills the currentTask with the values of the variables. The currentTask will be then added to the tasks created so far.
 */

function addTask() {
    formValidation = true;
    let taskInputTitle = document.getElementById('input-title').value;
    let description = document.getElementById('description').value;
    convertDate();
    checkInput('title', taskInputTitle);
    checkInput('description', description);
    checkCategory();
    checkAssigned();
    checkDueDate();
    checkPriority();
    if (formValidation) {
        let currentTask = currentTaskValues(taskInputTitle, description);
        tasklist.push(currentTask);
        saveCurrentTask();
        clearTask();
        redirectToBoardPage();
    }
    }


/**
 * @returns the values of the fields for the current task to the variable currentTask.
 */

function currentTaskValues(taskInputTitle, description) {
    return {
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
    newCategoryName = undefined;
    selectedCategoryColor = undefined;
    addClassDnone('existing-contacts');
    renderAssignedToIconsSection();
    renderPrioButtonsSection();
    closeSubtaskInputField();
    subtasksForCurrenttask = [];
    renderSubtasks();
    focusOnField('input-title');
    clearMistakeCategoryFields();
}

/**
 * Creates and saves the just created task and clears the task fields again. At the end it will be redirected to the page board.html .
 */

async function createNewTask() {
    await loadTasklistForId();
    assignedToContactsForCurrentTask();
    priorityForCurrentTask();
    addTask();
}

/**
 * Saves all tasks in the backend with the key "tasklist". 
 */

function saveCurrentTask() {
    let tasklistAsString = JSON.stringify(tasklist);
    backend.setItem("tasklist", tasklistAsString);
}
