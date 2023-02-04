// /**
//  * creates a category option
//  *
//  * @param {integer} i index of the option
//  * @param {string} name name of the option
//  * @param {string} color affiliated color of the option
//  * @returns template
//  */
// function templateCategoryOption(i, name, color) {
//     return `
//         <div class="category_option" onclick="selectCategory(${i})">
//         <span>${name}<span class="all-colors" style="background-color: ${color}"></span></span>
//         </div>`
// }

// /**
//  * template for open category dropdown
//  *
//  * @returns template
//  */
// function templateOpenCategorySelection() {
//     return `
//     <div class="selection" onclick="closeCategorySelection()">
//         <span>Select task category</span>
//         <img class="dropdown-img" src="./assets/img/vector-2.png" alt="klick">
//     </div>
//     <div class="category_option" onclick="createNewCategory()">
//         <span>New category</span>
//     </div>`
// }

// /**
//  * closes dropdown of the category selection
//  */
// function closeCategorySelection() {
//     document.getElementById('category_selection').innerHTML = `
//     <div class="selection" onclick="openCategorySelection()">
//         <span>Select task category</span>
//         <img class="dropdown-img" src="./assets/img/vector-2.png" alt="klick">
//     </div>`
// }

// /**
//  * template of the category inputfield
//  *
//  * @returns template
//  */
// function templateCreateNewCategoryInput() {
//     return `
//     <div class="category-input">
//     <input class="input-category" type="text" placeholder="New Category Name" min="3" maxlength="32" required id="new-category-name">
//     <span class="all-colors" id="selected-color"></span>
//     <div class="category-icons">
//         <img src="./assets/img/false-x.png" class="false-x" onclick="removeCategoryInput()"> |
//         <img src="./assets/img/checkmark.png" class="checkmark" onclick="addNewCategory()">
//     </div></div>`
// }

// function selectCategory(index) {
//     category = tempCategorys[index];
//     document.getElementById('category_selection').innerHTML = `
//     <span class="selectet_category" onclick="openCategorySelection()">${category['name']}
//     <span class="all-colors" id="selected-color" style="background-color: ${category['color']}"></span></span>`
// }

// function templateNewCategory(name, color) {
//     return `
//         <span class="selectet_category" onclick="openCategorySelection()">${name}
//         <span class="all-colors" id="selected-color" style="background-color: ${color}"></span></span>`;
// }

// function templateOpenAssignToSelection() {
//     return `
//     <div class="selection" onclick="closeAssignToSelection()">
//         <span class="flex">Select contacts to assign</span>
//         <img src="./assets/img/vector-2.png" alt="klick">
//     </div>`
// }

// function templateAssignedContactSelection(i, name, icon, iconcolor) {
//     return `
//         <div class="contact_selection">
//             <label for="contact${i}">${name}</label>
//             <input type="checkbox" id="contact${i}" onchange="assignContact('${name}', '${icon}', '${iconcolor}')" checked>
//         </div>`;
// }

// function templateNotAssignedContactSelection(i, name, icon, iconcolor) {
//     return `
//         <div class="contact_selection">
//             <label for="contact${i}">${name}</label>
//             <input type="checkbox" id="contact${i}" onchange="assignContact('${name}', '${icon}', '${iconcolor}')">
//         </div>`;
// }

// function templateInvitePerson() {
//     return `
//     <div class="contact_selection" onclick="assignNewPerson()">
//         <span>Invite new contact</span>
//         <img src="./assets/img/invite-contact.png">
//     </div>
//     `;
// }

// function assignNewPerson() {
//     document.getElementById('assign-container').innerHTML = `
//     <div class="newcontact">
//         <input type="email" placeholder="Contact email" id="email">
//         <div class="check">
//             <img src="./assets/img/false-x.png" onclick="exitNewPerson()">
//             |
//             <img src="./assets/img/checkmark.png" onclick="addNewPerson()">
//         </div>
//     </div>
//     `
// }

