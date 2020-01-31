// Press Any Key to Start
let start = false;
let level = 0;
let countdown = 0;
let nextButton = $("#nextQuestion");
let answerValue = document.querySelector("#btn-answer");
let shuffleQuestions , currentQuestionNum;
$("#nextQuestion").on("click" , function() {
    currentQuestionNum++;
    nextQuestion();
})

let startGame = $(document).keypress(function() {
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
        shuffleQuestions = myQuestions.sort(() => Math.random() - 0.5);
        currentQuestionNum=0;
        // Show questions
        $("#question-list").removeClass("hide");
        //   nextQuestion();
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
  resetState();
  showQuestions(shuffleQuestions[currentQuestionNum]);
}

function showQuestions(question) {
  $("#question").text(question.question);

  question.answers.forEach(answers => {
    const button = document.createElement('button');
    button.innerText=answers.text;
    button.classList.add("btn");
    if (answers.correct) {
      button.dataset.correct=answers.correct;
    }
    button.addEventListener("click", chosenAnswer) 
    answerValue.appendChild(button);
  });
}
function resetState() {
    clearState(document.body);
    while(answerValue.firstChild) {
      answerValue.removeChild(answerValue.firstChild);
    }
  }

function chosenAnswer(e) {
  let chosenButton = e.target;
  let correct = chosenButton.dataset.correct;
  //set current state for answer
  currentState(document.body, correct);
  Array.from(answerValue.children).forEach(button => {
    currentState(button, button.dataset.correct);
  });
  
}



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


// $("#restart").on("click" , function(){
// startGame();
// })

function currentState(element, correct) {
  clearState(element);
  if(correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}
function clearState(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

let myQuestions = [
  {
    question: "Where is the Corona virus coming from?",
    answers: [
      { text: "WC", correct: false },
      { text: "SF", correct: false },
      { text: "WH", correct: true },
      { text: "NY", correct: false }
    ]
  },
  {
    question: "Which game is made from Ubisoft?",
    answers: [
      { text: "Fifa", correct: false },
      { text: "Tetris", correct: false },
      { text: "Dragon Age", correct: true },
      { text: "CS", correct: false }
    ]
  },
  {
    question: "Where is the Corona virus from?",
    answers: [
      { text: "WC", correct: false },
      { text: "SF", correct: false },
      { text: "WH", correct: true },
      { text: "NY", correct: false }
    ]
  }
];

function playSound(name) {
  var audio = new Audio("sound/" + name + ".mp3");
  audio.play();
}
