let subtasksForCurrenttask = [];
let taskid;
let date;
let priorityNameForTask;
let formValidation = true;
let tasklist = [];
let selectedCategoryColor;
let selectedTaskValues = [];
let selectedCategoryValues = [];
let assignedToContacts = [];
let contactsForCurrentTask = [];
let newCategoryName;
let categoryColors = ['#FC71FF', '#1FD7C1', '#8AA4FF', '#FF0000', '#2AD300', '#FF8A00', '#E200BE', '#0038FF'];
let userIconColors = ['#800000', '#3cb44b', '#000075', '#f58231', '#911eb4', '#000000', '#ffe119', '#9A6324', '#469990'];

let categories = [{
    'name': 'General topics',
    'color': '#FC71FF'
}];

let priorities = [
    {
        'name': 'urgent',
        'image': './assets/img/urgent.svg',
        'selected-image': './assets/img/urgent-white.svg',
        'color': '#FF3D00'
    },
    {
        'name': 'medium',
        'image': './assets/img/medium.svg',
        'selected-image': './assets/img/medium-white.svg',
        'color': '#FFA800'
    },
    {
        'name': 'low',
        'image': './assets/img/low.svg',
        'selected-image': './assets/img/low-white.svg',
        'color': '#7AE229'
    }
]

let contacts = [];
