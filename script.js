// Press Any Key to Start
let start = false;
let level = 0;
let countdown = 0;
let correct = 0;
let shuffleQuestions , currentQuestionNum;
$(document).keypress(function() {
  if (!start) {
    start = true;

    // start game countdown

    let timeLeft = 3;
    let countdownTimer = setInterval(function() {
      $("pressKey").value = timeLeft - 1;
      $("#pressKey").html = $("#pressKey").text(
        timeLeft + " seconds remaining"
      );
      timeLeft -= 1;
      if (timeLeft <= 0) {
        clearInterval(countdownTimer);
    
        // Shuffle questions
        shuffleQuestions = myQuestions.sort(() => Math.random() - 0.5)
        currentQuestionNum=0;
         // Show questions
        $("#question-list").removeClass("hide")
        nextQuestion();
        //High Score Timer
        let highscore = 100;
        let highscoreTimer = setInterval(function() {
          $("#highScore").value = highscore - 1;
          $("#highScore").html = $("#highScore").text(
            highscore + " seconds remaining"
          );
          highscore -= 1;
          if (highscore <= 0) {
            clearInterval(highscoreTimer);

            $("#highScore").html = $("#highScore").text(
              "High Score: " + highscore
            );
          }
        }, 1000);

        $("pressKey").html = $("#pressKey").text("Level " + level);
      }
    }, 1000);

     
  } 
});

// NextQuestion
function nextQuestion() {
    showQuestions(shuffleQuestions[currentQuestionNum])
};

function showQuestions(myQuestions) {
 $("#question").text(myQuestions.question);

 $.each(myQuestions.answer, function(i, val) {
    $(".btn" + i).append( " " + val );
  });

}

// SHOW QUESTION
// $(".btn").click(function() {
  
//   checkAnswer();
// });

// function checkAnswer(currentLevel) {
//     let chosenAnswer = myQuestions[i];
//   if (chosenAnswer[currentLevel] === myQuestions[currentLevel]) {
//     if (chosenAnswer.value = myQuestions[(1, 2)]) {
//       playSound("correct");
//       $("#pressKey").text("Congratulation");
//       setTimeout(function() {
//         $("body").removeClass("hide");
//       }, 200);
//     } else {
//       playSound("wrong");
//     }
//   }
// }

// function rightOrWrong(element, correct) {
    


// }

// function checkAnswer() {
// }
    let myQuestions = [
        {
          question: "Where is the Corona virus from?",
          answer: [{text:"WC", correct:false},
          {text:"SF", correct:false},
          {text:"WH", correct:true},
          {text:"NY", correct:false},
        ]
        },
        {
          question: "Which game is made from Ubisoft?",
          answer: [{text:"Fifa", correct:false},
          {text:"Tetris", correct:false},
          {text:"Dragon Age", correct:true},
          {text:"CS", correct:false},
        ]
        },
        {
          question: "Where is the Corona virus from?",
          answer: [{text:"WC", correct:false},
          {text:"SF", correct:false},
          {text:"WH", correct:true},
          {text:"NY", correct:false},
        ]
        },
        
        
      ];









function playSound(name) {
  var audio = new Audio("sound/" + name + ".mp3");
  audio.play();
}



