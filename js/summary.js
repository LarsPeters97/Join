/**
 * Change greeting at summary depending on the time of day
 */
function getDateAndTime() {
    let currentDate = new Date();
    let welcome = document.getElementById('welcome');
    welcome.innerHTML = ``;
    let hour = currentDate.getHours();
    if (hour < 12) {
        welcome.innerHTML = "Good morning";
    } else if (hour > 12 && hour < 17) {
        welcome.innerHTML = "Good afternoon";
    } else {
        welcome.innerHTML = "Good evening";
    }
}