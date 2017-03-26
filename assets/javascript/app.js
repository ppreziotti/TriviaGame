// GLOBAL VARIABLES
//==========================================================================================
var correctAnswers;
var incorrectAnswers;
var noAnswers;
var userGuess;
var number;
var intervalId;
var clock = $("<h1>");
var buzzer = new Audio("assets/sounds/buzzer.mp3");
var cheer = new Audio("assets/sounds/cheering.mp3");
var boo = new Audio("assets/sounds/boo.mp3");

// Array that holds the trivia questions, answers/choices, and info about the answer
var trivia = [
	{
		question: "What team has won the most championships?",
		choices: ["UCLA", "Duke", "Kentucky", "North Carolina"],
		answer: "UCLA",
		info: "The legendary program has won 11 national titles."
	},
	{
		question: "What was the lowest seed to win the championship?",
		choices: ["7", "9", "8", "10"],
		answer: "8",
		info: "Villanova won the national title as a No. 8 seed in 1985."
	},
	{
		question: "What team holds the record for the most Final Four appearances?",
		choices: ["UCLA", "Duke", "Kentucky", "North Carolina"],
		answer: "North Carolina",
		info: "UNC has appeared in the Final Four 19 times."
	},
	{
		question: "What team won the first tournament in 1939?",
		choices: ["Indiana", "Oregon", "Kansas", "Ohio State"],
		answer: "Oregon",
		info: "The tournament consisted of only eight teams and the championship game was held at Northwestern University.",
	},
	{
		question: "What coach holds the record for the most wins in tournament history?",
		choices: ["John Wooden", "Mike Krzyzewski", "Bob Knight", "Roy Williams"],
		answer: "Mike Krzyzewski",
		info: "Coach K has won 90 NCAA Tournament games.",
	},
	{
		question: "What is the single-game individual points record?",
		choices: ["47", "53", "61", "70"],
		answer: "61",
		info: "Austin Carr (Notre Dame) scored 61 points vs. Ohio in 1970"
	},
	{
		question: "How many times has a No. 15 seed beaten a No. 2 seed in the Round of 64?",
		choices: ["8", "4", "11", "7"],
		answer: "8",
		info: "This occured most recently in 2016 when Middle Tennessee defeated Michigan State."
	},
	{
		question: "What is the lowest seed to reach the Final Four?",
		choices: ["8", "11", "12", "10"],
		answer: "11",
		info: "Louisiana State (1986), George Mason (2006), and VCU (2011) have all accomplished this task."
	},
	{
		question: "What player has won the most tournament Most Outstanding Player Awards?",
		choices: ["Bill Walton, UCLA", "Jerry Lucas, Ohio State", "Alex Groza, Kentucky", "Lew Alcindor, UCLA"],
		answer: "Lew Alcindor, UCLA",
		info: "You might recognize him by the name he adopted during his NBA career, Kareem Abdul-Jabbar."
	},
	{
		question: "What city has hosted the most Final Fours?",
		choices: ["Indianapolis, IN", "Kansas City, MO", "New Orleans, LA", "New York, NY"],
		answer: "Kansas City, MO",
		info: "Known for its BBQ and music, the city has also hosted 10 Final Fours."
	}
];

// FUNCTIONS
//=============================================================================================

// Starts a new game, resets all game counters and runs the showQuestion function
function startGame() {
	correctAnswers = 0;
	incorrectAnswers = 0;
	noAnswers = 0;
	currentQuestion = 0;
	showQuestion();
}

// Starts the timer and displays it on the page
// Displays the current question from the trivia array
// Loops through the current question's answer choices and displays them
function showQuestion() {
	timer();
	$("#clock").html(clock);
	var questionDisplay = $("<h2>");
	questionDisplay.html(trivia[currentQuestion].question);
	$("#game").html(questionDisplay);

	for (i = 0; i < trivia[currentQuestion].choices.length; i++) {
		var answerDisplay = $("<div>");
		var answerChoice =$("<span>");
		answerChoice.addClass("answer-choice");
		answerChoice.attr("data-answer", trivia[currentQuestion].choices[i]);
		answerChoice.text(trivia[currentQuestion].choices[i]);
		$(answerDisplay).append(answerChoice);
		$("#game").append(answerDisplay);
	}

	console.log(trivia[currentQuestion].answer);
}

