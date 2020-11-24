var level;
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var isGameOver = false;

$(document).keydown(function() {
  if(!isGameOver) {
    level = 0;
    $("h1").text("Level " + level);
    nextSequence();
  }
});

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePressed(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  isGameOver = true;
  level++;
  userClickedPattern = [];

  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeTo(100, 0.3, function() {
    $(this).fadeTo(500, 1.0);
  });
  playSound(randomChosenColor);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log(gamePattern[currentLevel] + "===" + userClickedPattern[currentLevel])
    console.log("success");
    console.log("Current level: " + currentLevel);
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    console.log(gamePattern[currentLevel] + "!=" + userClickedPattern[currentLevel])
    console.log("wrong");
    console.log("Current level: " + currentLevel);
    GameOver();
  }
}

function GameOver() {
  isGameOver = false;
  gamePattern = [];

  playSound("wrong");

  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 100);

  $("h1").text("Game Over, Press Any Key to Restart");

}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePressed(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
