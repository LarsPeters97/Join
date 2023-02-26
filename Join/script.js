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
 * Displays the 'logo' of the current User with his Initials and his background-color if the user is logged in.
 */

function showUserInitals() {
  if (currentUser) {
    checkScreenWidth();
  }
}

window.addEventListener("resize", checkScreenWidth);

/**
 * Checks the screen width and either the desktop or mobile template user icon is added.
 */

function checkScreenWidth() {
  if (window.innerWidth <= 1050 && window.location.pathname != "/Join/index.html") {
    setTimeout(mobileScreenIcon, 150);
  }
  if (window.innerWidth > 1050 && window.location.pathname != "/Join/index.html") {
    setTimeout(desktopScreenIcon, 150);
  }
}

/**
 * Shows the mobile user icon.
 */

function mobileScreenIcon() {
  let mobileLoggedInUserInitials = document.getElementById("mobile-logged-in-user-initials");
  if (mobileLoggedInUserInitials) {
    mobileLoggedInUserInitials.innerHTML = currentUser.icon;
    mobileLoggedInUserInitials.style.backgroundColor = `${currentUser.iconColor}`;
  }
}

/**
 * Shows the desktop user icon.
 */

function desktopScreenIcon() {
  let loggedInUserInitials = document.getElementById("logged-in-user-initials");
  loggedInUserInitials.innerHTML = currentUser.icon;
  loggedInUserInitials.style.backgroundColor = `${currentUser.iconColor}`;
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
  if (window.location.pathname != "/Join/index.html") {
    if (!currentLoggedInUser) {
      window.location.href = "./index.html";
    } else {
      return true;
    }
  }
}

/**
 * This function removes the class d-none, so the Element is there.
 * @param {string} idElement is the id of the HTML-Element
 */

function removeClassDnone(idElement) {
  document.getElementById(idElement).classList.remove("d-none");
}

/**
 This function adds the class d-none, so the Element is not there.
 * @param {string} idElement is the id of the HTML-Element
 */

function addClassDnone(idElement) {
  document.getElementById(idElement).classList.add("d-none");
}

/**
 * A popup with a message is opened and after 2750ms is redirected to the home page.
 * @param {string} id of the div-container which opens the popup for the message.
 */

function showMessageAndMoveToIndexHtml(id) {
  document.getElementById(id).classList.add("show-message");
  setTimeout(() => {
    document.getElementById(id).classList.remove("show-message");
    window.location.href = "./index.html";
  }, 2750);
}

/**
 * Closes any popup
 */
function closesPopupAddTask() {
  if (window.location.pathname == "/Join/board.html") {
    document.getElementById("Boardpopup").innerHTML = "";
    document.getElementById("Boardpopup").classList.add("d-none");
    document.getElementById("Boardpopup").style.overflow = "unset";
  }
  if (window.location.pathname == "/Join/contact.html") {
    document.getElementById("task-popup-contact-page").innerHTML = "";
    document.getElementById("task-popup-contact-page").classList.add("d-none");
    document.getElementById("task-popup-contact-page").style.overflow = "unset";
  }
}

/**
 * @param {object} task which gets opened.
 * @returns the formatted date in DD-MM-YYY.
 */

function dueDate(task) {
  let duedateunformated = task[0]["duedate"].toString();
  let year = duedateunformated.slice(0, 4);
  let month = duedateunformated.slice(4, 6);
  let day = duedateunformated.slice(6);
  return `${day}-${month}-${year}`;
}