// Sets timer at 30 seconds and shows it on the page
function timer() {
	number = 30;
	intervalId = setInterval(decrement, 1000);
	clock.text("Time Left: " + number);
}

// Sets the proper decrement for timer and changes the timer on the page as it counts down
// If the timer reaches zero the noAnswer function is run after a second
// (Allows user to see the timer hit zero)
function decrement() {
	number--;
	clock.text("Time Left: " + number);
	if (number === 0) {
		buzzer.play();
		setTimeout(noAnswer, 1000);
	}
}

// Notifies the user that they picked the correct answer, along with info about the answer
// The next question is shown after 5 seconds
function correctAnswer() {
	correctAnswers++;
	console.log("Correct answers: " + correctAnswers);
	stop();
	cheer.play();
	var answerStatement = $("<h2>").html("You are correct! " + trivia[currentQuestion].info);
	$("#game").html(answerStatement);
	setTimeout(nextQuestion, 5000);
}

// Notifies the user that they picked the incorrect answer, along with info about the answer
// The next question is shown after 5 seconds
function incorrectAnswer() {
	incorrectAnswers++;
	console.log("Incorrect answers: " + incorrectAnswers);
	stop();
	boo.play();
	var answerStatement = $("<h2>").html("Sorry, the correct answer was " + 
		trivia[currentQuestion].answer + ". " + trivia[currentQuestion].info);
	$("#game").html(answerStatement);
	setTimeout(nextQuestion, 5000);
}

// Notifies the user that they ran out of time, shows the correct answer along with info about it
// Next question is shown after 5 seconds
function noAnswer() {
	noAnswers++;
	stop();
	var answerStatement = $("<h2>").html("You ran out of time. The correct answer was " + 
		trivia[currentQuestion].answer + ". " + trivia[currentQuestion].info);
	$("#game").html(answerStatement);
	setTimeout(nextQuestion, 5000);
	console.log("Unanswered questions: " + noAnswers);
}

// Stops the timer, removes it from the page
function stop() {
	clearInterval(intervalId);
	$("#clock").empty();
}

// Iterates currentQuestion and then runs the showQuestion function for the next question
// If all questions have been displayed already the gameOver function is run
function nextQuestion() {
	currentQuestion++;
	if (currentQuestion < trivia.length) {
		showQuestion();
	}
	else {
		gameOver();
	}
}

// The game ends and the user's stats, along with a "play again" button, are displayed
function gameOver() {
	var correctStats = $("<h2>").html("Correct Answers: " + correctAnswers);
	var incorrectStats = $("<h2>").html("Incorrect Answers: " + incorrectAnswers);
	var unansweredStats = $("<h2>").html("Unanswered Questions: " + noAnswers);
	$("#game").empty();
	$("#game").append("<h1>Game Over</h1>");
	$("#game").append(correctStats);
	$("#game").append(incorrectStats);
	$("#game").append(unansweredStats);
	var newGame = $("<button>").text("Play Again");
	newGame.addClass("btn btn-large");
	newGame.attr("id", "new-game");
	$("#game").append(newGame);
}

// MAIN PROCESS
//=============================================================================================

// Event handler for clicking start button, startGame function is run
$("#start").on("click", function() {
	startGame();
});

// Event handler for the user clicking on an answer choice
// Checks if the answer is correct or incorrect and then runs the appropriate function
$(document.body).on("click", ".answer-choice" , function() {
	console.log($(this).attr("data-answer"));
	userGuess = $(this).attr("data-answer");

	if (userGuess === trivia[currentQuestion].answer) {
		correctAnswer();
	}

	else if (userGuess !== trivia[currentQuestion].answer) {
		incorrectAnswer();
	}
});

// Event handler for clicking the "play again" button: 
// startGame function is run without reloading the page
$(document.body).on("click", "#new-game", function() {
	event.preventDefault();
	startGame();
});