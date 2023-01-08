
let users = [];

setURL('https://gruppe-397.developerakademie.net/smallest_backend_ever');

async function init() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem("users")) || [];
}

async function addUser(){
    let email = document.getElementById('Email_signup');
    let name = document.getElementById('Name_signup');
    let password = document.getElementById('password_input');
    users.push({name: name.value, email: email.value, password: password.value});
    await  backend.setItem('users', JSON.stringify(users));
    //weiterleitung zum login bereich
    window.location.href = './index.html';
}


