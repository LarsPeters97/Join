let categories = [{
    'name': 'Sales',
    'color': '#FC71FF'
},
{
    'name': 'Backoffice',
    'color': '#1FD7C1'
}];

let categoryColors = ['#FC71FF', '#1FD7C1', '#8AA4FF', 'FF0000', '#2AD300', '#FF8A00', '#E200BE', '#0038FF'];


async function init() {
    await downloadFromServer();
    categories = JSON.parse(backend.getItem("categories")) || [];
}


function showClearImgLightBlue() {
    document.getElementById('clear-img').src = './assets/img/clear-x-light-blue.svg';
}


function showClearImgDarkBlue() {
    document.getElementById('clear-img').src = './assets/img/clear-x.svg';
}


// function createNewCategory() {
//     document.getElementById('new-category').classList.remove('d-none');
//     showCategoriesAndInput();
//     document.getElementById('dropdown-category').innerHTML = 'Create new Category';

// }


// function showCategoriesAndInput() {
//     let dropdownCategory = document.getElementById('dropdown-category');
//     for(let i = 0; i < categories.length; i++) {
//         let catgegoryName = categories[i]['name'];
//         let categoryColor = categories[i]['color'];
//         dropdownCategory.innerHTML = templateCategories(catgegoryName, categoryColor);
//     }
// }


// function templateCategories(catgegoryName, categoryColor) {
//     return /*html*/`
//     ${catgegoryName} ${categoryColor}`;
// }


function openNewCategoryAndExistingCategories() {
    document.getElementById('new-category').classList.remove('d-none');
    document.getElementById('category-container').style.borderRadius = '9px 9px 0px 0px';
    let existingCategories = document.getElementById('existing-categories');
    existingCategories.innerHTML = '';
    for (let i = 0; i < categories.length; i++) {
        let category = categories[i];
        existingCategories.innerHTML += templateExistingCategories(i, category);
    }
}


function templateExistingCategories(i, category) {
    return /*html*/`
    <div class="dropdown-category-existing select-bg-color" onclick="selectedCategory(${i})">
        <span class="flex">${category['name']}</span><span class="dot" style="background-color: ${category['color']}"></span>        
    </div>`;
}


function selectedCategory(i) {
    document.getElementById('new-category').classList.add('d-none');
    document.getElementById('category-container').style.borderRadius = '9px';
    let existingCategories = document.getElementById('existing-categories');
    existingCategories.innerHTML = '';
    let categoryContainer = document.getElementById('category-container');
    categoryContainer.innerHTML = templateSelectedCategory(i);
}


function templateSelectedCategory(i) {
    return /*html*/`
        <span class="flex">Category: ${categories[i]['name']}</span>
        <span class="dot" style="background-color: ${categories[i]['color']}"></span>`;
}


function createNewCategory() {
    document.getElementById('new-category').style.display = 'none';
    document.getElementById('existing-categories').style.display = 'none';
    document.getElementById('category-container').style.borderRadius = '9px';

    let categoryContainer = document.getElementById('category-container');
    categoryContainer.innerHTML = /*html*/`
    <input type="text" placeholder="Enter new category">`;
}



