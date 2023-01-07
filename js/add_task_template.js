/**
 * 
 * @param {int} i is the index of the category in the array selectedTaskValues that will be displayed in the current iteration
 * @param {*} category 
 * @returns 
 */

function templateExistingCategories(i, category) {
    return /*html*/`
    <div class="dropdown-category-existing select-bg-color" onclick="selectedCategory(${i})">
        <span class="flex">${category['name']}<span class="dot margin-color" style="background-color: ${category['color']}"></span></span>        
    </div>`;
}