var buttonColours = ["red", "blue", "green", "yellow"];

// Array to store new patterns generated
var gamePattern = [];

// create a new empty array with the name userClickedPattern to store which buttons are being clicked by user.
var userClickedPattern = [];

var level = 0;

var started = false;

$(document).keypress(function (){
   if(!started){

      // Changing heading text when game is started to level 0
      $("#level-title").text("Level " + level);

      // Calling nextSequence
      nextSequence();

      started = true;
   }
});

// To check when button is clicked and trigger a handler function 
$(".btn").click(function(){

   // To temporarily store clicked button
   var userChosenColour = $(this).attr("id");

   // Adding clicked button to array
   userClickedPattern.push(userChosenColour);

   // Sound play when clicked
   playSound(userChosenColour);

   animatePress(userChosenColour);

   checkAnswer(userClickedPattern.length-1);
});

//1. Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {

   //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
   if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

     //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
     if (userClickedPattern.length === gamePattern.length){

       //5. Call nextSequence() after a 1000 millisecond delay.
       setTimeout(function () {
         nextSequence();
       }, 1000);

     }

   } else {

     //1. In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.
     playSound("wrong");

     //2. In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
     $("body").addClass("game-over");
     $("#level-title").text("Game Over, Press Any Key to Restart");
     setTimeout(function () {
       $("body").removeClass("game-over");
     }, 200);

     startOver();
   }

}

// Function to generate Sequence
function nextSequence() {

   // Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
   userClickedPattern = [];

   level++;

   // Changing heading text every time a player crosses a level
   $("#level-title").text("Level " + level);

   var randomNumber = Math.floor(Math.random() * 4);
   var randomChoosenColour = buttonColours[randomNumber];
   gamePattern.push(randomChoosenColour);

   // Adding fade animation to buttons
   $("#" + randomChoosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

   // Playing audio for  a particular button
   playSound(randomChoosenColour);
}

// Function to play sound
function playSound(name) {
   var audio = new Audio("sounds/" + name + ".mp3");
   audio.play();
}

// Function to animate when button is being pressed by user
function animatePress(currentColour) {

   // Adding class when clicked
   $("#" + currentColour).addClass("pressed");

   // Removing class after 100 milli second
   setTimeout(function () {
      $("#" + currentColour).removeClass("pressed");
    }, 100);
}

//1. Create a new function called startOver().
function startOver() {

   //3. Inside this function, you'll need to reset the values of level, gamePattern and started variables.
   level = 0;
   gamePattern = [];
   started = false;
 }


