let currentUser;
let currentUserEmail = localStorage.getItem("currentUserEmail");

/**
 * The url is set. JSON gets loaded from the backend and the currentUser Variable gets the data object of the user and the initials of the user are displayed.
 */
async function initGeneral() {
  setURL("https://lars-peters.developerakademie.net/smallest_backend_ever");
  await downloadFromServer();
  users = (await JSON.parse(backend.getItem("users"))) || [];
  if (checkUserIsLoggedIn()) {
    checkCurrentUser();
    showUserInitals();
  }
}
/**
 * Displays the 'logo' of the current User with his Initials and his background-color.
 */

function showUserInitals() {
  let loggedInUserInitials = document.getElementById(`logged-in-user-initials`);
  let mobileLoggedInUserInitials = document.getElementById(`mobile-logged-in-user-initials`);
  if (loggedInUserInitials && currentUser) {
    loggedInUserInitials.innerHTML = currentUser.icon;
    loggedInUserInitials.style.backgroundColor = `${currentUser.iconColor}`;
  }
  if (mobileLoggedInUserInitials) {
    mobileLoggedInUserInitials.innerHTML = currentUser.icon;
    mobileLoggedInUserInitials.style.backgroundColor = `${currentUser.iconColor}`;
  }
}

/**
 * Check the currentUser and load the data.
 */
function checkCurrentUser() {
  currentUser = users.find((user) => user.email == currentUserEmail);
}

/* include html*/
async function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;
          }
          if (this.status == 404) {
            elmnt.innerHTML = "Page not found.";
          }
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      };
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}

/**
 * The global Array currentUserTasks gets the tasks of the currently logged in user.
 */

function checkCurrentUserTasks() {
  currentUserTasks = currentUser.tasks;
}

/**
 * The user gets logged out and the local Storage data abou the user is deleted.
 */

function logout() {
  localStorage.removeItem("currentUserEmail");
  localStorage.removeItem("rememberMe");
  window.location.href = "./index.html";
}

/**
 * Checks if the user has logged in.
 */
function checkUserIsLoggedIn() {
  let currentLoggedInUser = localStorage.getItem("currentUserEmail");
  if (window.location.pathname != "/index.html") {
    if (!currentLoggedInUser) {
      window.location.href = "./index.html";
    } else {
      return true;
    }
  }
}
