// Press Any Key to Start
let start= false;
let level = 0;
let countdown=0;

// create object of questions, options and answer
let myQuestions =[ {
question: "Question 1?",
options: ["a","b","c","d"],
answer: "c"
},{
    question: "Question 2?",
options: ["a","b","c","d"],
answer: "c"
},{
    question: "Question 3?",
options: ["a","b","c","d"],
answer: "c"
},{
    question: "Question 4?",
options: ["a","b","c","d"],
answer: "c"
},{
    question: "Question 5?",
options: ["a","b","c","d"],
answer: "c"
}
]

let chosenAnswer = [];



$(document).keypress(function() {
    if (!start) {
   
     
    
      start = true;
     
        
    let timeLeft = 3;
    let countdownTimer = setInterval(function() {
        $("pressKey").value = timeLeft - 1;
        $("#pressKey").html =$("#pressKey").text (timeLeft + " seconds remaining");
        timeLeft -= 1;
        if(timeLeft <= 0) {
            clearInterval(countdownTimer);
                 //High Score Timer
            let highscore = 100;
            let highscoreTimer = setInterval(function() {
                $("#highScore").value = highscore - 1;
                $("#highScore").html =$("#highScore").text (highscore + " seconds remaining");
                highscore -= 1;
                if(highscore <= 0) {
                    clearInterval(highscoreTimer);
        
                    $("#highScore").html= $("#highScore").text("High Score: " + highscore);
                } 
            }, 1000
                );

            $("pressKey").html= $("#pressKey").text("Level " + level);
        } 
    }, 1000
        );
        
//   nextSequence();

    }
 
   
  });


//SHOW QUESTION
$(".btn").click(function(){
$(this);
checkAnswer(chosenAnswer);
}
)



function checkAnswer(currentLevel) {
    if(chosenAnswer[currentLevel] === myQuestions[currentLevel]) {
        if(chosenAnswer.value = myQuestions[1, 2]) {
            playSound("correct");
            $("#pressKey").text("Congratulation");
            setTimeout(function () {
                $("body").removeClass("hide");
              }, 200);
        }else {
            playSound("wrong")

        }
    }
    
}
function playSound(name) {
    var audio = new Audio("sound/" + name + ".mp3");
    audio.play();
  }