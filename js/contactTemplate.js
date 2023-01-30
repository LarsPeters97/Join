function templateShowAddcontact() {
    return /*html*/`
    <div onclick="closeAddcontact()" id="addcontact" class="container-addcontact d-none">
        <div onclick="notClose(event)" class="add-contact">
            <div class="add-contact-first-part">
        <img onclick="closeAddcontact()" class="close-addcontact-mobile" src="./assets/img/x-white.png" alt="" />
        <div class="container-logo-addcontact">
            <img src="./assets/img/Logo.png" alt="" />
            <div>
                <h2>Add contact</h2>
                <p>Tasks are better with a team!</p>
                <div class="vertikal-line-addcontact"></div>
            </div>
        </div>
    </div>

    <div class="add-contact-second-part">
        <img class="image-grey-mobile" src="./assets/img/grey-bg.png" alt="" />
        <img class="image-contact-mobile" src="./assets/img/contact.png" alt="" />
    </div>
    <div class="add-contact-third-part">
        <img onclick="closeAddcontact()" id="closeAddcontact" class="close-addcontact" src="./assets/img/x-blue.png" alt="" />
            <form class="form" onsubmit="createContact(); return false">
            <div>
                <input id="input_name" class="input_name" type="text" required placeholder="Name"/>
            </div>
            <div>
                <input id="input_email" class="input_email" type="email" required placeholder="Email"/>
            </div>
            <div>
                <input id="input_phone" class="input_phone" type="number" required placeholder="Phone"/>
            </div>
        
        <div class="container-button">
            <button type="button" onclick="clearInput()" class="button-cancel"><p>Cancel</p></button>
            <button class="button-create">
                Create contact
                <img src="./assets/img/check-white.png" alt="" />
            </button>
        </form>
        </div>
    </div>
</div>
</div>
<div onclick="closeEditContact()" id="editContact" class="container-edit-contact d-none"></div>`
}


