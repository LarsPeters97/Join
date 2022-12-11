/**
 * init function when body is loading
 */
async function summaryInit() {
    await includeHTML();
    showGreeting();
}

/**
 * showing greeting slogan and username
 */
function showGreeting() {
    let dateNow = new Date();
    let hours = dateNow.getHours();
    let greetingSlogan = returnGreetingSlogan(hours);
    document.getElementById('greeting-slogan').innerHTML = greetingSlogan;
    document.getElementById('greeting-name').innerHTML = userAccounts[activeUser].userName;
}

/**
 * returning the daytime greeting slogan
 * @param {number} hours - the hours of time now
 * @returns - greeting slogan
 */
function returnGreetingSlogan(hours) {
    let greetingSlogan;
    if (hours < 6 || hours > 22) {
        greetingSlogan = 'Good night, ';
    }
    if (hours >= 6 && hours < 10) {
        greetingSlogan = 'Good morning, ';
    }
    if (hours >= 10 && hours < 17) {
        greetingSlogan = 'Have a nice day, ';
    }
    if (hours >= 17 && hours <= 22) {
        greetingSlogan = 'Good evening, ';
    }
    return greetingSlogan;
}