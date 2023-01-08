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
    <div class="flex input-section" onclick="reopenExistigCategorys()">
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
    <input class="input-category" type="text" placeholder="New Category Name" min="3" maxlength="32" required id="new-category-name">
    <div class="flex category-icons">
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
    <div class="flex input-section" onclick="reopenExistigCategorys()"><span class="flex" id="dropdown-category">${newCategoryName} 
        <span class="dot margin-color" style="background-color: ${selectedCategoryColor}"></span></span>
        <img class="dropdown-img" src="./assets/img/vector-2.png" alt="klick">`;
}

/**
 * @returns the category field with the text Select task category
 */

function templateSelectTaskCategory() {
    return /*html*/` 
    <div class="flex input-section" id="input-section" onclick="checkIfCategoryContainerOpen()">
        <span class="flex" id="dropdown-category">Select task category</span>
        <img class="dropdown-img" src="./assets/img/vector-2.png" alt="klick">
    </div>`;
}