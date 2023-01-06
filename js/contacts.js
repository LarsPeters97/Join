let contacts = [];
let letters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
];
let currentcolor = 0;

setURL("https://gruppe-397.developerakademie.net/smallest_backend_ever");

async function init() {
    await downloadFromServer();
    contacts = JSON.parse(backend.getItem("contacts")) || [];
    renderLetters();
}

function showAddcontact() {
    document.getElementById("addcontact").classList.remove("d-none");
}

function closeAddcontact() {
    document.getElementById("addcontact").classList.add("d-none");
}

function notClose(event) {
    event.stopPropagation();
}

function clearInput() {
    document.getElementById("input_name").value = "";
    document.getElementById("input_email").value = "";
    document.getElementById("input_phone").value = "";
}

function randomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    return `rgb(${r} ,${g} , ${b})`;
}

async function createContact() {
    let name = document.getElementById("input_name");
    let email = document.getElementById("input_email");
    let phone = document.getElementById("input_phone");
    let color = randomColor();
    contacts.push({
        name: name.value,
        email: email.value,
        phone: phone.value,
        color: color,
    });
    await backend.setItem("contacts", JSON.stringify(contacts));
    window.location.href = "./contact.html";
}

function showContacts(letter) {
    sortContacts(contacts);
    document.getElementById(`containerContact${letter.charAt(0)}`).innerHTML = "";
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        splittedName = contact.name.split(" ");
        if (contact.name.charAt(0).toUpperCase() == letter.charAt(0).toUpperCase()) {
            document.getElementById(`containerContact${letter.charAt(0)}`).innerHTML += showContactsHtml(
                contact,
                splittedName,
                i
            );
            renderInitials(splittedName, i);
        }
    }
}

function renderInitials(splittedName, i) {
    document.getElementById(`initial${i}`).innerHTML = "";
    for (let k = 0; k < splittedName.length; k++) {
        const initials = splittedName[k];
        document.getElementById(`initial${i}`).innerHTML += `
        <span>${initials.charAt(0).toUpperCase()}</span>`;
    }
}

function renderLetters() {
    document.getElementById("contactsContainer").innerHTML = "";
    for (let j = 0; j < letters.length; j++) {
        const letter = letters[j];
        document.getElementById("contactsContainer").innerHTML += renderLettersHtml(letter, j);
        showContacts(letter);
    }
}

function renderLettersHtml(letter, j) {
    return `
    <div class="container-filtered-contacts">
        <span class="letters">${letter}</span>
        <div id="containerContact${letter.charAt(0)}"></div>
    </div>`;
}

function sortContacts(contacts) {
    contacts = contacts.sort((a, b) => {
        let a1 = a.name.toLowerCase();
        let b1 = b.name.toLowerCase();
        return a1 < b1 ? -1 : a1 > b1 ? 1 : 0;
    });
}

function showContactsHtml(contact, splittedName, i) {
    return `
    <div onclick="showContact(${i})" class="contact-card">
     <div id="initial${i}" style="background-color:${contact.color}" class="initials-contact"></div>
     <div class="contact-card-text"> 
         <p> ${contact.name} </p>
         <span> ${contact.email} </span>
     </div>
    </div>`;
}

function showContact(i) {
    showContactMobile();
    document.getElementById("contactAreaBody").innerHTML = "";
    let contact = contacts[i];
    let splittedName = contact.name.split(" ");
    document.getElementById("contactAreaBody").innerHTML = showContactHtml(contact, i);
    document.getElementById(`initialsBody${i}`).innerHTML = "";
    for (let k = 0; k < splittedName.length; k++) {
        const initials = splittedName[k];
        document.getElementById(`initialsBody${i}`).innerHTML += `
        <span>${initials.charAt(0).toUpperCase()}</span>`;
    }
}

function showContactMobile() {
    if (window.innerWidth < 801) {
        document.getElementById("contact").classList.remove("d-none-mobile");
        document.getElementById("contactsContainer").classList.add("d-none-mobile");
        document.getElementById("addcontactMobile").classList.add("d-none-mobile");
    }
}

function closeContact() {
    document.getElementById("contact").classList.add("d-none-mobile");
    document.getElementById("contactsContainer").classList.remove("d-none-mobile");
    document.getElementById("addcontactMobile").classList.remove("d-none-mobile");
}

function showContactHtml(contact, i) {
    return `
<div class="contactarea-body-name">
    <div id="initialsBody${i}"  style="background-color:${contact.color}" class="initials-contact-body">
        
    </div>
    <div class="container-name">
        <h3>${contact.name} </h3>
        <div class="add-task-link">
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
    <span style="cursor:pointer;" href="mailto:${contact.email}" class="text-lightblue">${contact.email}</span>
    <h5>Phone</h5>
    <span style="cursor:pointer;" href="tel:${contact.phone}">${contact.phone}</span>
</div>
`;
}

function closeEditContact() {
    document.getElementById("editContact").classList.add("d-none");
}

function openEditContact(i) {
    document.getElementById("editContact").classList.remove("d-none");
    document.getElementById("editContact").innerHTML = "";
    let contact = contacts[i];
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
                    <div class="container-logo-addcontact">
                        <img src="./assets/img/Logo.png" alt="" />
                        <h2>Edit contact</h2>
                        <div class="vertikal-line-addcontact"></div>
                    </div>
                </div>
                
            <div class="add-contact-second-part">
                <div id="initialsedit${i}"  style="background-color:${contact.color}" class="initials-contact-body">
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
                        <button onclick="saveChanges(${(contact, i)})" class="button-create">
                            Save  
                        </button>
                    </div>
                </div>
    </div>`;
}

async function saveChanges(contact, i) {
    let new_name = document.getElementById("input_name_edit").value;
    let new_email = document.getElementById("input_email_edit").value;
    let new_phone = document.getElementById("input_phone_edit").value;

    console.log("new contact", new_name, new_email, new_phone);

    contact.name = new_name;
    contact.email = new_email;
    contact.phone = new_phone;

    await backend.setItem("contacts", JSON.stringify(contacts));
    /*window.location.href = "./contact.html";*/
}
