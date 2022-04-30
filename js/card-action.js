
const addEventListenerForSaveName = () => {
    let saveCardNameButtons = document.querySelectorAll('button.name-save-btn');
    saveCardNameButtons.forEach((button) => button.addEventListener('click', saveCardName));
}

const attachClickListener = () => {
    cardListDiv.addEventListener('click', function(event) {


        if(!event.target.classList.contains("actionBtn"))
            return;
        

        const clickedElement = event.target;
        if(clickedElement.classList.contains('restore'))
            restore(clickedElement);
        else
            deleteCard(clickedElement);
    });
}

const deleteCard = (deleteBtn) => {
    const indexOfClickedCard = parseInt(deleteBtn.id.substring(4), 10);


    let clickedCard = document.querySelector("#card-section-" + indexOfClickedCard);
    clickedCard.remove();
    location.href = "popup.html";


    const savedData = JSON.parse(localStorage.getItem('data'));
    savedData.splice(indexOfClickedCard, 1);
    localStorage.setItem('data', JSON.stringify(savedData));
}

const restore = function(restoreBtn) {
    const savedData = JSON.parse(localStorage.getItem('data'));
    const indexOfClickedCard = parseInt(restoreBtn.id.substring(8), 10);
    

    chrome.tabs.query({currentWindow: true, active: true}, function() {                           
        
        savedData[indexOfClickedCard].urls.forEach(url => {     
            chrome.tabs.create({url: url});
        });

    });
}

const saveCardName = (event) => {
    let idString = event.target.id;
    const indexOfCardClicked = parseInt(idString.substring(8), 10);      
    
    let nameTextBox = document.querySelector("#name-" + indexOfCardClicked);
    const enteredName = nameTextBox.value;
    if (enteredName) {
        const savedTabGroups = JSON.parse(localStorage.getItem('data'));
        savedTabGroups[indexOfCardClicked].name = enteredName;
        localStorage.setItem('data', JSON.stringify(savedTabGroups));
    }
    location.href = "popup.html";
}