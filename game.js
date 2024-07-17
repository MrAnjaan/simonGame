//create a new empty array with the name userClickedPattern.
var userClickedPattern = [];

var gamePattern = [];

//3. create a new array f colors
var buttonColours = ["red", "blue", "green", "yellow"];

var level = 0;
var started = false;


//Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keypress(function(){
    if (!started){
        $("#level-title").text("Level "+ level);
        nextSequence();
        started= true;
    }
    
});


// Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function () {
  //1. grab the id of the button that got clicked
  var userChosenColour = $(this).attr("id");
  //Add the contents of the variable userChosenColour created  to the end of this new userClickedPattern
  userClickedPattern.push(userChosenColour);
  
  // Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length-1);
  //when a user clicks on a button, the corresponding sound should be played
  playSound(userChosenColour);
  animatePress(userChosenColour);

});


// 1. create a new function called nextSequence.
function nextSequence() {
  // Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

    level++ ;
    $("#level-title").text("Level " + level);
  //2. create a new randm number between 0and3
  var randomNumber = Math.floor(Math.random() * 3) + 1;
  //3. assign the random number to a variable called randomChosenColour'
  var randomChosenColour = buttonColours[randomNumber];
  //4. add the randomChosenColour to the gamePattern array
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
    playSound(randomChosenColour);

    
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//Create a new function called animatePress(), it should take a single input parameter called currentColour.
function animatePress(currentColour){
    //Use jQuery to add this pressed class to the button that gets clicked inside animatePress()
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
}

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
        }, 1000);
      }
    }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
      }, 200);
    startOver();
    }
}
function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
  $("#level-title").text("Game Over, Press Any Key to Restart")
  
}

    
