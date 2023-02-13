/**
 * Fills the currentTask with the values of the variables. The currentTask will be then added to the tasks created so far.
 *  @param {string} progressStatus is todo, inprogress, awaitfeedback or donetask.
 *  @param {number} taskId is equal to the current length of the array currentUser.tasks.
 */

async function addTask(progressStatus, taskId) {
  formValidation = true;
  let taskInputTitle = document.getElementById("input-title").value;
  let description = document.getElementById("description").value;
  convertDate();
  checkInput("title", taskInputTitle);
  checkInput("description", description);
  checkCategory();
  checkAssigned();
  checkDueDate();
  checkPriority();
  if (formValidation) {
    let currentTask = currentTaskValues(taskInputTitle, description, progressStatus, taskId);
    currentUser.tasks.push(currentTask);
    await backend.setItem("users", JSON.stringify(users));
    clearTask();
    showMessageAndMoveToBoard("message-task-added");
  }
}

/**
 * @returns the values of the fields for the current task to the variable currentTask.
 */

function currentTaskValues(taskInputTitle, description, progressStatus, taskId) {
  return {
    progress: progressStatus,
    id: taskId,
    category: {
      color: selectedCategoryColor,
      categoryName: newCategoryName,
    },
    duedate: parseInt(date),
    title: taskInputTitle,
    description: description,
    subtasks: {
      tasks: subtasksForCurrenttask,
    },
    assignedTo: {
      user: contactsForCurrentTask,
    },
    priority: priorityNameForTask,
  };
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
  addClassDnone("existing-contacts");
  renderAssignedToIconsSection();
  renderPrioButtonsSection();
  closeSubtaskInputField();
  subtasksForCurrenttask = [];
  renderSubtasks();
  clearMistakeCategoryFields();
}

/**
 * Creates and saves the just created task and clears the task fields again. At the end it will be redirected to the page board.html .
 * @param {string} progressStatus is todo, inprogress, awaitfeedback or donetask.
 */

async function createNewTask(progressStatus) {
  taskId = currentUser.tasks.length;
  assignedToContactsForCurrentTask();
  priorityForCurrentTask();
  addTask(progressStatus, taskId);
}

/**
 * When the task is created on the add_task.html page, the message that the task is added to the board is displayed.
 * After that the board.html page is called.
 * @param {string} messageID is the dom Id for the Message Container.
 */

function showMessageAndMoveToBoard(messageID) {
  if (window.location.pathname === "/add_task.html") {
    let noteContainer = document.getElementById(messageID);
    noteContainer.style.display = "flex";
    noteContainer.classList.add("showMessage");
    setTimeout(() => {
      noteContainer.style.display = "none";
      noteContainer.classList.remove("showMessage");
      redirectToBoardPage();
    }, 2000);
  } else {
    redirectToBoardPage();
  }
}
