let todos = [];
let inProgress = [];
let awaitFeedback = [];
let doneTasks = [];
let urgentTasks = [];

let tasklist =
    [
        {
            'progress': 'todo',
            'id': 0,
            'category': {
                'color': 'orange',
                'categoryName': 'Design',
            },
            'duedate': 20230114,
            'title': 'Website redesign',
            'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias magnam saepe laborum molestiae quod, sapiente, fugit atque enim repudiandae sunt, cumque totam quaerat commodi praesentium fuga? Non dolore ipsam porro',
            'subtasks': {
                'tasks': [
                    {
                        'task': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias magnam saepe laborum molestiae quod, sapiente, fugit atque enim repudiandae sunt, cumque totam quaerat commodi praesentium fuga? Non dolore ipsam porro.',
                        'completed': true,
                    },
                    {
                        'task': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias magnam saepe laborum molestiae quod, sapiente, fugit atque enim repudiandae sunt, cumque totam quaerat commodi praesentium fuga? Non dolore ipsam porro.',
                        'completed': false,
                    },
                ],
            },
            'assignedTo': {
                'user': [
                    {
                        'name': 'me',
                        'icon': 'ME',
                        'iconcolor': '#0190E0',
                    },
                    {
                        'name': 'Marcel Küpper',
                        'icon': 'MK',
                        'iconcolor': '#02CF2F',
                    },
                    {
                        'name': 'You',
                        'icon': 'Yo',
                        'iconcolor': '#FF5C00',
                    },
                    {
                        'name': 'Someone Else',
                        'icon': 'SE',
                        'iconcolor': '#9327FF',
                    },
                    {
                        'name': 'You',
                        'icon': 'Yo',
                        'iconcolor': '#FF5C00',
                    },
                    {
                        'name': 'Someone Else',
                        'icon': 'SE',
                        'iconcolor': '#9327FF',
                    },
                ]},
                'priority': 'urgent',
},
{
            'progress': 'todo',
            'id': 1,
            'category': {
                'color': 'orange',
                'categoryName': 'Design',
            },
            'duedate': 20221225,
            'title': 'Website redesign',
            'description': 'lorem ipsum',
            'subtasks': {
                'tasks': [
                    {
                        'task': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias magnam saepe laborum molestiae quod, sapiente, fugit atque enim repudiandae sunt, cumque totam quaerat commodi praesentium fuga? Non dolore ipsam porro.',
                        'completed': true,
                    },
                    {
                        'task': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias magnam saepe laborum molestiae quod, sapiente, fugit atque enim repudiandae sunt, cumque totam quaerat commodi praesentium fuga? Non dolore ipsam porro.',
                        'completed': false,
                    },
                    {
                        'task': 'lorem ipsum duo',
                        'completed': false,
                    },
                    {
                        'task': 'lorem ipsum duo',
                        'completed': false,
                    },
                ],
            },
            'assignedTo': {
                'user': [
                    {
                        'name': 'me',
                        'icon': 'ME',
                        'iconcolor': '#0190E0',
                    },
                    {
                        'name': 'Marcel Küpper',
                        'icon': 'MK',
                        'iconcolor': '#02CF2F',
                    },
                ]},
                'priority': 'urgent',
},
{
            'progress': 'todo',
            'id': 1,
            'category': {
                'color': 'orange',
                'categoryName': 'Design',
            },
            'duedate': 20221228,
            'title': 'Website redesign',
            'description': 'lorem ipsum',
            'subtasks': {
                'tasks': [
                    {
                        'task': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias magnam saepe laborum molestiae quod, sapiente, fugit atque enim repudiandae sunt, cumque totam quaerat commodi praesentium fuga? Non dolore ipsam porro.',
                        'completed': true,
                    },
                    {
                        'task': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias magnam saepe laborum molestiae quod, sapiente, fugit atque enim repudiandae sunt, cumque totam quaerat commodi praesentium fuga? Non dolore ipsam porro.',
                        'completed': false,
                    },
                    {
                        'task': 'lorem ipsum duo',
                        'completed': false,
                    },
                    {
                        'task': 'lorem ipsum duo',
                        'completed': false,
                    },
                ],
            },
            'assignedTo': {
                'user': [
                    {
                        'name': 'me',
                        'icon': 'ME',
                        'iconcolor': '#0190E0',
                    },
                    {
                        'name': 'Marcel Küpper',
                        'icon': 'MK',
                        'iconcolor': '#02CF2F',
                    },
                ]},
                'priority': 'urgent',
},
{
            'progress': 'donetask',
            'id': 1,
            'category': {
                'color': 'orange',
                'categoryName': 'Design',
            },
            'duedate': 20221230,
            'title': 'Website redesign',
            'description': 'lorem ipsum',
            'subtasks': {
                'tasks': [
                    {
                        'task': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias magnam saepe laborum molestiae quod, sapiente, fugit atque enim repudiandae sunt, cumque totam quaerat commodi praesentium fuga? Non dolore ipsam porro.',
                        'completed': true,
                    },
                    {
                        'task': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias magnam saepe laborum molestiae quod, sapiente, fugit atque enim repudiandae sunt, cumque totam quaerat commodi praesentium fuga? Non dolore ipsam porro.',
                        'completed': false,
                    },
                    {
                        'task': 'lorem ipsum duo',
                        'completed': false,
                    },
                    {
                        'task': 'lorem ipsum duo',
                        'completed': false,
                    },
                ],
            },
            'assignedTo': {
                'user': [
                    {
                        'name': 'me',
                        'icon': 'ME',
                        'iconcolor': '#0190E0',
                    },
                    {
                        'name': 'Marcel Küpper',
                        'icon': 'MK',
                        'iconcolor': '#02CF2F',
                    },
                ]},
                'priority': 'urgent',
}];

/**
 * init function when body is loading
 */
    function summaryInit() {
        includeHTML();
        loadTodos();
        loadInProgress();
        loadAwaitFeedback();
        loadDoneTasks();
        loadurgentTasks();
        loadTotalamount();
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

function loadTodos() {
    todos = tasklist.filter(t => t['progress'] == 'todo');
    document.getElementById('amount-todo').innerHTML = `<b>${todos.length}</b>`;
}

function loadInProgress() {
    inProgress = tasklist.filter(t => t['progress'] == 'inprogresss');
    document.getElementById('amount-progress').innerHTML = `<b>${inProgress.length}</b>`;
}

function loadAwaitFeedback() {
    awaitFeedback = tasklist.filter(t => t['progress'] == 'awaitfeedback');
    document.getElementById('amount-feedback').innerHTML = `<b>${awaitFeedback.length}</b>`;
}

function loadDoneTasks() {
    doneTasks = tasklist.filter(t => t['progress'] == 'donetask');
    document.getElementById('amount-done').innerHTML = `<b>${doneTasks.length}</b>`;
}

function loadurgentTasks() {
urgentTasks=tasklist.filter(t=>t['progress']!='donetask');
urgentTasks=urgentTasks.filter(t=>t['priority']=='urgent');
urgentTasks=urgentTasks.sort((a,b)=>{
if (a.duedate < b.duedate) {
return -1;
}
});
document.getElementById('amount-urgent').innerHTML = `<b>${urgentTasks.length}</b>`; 
}

function loadTotalamount() {
    document.getElementById('amount-total').innerHTML = `<b>${tasklist.length}</b>`;
}
