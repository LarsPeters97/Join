
let users = [];

setURL('https://gruppe-397.developerakademie.net/smallest_backend_ever');

async function init() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem("users")) || [];
}

async function addUser(){
   /* let name = document.getElementById('Name_signup');
    let email = document.getElementById('Email_signup');
    let password = document.getElementById('pasword_signup');*/
    let name = 'alex';
    let email = 'test@dss.de';
    let password = 'test123';
    users.push({name: name, email: email, password: password});
    backend.setItem('users', JSON.stringify(users));
    
}