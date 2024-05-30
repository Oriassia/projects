



const cards_container = document.createElement("div");
cards_container.setAttribute("class", "card-container");
document.querySelector("#game-page").appendChild(cards_container);


// let startTime; // Variable to store the start time of the game
let playerName; // Variable to store the player's name
let timerInterval; // Variable to store the interval ID for the timer
let seconds;
let board_size;

let history_array = []

function startGame_4(){
    board_size = 4 ** 2;
    hideOpening();
    // startTime = new Date(); // Get the current time when the game starts
    playerName = document.querySelector(".input-name").value;

    let images_array = create_Images_array();
    let cards_array = createCardsArray(images_array);
    cards_container.innerHTML = '';
    cards_array.forEach(card => cards_container.appendChild(card));    
    create_stopwatch()
}

// function to create an array of cards
function createCardsArray(inner_images_array){
    let temp_cards_array = [];
    // running board_size / 2
    for (let i = 0; i < board_size / 2; i++) {
        // creating 2 cards
        for (let limit_2 = 0; limit_2 < 2; limit_2++) {
        // creating a card with a photo
        let new_card = create_card(inner_images_array[i]);
        temp_cards_array.push(new_card);
        }
    }

    let shuffledCardsArray =  shuffleArray(temp_cards_array)
    return shuffledCardsArray
}


// Function to create a card with a given image
function create_card(image) {
    // Create card element
    const card = document.createElement("div");
    card.classList.add("card");
    card.onclick = function () {
        toggleFlip(this);
        checkForMatch();
        check_win();
    };

    // Create card front
    const cardFront = document.createElement("div");
    cardFront.classList.add("card-front");

    // Create card back
    const cardBack = document.createElement("div");
    cardBack.classList.add("card-back");

    // Clone the image and append it to the card back
    const clonedImage = image.cloneNode(true);
    cardBack.appendChild(clonedImage);

    // Store the image's identifier in the card as a data attribute
    card.dataset.imageId = image.dataset.id;

    // Append front and back to the card
    card.appendChild(cardFront);
    card.appendChild(cardBack);

    return card;
}


// Function to create an array of images with unique identifiers
function create_Images_array() {
    const images = [];
    const imageUrls = [
        "images/angry_cat.jpg",
        "images/bull.jpg",
        "images/cubes.jpg",
        "images/elephant.jpg",
        "images/pyramids.jpg",
        "images/brocoli_tree.jpg",
        "images/tree.jpg",
        "images/zebra.jpg",
    ];

    // Iterate over the image URLs and create Image elements with identifiers
    imageUrls.forEach((url, index) => {
        const newImg = new Image();
        newImg.dataset.id = index;// Assign a unique identifier to each image
        newImg.src = url;
        images.push(newImg);
    });

    return images;
}



// Function to toggle the flipped state of a card
function toggleFlip(card) {
    const tempflippedCards = document.querySelectorAll(".card.temp-flipped");
    if (tempflippedCards.length !== 2 ){
        card.classList.toggle("temp-flipped");
    }
}


// Function to check if two flipped cards match
function checkForMatch() {
    const tempflippedCards = document.querySelectorAll(".card.temp-flipped");

    // Check if two cards are flipped
    if (tempflippedCards.length === 2) {
        const card1 = tempflippedCards[0];
        const card2 = tempflippedCards[1];

        // Compare the image identifiers
        if (card1.dataset.imageId === card2.dataset.imageId) {
            // The images match
            //  keep the cards flipped
            card1.classList.add("flipped");
            card2.classList.add("flipped");

            //remove temp class
            card1.classList.remove("temp-flipped");
            card2.classList.remove("temp-flipped");
    }
    else {
        // The images don't match; unflip the cards after a short delay
        setTimeout(() => {
            card1.classList.remove("temp-flipped");
            card2.classList.remove("temp-flipped");
        }, 1000);
    }
}
}


//function to check if the game finished
function check_win(){
    const allflippedCards =
        document.querySelectorAll(".flipped");
        if (allflippedCards.length === board_size){
            setTimeout(() => {
                endGame()}, 1000);
        }
}


function endGame() {
    const gameTimeInSeconds = seconds;
    saveToHistory(playerName, gameTimeInSeconds);
    alert(`You finished the game ! \nName : ${playerName} \nTime : ${gameTimeInSeconds} `);
    hideGame();
}


function saveToHistory(playerName, timeInSeconds) {
    const gameRecord = {
        "playerName": playerName,
        "timeInSeconds": timeInSeconds
    };
    history_array.push(gameRecord);
}



function hideOpening(){
    document.querySelector("#opening-page").style.display = "none";
    document.querySelector("#game-page").style.display = "block";
    document.body.style.display = "block";
}


function hideGame(){
    document.querySelector("#opening-page").style.display = "block";
    document.querySelector("#game-page").style.display = "none";
}


function showHistory(){
    let message = '';
    for (let entry of history_array) {
        message += `Name: ${entry.playerName}, Time: ${entry.timeInSeconds}\n`;
    }
    const history_p = document.createElement("p"); 
    history_p.innerText = message; // Set the text content of the <p> element
    document.querySelector("#opening-page").appendChild(history_p); // Append the <p> element to the opening page
}



function create_stopwatch(){
    let timer_button = document.createElement("button")
    timer_button.innerText = "start :"
    timer_button.classList.add("timer-button")
    document.querySelector("#game-page").appendChild(timer_button);
    timer_button.onclick = function () {
        startTimer()
    };
}



function startTimer() {
  seconds = 0;
  timerInterval = setInterval(() => {
    seconds++;
    // Update the button text with the elapsed time
    document.querySelector('#game-page button').innerText = `Time: ${seconds} seconds`;
  }, 1000); // Update every second
}


// Function to shuffle an array
function shuffleArray(arr) {
    // Create a copy of the input array to avoid modifying the original array
    const shuffledArray = arr.slice();

    // Fisher-Yates shuffle
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        // Generate a random index from 0 to i (inclusive)
        const j = Math.floor(Math.random() * (i + 1));

        // Swap the elements at indices i and j
        [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
        ];
    }

    // Return the shuffled array
    return shuffledArray;
}