// function exitNewPerson() {
//     document.getElementById('assign-container').innerHTML = `
//     <div class="selection" onclick="openAssignToSelection()">
//         <span class="flex">Select contacts to assign</span>
//         <img src="./assets/img/vector-2.png" alt="klick">
//     </div>
//     `;
// }

// function templateOfClosedDropdownAssignToSelection() {
//     return `
//     <div class="selection" onclick="openAssignToSelection()">
//         <span class="flex">Select contacts to assign</span>
//         <img src="./assets/img/vector-2.png" alt="klick">
//     </div>`;
// }

// function closeAssignToSelection() {
//     document.getElementById('assign-container').innerHTML = `
//     <div class="selection" onclick="openAssignToSelection()">
//         <span class="flex">Select contacts to assign</span>
//         <img src="./assets/img/vector-2.png" alt="klick">
//     </div>`
// }

// function addInput() {
//     document.getElementById('subtaskinput').innerHTML = `
//     <input class="inputarea_subtask" type="text" minlength="2" maxlength="100" id="input-subtask">
//     <div id="subtask-icons" class="subtask_icons">
//         <img src="./assets/img/false-x.png" class="false-x" onclick="clearSubtaskInput()">
//         |
//         <img src="./assets/img/checkmark.png" class="checkmark" onclick="checkSubtaskInput()">
//     </div>
//     `;
// }

// function templateSubtasks(taskElement, i) {
//     return `
//         <div class="subtask_checkbox ">
//             <input type="checkbox" id="checkbox-${i}" class="input_subtask" onchange="changeCompleteStatus(${i})">
//             <label for="checkbox-${i}" class="margin-checkbox">${taskElement['task']}</label>
//         </div>
//         `;
// }

// function templateSubtasksCompleted(taskElement, i) {
//     return `
//         <div class="subtask_checkbox flex-start">
//             <input type="checkbox" id="checkbox-${i}" class="input_subtask" onchange="changeCompleteStatus(${i})" checked>
//             <label for="checkbox-${i}" class="margin-checkbox">${taskElement['task']}</label>
//         </div>
//         `;
// }

