/**
 * @returns the html code for the small task cards on the board.
 */

function toDoTemplate(id, color, category, title, description, subtasks, completedtasks, assignedIconToThree, priority, next, previus) {
  let width = (completedtasks / subtasks) * 100;
  return /*html*/ `
    <div class="todo" draggable=true ondragstart="startDragging(${id})" onclick="openTask(${id})">
        <div class="category" style="background-color: ${color}">${category}</div>
        <div class="title">${title}</div>
        <div class="description">${description.slice(0, 50)}</div>
        <div class="subtaskbar">
            <div class="progress">
                <div class="progress-bar" style="width: ${width}%">
                </div>
            </div>${completedtasks}/${subtasks} Done
        </div>
        <div class="todofooter">
            <div class="assigned">${assignedIconToThree}
            </div>
            <img src="assets/img/${priority}.png" alt="${priority}">
        </div>
    </div>
        <div class="mobile-buttons">
            <button class="up" onclick="moveTask(${id}, '${previus}')">previous</button>
            <button class="down" onclick="moveTask(${id}, '${next}')">next</button>
        </div>`;
}

/**
 * @param {string} id name of the current progression, e.g. todo.
 * @returns a drag area spot for the curret dragged task.
 */

function addDragarea(id) {
  return /*html*/ `
    <div id="${id}" class="dragarea" ondrop="drop('${id}')" ondragover="allowDrop(event); highlight('${id}')" ondragleave="removeHighlight('${id}')"></div>
    `;
}

/**
 * @returns the html code that no person is asssigned.
 */

function noAssignedPersonsTemplate() {
  return /*html*/ `<div class="number">N/A</div>`;
}

/**
 * @param {Array} assignedTo Array of the assigned user.
 * @returns one icon for the assigned person.
 */

function oneAssignedPersonsTemplate(assignedTo) {
  return /*html*/ `<div class="round-icon-name" style="background-color: ${assignedTo[0]["iconcolor"]}">${assignedTo[0]["icon"]}</div>`;
}

/**
 * @param {Array} assignedTo Array of the two assigned users.
 * @returns two icons for the assigned persons.
 */

function twoAssignedPersonsTemplate(assignedTo) {
  return /*html*/ `<div class="round-icon-name" style="background-color: ${assignedTo[0]["iconcolor"]}">
    ${assignedTo[0]["icon"]}</div><div class="round-icon-name" style="background-color: ${assignedTo[1]["iconcolor"]}">${assignedTo[1]["icon"]}</div>`;
}

/**
 * @param {Array} assignedTo Array of assigned three users.
 * @returns three icons for the assigned persons.
 */

function threeAssignedPersonsTemplate(assignedTo) {
  return /*html*/ `<div class="round-icon-name" style="background-color: ${assignedTo[0]["iconcolor"]}">
    ${assignedTo[0]["icon"]}</div><div class="round-icon-name" style="background-color: ${assignedTo[1]["iconcolor"]}">
    ${assignedTo[1]["icon"]}</div><div class="round-icon-name" style="background-color: ${assignedTo[2]["iconcolor"]}">${assignedTo[2]["icon"]}</div>`;
}

/**
 * @param {Array} assignedTo Array of assigned users.
 * @returns mire than three icons for the assigned persons.
 */

function moreAssignedPersonsTemplate(assignedTo) {
  let number = assignedTo.length - 2;
  return /*html*/ `<div class="round-icon-name" style="background-color: ${assignedTo[0]["iconcolor"]}">
    ${assignedTo[0]["icon"]}</div><div class="round-icon-name" style="background-color: ${assignedTo[1]["iconcolor"]}">
    ${assignedTo[1]["icon"]}</div><div class="number">+${number}</div>`;
}
