let letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "Ä", "Ö", "Ü"];
let currentcolor = 0;
let findContact = false;

/**
 * Initialazing of the board. Loads the JSON stored in the backend. Checks the currentUser and renders the contacts to the letters.
 */

async function initContact() {
  await initGeneral();
  renderLetters();
  setTimeout(contactsPage, 500);
}

/**
 * The background color of the sidebar gets darker in the area of the contacts button.
 */

function contactsPage() {
  document.getElementById("sidebar_contact_mobile").classList.add("background-color");
  document.getElementById("sidebar_contact").classList.add("background-color");
}

/**
 * Shows the a new contact card.
 */

function showAddContact() {
  document.getElementById("add-contact-section").innerHTML = templateShowAddContact();
  removeClassDnone("addcontact");
}

/**
 * Stops forwarding to the parent elements.
 */

function notClose(event) {
  event.stopPropagation();
}

/**
 * Delete input value after closing or submitting addcontact.
 */

function clearInput() {
  document.getElementById("input_name").value = "";
  document.getElementById("input_email").value = "";
  document.getElementById("input_phone").value = "";
  addClassDnone("addcontact");
}

/**
 * Generating random background-color.
 */

function randomColor() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);

  return `rgb(${r} ,${g} , ${b})`;
}

/**
 * A contact is created and is added to the currentUser.contacts array. After that the contact page will be updated.
 */

async function createContact() {
  let name = document.getElementById("input_name");
  let email = document.getElementById("input_email");
  let phone = document.getElementById("input_phone");
  let color = randomColor();
  let icon = getIcon(name.value);
  currentUser.contacts.push({
    name: name.value,
    email: email.value,
    phone: phone.value,
    iconcolor: color,
    icon: icon,
  });
  saveCloseAndUpdate();
}

/**
 * Saves the contact, clears the input fields and renders the contact page letter section if the contact page is open.
 */

async function saveCloseAndUpdate() {
  await backend.setItem("users", JSON.stringify(users));
  clearInput();
  checkActionForBoardOrOtherPages();
  addClassDnone("addcontact");
  if (window.location.pathname == "/Join/contact.html") {
    renderLetters();
  } else {
    renderAssignedToCurrentTaskIcons();
  }
}

/**
 * When the contact.html page is open the letters will be rendered.
 */

function checkActionForBoardOrOtherPages() {
  if (window.location.pathname === "/contact.html") {
    renderLetters();
  }
}

/**
 * Get icon for task board.
 */

function getIcon(name) {
  let splittedName = name.split(" ");
  let initialforicon = [];
  for (let i = 0; i < splittedName.length; i++) {
    let name = splittedName[i];
    initialforicon += name.slice(0, 1);
  }
  let icon = initialforicon.slice(0, 2);
  return icon;
}

/**
 * Showing filtered contacts in contactbook.
 * @param {string} letter from the array letters.
 */
function showContacts(letter) {
  sortContacts();
  document.getElementById(`containerContact${letter.charAt(0)}`).innerHTML = "";
  for (let i = 0; i < currentUser.contacts.length; i++) {
    const contact = currentUser.contacts[i];
    compareAndRenderLettersWithContacts(contact, letter, i);
  }
  if (!findContact) {
    addClassDnone(`letterContainer${letter.charAt(0)}`);
  }
}

/**
 * The name gets splitted and if the first letter from the contact and from the array are equal, then the letter is rendered.
 * Also, the initials of the current contact are created.
 * @param {object} contact which is currently talked.
 * @param {string} letter from the array letters.
 * @param {number} i is the current iteration number from the array currentUser.contacts.
 */

function compareAndRenderLettersWithContacts(contact, letter, i) {
  splittedName = contact.name.split(" ");
  if (contact.name.charAt(0).toUpperCase() == letter.charAt(0).toUpperCase()) {
    document.getElementById(`containerContact${letter.charAt(0)}`).innerHTML += showContactsHtml(contact, i);
    renderInitials(splittedName, i);
    findContact = true;
  }
}

/**
 * Get the initials from the current contact name.
 */

function renderInitials(splittedName, i) {
  document.getElementById(`initial${i}`).innerHTML = "";
  for (let k = 0; k < splittedName.length; k++) {
    const initials = splittedName[k];
    document.getElementById(`initial${i}`).innerHTML += `
        <span>${initials.charAt(0).slice(0).toUpperCase()}</span>`;
  }
}

/**
 * Rendering letters for the contact book.
 */

function renderLetters() {
  document.getElementById("contactsContainer").innerHTML = "";
  for (let j = 0; j < letters.length; j++) {
    const letter = letters[j];
    findContact = false;
    document.getElementById("contactsContainer").innerHTML += renderLettersHtml(letter);
    showContacts(letter);
  }
  paddingBottomForLastLetterContainer();
}

