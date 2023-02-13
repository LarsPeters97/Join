let passwordState = 0;
let rememberMe = false;

/**
 * Executing function from script.js initGeneral and loads the html for the login.
 */
async function loadHtml() {
  await initGeneral();
  let loginForm = document.getElementById("form");
  document.getElementById("header_left").classList.remove("d-none");
  loginForm.innerHTML = ``;
  loginForm.innerHTML = htmlLogin();
  rememberMeFillInputFields();
}

function htmlLogin() {
  return /*html*/ `
<div class="login_form">
    <h2>Log in</h2>
    <form onsubmit="login(); return false;">
        <input class="input_mail" type="email" placeholder="Email" id="Email_login" required>
        <div style=position:relative;>
            <input type="password" placeholder="Password" id="password_input"class="input_password" required>
            <img onclick="changeVisibility()" id="login-password-image" class="img-password" src="./assets/img/password_icon.png">
        </div>
            <div id="wrongPassword" class="wrong-password d-none">Wrong Email/Password!</div>
            <div class="login_form_part3">
             <div style="display:flex;">
             <input type="checkbox" id="remember_me">
             <p>Remember me</p>
            </div>
             <p onclick="loadForgotPassword()" class="forgot_password">Forgot my password</p>
            </div>
                <div class="loginform_buttonarea">
                    <button class="login_button" type="submit">Log in</button>
                    <a onclick="loginGuest()" class="guest_button" formnovalidate >Guest Log in</a>
        </div>
    </form>
</div>
  `;
}

/**
 * Get email and password an check the login data.
 */
function login() {
  let email = document.getElementById("Email_login");
  let password = document.getElementById("password_input");
  let user = findUser(email.value, password.value);
  checkLoginData(user, email.value, password.value);
}

/**
 *
 * @param {string} email of the user who tries to log in.
 * @param {string} password of the user who tries to log in.
 * @returns the user if a user in the array users has the same email and password like the input from the user who tries to log in.
 */

function findUser(email, password) {
  return users.find((u) => u.email == email && u.password == password);
}

/**
 * If the user who is currently logging in is already registered, the email address will be stored in the local storage.
 * @param {object} user which is currently logging in.
 * @param {string} email of the user wich is currently logging in.
 * @param {string} password of the user wich is currently logging in.
 */

function checkLoginData(user, email, password) {
  if (user) {
    localStorage.setItem("currentUserEmail", user.email);
    if (user.name != "Guest") {
      deleteRememberMe();
      checkRememberMe(email, password);
    }
    window.location.href = "./summary.html";
  } else {
    event.preventDefault();
    document.getElementById("wrongPassword").classList.remove("d-none");
    email = "";
    password = "";
  }
}

/**
 * The guest user gets logged in.
 */

function loginGuest() {
  let user = findUser("guest@123.de", "123abc!");
  checkLoginData(user, "guest@123.de", "123abc!");
}

/**
 * Checks if the input field has the hook, i.e. the attribute checked and if so, user data gets stored.
 */

function checkRememberMe(email, password) {
  if (document.getElementById("remember_me").checked == true) {
    storeRemember(email, password);
  }
}

/**
 * Stores the email and the password in the local storage.
 * @param {string} email of the user, which is currently logging in.
 * @param {string} password of the user, which is currently logging in.
 */

function storeRemember(email, password) {
  localStorage.setItem("email", email);
  localStorage.setItem("password", password);
}

/**
 * @returns the email of the user, which is currently logging in.
 */

function getRememberMeEmail() {
  return localStorage.getItem("email");
}
/**
 * @returns the password of the user, which is currently logging in.
 */

function getRememberMePassword() {
  return localStorage.getItem("password");
}

/**
 * Deletes the data of the user, when the remember me hook is removed.
 */

function deleteRememberMe() {
  localStorage.removeItem("email");
  localStorage.removeItem("password");
}

/**
 *If the user's email is stored in the local storage, the email and password fields are filled in automatically.
 */

