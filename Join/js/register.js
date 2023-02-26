/**
 * JSON gets loaded from the backend.
 */

async function initSignup() {
  await initGeneral();
}

/**
 * Get user data from html5 form and check if user is registered.
 */

function addUser() {
  let nameAssign = document.getElementById("name_assign");
  let emailAssign = document.getElementById("email_assign");
  nameAssign.classList.add("display-none");
  emailAssign.classList.add("display-none");
  let userName = document.getElementById("user_name").value;
  let userEmail = document.getElementById("user_email").value;
  let userPassword = document.getElementById("user_password").value;
  checkIsUserRegistered(userName, userEmail, userPassword);
}

/**
 * Getting the user data and checking if user is already registered.
 */

async function addUser() {
  let newEmail = document.getElementById("Email_signup").value;
  let newName = document.getElementById("Name_signup").value;
  checkIfUserIsAlreadyRegistered(newEmail, newName);
}

/**
 * Checks if the array users contains the name and email adress in lower case letters.
 * @param {string} newEmail is the email adress of the user who wants to register.
 * @param {string} newName is the name of the user who wants to register.
 */

function checkIfUserIsAlreadyRegistered(newEmail, newName) {
  let indexOfNewEmail = users.findIndex((user) => user.email.lowerCaseEmail == newEmail.toLowerCase());
  let indexOfNewName = users.findIndex((user) => user.name.lowerCaseName == newName.toLowerCase());
  checkRegistrationOfNewUser(indexOfNewEmail, indexOfNewName);
}

/**
 * Checks if the email or name of the potential new user hasn't been in a user in the users array. And if nevertheless, an error message is displayed.
 * @param {string} indexOfNewEmail is the index of the users email adress in the array users.
 * @param {number} indexOfNewName is the index of the users name in the array users.
 */

function checkRegistrationOfNewUser(indexOfNewEmail, indexOfNewName) {
  let newEmail = document.getElementById("Email_signup").value;
  let newName = document.getElementById("Name_signup").value;
  let newPassword = document.getElementById("password_input").value;
  if (indexOfNewEmail == -1 && indexOfNewName == -1) {
    registerNewUser(newEmail, newName, newPassword);
  } else {
    checkIfNameIsAlreadyRegistered(indexOfName);
    checkIfEmailIsAlreadyRegistered(indexOfEmail);
  }
}

/**
 * If the name is already registered an error message is displayed and if not and the error message was displayed in the past, it get's removed by
 * adding the class d-none.
 * @param {number} indexOfName
 */

function checkIfNameIsAlreadyRegistered(indexOfName) {
  let assignedUsername = document.getElementById("assigned-username");
  if (indexOfName != -1) {
    assignedUsername.classList.remove("d-none");
  } else if (assignedUsername.classList.contains("d-none")) {
    assignedUsername.classList.remove("d-none");
  }
}

/**
 * If the email is already registered an error message is displayed and if not and the error message was displayed in the past, it get's removed by
 * adding the class d-none.
 * @param {number} indexOfEmail
 */

function checkIfEmailIsAlreadyRegistered(indexOfEmail) {
  let assignedEmailAddress = document.getElementById("assigned-email-address");
  if (indexOfEmail != -1) {
    assignedEmailAddress.classList.remove("d-none");
  } else if (assignedEmailAddress.classList.contains("d-none")) {
    assignedEmailAddress.classList.remove("d-none");
  }
}

/**
 * Register the new user and add his data in the users array and save that on the backend.
 * @param {string} newEmail is the selected email adress of the new user.
 * @param {string} newName is the selected user name of the new user.
 * @param {string} newPassword ist the selected password of the new user.
 */

async function registerNewUser(newEmail, newName, newPassword) {
  pushNewUserToUsersArray(newEmail, newName, newPassword);
  await backend.setItem("users", JSON.stringify(users));
  window.location.href = "./index.html";
}

/**
 * The new user data object gets pushed in the array users.
 * @param {string} newEmail is the email adress from the user.
 * @param {string} newName is the name of the user.
 * @param {string} newPassword ist the password from the user.
 */

function pushNewUserToUsersArray(newEmail, newName, newPassword) {
  users.push({
    email: newEmail,
    lowerCaseEmail: newEmail.toLowerCase(),
    name: newName,
    lowerCaseName: newName.toLowerCase(),
    password: newPassword,
    icon: getIcon(newName),
    iconColor: randomColor(),
    tasks: [],
    contacts: [],
    categories: [{ name: "General topics", color: "#FC71FF" }],
  });
}