/**
 * From the last contact of the current user, the first letter of his name is determined with the charAt method,
 * whereby the id of the last lettercontainer can be addressed and provided with a padding bottom.
 */

function paddingBottomForLastLetterContainer() {
  let lastContactIndex = currentUser.contacts.length - 1;
  let firstLetterofLastContact = currentUser.contacts[lastContactIndex].name.charAt(0);
  if (lastContactIndex) {
    document.getElementById(`letterContainer${firstLetterofLastContact}`).style.paddingBottom = "80px";
  }
}

/**
 * @param {string} letter from the array letters.
 * @returns the html code for for the letters.
 */

function renderLettersHtml(letter) {
  return /*html*/ `
    <div id="letterContainer${letter.charAt(0)}" class="container-filtered-contacts">
        <span class="letters" onclick="removeOpenContactCardMenu()">${letter}</span>
        <div id="containerContact${letter.charAt(0)}"></div>
    </div>`;
}

/**
 * Sort the contacts of the current User from A-Ü.
 */

function sortContacts() {
  currentUser.contacts.sort((a, b) => {
    let a1 = a.name.toLowerCase();
    let b1 = b.name.toLowerCase();
    return a1 < b1 ? -1 : a1 > b1 ? 1 : 0;
  });
}

/**
 * @param {object} contact which is currently talked.
 * @param {number} i is the current iteration number from the array currentUser.contacts.
 * @returns the html code for the current contact object.
 */

function showContactsHtml(contact, i) {
  return /*html*/ `
    <div class="contact-card">
        <img onclick="removeClassDnone('popupContact${i}')" class="contact-card-menu" src="./assets/img/ellipsis.png">
        <div onclick="addClassDnone('popupContact${i}')" id="popupContact${i}" class="wrapper-popup-menu d-none">   
         <div onclick="notClose(event)" class="contact-card-menu-popup">
            <span onclick="openEditContact(${i})"> Edit </span>
            <span onclick="deleteContact(${i})">Delete</span>
         </div>
        </div>
        <div class="initials"> 
            <div  id="initial${i}" style="background-color:${contact.iconcolor}" class="initials-contact">
            </div>
        </div>
     <div onclick="showContact(${i})" class="contact-card-text"> 
         <p> ${contact.name} </p>
         <span> ${contact.email} </span>
     </div>
    </div>`;
}

/**
 * The selected contact from the current user gets deleted and it is saved in the backend.
 * @param {number} i is the contact from the current user which is currently selected.
 */

async function deleteContact(i) {
  currentUser.contacts.splice(i, 1);
  await backend.setItem("users", JSON.stringify(users));
  renderLetters();
}

/**
 * When the user clicks on another contact, the popupContact gets closed, if one is opened.
 */

function removeOpenContactCardMenu() {
  for (let i = 0; i < currentUser.contacts.length; i++) {
    addClassDnone(`popupContact${i}`);
  }
}

/**
 * The choosen contact is displayed.
 * @param {number} i is the current iteration number from the array currentUser.contacts.
 */

function showContact(i) {
  removeOpenContactCardMenu();
  showContactMobile();
  document.getElementById("contactAreaBody").innerHTML = "";
  let contact = currentUser.contacts[i];
  let splittedName = contact.name.split(" ");
  document.getElementById("contactAreaBody").innerHTML = showContactHtml(contact, i);
  document.getElementById(`initialsBody${i}`).innerHTML = "";
  for (let k = 0; k < splittedName.length; k++) {
    const initials = splittedName[k];
    document.getElementById(`initialsBody${i}`).innerHTML += `
        <span>${initials.charAt(0).toUpperCase()}</span>`;
  }
}

/**
 * Showing contacts in the responsive view.
 */

function showContactMobile() {
  if (window.innerWidth < 801) {
    removeClassDnone("contact");
    addClassDnone("contactsContainer");
    addClassDnone("addcontactMobile");
  }
}

/**
 * Closes the detailed contact viewer.
 */
function closeContact() {
  addClassDnone("contact");
  removeClassDnone("contactsContainer");
  removeClassDnone("addcontactMobile");
}

/**
 * @param {object} contact which is currently talked.
 * @param {number} i is the current iteration number from the array currentUser.contacts.
 * @returns the html code for the detailed contact view.
 */

