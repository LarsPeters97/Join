let contacts = [];

let currentcolor = 0;


setURL("https://gruppe-397.developerakademie.net/smallest_backend_ever");

async function init() {
    await downloadFromServer();
    contacts = JSON.parse(backend.getItem("contacts")) || [];
    console.log(contacts);
    showContacts();
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
    contacts.push({ name: name.value, email: email.value, phone: phone.value, color: color });
    await backend.setItem("contacts", JSON.stringify(contacts));
    window.location.href = "./contact.html";
}

function showContacts() {
    sortContacts(contacts);
    document.getElementById("contactsContainer").innerHTML = "";
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        splittedName = contact.name.split(" ");
        document.getElementById("contactsContainer").innerHTML +=
            showContactsHtml(contact, splittedName, i);
    }
}

function sortContacts(contacts){
    contacts = contacts.sort((a, b) => {
        let a1 = a.name.toLowerCase();
        let b1 = b.name.toLowerCase();
        return a1 < b1 ? -1 : a1 > b1 ? 1 : 0;
    })
}

function showContactsHtml(contact, splittedName, i) {
    return `
    <div onclick="showContact(${i})" class="contact-card">
     <div style="background-color:${contact.color}" class="initials-contact">${splittedName[0].charAt(0)}${splittedName[1].charAt(0)}</div>
     <div class="contact-card-text"> 
         <p> ${contact.name} </p>
         <span> ${contact.email} </span>
     </div>
    </div>`;
}

function showContact(i) {
    document.getElementById("contactAreaBody").innerHTML = "";
    let contact = contacts[i];
    let splittedName = contact.name.split(" ");
    document.getElementById("contactAreaBody").innerHTML = 
    showContactHtml(contact,splittedName);
}

function showContactHtml(contact,splittedName){
return `
<div class="contactarea-body-name">
    <div  style="background-color:${contact.color}" class="initials-contact-body">
        ${splittedName[0].charAt(0)}${splittedName[1].charAt(0)}
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
    <div class="edit-link">
        <img src="./assets/img/pen-blue.png" />
        <span>Edit Contact</span>
    </div>
</div>
<div class="contactarea-body-info">
    <h5>Email</h5>
    <span class="text-lightblue">${contact.email}</span>
    <h5>Phone</h5>
    <span>${contact.phone}</span>
</div>
`;
}