function rememberMeFillInputFields() {
  let email = getRememberMeEmail();
  let password = getRememberMePassword();
  if (getRememberMeEmail()) {
    document.getElementById("remember_me").checked = true;
    document.getElementById("Email_login").value = email;
    document.getElementById("password_input").value = password;
  }
}

/**
 * Toggle password input
 */
function changeVisibility() {
  if (passwordState === 0) {
    document.getElementById("login-password-image").src = "./assets/img/visibility-off.png";
    document.getElementById("password_input").type = "password";
    passwordState = 1;
  } else {
    document.getElementById("login-password-image").src = "./assets/img/visibility.png";
    document.getElementById("password_input").type = "text";
    passwordState = 0;
  }
}

/**
 * Loading sig up form
 */
function loadSignUpForm() {
  let signUpForm = document.getElementById("form");
  document.getElementById("header_left").classList.add("d-none");
  signUpForm.innerHTML = ``;
  signUpForm.innerHTML = htmlSignup();
}

function htmlSignup() {
  return /*html*/ `

 <div class="login_form">
  <h2>Sign up</h2>
  <img onclick="loadHtml()" class="arrow" src="./assets/img/arrow-left.png">
  <form onsubmit="addUser(); return false">
       <input class="input_name" type="text" placeholder="Name" id="Name_signup" required>
       <span class="mistake-category-fields d-none" id="assigned-username">Sorry, this username is already taken.</span>
       <input class="input_mail" type="email" placeholder="Email" id="Email_signup" required>
       <span class="mistake-category-fields d-none" id="assigned-email-address">Sorry, this e-mail address is already taken.</span>
       <div style=position:relative;>
                <input type="password" placeholder="Password" id="password_input"class="input_password"  minlength="6" required>
                <img onclick="changeVisibility()" id="login-password-image" class="img-password" src="./assets/img/password_icon.png">
        </div>
       <div class="loginform_buttonarea">
       <button class="login_button" type="submit">Sign up</button>
       </div>
   </form>
 </div>

`;
}

/**
 * Loading forgot password form
 */
function loadForgotPassword() {
  let signUpForm = document.getElementById("form");
  document.getElementById("header_left").classList.add("d-none");
  signUpForm.innerHTML = ``;
  signUpForm.innerHTML = htmlForgotPassword();
}

/**
 * Send automatic mail
 */
async function onSubmit(event) {
  event.preventDefault(); // prevent default form action
  let formData = new FormData(event.target); // create a formdata based on our form element in HTML
  let response = await action(formData);
  if (response) {
    if (response.ok) {
      alert("Email was send!"); // Feedback für enduser
      document.getElementById("email_signup").value = "";
      window.location.href = "./index.html";
    } else {
      alert("Email not send!");
    }
  }
}

/**
 * Sending mail and giving back true or false
 */
function action(formData) {
  let email = document.getElementById("email_signup");
  let user = users.find((u) => u.email == email.value);
  if (user) {
    const input = "https://lars-peters.developerakademie.net/send_mail_join/send_mail.php";
    const requestInit = {
      method: "post",
      body: formData,
    };
    return fetch(input, requestInit);
  } else {
    document.getElementById("reset-mail-mistake").classList.remove("d-none");
  }
}

function htmlForgotPassword() {
  return /*html*/ `
<div class="login_form">
  <h2 class="text-size">I forgot my <br> Password</h2>
  <img onclick="loadHtml()" class="arrow" src="./assets/img/arrow-left.png">
  <p style="margin-top:-10px; margin-bottom:40px; text-align:center;">Don't worry! We will send an email with the instructions to <br> reset your password.</p>
  <form onsubmit="onSubmit(event)">
       <input class="input_mail" type="email"  name="email" placeholder="Email" id="email_signup" required oninput="removeDeleteMistakeMessage()">
       <span class="mistake-category-fields d-none" style="font-size: 16px !important;" id="reset-mail-mistake">
        No account exists for this email address.</span>
       <div class="loginform_buttonarea">
       <button class="login_button" style="margin-top:20px;" type="submit">Send me the email</button>
       </div>
   </form>
</div>
   `;
}

function removeDeleteMistakeMessage() {
  document.getElementById("reset-mail-mistake").classList.add("d-none");
}
