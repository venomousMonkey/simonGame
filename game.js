let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;
let sound5 = new Audio("sounds/wrong.mp3");

// listening to key press and checking if sequence has started

$(document).keydown(() => {
  if (started) return

  nextSequence();
  started = true;
});

// catching click and pushing to user pattern array

$(".btn").click(function () {
  let userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);

  //play sound
  playSound(userChosenColor);
  // animate Button
  animatePress(userChosenColor);
  // passing last index value to function checking answer
  let userAnswer = userClickedPattern.length - 1;
  checkAnswer(userAnswer);
});

// playing sound on user click

function playSound(name) {
  switch (name) {
    case "blue":
      let sound1 = new Audio("sounds/blue.mp3");
      sound1.play();
      break;

    case "green":
      let sound2 = new Audio("sounds/green.mp3");
      sound2.play();
      break;

    case "red":
      let sound3 = new Audio("sounds/red.mp3");
      sound3.play();

    case "yellow":
      let sound4 = new Audio("sounds/yellow.mp3");
      sound4.play();
  }
}

// animating button on click

function animatePress(currentColor) {
  let animButton = "#" + currentColor;
  $(animButton).addClass("pressed");

  //adding timeout to remove class after 100ms

  setTimeout(function () {
    $(animButton).removeClass("pressed");
  }, 100);
}

function gameOverBlink() {
  $("body").addClass("game-over");

  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
}

function nextSequence() {
  randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  // making button blink

  let flashButton = "#" + randomChosenColor;
  $(flashButton).fadeOut(150).fadeIn(150);

  // playing sound

  playSound(randomChosenColor);

  // changing title text

  $("#level-title").text("Level " + level);

  // incrementing level

  level++;
}

// checking if user's answer is correct

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      userClickedPattern = [];
      // setting delay and running next function
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    sound5.play();
    gameOverBlink();
    $("#level-title").text("Game Over Man !");

    //cleaning stage

    setTimeout(function () {
      userClickedPattern = [];
      gamePattern = [];
      level = 0;
      started = false;
      $("#level-title").text("Press A Key to Start");
    }, 2000);
  }
}
