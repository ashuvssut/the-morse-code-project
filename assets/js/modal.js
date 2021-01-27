//Task Pending
//  1.  Add a functionality that closes the modal when you 
//      click and area outside the modal

function closeGreeting(){
    document.querySelector('.greetings').classList.toggle('close');
}

function playAgain() {
    closeGreeting();
    handlePlayPress(document.querySelector('#play'));
}

function nextLevel() {
    closeGreeting();
    Logic.lvlChange(1);
}