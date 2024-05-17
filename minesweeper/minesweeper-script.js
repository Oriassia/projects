// Define the grid size
let rows;
let columns ;
let filledCellsCounter;
let cellsToFill;
let flagsCounter;
let gridCellsArray;
let grid_size;
let seconds_count;
let minutes_count
let timerContent;
let timerInterval;
let bombIcon = `<i class="fa-solid fa-bomb"></i>`
let flagIcon = `<i class="fa-solid fa-land-mine-on"></i>`
let scoreBoard = getScoreBoardLS()
let input_name = document.querySelector("input");
// Get the grid container element
const gridContainer = document.querySelector(".board-grid");

function getScoreBoardLS(){
  let scorBoardString = localStorage.getItem("scoreBoardData")
  return scorBoardString ? JSON.parse(scorBoardString) : []
}

function easyBoard(){
  rows = 8
  columns = 8
  cellsToFill = 10
  gridContainer.style.gridTemplateColumns = `repeat(${columns}, 50px)`;
  gridContainer.style.gridTemplateRows = `repeat(${rows}, 50px)`;
  createboard()
}

function mediumBoard(){
  rows = 10
  columns = 10
  cellsToFill = 12
  gridContainer.style.gridTemplateColumns = `repeat(${columns}, 50px)`;
  gridContainer.style.gridTemplateRows = `repeat(${rows}, 50px)`;
  createboard()
}

function hardBoard(){
  rows = 15
  columns = 15
  cellsToFill = 17
  gridContainer.style.gridTemplateColumns = `repeat(${columns}, 50px)`;
  gridContainer.style.gridTemplateRows = `repeat(${rows}, 50px)`;
  createboard()
}


function createboard() {
  // Create the grid dynamically
     gridContainer.replaceChildren();
     grid_size = rows * columns;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      // Create a grid item element
      const gridItem = document.createElement("div");
      gridItem.classList.add("grid-item");
      gridItem.classList.add("hidden");
      gridItem.dataset.value = gridContainer.children.length ;
      gridItem.addEventListener("contextmenu", function(event) {
        event.preventDefault();
    });
      gridItem.addEventListener("mouseup", (e) => {
        if (gridItem.classList.contains("hidden")){
          if(e.button == 0 && !gridItem.classList.contains("flagged")){
              checkPressedCell(gridItem);
              checkFinish()
            }
          else if(e.button == 2){
              flagItem(gridItem);  
              checkFinish()
        }
    }})
 

      // Append the grid item to the grid container
      gridContainer.appendChild(gridItem);
    }
  }
  gridCellsArray = gridContainer.children
  insertRandomBombs();
  setBombsIndicators();
  flagsCounter = cellsToFill
  
}

// Function to generate a random integer between min and max (inclusive)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to insert bomb-class into 10 random cells in the grid
function insertRandomBombs() {
  // const totalCells = rows * columns;
  filledCellsCounter = new Set(); // To keep track of filled cells

  // add bomb class to 10 random cells 
  while (filledCellsCounter.size < cellsToFill) {
    const randomIndex = getRandomInt(0, gridCellsArray.length - 1);
    if (!filledCellsCounter.has(randomIndex)) {
      filledCellsCounter.add(randomIndex);
      gridCellsArray[randomIndex].classList.add("bomb-cell")
    }
  }    
  flagsCounter = cellsToFill
  updateFlagsCounter()
  console.log(filledCellsCounter);
}

function setBombsIndicators() {
  for (let i = 0; i < grid_size; i++) {
    if (!gridCellsArray[i].classList.contains("bomb-cell")) {
      bombsAroundCell(i);
    }
  }
}

