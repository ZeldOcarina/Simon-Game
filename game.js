var userClickedPattern = [],
    gamePattern = [],
    buttonColours = ["red", "blue", "green", "yellow"],
    level = 0;

$(".starter").one("click", function () {
    $("h1").text("Level 0");
    nextSequence();
});

$(".btn").on("click", function (event) {
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    playAudio(userChosenColour);
    animatePress(userChosenColour);
    var lastAnswerIndex = userClickedPattern.length - 1;
    checkAnswer(lastAnswerIndex);
});


function checkAnswer(currentLevel) {
    if (JSON.stringify(userClickedPattern) === JSON.stringify(gamePattern)) {
        setTimeout(function () {
            userClickedPattern = [];
            nextSequence();
        }, 1000);
    }
    else if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        //Empty, just exclude the case.
    }
    else {
        playAudio("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press The Button to Restart");
        startOver();
    }
}

function animatePress(currentColour) {
    var buttonToAnimate = $("#" + currentColour);
    buttonToAnimate.addClass("pressed");
    setTimeout(function () {
        buttonToAnimate.removeClass("pressed");
    }, 100);
}

function playAudio(name) {
    var audio = new Audio("sounds/" + name + '.mp3'),
        promise = audio.play();
    if (promise !== undefined) {
        promise.then(_ => {
            audio.play();
        }).catch(error => {
            alert("In order to play this game, autoplay must be enabled!");
        });
    }
}

//Sets random color and adds it to the gamePattern array. 
function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    randomChosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playAudio(randomChosenColor);
    level++;
    $("#level-title").text("Level " + level);
}

function startOver() {
    $(".starter").one("click", function () {
        level = 0;
        gamePattern = [];
        userClickedPattern = [];
        $("h1").text("Level 0");
        nextSequence();
    });
}
