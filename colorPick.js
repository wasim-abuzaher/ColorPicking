var numberOfSquares = 6;
var colors = [];
var pickedColor;

var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.getElementById("message");
var h1 = document.querySelector("h1");
var resetButton = document.getElementById("reset");
var modeButton = document.querySelectorAll(".mode");

init();

function init() {
	modeButtonSetup();
	squaresSetup();
	reset();
}

function modeButtonSetup() {
	//Mode Buttons Event Listener
	for(var i = 0; i < modeButton.length; i++){
		modeButton[i].addEventListener("click", function(){
			modeButton[0].classList.remove("selected");
			modeButton[1].classList.remove("selected");
			this.classList.add("selected");

			//checks the mode and adjust numberOfSquares
			this.textContent === "Easy" ? numberOfSquares = 3: numberOfSquares =6;
			reset();
		});
	}
}

function squaresSetup() {
	for (var i = 0; i < squares.length; i++) {
		//add click listeners
		squares[i].addEventListener("click", function(){
			//grab color of clicked square
			var clickedColor = this.style.background;
			//compare color to pickedColor
			if(clickedColor === pickedColor){
				messageDisplay.textContent = "Correct";
				changeColor(pickedColor);
				resetButton.textContent = "Play Again"
				h1.style.background = pickedColor;
			} else {
				this.style.background = "#232323";
				messageDisplay.textContent = "Try Again";
			}
		});
	}
}

function reset(){
	//Generate new colors
	colors = generateRandomColor(numberOfSquares);
	//pick new random color from array
	pickedColor = pickColor();
	//Change colorDisplay to match pickedColor
	colorDisplay.textContent = pickedColor;
	resetButton.textContent = "New Colors";
	//change colors of squares
	for(var i=0; i < squares.length;  i++) {
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.background = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
	//reset the message display to empty string
	messageDisplay.textContent = "";
	//reset h1 background to Blue;
	h1.style.background = "steelblue";
}

function pickColor() {
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function changeColor(color) {
	for (var i = 0; i < squares.length; i++) {
	squares[i].style.background = color;
	}	
}

function generateRandomColor(num) {
	var arr = [];
	
	for (var i = 0; i < num; i++) {
		arr.push(randomColor());
	}
	
	return arr;
}

function randomColor() {
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	
	return "rgb(" + r + ", " + g + ", " + b + ")";
}

//Reset Button Click listener
resetButton.addEventListener("click", reset);