function bombsAroundCell(cell_index) {
  let x_counter = 0;
  // Check right neighbor
  if ((cell_index + 1) % columns !== 0) {
    if (gridCellsArray[cell_index + 1].classList.contains("bomb-cell")) {
      x_counter++;
    }
  }

  // Check left neighbor
  if (cell_index % columns !== 0) {
    if (gridCellsArray[cell_index - 1].classList.contains("bomb-cell")) {
      x_counter++;
    }
  }

  // Check top neighbor
  if (cell_index >= columns) {
    if (
      gridCellsArray[cell_index - columns].classList.contains("bomb-cell")) {
      x_counter++;
    }

    // Check top right neighbor
    if ((cell_index + 1) % columns !== 0) {
      if (
        gridCellsArray[cell_index - columns + 1].classList.contains("bomb-cell")) {
        x_counter++;
      }
    }

    // Check top left neighbor
    if (cell_index % columns !== 0) {
      if (
        gridCellsArray[cell_index - columns - 1].classList.contains("bomb-cell")) {
        x_counter++;
      }
    }
  }

  // Check bottom neighbor
  if (cell_index + columns < grid_size) {
    if (
      gridCellsArray[cell_index + columns].classList.contains("bomb-cell")
    ) {
      x_counter++;
    }

    // Check bottom right neighbor
    if ((cell_index + 1) % columns !== 0) {
      if (
        gridCellsArray[cell_index + columns + 1].classList.contains("bomb-cell")
      ) {
        x_counter++;
      }
    }

    // Check bottom left neighbor
    if (cell_index % columns !== 0) {
      if (
        gridCellsArray[cell_index + columns - 1].classList.contains("bomb-cell")
      ) {
        x_counter++;
      }
    }
  }
  if(x_counter > 0)
    gridCellsArray[cell_index].id = x_counter;
  else{
    gridCellsArray[cell_index].id = "";
  }
}

function checkPressedCell(item){
  if (item.classList.contains("hidden")){
    if(!item.classList.contains("bomb-cell")){
      const value = item.dataset.value;
      openCell(value)
    }
    // check for bomb
    else{
      bombHit()
}
}
}

function bombHit(){
  alert(`You hit a bomb! \nTime: ${timerContent.textContent} minutes`)
  clearInterval(timerInterval)
  let allGridItems = document.querySelectorAll(".grid-item");
  allGridItems.forEach(gridItem => {
    gridItem.classList.remove("hidden");
    if(gridItem.querySelector("i")){
      gridItem.querySelector("i").remove();
    }
    if(gridItem.classList.contains("flagged")){
      gridItem.classList.remove("flagged");    
    }
    if (!gridItem.classList.contains("bomb-cell")){
        gridItem.textContent = gridItem.id
    }
});

  document.querySelectorAll(".bomb-cell").forEach(bombItem => {
    if(bombItem.querySelector("i")){
      bombItem.querySelector("i").remove();
    }
    bombItem.classList.add("open-bomb");
    bombItem.innerHTML = bombIcon
    });
// updateScoreBoard()
}

function updateScoreBoard(){
  let timeAsNumber = Number(minutes_count.toString().padStart(2,`0`) + seconds_count.toString().padStart(2,`0`));

  scoreBoard.push({"name":input_name.value, "time": timeAsNumber, 
  "timeStr" : timerContent.textContent, "date": getCurrentDate()})

  // sort by time
  scoreBoard.sort((a, b) => a.time - b.time);

  //update local storage
  localStorage.setItem("scoreBoardData", JSON.stringify(scoreBoard))
}

function flagItem(item){

    if(item.classList.contains("flagged")){
      item.querySelector("i").remove();
      item.classList.remove("flagged");
      flagsCounter ++;
    }
    else{
      item.classList.add("flagged");
      item.innerHTML += flagIcon ////////// buggggggggggg
      flagsCounter --;
    }
    updateFlagsCounter()
  }

  function updateFlagsCounter(){
    document.getElementById("bombs-counter").textContent = `Remaining bombs: ${flagsCounter}`
  }

