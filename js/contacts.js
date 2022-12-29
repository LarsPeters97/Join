let contacts = [];
let colors = ['blue', 'red', 'orange', 'yellow', 'green', 'aquamarine', 'blueviolet', 'cadetblue'];

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

async function createContact() {
    let name = document.getElementById("input_name");
    let email = document.getElementById("input_email");
    let phone = document.getElementById("input_phone");
    contacts.push({ name: name.value, email: email.value, phone: phone.value });
    await backend.setItem("contacts", JSON.stringify(contacts));
    window.location.href = "./contact.html";
}

function showContacts() {
    document.getElementById("contactsContainer").innerHTML = "";
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        splittedName = contact.name.split(" ");
        document.getElementById("contactsContainer").innerHTML += showContactsHtml(contact);
    
    }
}

function showContactsHtml(contact){
    return  `
    <div class="contact-card">
     <div class="initials-contact">${splittedName[0].charAt(0)}${splittedName[1].charAt(0)}</div>
     <div class="contact-card-text"> 
         <p> ${contact.name} </p>
         <span> ${contact.email}</span>
     </div>
    </div>`
}
