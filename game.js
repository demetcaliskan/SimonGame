var level = 0;
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

$(document).keydown(function() {
  $("h1").text("Level " + level);
  nextSequence();
});

function nextSequence() {
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
  }
}

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePressed(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

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
