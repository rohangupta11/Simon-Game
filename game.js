var buttonColors=["red","blue","green","yellow"];
var userClickedPattern=[];
var gamePattern=[];
var level=0;
var started=false;
$(document).keypress(function(){
    if(!started)
    {
        $("#level-title").html("Level " + level);
        nextSequence();
        started=true;
    }
})
$(".btn").on("click",function()
{
    var userChosenColour= $(this).attr("id"); 
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})

function nextSequence()
{
    userClickedPattern=[];
    level++;
    $("#level-title").html("Level " + level);
    var rand=Math.floor(Math.random()*4);
    var randomColor=buttonColors[rand];
    gamePattern.push(randomColor);
    $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColor);
}
function playSound(name)
{
    var sound=new Audio("sounds/" + name + ".mp3");
    sound.play();
}
function animatePress(currentColor)
{
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
function checkAnswer(currentLastIndex)
{
    if(gamePattern[currentLastIndex]===userClickedPattern[currentLastIndex])
    {
        console.log("success");
        if(gamePattern.length===userClickedPattern.length)
        {
            setTimeout(function(){
                if(started)
                    nextSequence();
            },800);
        }
    }
    else{
        console.log("Failure");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function()
        {
            $("body").removeClass("game-over");

        },200)
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}
function startOver()
{
    started=false;
    level=0;
    gamePattern=[];
}
