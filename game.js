let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = []; 
let userClickedPattern = []; 
let started = 0; 
level = 0; 
function playSound(name){ 
    let buttonAudio = new Audio("./sounds/"+ name + ".mp3"); 
    buttonAudio.play(); 
}
function animatePress(currentColour){ 
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}
function nextSequence(){
    userClickedPattern = []; 
    level++; 
    $("#level-title").text("Level " + level); 
    
    let randomNumber = Math.floor(Math.random() * 4);    
    let randomChosenColour = buttonColours[randomNumber]; 
    gamePattern.push(randomChosenColour); 
    $("#"+randomChosenColour).fadeOut(300).fadeIn(300); 
    playSound(randomChosenColour);
}

$(document).on("keydown", function(){
    started++; 
    if(started === 1){
        nextSequence()
        $("#level-title").text("Level " + level); 
        $("h3").removeClass("instructions");
    }
});
$("h1").click(function(){
    started++; 
    if(started === 1){
        nextSequence()
        $("#level-title").text("Level " + level); 
        $("h3").removeClass("instructions");
    }
});
$(".btn").click(function(){ 
    let userChosenColour = (this.id);
    userClickedPattern.push(userChosenColour); //s4 - 4
    playSound(userChosenColour) 
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1); 
});
function checkAnswer(currentLevel){ 
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){ 
        console.log("success");
        if(userClickedPattern.length === gamePattern.length){ 
            setTimeout(function(){ 
                nextSequence();
            }, 1000);
        }
        } else{
        console.log("wrong");
        playSound("wrong"); 
        $("body").addClass("game-over"); 
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        statOver();
        $("h3").addClass("instructions");
    }
}

function statOver(){ 
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = 0;
}
