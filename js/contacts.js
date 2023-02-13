let letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
let currentcolor = 0;
let findContact = false;

/**
 * Loading contacts from backend
 */
async function init() {
  await initGeneral();
  renderLetters();
  document.getElementById("sidebar_contact_mobile").classList.add("background-color");
  document.getElementById("sidebar_contact").classList.add("background-color");
}

function showAddcontact() {
  document.getElementById("add-contact-section").innerHTML = templateShowAddcontact();
  document.getElementById("addcontact").classList.remove("d-none");
}

function closeAddcontact() {
  document.getElementById("addcontact").classList.add("d-none");
}

function notClose(event) {
  event.stopPropagation();
}

/**
 * Delete input value after closing or submitting addcontact
 */
function clearInput() {
  document.getElementById("input_name").value = "";
  document.getElementById("input_email").value = "";
  document.getElementById("input_phone").value = "";
  closeAddcontact();
}

/**
 * Generating random bg-color
 */
function randomColor() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);

  return `rgb(${r} ,${g} , ${b})`;
}

/**
 * Creating contact
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
  await backend.setItem("users", JSON.stringify(users));
  clearInput();
  checkActionForBoardOrOtherPages();
  closeAddcontact();
}

/**
 * When the contact.html page is open the letters will be rendered.
 * And when another page is open (Add Task(-Popup)) the icons of the current task will be rendered.
 */

function checkActionForBoardOrOtherPages() {
  if (window.location.pathname === "/contact.html") {
    renderLetters();
  } else {
    renderAssignedToCurrentTaskIcons();
  }
}

/**
 * Get icon for task board
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
 * Showing filtered contacts in contactbook
 */
function showContacts(letter) {
  sortContacts();
  document.getElementById(`containerContact${letter.charAt(0)}`).innerHTML = "";
  for (let i = 0; i < currentUser.contacts.length; i++) {
    const contact = currentUser.contacts[i];
    splittedName = contact.name.split(" ");
    if (contact.name.charAt(0).toUpperCase() == letter.charAt(0).toUpperCase()) {
      document.getElementById(`containerContact${letter.charAt(0)}`).innerHTML += showContactsHtml(contact, i);
      renderInitials(splittedName, i);
      findContact = true;
    }
  }
  if (!findContact) {
    document.getElementById(`letterContainer${letter.charAt(0)}`).classList.add("d-none");
  }
}

/**
 * Get the initials from name
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
 * Rendering letters for contact book
 */
function renderLetters() {
  document.getElementById("contactsContainer").innerHTML = "";
  for (let j = 0; j < letters.length; j++) {
    const letter = letters[j];
    findContact = false;
    document.getElementById("contactsContainer").innerHTML += renderLettersHtml(letter);
    showContacts(letter);
  }
}

function renderLettersHtml(letter) {
  return `
    <div id= "letterContainer${letter.charAt(0)}" class="container-filtered-contacts">
        <span class="letters">${letter}</span>
        <div id="containerContact${letter.charAt(0)}"></div>
    </div>`;
}

/**
 * Sort contacts from a-z
 */
function sortContacts() {
  currentUser.contacts.sort((a, b) => {
    let a1 = a.name.toLowerCase();
    let b1 = b.name.toLowerCase();
    return a1 < b1 ? -1 : a1 > b1 ? 1 : 0;
  });
}

