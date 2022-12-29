let contacts = [];

setURL('https://gruppe-397.developerakademie.net/smallest_backend_ever');

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
    contacts.push({name: name.value, email: email.value, phone: phone.value});
    await  backend.setItem('contacts', JSON.stringify(contacts));
    window.location.href = './contact.html';
}

function showContacts(){
    document.getElementById('contactsContainer').innerHtml = '';
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        console.log(contact);
    document.getElementById('contactsContainer').innerHtml +=`
    <div class="contact-card"> 
    <p> ${contact.name} </p>
    </div>`;
        
    }
}
