var gamePattern=[];
var userClickedPattern=[];
var buttonColours=["red","blue","green","yellow"]
// var randomChosenColour=buttonColours[nextSequence()];
// gamePattern.push(randomChosenColour);
console.log(gamePattern);
var level=0;
function playSound(currentColor) {
    var currentPath ="sounds/"+currentColor.slice(1,)+".mp3";
    var audio = new Audio(currentPath);
    audio.play();
}
function animatePress(currentColor){
    $(currentColor).addClass("pressed");
    setTimeout(function() {$(currentColor).removeClass("pressed") }, 100 );
}
function nextSequence() {
    var randomNumber = Math.round(Math.random()*3);
    $("h1").text("LEVEL "+(level+1));
    gamePattern.push(buttonColours[randomNumber]);
    var currentColor = "#"+gamePattern[level];
     $(currentColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
     playSound(currentColor);
     level++;
}

$(".btn").click( handler );
function handler(){
    var userChosenColour=$(this).attr('id');
    userClickedPattern.push(userChosenColour);
    var currentColor="#"+userChosenColour;
    animatePress(currentColor);
    playSound(currentColor);
    checkAnswer( (userClickedPattern.length - 1) );
}
$(document).keydown(function(){
    if(level === 0){
        nextSequence();
    }
})
function checkAnswer(currentLevel){
    if( userClickedPattern[currentLevel] === gamePattern [currentLevel] ){
        console.log("true");
        if(userClickedPattern.length === gamePattern.length){
    
            setTimeout(nextSequence ,1000);
            userClickedPattern=[];
        }
    }
    else {
        console.log("false");
        var audio= new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
        $("body").removeClass("game-over");
        } ,200);
        $("h1").text("Game Over, Press Any Key to Restart"); 
        startOver();
    }
}
function startOver(){
    level=0;
    gamePattern=[];
    userClickedPattern=[];
}