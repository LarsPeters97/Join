let passwordState = 0;

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

/**
 * @returns the Login template.
 */

function htmlLogin() {
  return /*html*/ `
    <div class="login_form">
      <h2>Log in</h2>
      <form onsubmit="login(); return false;">
        <input class="input_mail" type="email" placeholder="Email" id="Email_login" required oninput="addClassDnone('wrongPassword')">
        <div style=position:relative;>
          <input type="password" placeholder="Password" id="password_input"class="input_password" required oninput="addClassDnone('wrongPassword')">
          <img onclick="changeVisibility()" id="login-password-image" class="img-password" src="./assets/img/password_icon.png">
        </div>
          <div id="wrongPassword" class="wrong-password d-none">Wrong Email / Password!</div>
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
    </div>`;
}

/**
 * Gets the email and password an check the login data.
 */
function login() {
  let email = document.getElementById("Email_login");
  let password = document.getElementById("password_input");
  let user = findUser(email.value, password.value);
  checkLoginData(user, email.value, password.value);
}

/**
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
 * Toggles the password input.
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
 * Loads the sign up form.
 */
function loadSignUpForm() {
  let signUpForm = document.getElementById("form");
  document.getElementById("header_left").classList.add("d-none");
  signUpForm.innerHTML = ``;
  signUpForm.innerHTML = htmlSignup();
}

/**
 * @returns the Register respectively the sign up template.
 */

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
        <div style="position:relative;">
          <input type="password" placeholder="Password" id="password_input"class="input_password"  minlength="6" required>
          <img onclick="changeVisibility()" id="login-password-image" class="img-password" src="./assets/img/password_icon.png">
        </div>
        <div class="loginform_buttonarea">
          <button class="login_button" type="submit">Sign up</button>
        </div>
      </form>
    </div>`;
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
 * The content of the form is stored in a Form Data object. If the server response can be successfully processed by the action function,
 * a popup message that the email was successfully sent is opened. And if not, an error message is displayed.
 * @param {object} event has information over the event onsubmit.
 */
async function onSubmit(event) {
  event.preventDefault();
  let formData = new FormData(event.target); // Create a FormData based on our Form Element in HTML
  let response = await action(formData);
  if (response) {
    if (response.ok) {
      showMessageAndMoveToIndexHtml("message-mail-send");
    } else {
      removeClassDnone("mail-sending-mistake");
    }
  } else {
    return;
  }
}

/**
 * Checks if the user is in the array users. And if so, an HTTP POST request is sent to the server so that an email can be sent. This is done using the fetch method.
 * @param {object} formData is the content of the form.
 * @returns the result of the fetch method.
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
    removeClassDnone("reset-mail-mistake");
  }
}

/**
 * @returns the html template for the forgotten password.
 */

function htmlForgotPassword() {
  return /*html*/ `
  <div id="message-mail-send" class="message-password d-none"><img src="./assets/img/send-mail.png" alt="An E-Mail has been sent to you." class="send-mail" id="send-mail"></div>
  <div class="login_form">
    <h2 class="text-size">I forgot my <br> Password</h2>
    <img onclick="loadHtml()" class="arrow" src="./assets/img/arrow-left.png">
    <p class="message-forgot-password">Don't worry! We will send an email with the instructions to <br> reset your password.</p>
    <form onsubmit="onSubmit(event)">
       <input class="input_mail" type="email"  name="email" placeholder="Email" id="email_signup" required 
       oninput="addClassDnone('reset-mail-mistake'); addClassDnone('mail-sending-mistake')">
       <span class="mistake-category-fields d-none" style="font-size: 16px !important;" id="reset-mail-mistake">
        No account exists for this email address.</span>
        <span class="mistake-category-fields d-none" style="font-size: 16px !important;" id="mail-sending-mistake" >
        The email could not be sent for technical reasons. Please try again later.</span>
       <div class="loginform_buttonarea">
       <button class="login_button" style="margin-top:20px;" type="submit">Send me the email</button>
        </div>
    </form>
  </div>
   `;
}
