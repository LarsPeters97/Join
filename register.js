let users = [
    {
        "name": "alex vermeersch",
        "email": "alex@test.de",
        "password": "test123",
    },
];

async function init() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem("users")) || [];
}

async function addUser(){
    let name = document.getElementById('Name_signup');
    let email = document.getElementById('Email_signup');
    let password = document.getElementById('pasword_signup');
    users.push({name: name, email: email, password: password});
    backend.setItem('users', JSON.stringify(users));
    
}