/**
 * closes the popup and clears the arrays
 */
function closePopup() {
    clearTask();
    closeBoardPopup();
}


function checkIfPopupShouldBeClosed() {
    if (window.innerWidth < 750) {
       return;
    } else {
        closePopup();
    }
}
