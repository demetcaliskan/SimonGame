var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
nextSequence();
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeTo(100, 0.3, function() { $(this).fadeTo(500, 1.0); });
  var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
  audio.play();
}
