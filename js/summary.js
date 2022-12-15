
/**
 * init function when body is loading
 */
    function summaryInit() {
        includeHTML();
        showGreeting();
        showActiveUserIcon();
        loadTasksInformation();
}




/**
 * showing greeting slogan and username
 */
function showGreeting() {
   let dateNow = new Date();
   let hours = dateNow.getHours();
   let greetingSlogan = returnGreetingSlogan(hours);
   document.getElementById('greeting-slogan').innerHTML = greetingSlogan;
   document.getElementById('greeting-name').innerHTML = userAccounts[activeUser].userName;
}

/**
 * returning the daytime greeting slogan
 * @param {number} hours - the hours of time now
 * @returns - greeting slogan
 */
function returnGreetingSlogan(hours) {
   let greetingSlogan;
   if (hours < 6 || hours > 22) {
       greetingSlogan = 'Good night, ';
   }
   if (hours >= 6 && hours < 10) {
       greetingSlogan = 'Good morning, ';
   }
   if (hours >= 10 && hours < 17) {
       greetingSlogan = 'Have a nice day, ';
   }
   if (hours >= 17 && hours <= 22) {
       greetingSlogan = 'Good evening, ';
   }
   return greetingSlogan;
}

/**
 * showing different values of userTasks array
 * @param {JSON} userTasksArray - array with user tasks
 */
function showTasksInformation(userTasksArray) {
   showTasksInBoard(userTasksArray);
   showTasksWithStatus(userTasksArray, 'progress');
   showTasksWithStatus(userTasksArray, 'feedback');
   showTasksWithStatus(userTasksArray, 'done');
   showTasksWithStatus(userTasksArray, 'todo');
   showTasksWithPriority(userTasksArray, 'Hard');
}

/**
* loading tasks informations and creating an local array
*/
function loadTasksInformation() {
   let userTasksIds = userAccounts[activeUser].userTasks;
   userTasksArray = [];
   if (userTasksIds.length > 0) {
       for (let i = 0; i < userTasksIds.length; i++) {
           const taskId = userTasksIds[i];
           userTasksArray.push(tasks[taskId]);
       }
       showTasksInformation(userTasksArray);
   }
}

/**
* showing the number of all tasks in userTaks array
* @param {JSON} userTasksArray - array with user tasks
*/
function showTasksInBoard(userTasksArray) {
   let numberOfTasks = userTasksArray.length;
   document.getElementById('info-number-board').innerHTML = numberOfTasks;
}

/**
* showing numbers of tasks with specific status
* @param {JSON} userTasksArray - array with user tasks
* @param {string} taskStatus - status of task
*/
function showTasksWithStatus(userTasksArray, taskStatus) {
   let filterResult = userTasksArray.filter((t) => t.taskStatus.includes(taskStatus));
   let numberOfTasks = filterResult.length;
   document.getElementById(`info-number-${taskStatus}`).innerHTML = numberOfTasks;
}

/**
* showing numbers of tasks with specific priotity
* @param {JSON} userTasksArray - array with user tasks
* @param {string} taskStatus - status of task
*/
function showTasksWithPriority(userTasksArray, taskPriority) {
   let filterResult = userTasksArray.filter((t) => t.priority.includes(taskPriority));
   let numberOfTasks = filterResult.length;
   if (filterResult.length > 0) {
       document.getElementById(`info-number-${taskPriority}`).innerHTML = numberOfTasks;
       showTasksWithNextDate(filterResult);
   }
}

/**
* showing the upcoming date of the urgent tasks
* @param {JSON} filterResult - result of filtering urgent tasks
*/
function showTasksWithNextDate(filterResult) {
   let dateArray = [];
   let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
   for (let i = 0; i < filterResult.length; i++) {
       const taskDate = filterResult[i].toDueDate;
       let dateObject = new Date(taskDate);
       dateArray.push(dateObject);
   }
   dateArray.sort(function (a, b) {
       return a - b;
   });
   document.getElementById('info-date-deadline').innerHTML = dateArray[0].toLocaleDateString(undefined, options);
}
