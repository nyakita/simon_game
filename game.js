var userClickedPattern = [];

var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var started = false;

var level = 0;

$(document).on("keypress", function(){

  if(!started){
    $("#level-title").text("level " + level);
    nextSequence();
    started = true;
  }
});


$(".btn").click(function(){

  var userChosenColour = $(this).attr('id');

  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);


});

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel] ){
      console.log("Success");
      if(userClickedPattern.length === gamePattern.length){
        setTimeout(function(){
          nextSequence()
        }, 1000)
      }
  }else{
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200)
      $("#level-title").text("Game over, Press any key to restart");
      startOver();
  }
}

function nextSequence(){
  userClickedPattern = [];
  level++;

  $("#level-title").text("level " + level);
  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  gamePattern.push(randomChosenColour);
  playSound(randomChosenColour);


}


function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){

    $("#" + currentColour).addClass(".pressed");

    setTimeout(function() {
      $("#" + currentColour).removeClass(".pressed");
    },100)

}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
