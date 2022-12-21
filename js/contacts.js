let contacts = [];


function showAddcontact(){
    document.getElementById('addcontact').classList.remove('d-none');
}

function closeAddcontact(){
    document.getElementById('addcontact').classList.add('d-none');
}

function notClose(event) {
    event.stopPropagation();
}

function clearInput(){
    document.getElementById('input_name').value = '';
    document.getElementById('input_email').value = '';
    document.getElementById('input_phone').value = '';
}

function createContact(){
  let name = document.getElementById('input_name');
   let email = document.getElementById('input_email');
    let phone = document.getElementById('input_phone');

}