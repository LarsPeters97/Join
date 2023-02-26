let email = "";

/**
 * The variable email gets the email from the url. The data from the backend is loaded and assigned to the global variable users.
 */

async function onPageLoad() {
  email = getEmailUrlParameter();
  setURL("https://lars-peters.developerakademie.net/smallest_backend_ever");
  await downloadFromServer();
  users = (await JSON.parse(backend.getItem("users"))) || [];
}

/**
 * Get mail adresse from the url.
 * @returns email as string.
 */

function getEmailUrlParameter() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const email = urlParams.get("email");
  return email;
}

/**
 * Prevents the form from being executed, which would cause the page to be reloaded.
 */

function onSubmitDefault(event) {
  event.preventDefault();
}

/**
 * The user is found using the email and if the password is longer than 6 characters, it is changed. Otherwise an error message is displayed.
 */

async function resetPassword() {
  let password = document.getElementById("password");
  let confirmedPassword = document.getElementById("password_input");
  let user = users.find((u) => u.email == email);
  if (password.value.length >= 6) {
    if (password.value == confirmedPassword.value && user) {
      await setNewPasswordSaveItAndMoveToIndexHTML(user);
    } else {
      removeClassDnone("unequal-password-mistake");
    }
  } else {
    removeClassDnone("password-length-mistake");
  }
}

/**
 * The password is changed and saved in the backend. Then the change is displayed as a popup and redirected to the start page.
 * @param {object} user who changes the password.
 */

async function setNewPasswordSaveItAndMoveToIndexHTML(user) {
  let newPassword = document.getElementById("password_input");
  user.password = newPassword.value;
  await backend.setItem("users", JSON.stringify(users));
  await showMessageAndMoveToIndexHtml("message-reset-password");
}

/**
 * Toggles the password input.
 */

function changeVisibilityResetPassword() {
  if (passwordState === 0) {
    document.getElementById("login-password-image").src = "./assets/img/visibility-off.png";
    document.getElementById("password").type = "password";
    passwordState = 1;
  } else {
    document.getElementById("login-password-image").src = "./assets/img/visibility.png";
    document.getElementById("password").type = "text";
    passwordState = 0;
  }
}
