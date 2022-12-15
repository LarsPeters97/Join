function taskformTemplate(category, color, title, description, duedate, priority) {
    return `
<div class="background" onclick="closePopup()">
</div>
    <div class="taskform">
        <div>
            <div class="category" style="background-color: ${color}">${category}</div>
            <h2>${title}</h2>
            <p>${description}</p>
            <div class="duedate"><b>Due date:</b> ${duedate}</div>
            <div class="priority"><b>Priority:</b><div class="prioicon ${priority}">${priority}<img src="assets/img/${priority}.svg"></div></div>
            <div class="subtasks"><b>Subtasks:</b></div>
            <div class="subtaskwindow" id="subtasks"></div>
            <div class="assignedto"><b>Assigned To:</b>
                <div id="assignedto"></div>
            </div>
        </div>
            <div class="close" onclick="closePopup()">x</div>
            <div class="edit"><img src="../assets/img/edit-button.png" alt="edit"></div>
    </div>`;
}

function renderAssignedTo(assignedTo) {
    for (let i = 0; i < assignedTo['user'].length; i++) {
        let user = assignedTo['user'][i];
        document.getElementById('assignedto').innerHTML += `
        <div class="user"><div class="name" style="background-color: ${user['iconcolor']}">${user['icon']}</div>${user['name']}</div>
        `;
    };
}

function renderSubTasks(id) {
    for (let i = 0; i < tasklist[id]['subtasks']['tasks'].length; i++) {
        let subtask = tasklist[id]['subtasks']['tasks'][i];
        if (subtask['completed'] == false){
        document.getElementById('subtasks').innerHTML += `
        <div class="subtask"><input type="checkbox" id="${i}" onchange="taskStatusChange(${i}, ${id})"><label for="${i}">${subtask['task']}</label></div>
        `;}else {
        document.getElementById('subtasks').innerHTML += `
        <div class="subtask"><input type="checkbox" id="${i}" onchange="taskStatusChange(${i}, ${id})" checked><label for="${i}">${subtask['task']}</label></div>
        `;
        }
    }
}

function editTaskTemplate() {
    return `
    <div class="background" onclick="closePopup()"></div>
    <div class="taskform">
        <div class="title"></div>
        <div class="close" onclick="closePopup()">x</div>
        <div class="edit"><img src="../assets/img/edit-button.png" alt="edit"></div>
    </div>
    `;
}

function taskStatusChange(task, id){
    if (tasklist[id]['subtasks']['tasks'][task]['completed'] == true){
        tasklist[id]['subtasks']['tasks'][task]['completed'] = false;
    } else {
        tasklist[id]['subtasks']['tasks'][task]['completed'] = true;
    }
    save();
    loadAll();
    renderBoard();
}