/**
 * @returns the add contact mask.
 */

function templateShowAddContact() {
  return /*html*/ `
    <div onclick="addClassDnone('addcontact')" id="addcontact" class="container-addcontact d-none">
        <div onclick="notClose(event)" class="add-contact">
            <div class="add-contact-first-part">
        <img onclick="addClassDnone('addcontact')" class="close-addcontact-mobile" src="./assets/img/x-white.png" alt="" />
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
        <img onclick="addClassDnone('addcontact')" id="closeAddcontact" class="close-addcontact" src="./assets/img/x-blue.png" alt="" />
            <form class="form" onsubmit="createContact(); return false">
            <div>
                <input id="input_name" class="input_name" maxlength="40" type="text" required placeholder="Name"/>
            </div>
            <div>
                <input id="input_email" class="input_email" maxlength="50" type="email" required placeholder="Email"/>
            </div>
            <div>
                <input id="input_phone" class="input_phone" maxlength="28" type="number" required placeholder="Phone"/>
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
</div>`;
}

/**
 * @returns the container for the edit contact mask.
 */

function templateShowEditcontact() {
  return /*html*/ `<div onclick="closeEditContact()" id="editContact" class="container-edit-contact d-none"></div>`;
}
