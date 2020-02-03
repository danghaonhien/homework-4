// Press Any Key to Start
let start = false;
let level = 0;
let countdown = 0;
let nextButton = $("#nextQuestion");
let answerValue = document.querySelector("#btn-answer");
let shuffleQuestions, currentQuestionNum;
let ended = false;
$("#pressKey").removeClass('hide2')

$("#nextQuestion").on("click", function(event) {
  event.preventDefault();
  currentQuestionNum++;
  // nextQuestion();
  if(currentQuestionNum ==  myQuestions.length) {
    ended=true
    $("#question-list").addClass('hide')
    $("#form").removeClass('hide3')
  }else {nextQuestion()}
});
$("#instruction").removeClass("hide2");
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
        $("#pressKey").addClass('hide2')
        // Shuffle questions
        shuffleQuestions = myQuestions.sort(() => Math.random() - 0.5);
        currentQuestionNum = 0;
        // Show questions
        $("#question-list").removeClass("hide");
        $("#instruction").addClass("hide2");
        //   nextQuestion();
        nextQuestion();
        //High Score Timer
        highscore = 100;
        let highscoreTimer = setInterval(function() {
          $("#highScore").value = highscore - 1;
          // $("#highScore").html = $("#highScore").text(
          //   highscore + " seconds remaining"
          // );
          highscore --;

          if (highscore <= 0) {
            clearInterval(highscoreTimer);

            // $("#highScore").html = $("#highScore").text(
            //   "High Score: " + highscore
            // );
          }else if (!ended) {
           
            
            $("#yourScore").text("Your Highscore: " + highscore)
            $("#highScore").text("Thank you!")
            // clearInterval(highscoreTimer);
          }
        }, 1000);

        $("#highScore").text("Level " + level);
      }
    }, 1000);
  }
});

$("#reset").on("click", function(){
startOver();
})
// function yourScore(){
//   let yourHighscore = highscoreTimer.value;
//   $("#pressKey").html.$("#pressKey").text("Your Highscore is " + yourHighscore)

// if(highscore.value === lastQuestion.value) {
//   yourScore()
// }}

// NextQuestion
function nextQuestion() {
  resetState();
  showQuestions(shuffleQuestions[currentQuestionNum]);
  level++;
  $("#highScore").html = $("#highScore").text("Level " + level);
}

function resetState() {
  clearState(document.body);
  while (answerValue.firstChild) {
    answerValue.removeChild(answerValue.firstChild);
  }
}

function chosenAnswer(e) {
  let chosenButton = e.target;
  let correct = chosenButton.dataset.correct;
  $(this)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100)
    .css("backgroundColor", "#72A68E");
  if ((chosenButton.dataset.correct = correct)) {
    playSound("correct");
    $("#highScore").text("Congratulation");
    $(".btn").on("click", function() {
      currentQuestionNum++;
      if(currentQuestionNum ==  myQuestions.length) {
        ended=true
        $("#question-list").addClass('hide')
        $("#form").removeClass('hide3')
        $("#highScore").text("Thank you!")
      }
    });
  } else {
    playSound("wrong");
    $("#highScore").text("Try Again!");
    $(this)
      .css("backgroundColor", "#BF565F")
      .css("color", "#F2F2F2");
    highscore -= 10;
  }
  //set current state for answer
  currentState(document.body, correct);
  Array.from(answerValue.children).forEach(button => {
    currentState(button, button.dataset.correct);
  });
 
 

  //   if(shuffleQuestions = lastQuestion  ) {
  //       $("#question-list").addClass("hide")
  //     $("#pressKey").html = $("#pressKey").text("Your Score is " + highscoreTimer)
  //   }
}

function currentState(element, correct) {
  clearState(element);
  if (correct) {
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
      { text: "LoL", correct: false },
      { text: "Tetris", correct: true },
      { text: "Dark Soul", correct: false },
      { text: "CS", correct: false }
    ]
  },
  {
    question: "2020 is the year of which animal in parts of Asian culture?",
    answers: [
      { text: "Hourse", correct: false },
      { text: "Dragon", correct: false },
      { text: "Tiger", correct: false },
      { text: "Rat", correct: true }
    ]
  },
  {
    question: "Which one of these are the hardest trail in Zion National Park?",
    answers: [
      { text: "Angel Landings", correct: true },
      { text: "Emerald Pool", correct: false },
      { text: "Watchman Trail", correct: false },
      { text: "Pa'rus Trail", correct: false }
    ]
  }
];
function showQuestions(question) {
  $("#question").text(question.question);
  // if (question.answers.length === lastQuestion) {
  //   $("#question").text("Your score is: ")
  // }
  question.answers.forEach(answers => {
    const button = document.createElement("button");
    button.innerText = answers.text;
    button.classList.add("btn");
    if (answers.correct) {
      button.dataset.correct = answers.correct;
    }
    button.addEventListener("click", chosenAnswer );
    answerValue.append(button);
  });
}


function startOver() {
  level = 0;
  myQuestions.question = [];
  started = false;
}


function playSound(name) {
  var audio = new Audio("sound/" + name + ".mp3");
  audio.play();
}