function showContactsHtml(contact, i) {
  return `
    <div class="contact-card">
        <img onclick="openPopUp(${i})" class="contact-card-menu" src="./assets/img/ellipsis.png">
        <div onclick="closePopUp(${i})" id="popupContact${i}" class="wrapper-popup-menu d-none">   
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

function deleteContact(i) {
  currentUser.contacts.splice(i, 1);
  save();
}

function openPopUp(i) {
  document.getElementById(`popupContact${i}`).classList.remove("d-none");
}

function closePopUp(i) {
  document.getElementById(`popupContact${i}`).classList.add("d-none");
}

/**
 * Showing choosen contact
 */
function showContact(i) {
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
 * Showing contacts responsive
 */
function showContactMobile() {
  if (window.innerWidth < 801) {
    document.getElementById("contact").classList.remove("d-none-mobile");
    document.getElementById("contactsContainer").classList.add("d-none-mobile");
    document.getElementById("addcontactMobile").classList.add("d-none-mobile");
  }
}

/**
 * Close contact viewer
 */
function closeContact() {
  document.getElementById("contact").classList.add("d-none-mobile");
  document.getElementById("contactsContainer").classList.remove("d-none-mobile");
  document.getElementById("addcontactMobile").classList.remove("d-none-mobile");
}

function showContactHtml(contact, i) {
  return `
    <div class="contactarea-body-name">
        <div class="initials_B"> 
        <div id="initialsBody${i}"  style="background-color:${contact.iconcolor}" class="initials-contact-body">
    </div>
        
    </div>
    <div class="container-name">
        <h3>${contact.name} </h3>
        <div class="add-task-link">
            <img src="./assets/img/plus-lightblue.png" />
            <span onclick="openBoardPopup()">Add Task</span>
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
 * Close popup edit contact
 */
function closeEditContact() {
  document.getElementById("editContact").classList.add("d-none");
}

/**
 * Open edit contact
 */
function openEditContact(i) {
  document.getElementById("editContact").classList.remove("d-none");
  document.getElementById("editContact").innerHTML = "";
  let contact = currentUser.contacts[i];
  let splittedName = contact.name.split(" ");
  document.getElementById("editContact").innerHTML = editContactHtml(contact, i);
  document.getElementById(`initialsedit${i}`).innerHTML = "";
  for (let k = 0; k < splittedName.length; k++) {
    const initials = splittedName[k];
    document.getElementById(`initialsedit${i}`).innerHTML += `
        <span>${initials.charAt(0).toUpperCase()}</span>`;
  }
}

function editContactHtml(contact, i) {
  return `
    <div onclick="notClose(event)" class="add-contact">
                <div class="add-contact-first-part">
                <img onclick="closeEditContact()" class="close-addcontact-mobile" src="./assets/img/x-white.png" alt="">
                    <div class="container-logo-addcontact">
                        <img src="./assets/img/Logo.png" alt="" />
                        <h2>Edit contact</h2>
                        <div class="vertikal-line-addcontact"></div>
                    </div>
                </div>
                
            <div class="add-contact-second-part position-initials">
                <div class="initials_B"> 
                        <div id="initialsedit${i}"  style="background-color:${contact.iconcolor}" class="initials-contact-body">
                        </div>
                </div>
            </div>
            <div class="add-contact-third-part">
                    <img onclick="closeEditContact()" class="close-addcontact" src="./assets/img/x-blue.png" alt="">
                    <div>
                        <input id="input_name_edit"
                            class="input_name"
                            type="text" value="${contact.name}"
                            placeholder="Name" />
                    </div>
                    <div>
                        <input id="input_email_edit"
                            class="input_email"
                            type="text" value="${contact.email}"
                            placeholder="Email" />
                    </div>
                    <div>
                        <input id="input_phone_edit"
                            class="input_phone"
                            type="text" value="${contact.phone}"
                            placeholder="Phone" />
                    </div>
                    <div class="container-button">
                        <button onclick="saveChanges(${contact})" class="button-create">
                            Save  
                        </button>
                    </div>
                </div>
    </div>`;
}

/**
 * Update contact
 */
async function saveChanges(contact) {
  let newName = document.getElementById("input_name_edit");
  let newEmail = document.getElementById("input_email_edit");
  let newPhone = document.getElementById("input_phone_edit");
  currentUser.contacts[contact].name = newName.value;
  currentUser.contacts[contact].email = newEmail.value;
  currentUser.contacts[contact].phone = newPhone.value;
  await backend.setItem("users", JSON.stringify(users));
  closeEditContact();
}

function closeBoardPopup() {
  document.getElementById("Boardpopup").classList.add("d-none");
}

function openBoardPopup() {
  document.getElementById("Boardpopup").classList.remove("d-none");
  initAddTaskPopup();
}
