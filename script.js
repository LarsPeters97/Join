/* include html*/
function includeHTML() {
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
          if (this.status == 200) { elmnt.innerHTML = this.responseText; }
          if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}

function init(){
  let loginForm = document.getElementById('form');
  document.getElementById('header_left').classList.remove('d-none');
  loginForm.innerHTML = ``;
  loginForm.innerHTML = htmlLogin();
}

function htmlLogin(){
  return `
  <h2>Log in</h2>
            <form>
                <input class="input_mail" type="email" placeholder="Email" id="Email_login" required>
                <input type="password" placeholder="Password" id="password_login"class="input_password" required>

                <div class="login_form_part3">
                    <input type="checkbox" id="remember_me">
                    <p>Remember me</p>
                    <p class="forgot_password">Forgot my password</p>
                </div>
                <div class="loginform_buttonarea">
                    <button class="login_button" type="submit">Log in</button>
                    <button class="guest_button">Guest Log in</button>
                </div>
            </form>
  `;
}

function loadSignUpForm() {
  let signUpForm = document.getElementById('form');
  document.getElementById('header_left').classList.add('d-none');
  signUpForm.innerHTML = ``;
  signUpForm.innerHTML = htmlSignup();

}

function htmlSignup(){
  return `
  <h2>Sign up</h2>
  <img onclick="init()" class="arrow" src="./assets/img/arrow-left.png">
  <form>
       <input class="input_name" type="text" placeholder="Name" id="Name_signup" required>
       <input class="input_mail" type="email" placeholder="Email" id="Email_signup" required>
       <input type="password" placeholder="Password" id="password_signup"class="input_password" required>
       <div class="loginform_buttonarea">
       <button class="login_button" type="submit">Sign up</button>
       </div>
   </form>
`;
}