/**
 * @param {number} i is the index of the category in the array selectedTaskValues that will be displayed in the current iteration
 * @param {string} category is the JSON Object of the current iteration
 * @returns the existing categories and they can be selected through the function selectedCategry
 */

function templateExistingCategories(i, category) {
    return /*html*/`
    <div class="dropdown-category-existing select-bg-color" onclick="selectedCategory(${i})">
        <span class="flex">${category['name']}<span class="dot margin-color" style="background-color: ${category['color']}"></span></span>        
    </div>`;
}

/**
 * @returns the html code for the selected Category with the opportunity to reopen and selected another category
 */

function templateSelectedCategory() {
    return /*html*/`
    <div class="flex input-section" onclick="reOpenExistigCategorys()">
        <span class="flex" id="dropdown-category">${newCategoryName} 
        <span class="dot margin-color" style="background-color: ${selectedCategoryColor}"></span></span>
        <img class="dropdown-img" src="./assets/img/vector-2.png" alt="klick">
    </div>`;
}

/**
 * 
 * @returns the input field to create a new Category.
 */

function templateCreateNewCategory() {
    return /*html*/`
    <input class="input-category-contact" type="text" placeholder="New Category Name" min="3" maxlength="32" required id="new-category-name">
    <div class="flex delete-and-create-icons-section">
        <img src="./assets/img/false-x.png" class="false-x" onclick="removeCategoryInput()"> | 
        <img src="./assets/img/checkmark.png" class="checkmark" onclick="addNewCategory()">
    </div>`;
}

/**
 * @returns the original Category Input Section
 */

function templateOriginalCategoryField() {
    return /*html*/`
    <div class="flex input-section" id="input-section" onclick="checkIfCategoryContainerOpen()">
    <span class="flex" id="dropdown-category">Select task category</span>
    <img class="dropdown-img" src="./assets/img/vector-2.png" alt="klick">
    </div>`;
}

/**
 * 
 * @param {number} colorIndex is the selected Color Number frm the Array categoryColors
 * @param {string} categoryColor is the string of the hex color code on the current iteration
 * @returns all the colors from the Array categoryColors so one can be selected
 */

function templateColorsForNewCategory(colorIndex, categoryColor) {
    return /*html*/`
    <span class="all-colors" style="background-color: ${categoryColor}" 
    id="selected-color-${colorIndex}" onclick="addNewCategoryColor('${categoryColor}', ${colorIndex})"></span>`;
}

/**
 * @returns the category input container with the just created category
 */

function templateNewSelectedCategory() {
    return /*html*/`
    <div class="flex input-section" onclick="reOpenExistigCategorys()"><span class="flex" id="dropdown-category">${newCategoryName} 
        <span class="dot margin-color" style="background-color: ${selectedCategoryColor}"></span></span>
        <img class="dropdown-img" src="./assets/img/vector-2.png" alt="klick">`;
}

/**
 * @param {number} i is the number of the position of the contact in the array.
 * @param {string} contact is the contact JSON object for the current iteration.
 * @returns a contact field for the checked contacts.
 */

function templateExistingContactsChecked(i, contact) {
    return /*html*/`

        <label for="checkbox${i}" class="flex checkbox-style dropdown-category-existing select-bg-color flex">    
                    <span>${contact['name']}</span>
                    <input value="${i}" id="checkbox${i}" type="checkbox" name="checkbox" checked
                    onclick="checkAssignedToIcons(${i})">
            </label>      
   `;
}

/**
 * @param {number} i is the number of the position of the contact in the array.
 * @param {string} contact is the contact JSON object for the current iteration.
 * @returns a contact field for the unchecked contacts.
 */

function templateExistingContacts(i, contact) {
    return /*html*/`

        <label for="checkbox${i}" class="flex checkbox-style dropdown-category-existing select-bg-color flex">    
                    <span>${contact['name']}</span>
                    <input value="${i}" id="checkbox${i}" type="checkbox" name="checkbox"
                    onclick="checkAssignedToIcons(${i})">
            </label>      
   `;
}

/**
 * 
 * @returns the new contact field.
 */

function templateInvitePerson() {
    return /*html*/`
    <div class="flex checkbox-style dropdown-category-existing select-bg-color flex" onclick="assignNewPerson()">
        <span>Invite new contact</span>
        <img src="./assets/img/invite-contact.png">
    </div>
    `;
}

/**
 * @returns the input field to assign a new Person with click on the checkmark  or remove the input with the x.
 */

function templateInputNewPerson() {
    return /*html*/`
    <div class="newcontact flex">
        <input class="input-category-contact" type="email" placeholder="Contact email" id="email">
        <div class="flex delete-and-create-icons-section">
            <img src="./assets/img/false-x.png" class="false-x" onclick="templateExitNewPerson()">
            |
            <img src="./assets/img/checkmark.png" class="checkmark" onclick="addNewPerson()">
        </div>
    </div>
    `
}

/**
 * Reset to original content. Dropdown assign contacts can be opened again.
 */

function templateExitNewPerson() {
    document.getElementById('contact-container').innerHTML = 
    /*html*/`
    <div class="flex input-section" onclick="checkIfAssignedToIsOpen()" id="assigned-contacts">
        <span class="flex">Select contacts to assign</span>
        <img class="dropdown-img" src="./assets/img/vector-2.png" alt="klick">
    </div>`;
}


/**
 * 
 * @param {number} assignedToIndex is the number of the position in the contact array
 * @returns the icons that are in the array assignedToContacts.
 */

function templateAssignedToContactIcons(assignedToIndex) {
    return /*html*/`
    <div class="round-icon-name icons-add-task" style="background-color: ${contacts[assignedToIndex]['iconcolor']}">
    ${contacts[assignedToIndex]['icon']}</div>`;
}

/**
 * 
 * @param {number} i is the current iteration of the array priorities 
 * @returns the priority buttons.
 */

function templatePrioButtonsSection(i) {
    return /*html*/`
     <button id="${priorities[i]['name']}" type="button" class="prio-btns" onclick="selectedPriority(${i})">${priorities[i]['name']} 
     <img src="${priorities[i]['image']}" id="img-${i}"></button>`;
}

/**
 * @param {object} taskElement is in the array subtasksForCurrenttask on at the position i.
 * @param {number} i is the position in the array subtasksForCurrenttask for the current iteration.
 * @returns the unchecked subtasks.
 */

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

/**
 * 
 * @param {object} taskElement is in the array subtasksForCurrenttask on at the position i.
 * @param {number} i is the position in the array subtasksForCurrenttask for the current iteration.
 * @returns the checked subtasks.
 */

function templateRenderSubtasksWhichAreCompleted(taskElement, i) {
    return /*html*/`
    <div class="flex"> 
            <label for="checkbox-${i}" class="flex margin-checkbox">
                <input onclick="changeCurrentCompleteStatus(${i})" type="checkbox" id="checkbox-${i}" class="input-subtask" checked>
            </label>
            <div>${taskElement.task}</div>
        </div>`;
}