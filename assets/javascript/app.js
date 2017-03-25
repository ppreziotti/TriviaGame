// Global variables
var correctAnswers;
var incorrectAnswers;
var noAnswers;
var userGuess;
var number;
var intervalId;
var clock = $("<h1>");

// Array that holds the trivia questions, choices, answers, and info to be shown after the question
var trivia = [
	{
		question: "What team has won the most national titles?",
		choices: ["UCLA", "Duke", "Kentucky", "North Carolina"],
		answer: "UCLA",
		info: "The legendary program has won 11 national titles."
	},
	{
		question: "What is the lowest seeded team to win the championship?",
		choices: ["7", "9", "8", "10"],
		answer: "8",
		info: "Villanova won the national title as a number 8 seed in 1985."
	},
	{
		question: "What team holds the record for the most Final Four appearances?",
		choices: ["UCLA", "Duke", "Kentucky", "North Carolina"],
		answer: "North Carolina",
		info: "UNC has appeared in the Final Four 19 times."
	},
	{
		question: "What school won the first ever national title in 1939?",
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
		question: "How many times has a 15 seed beaten a 2 seed in the Round of 64?",
		choices: ["8", "4", "11", "7"],
		answer: "8",
		info: "The most recent time this occured was in 2016 when Middle Tennessee defeated Michigan State."
	},
	{
		question: "What is the lowest seed to reach the Final Four?",
		choices: ["8", "11", "12", "10"],
		answer: "11",
		info: "Louisiana State (1986), George Mason (2006), and VCU (2011) have all accomplished this task."
	},
	{
		question: "What player has won the most NCAA Tournament MVP Awards?",
		choices: ["Bill Walton, UCLA", "Jerry Lucas, Ohio State", "Alex Groza, Kentucky", "Lew Alcindor, UCLA"],
		answer: "Lew Alcindor, UCLA",
		info: "You might recognize the name he adopted during his NBA career, Kareem Abdul-Jabbar."
	},
	{
		question: "What city has hosted the most Final Fours?",
		choices: ["Indianapolis, IN", "Kansas City, MO", "New Orleans, LA", "New York, NY"],
		answer: "Kansas City, MO",
		info: "Known for its BBQ and music, the city has also hosted 10 Final Fours."
	}
];

// Functions

// Starts a new game, resets all game counters and runs the showQuestion function
function startGame() {

	correctAnswers = 0;
	incorrectAnswers = 0;
	noAnswers = 0;
	currentQuestion = 0;

	showQuestion();
}

// Starts the time and displays it on the page
// Displays the current question from the trivia array
// Loops through the current question's answer choices and displays them
function showQuestion() {

	timer();
	$("#clock").html(clock);
	var questionDisplay = $("<h2>");
	questionDisplay.html(trivia[currentQuestion].question);
	$("#game").html(questionDisplay);

	for (i = 0; i < trivia[currentQuestion].choices.length; i++) {

		var answerChoice = $("<h3>");
		answerChoice.addClass("answer-choice");
		answerChoice.attr("data-answer", trivia[currentQuestion].choices[i]);
		answerChoice.text(trivia[currentQuestion].choices[i]);
		$("#game").append(answerChoice);

		}

	console.log(trivia[currentQuestion].answer);

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

// The game ends and the user's stats, along with a start new game button, are displayed
function gameOver() {
	var correctStats = $("<h2>").html("Correct Answers: " + correctAnswers);
	var incorrectStats = $("<h2>").html("Incorrect Answers: " + incorrectAnswers);
	var unansweredStats = $("<h2>").html("Unanswered Questions: " + noAnswers);
	$("#game").empty();
	$("#game").append(correctStats);
	$("#game").append(incorrectStats);
	$("#game").append(unansweredStats);
	var newGame = $("<button>").text("Start New Game");
	newGame.addClass("btn btn-large");
	$("#game").append(newGame);
}
	
// Event handler for clicking the start new game button, startGame function is run
$(document.body).on("click", ".btn", function() {
	startGame();
});

// 30 second timer, counting down from 30
function timer() {
	number = 30;
	intervalId = setInterval(decrement, 1000);
}

// Sets the proper decrement for timer and displays the timer on the page
// If the timer reaches zero the noAnswer function is run
function decrement() {
	clock.text("Time Left: " + number);
	number--;
	if (number === 0) {
		noAnswer();
	}
}

// Notifies the user that they picked the correct answer, next question is shown after 5 seconds
function correctAnswer() {
	correctAnswers++;
	console.log("Correct answers: " + correctAnswers);
	stop();
	var answerStatement = $("<h2>").html("You are correct! " + trivia[currentQuestion].info);
	$("#game").html(answerStatement);
	setTimeout(nextQuestion, 5000);
}

// Notifies the user that they picked the incorrect answer, next question is shown after 5 seconds
function incorrectAnswer() {
	incorrectAnswers++;
	console.log("Incorrect answers: " + incorrectAnswers);
	stop();
	var answerStatement = $("<h2>").html("Sorry, the correct answer was " + 
		trivia[currentQuestion].answer + ". " + trivia[currentQuestion].info);
	$("#game").html(answerStatement);
	setTimeout(nextQuestion, 5000);
}

// Notifies the user that they ran out of time, next question is shown after 5 seconds
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