function addTaskPopupTemplate(progressStatus) {
  return /*html*/ `
    <div class="background-popup" onclick="checkIfPopupShouldBeClosed()"></div>
    <div id="add-contact-section"></div>
    <div class="add_task_popup">
            <div class="add-task-mobile-head">
                <img class="logo-mobile" src="./assets/img/logo_blue.png" alt="" />
                <button class="create-btn btns-clear-and-create create-btn-responsive" onclick="createNewTask()">Create
                <img src="./assets/img/create-check.svg" id="create-responsive"></button>
    </div>
    <div class="pop-up-body">
        <div class="headline-and-close">
            <h1 class="headline-task">Add Task</h1>
            <img src="./assets/img/false-x.png" alt="Close" onclick="closePopup()">
        </div>
        <div class="flex change-direction">
            <div class="left-side flex column">

                <div class="title flex column margin-for-fields">
                    <span class="header-for-fields">Title</span>
                    <input class="input-text-type width-f" type="text" min="2" max="40" placeholder="Enter a title"
                        id="input-title" oninput="deleteMistakeMessage('title-required')">
                    <span id="title-required" class="mistake-category-fields"></span>
                </div>

                <div class="description flex column margin-for-fields">
                    <span class="header-for-fields">Description</span>
                    <textarea class="width-f" name="description" id="description" maxlength="500"
                        placeholder="Enter a Description"
                        oninput="deleteMistakeMessage('description-required')"></textarea>
                    <span id="description-required" class="mistake-category-fields"></span>
                </div>

                <div class="flex column margin-for-fields">
                    <span class="header-for-fields">Category</span>
                    <div class="dropdown-category-container width-f" id="dropdown-category-container">
                        <div class="dropdown-category border-radius-fields" id="category-container">
                            <div class="flex input-section" onclick="checkIfCategoryContainerOpen()"
                                id="input-section">
                                <span class="flex" id="dropdown-category">Select task category</span>
                                <img class="dropdown-img" src="./assets/img/vector-2.png" alt="klick">
                            </div>
                        </div>
                        <div class="dropdown-category select-bg-color d-none" id="new-category"
                            onclick="createNewCategory()">
                            <span class="flex">New Category</span><img src="./assets/img/plus-subtask.png">
                        </div>
                        <div id="existing-categories" class="max-height-and-scroll"></div>
                    </div>
                    <div id="categories-for-colors" class="flex"></div>
                    <div id="mistake-category-fields" class="mistake-category-fields"></div>
                </div>


                <div class="flex column margin-for-fields">
                    <span class="header-for-fields">Assigned to</span>
                    <div class="dropdown-category-container width-f" id="assigned-container">
                        <div class="dropdown-category border-radius-fields" id="contact-container">
                            <div class="flex input-section" onclick="checkIfAssignedToIsOpen()"
                                id="assigned-contacts">
                                <span class="flex">Select contacts to assign</span>
                                <img class="dropdown-img" src="./assets/img/vector-2.png" alt="klick">
                            </div>
                        </div>
                        <div id="existing-contacts" class="d-none max-height-and-scroll"></div>
                    </div>
                    <div id="assigned-to-icons-section" class="flex width-f"></div>
                    <span id="assigned-to-contacts-required" class="mistake-category-fields"></span>
                </div>
            
            </div>

            <div class="right-side flex column">
                <div class="due-date flex column margin-for-fields">
                    <span class="header-for-fields">Due date</span>
                    <input type="date" placeholder="dd/mm/yyyy" id="due-date"
                        class="width-f" oninput="deleteMistakeMessage('date-required')">
                    <span id="date-required" class="mistake-category-fields"></span>
                </div>

                <div class="flex column margin-for-fields">
                    <span class="header-for-fields">Prio</span>
                    <div class="flex prio-buttons-section width-f" id="prio-buttons-section"></div>
                    <span id="priority-required" class="mistake-category-fields"></span>
                </div>
                <div class="flex column margin-for-fields">
                    <span class="header-for-fields">Subtasks</span>
                    <div id="subtasks-section" class="width-f">
                        <div class="input-text-type subtask" id="subtask-before"
                            onclick="changeSubtaskInputField()">
                            <input class="input-subtask" type="text" min="2" max="100"
                                placeholder="Add new subtask">
                            <div id="subtask-icons">
                                <img src="./assets/img/plus-subtask.png" alt="Add" id="subtask-plus">
                            </div>
                        </div>
                        <div class="input-text-type subtask d-none" id="subtask-after">
                            <input class="input-subtask" type="text" minlength="2" maxlength="100"
                                id="input-subtask-area" name="input-subtask">
                            <div id="subtask-icons" class="flex">
                                <img src="./assets/img/false-x.png" class="false-x"
                                    onclick="closeSubtaskInputField()"> |
                                <img src="./assets/img/checkmark.png" class="checkmark"
                                    onclick="checkSubtaskInputValue()">
                            </div>
                        </div>
                    </div>
                    <div id="subtask-to-short" class="mistake-category-fields"></div>
                    <div id="subtask-list" class="flex column">
                    </div>
                    <div class="task-btns">
                        <button type="reset" class="clear-btn btns-clear-and-create desktop-clear-btn"
                        onmouseover="showClearImgLightBlue()" onclick="clearTask()"
                        onmouseout="showClearImgDarkBlue()">Clear <img src="./assets/img/clear-x.svg" id="clear-img"
                            id="clear-img"></button>
                        <button class="create-btn btns-clear-and-create desktop-create-btn" onclick="createNewTask('${progressStatus}')">Create Task
                        <img src="./assets/img/create-check.svg" id="create-img"></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`;
}
