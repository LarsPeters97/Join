/**
 * Fills the currentTask with the values of the variables. The currentTask will be then added to the tasks created so far.
 *  @param {string} progressStatus is todo, inprogress, awaitfeedback or donetask.
 *  @param {number} taskId is equal to the current length of the array currentUser.tasks.
 */

async function addTask(progressStatus, taskId) {
  formValidation = true;
  let taskInputTitle = document.getElementById("input-title").value;
  let description = document.getElementById("description").value;
  performValidation(taskInputTitle, description);
  if (formValidation) {
    let currentTask = currentTaskValues(taskInputTitle, description, progressStatus, taskId);
    currentUser.tasks.push(currentTask);
    await backend.setItem("users", JSON.stringify(users));
    clearTask();
    showMessageAndMoveToBoard("message-background", "message-task-added");
  }
}

/**
 * Performs validation of the add task fields and if a default is not met there, the boolean variable is set to false.
 * @param {string} taskInputTitle is the entering title of the task.
 * @param {string} description is the entering description of the task.
 */

function performValidation(taskInputTitle, description) {
  convertDate();
  checkInput("title", taskInputTitle);
  checkInput("description", description);
  checkCategory();
  checkAssigned();
  checkDueDate();
  checkPriority();
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
 * @param {string} backgorundContainer is the dom Id for the background container
 * @param {string} messageTaskAdded is the dom Id for the Message Container.
 */

function showMessageAndMoveToBoard(backgorundContainer, messageTaskAdded) {
  if (window.location.pathname === "/Join/add_task.html" || window.location.pathname === "/Join/contact.html") {
    document.getElementById(backgorundContainer).style.display = "flex";
    document.getElementById(messageTaskAdded).classList.add("showMessage");
    setTimeout(() => {
      document.getElementById(backgorundContainer).style.display = "none";
      document.getElementById(messageTaskAdded).classList.remove("showMessage");
      redirectToBoardPage();
    }, 2200);
  } else {
    redirectToBoardPage();
  }
}