function showContactHtml(contact, i) {
  return /*html*/ `
    <div class="contactarea-body-name">
        <div class="initials_B"> 
        <div id="initialsBody${i}"  style="background-color:${contact.iconcolor}" class="initials-contact-body">
    </div>
        
    </div>
    <div class="container-name">
        <h3>${contact.name} </h3>
        <div class="add-task-link" onclick="taskPopupAtContactPage('todo')">
            <img src="./assets/img/plus-lightblue.png" />
            <span>Add Task</span>
        </div>
    </div>
</div>    
<div class="contactarea-body-contactinfo">
    <span class="text-contact-info">Contact Information</span>
    <div onclick="openEditContact(${i})" class="edit-link">
        <img src="./assets/img/pen-blue.png" />
        <span>Edit Contact</span>
    </div>
</div>
<div class="contactarea-body-info">
    <h5>Email</h5>
    <a style="cursor:pointer; text-decoration:unset;" href="mailto:${contact.email}" class="text-lightblue">${contact.email}</a>
    <h5>Phone</h5>
    <a style="cursor:pointer;  text-decoration:unset;" class="text-lightblue" href="tel:${contact.phone}">${contact.phone}</a>
</div>
`;
}

/**
 * Shows the selected contact in the edit form.
 */

function showEditContact() {
  document.getElementById("edit-contact-section").innerHTML = templateShowEditcontact();
  removeClassDnone("editContact");
}

/**
 * Opens edit contact view.
 * @param {number} i is the selected interation contact number from the array currentUser.contacts.
 */

function openEditContact(i) {
  showEditContact();
  let contact = currentUser.contacts[i];
  let splittedName = contact.name.split(" ");
  document.getElementById("editContact").innerHTML += editContactHtml(contact, i);
  document.getElementById(`initialsedit${i}`).innerHTML = "";
  for (let k = 0; k < splittedName.length; k++) {
    const initials = splittedName[k];
    document.getElementById(`initialsedit${i}`).innerHTML += `
        <span>${initials.charAt(0).toUpperCase()}</span>`;
  }
}

/**
 * @param {object} contact which is currently talked.
 * @param {number} i is the selected interation contact number from the array currentUser.contacts.
 * @returns the html code for the edit contact view.
 */

function editContactHtml(contact, i) {
  return /*html*/ `
    <div onclick="notClose(event)" class="add-contact">
      <div class="add-contact-first-part">
        <img onclick="addClassDnone('editContact')" class="close-addcontact-mobile" src="./assets/img/x-white.png" alt="">
        <div class="container-logo-addcontact">
          <img src="./assets/img/Logo.png" alt="" />
          <h2>Edit contact</h2>
          <div class="vertikal-line-addcontact"></div>
        </div>
      </div>                
        <div class="add-contact-second-part position-initials">
          <div class="initials_B"> 
            <div id="initialsedit${i}"  style="background-color:${contact.iconcolor}" class="initials-contact-body"> </div>
          </div>
        </div>
        <div class="add-contact-third-part">
          <img onclick="addClassDnone('editContact'); removeOpenContactCardMenu()" class="close-addcontact" src="./assets/img/x-blue.png" alt="">
        <div>
          <input id="input_name_edit" maxlength="40" class="input_name" type="text" value="${contact.name}" placeholder="Name" />
        </div>
        <div>
          <input id="input_email_edit" maxlength="50" class="input_email" type="text" value="${contact.email}" placeholder="Email" />
        </div>
        <div>
          <input id="input_phone_edit" maxlength="28" class="input_phone" type="text" value="${contact.phone}" placeholder="Phone" />
        </div>
        <div class="container-button">
          <button onclick="saveChanges(${i})" class="button-create">Save</button>
        </div>
      </div>
    </div>`;
}

/**
 * The edited contact entries are added to the contact and the changes are saved in the backend.
 * After that, the contact page is re-rendered and the updated contact is displayed again.
 * @param {number} i is the selected interation contact number from the array currentUser.contacts.
 */

async function saveChanges(i) {
  let newName = document.getElementById("input_name_edit");
  let newEmail = document.getElementById("input_email_edit");
  let newPhone = document.getElementById("input_phone_edit");
  currentUser.contacts[i].name = newName.value;
  currentUser.contacts[i].email = newEmail.value;
  currentUser.contacts[i].phone = newPhone.value;
  await backend.setItem("users", JSON.stringify(users));
  addClassDnone("editContact");
  addClassDnone(`popupContact${i}`);
  renderLetters();
  showContact(i);
}

/**
 * Opens the add task Popup.
 */
function taskPopupAtContactPage(progressStatus) {
  document.getElementById("task-popup-contact-page").innerHTML = addTaskPopupTemplate(progressStatus);
  includeHTML();
  document.getElementById("task-popup-contact-page").classList.remove("d-none");
  document.getElementById("task-popup-contact-page").style.overflow = "scroll";
  initialize();
}
