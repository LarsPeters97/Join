let todos = [];
let inProgress = [];
let awaitFeedback = [];
let doneTasks = [];
let urgentTasks = [];
let user = [];

/**
 * Init function when body is loading. Loads tasks for the four processing categories and the urgent image, if a task has the priority urgent.
 */

async function summaryInit() {
  await includeHTML();
  await initGeneral();
  showGreeting();
  loadTodos();
  loadInProgress();
  loadAwaitFeedback();
  loadDoneTasks();
  loadUrgentTasks();
  loadTotalamount();
  urgentImage();
  setTimeout(summaryPage, 500);
}

/**
 * The background color of the sidebar gets darker in the area of the summary button.
 */

function summaryPage() {
  document.getElementById("sidebar_summary_mobile").classList.add("background-color");
  document.getElementById("sidebar_summary").classList.add("background-color");
}

/**
 * Showing the individual greeting slogan with the name of the current user.
 */
function showGreeting() {
  let dateNow = new Date();
  let hours = dateNow.getHours();
  let greetingSlogan = returnGreetingSlogan(hours);
  document.getElementById("greeting-slogan").innerHTML = greetingSlogan;
  document.getElementById("greeting-slogan-mobile").innerHTML = greetingSlogan;
  document.getElementById("greet").innerHTML = currentUser.name;
  document.getElementById("greeting-name").innerHTML = currentUser.name;
}

/**
 * @param {number} hours - the hours of time now
 * @returns the daytime greeting slogan
 */

function returnGreetingSlogan(hours) {
  let greetingSlogan;
  if (hours < 6 || hours > 22) {
    greetingSlogan = "Good night, ";
  }
  if (hours >= 6 && hours < 10) {
    greetingSlogan = "Good morning, ";
  }
  if (hours >= 10 && hours < 17) {
    greetingSlogan = "Have a nice day, ";
  }
  if (hours >= 17 && hours <= 22) {
    greetingSlogan = "Good evening, ";
  }
  return greetingSlogan;
}

/**
 * Filtering the array for the value todo.
 */
function loadTodos() {
  todos = currentUser.tasks.filter((t) => t["progress"] == "todo");
  document.getElementById("amount-todo").innerHTML = `<b>${todos.length}</b>`;
}

/**
 * Filtering the array for the value in progress.
 */
function loadInProgress() {
  inProgress = currentUser.tasks.filter((t) => t["progress"] == "inprogress");
  document.getElementById("amount-progress").innerHTML = `<b>${inProgress.length}</b>`;
}

/**
 * Filtering the array for the value await feedback.
 */
function loadAwaitFeedback() {
  awaitFeedback = currentUser.tasks.filter((t) => t["progress"] == "awaitfeedback");
  document.getElementById("amount-feedback").innerHTML = `<b>${awaitFeedback.length}</b>`;
}

/**
 * Filtering the array for the value done tasks.
 */
function loadDoneTasks() {
  doneTasks = currentUser.tasks.filter((t) => t["progress"] == "donetask");
  document.getElementById("amount-done").innerHTML = `<b>${doneTasks.length}</b>`;
}
/**
 * Filtering the array of the value urgent and sort the date.
 */
function loadUrgentTasks() {
  urgentTasks = currentUser.tasks.filter((t) => t["progress"] != "donetask");
  urgentTasks = urgentTasks.filter((t) => t["priority"] == "urgent");
  if (urgentTasks.length > 0) {
    urgentTasks = urgentTasks.sort((a, b) => {
      if (a.duedate < b.duedate) {
        return -1;
      }
    });
    document.getElementById("amount-urgent").innerHTML = `<b>${urgentTasks.length}</b>`;
    let duedate = dueDate(urgentTasks);
    document.getElementById("upcoming-date").innerHTML = `<b>${duedate}</b>`;
  } else {
    document.getElementById("amount-urgent").innerHTML = "0";
  }
}

/**
 * Filtering the array for the total tasks number.
 */

function loadTotalamount() {
  document.getElementById("amount-total").innerHTML = `<b>${currentUser.tasks.length}</b>`;
}

/**
 * Filtering the array, for the value urgent tasks.
 */

function urgentImage() {
  urgentTasks = currentUser.tasks.filter((t) => t["progress"] != "donetask");
  urgentTasks = urgentTasks.filter((t) => t["priority"] == "urgent");
  if (urgentTasks.length > 0) {
    return removeClassDnone("urgent-img");
  }
}