function openCell(cell_index) {
  if (gridCellsArray[cell_index].classList.contains("hidden") 
    && !gridCellsArray[cell_index].classList.contains("bomb-cell")){

    if(gridCellsArray[cell_index].classList.contains("flagged")){
      gridCellsArray[cell_index].classList.remove("flagged")

      try {
        gridCellsArray[cell_index].querySelector("i").remove();
      } catch (error) {
        console.error("An error occurred while removing the icon:", error);
      }
      }
      gridCellsArray[cell_index].textContent = gridCellsArray[cell_index].id
      gridCellsArray[cell_index].classList.remove("hidden");

    if (gridCellsArray[cell_index].id == "") {
        checkLinkedElems(cell_index);
      }
  }
}

function checkLinkedElems(input_index) {
  let cell_index = Number(input_index);
  // Check right neighbor
  if (cell_index % columns !== columns - 1) {
      openCell(cell_index + 1);
  }
  // Check left neighbor
  if (cell_index % columns !== 0) {
      openCell(cell_index - 1);
  }
  // Check top neighbor
  if (cell_index >= columns) {
      openCell(cell_index - columns);
  }
  // Check bottom neighbor
  if (cell_index + columns < gridCellsArray.length) {
      openCell(cell_index + columns);
  }
}

function checkFinish(){
  let allHiddenCells = document.querySelectorAll(".hidden");
  if(allHiddenCells.length > 0) {
    for (let cell of allHiddenCells){
      if (!(cell.classList.contains("bomb-cell") 
        && cell.classList.contains("flagged"))){
        return "" ;
      }
    }
    setTimeout(function() {
      alert(`Congrats!! You finished the game :) \nTime : ${timerContent.textContent} minutes`);
    }, 1000);
    clearInterval(timerInterval)
    updateScoreBoard()
  }
}


function startTimer() {
  seconds_count = 0;
  minutes_count = 0;
  timerContent = document.getElementById("timer-btn");
  timerContent.textContent = "00:00"
  timerInterval = setInterval(() => {
    seconds_count++;
    // Update the button text with the elapsed time
    if(seconds_count == 60){
      seconds_count = 0;
      minutes_count ++;
    }
        timerContent.textContent = `${minutes_count.toString().padStart(2,`0`)}:${seconds_count.toString().padStart(2,`0`)}`;
  }, 1000); // Update every second
}

function pageSwitch(page){
  let openingPageElem = document.querySelector(".opening-page")
  let gamePageElem = document.querySelector(".game-play-page")
  let historyPageElem = document.querySelector(".score-board-page")

  // Hide all pages initially
  gamePageElem.classList.add("hidden-page");
  openingPageElem.classList.add("hidden-page");
  historyPageElem.classList.add("hidden-page");

  // Toggle visibility based on the selected page
  switch (page) {
    case "game":
      gamePageElem.classList.remove("hidden-page");
      break;
    case "history":
      historyPageElem.classList.remove("hidden-page");
      break;
    default:
      openingPageElem.classList.remove("hidden-page");
  }

  seconds_count > 0 && clearInterval(timerInterval) 
}

function printScoreBoard() {
  // Check if the table already exists
  let tableBody = document.querySelector(".tbody");
    if (tableBody.children.length > 0) {
    tableBody.replaceChildren();
  }

  let place = 1;

  // Populate table body with player data
  scoreBoard.forEach(player => {
    let row = document.createElement("tr");
    let placeCell = document.createElement("td");
    let nameCell = document.createElement("td");
    let timeCell = document.createElement("td");
    let dateCell = document.createElement("td");

    placeCell.textContent = place;
    nameCell.textContent = player.name;
    timeCell.textContent = player.timeStr;
    dateCell.textContent = player.date;

    // Append cells to the row
    row.appendChild(placeCell);
    row.appendChild(nameCell);
    row.appendChild(timeCell);
    row.appendChild(dateCell);

    // Append the row to the table body
    tableBody.appendChild(row);
    place++;
  });

}

function getCurrentDate() {
  // Create a new Date object
  let currentDate = new Date();

  // Get the current date components
  let year = currentDate.getFullYear();
  let month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  let day = currentDate.getDate().toString().padStart(2, '0');

  // Construct the date string
  let dateString = `${day}/${month}/${year}`;

  return dateString;
}
