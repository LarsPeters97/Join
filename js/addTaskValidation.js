/**
 * Checks if the value of the input field is equal to zero. If so, the global variable formValidation is set to false and a message is displayed
 * under the input field.
 * @param {string} mistakeField is the first part of the id of the html-element, where the errors are displayed.
 * @param {string} inputValue is the value of the input field.
 */

function checkInput(mistakeField, inputValue) {
    let mandatoryFieldMessage = document.getElementById(`${mistakeField}-required`);
    if (inputValue.length == 0) {
        formValidation = false;
        mandatoryFieldMessage.innerHTML = 'This field is required.';
    }
}

/**
 * Checks if the category is currently selected or not. And when newCategoryName is undefined, 
 * the global variable formValidation is set to false and a message is displayed.
 */

function checkCategory() {
    let mandatoryFieldCategory = document.getElementById('mistake-category-fields');
    if (!newCategoryName) {
        formValidation = false;
        mandatoryFieldCategory.innerHTML = 'Please select a category.';
    }
}

/**
 * Checks if the array assignedToContacts is empty. If so, the global variable formValidation is set to false and a message is displayed.
 */

function checkAssigned() {
    let mandatoryFieldAssignedTo = document.getElementById('assigned-to-contacts-required');
    if (assignedToContacts.length == 0) {
        formValidation = false;
        mandatoryFieldAssignedTo.innerHTML = 'Please assign at least one contact.';
    }
}

/**
 * Checks if the global variable date isn't declared or when the global variable date is declared, if the date is smaller than 
 * the variable today. If so, the global variable formValidation is set to false and a message is displayed. 
 */

function checkDueDate() {
    let mandatoryFieldDate = document.getElementById('date-required');
    let today = dateTodayAsNumber();
    if (!date || date < today) {
        formValidation = false;
        mandatoryFieldDate.innerHTML = 'Invalid date. Select today or a future date.';
    }
}

/**
 * @returns @param {number} todayAsNumber which shows the date by year, months and days as a number.
 */

function dateTodayAsNumber() {
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    let todayAsNumber = (year * 10000) + (month * 100) + day;
    return todayAsNumber;
}

/**
 * Checks if the global variable priorityNameForTask is undefined. 
 * If so, the global variable formValidation is set to false and a message is displayed. 
 */

function checkPriority() {
    let mandantoryFieldPriority = document.getElementById('priority-required');
    if (!priorityNameForTask) {
        formValidation = false;
        mandantoryFieldPriority.innerHTML = 'Please select a priority.';
    }
}

/**
 * Deletes the Mistake Message. For this, the function is called with the corresponding id.
 * @param {string} mistakeField will get the id of the html-element, which displays the mistakes. 
 */

function deleteMistakeMessage(mistakeField) {
    document.getElementById(`${mistakeField}`).innerHTML = '';
}

/**
 * The variable is declared with all the elements with the class mistake-category-fields. 
 * A for loop iterates through the individual elements and removes the contents of the innerHTML. 
 */

function clearMistakeCategoryFields() {
    let mistakefields = document.getElementsByClassName('mistake-category-fields');
    for (let i = 0; i < mistakefields.length; i++) {
        mistakefields[i].innerHTML = '';
    }
}
