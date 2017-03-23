// Global variables
var correctAnswers;
var incorrectAnswers;
var noAnswers;
var userGuess;
var number;
var intervalId;

// Array that holds the trivia questions, answers/choices, and info to be shown after the question
var trivia = [
	{
		question: "What team has won the most national titles?",
		choices: ["UCLA", "Duke", "Kentucky", "North Carolina"],
		answer: "UCLA",
		info: "UCLA has won 11 national titles"
	},
	{
		question: "What is the lowest seeded team to win the championship?",
		choices: ["7", "9", "8", "10"],
		answer: "8",
		info: "Villanova won the national title as a number 8 seed in 1985"
	},
	{
		question: "What team holds the record for the most Final Four appearances?",
		choices: ["UCLA", "Duke", "Kentucky", "North Carolina"],
		answer: "North Carolina",
		info: "University of North Carolina has appeared in the Final Four 19 times"
	},
	{
		question: "What school won the first ever national title in 1939?",
		choices: ["Indiana", "Oregon", "Kansas", "Ohio State"],
		answer: "Oregon",
		info: "The tournament consisted of only eight teams and the championship game was held at Northwestern University",
	},
	{
		question: "What coach holds the record for the most wins in tournament history?",
		choices: ["John Wooden", "Mike Krzyzewski", "Bob Knight", "Roy Williams"],
		answer: "Mike Krzyzewski",
		info: "Coach K has won 90 NCAA Tournament games, while John Wooden holds the record for national titles with 10",
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
		info: "The most recent occurence was in 2016 when Middle Tennessee defeated Michigan State"
	},
	{
		question: "What is the lowest seed to reach the Final Four?",
		choices: ["8", "11", "12", "10"],
		answer: "11",
		info: "Louisiana State (1986), George Mason (2006), and VCU (2011) have each accomplished this task"
	},
	{
		question: "What player has won the most NCAA Tournament MVP Awards?",
		choices: ["Bill Walton, UCLA", "Jerry Lucas, Ohio State", "Alex Groza, Kentucky", "Lew Alcindor, UCLA"],
		answer: "Lew Alcindor, UCLA",
		info: "You might recognize his current name which he adopted during his NBA career: Kareem Abdul-Jabbar"
	},
	{
		question: "What city has hosted the most Final Fours?",
		choices: ["Indianapolis, IN", "Kansas City, MO", "New Orleans, LA", "New York, NY"],
		answer: "Kansas City, MO",
		info: "Kansas City has hosted 10 Final Fours"
	}
];

// Functions

function startGame() {

	correctAnswers = 0;
	incorrectAnswers = 0;
	noAnswers = 0;
	currentQuestion = 0;

}

var clock = $("<div>");
$(".container").prepend(clock);

function showQuestion() {

	timer();

	var questionDisplay = $("<h2>");
	questionDisplay.html(trivia[currentQuestion].question);
	$("#game").html(questionDisplay);

	for (i = 0; i < trivia[currentQuestion].choices.length; i++) {

		var answerChoice = $("<h3>");
		answerChoice.addClass("answer-choice");
		answerChoice.text(trivia[currentQuestion].choices[i]);
		$("#game").append(answerChoice);

		}

}

function nextQuestion() {
	currentQuestion++;
	showQuestion();
	timer();
}

function timer() {
	number = 30;
	intervalId = setInterval(decrement, 1000);
}

function decrement() {
	clock.text("Time Left: " + number);
	number--;
	if (number === 0) {
		stop();
		nextQuestion();
	}
}

function stop() {
	clearInterval(intervalId);
}

// Event handler for clicking start button
$("#start").on("click", function() {
	startGame();
	showQuestion();
});
