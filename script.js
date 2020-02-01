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

        // Shuffle questions
        shuffleQuestions = myQuestions.sort(() => Math.random() - 0.5);
        currentQuestionNum=0;
        // Show questions
        $("#question-list").removeClass("hide");
        $("#instruction").addClass("hide2")
        //   nextQuestion();
       nextQuestion();
        //High Score Timer
         highscore = 100;
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
  level++;
  $("pressKey").html = $("#pressKey").text("Level " + level);
}

function showQuestions(question) {
  $("#question").text(question.question);

  question.answers.forEach(answers => {
    const button = document.createElement('button');
    button.innerText=answers.text;
    button.classList.add("btn");
    if (answers.correct) {
      button.dataset.correct=answers.correct;
    } else {
        button.dataset.wrong=answers.wrong;
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

 
 
  $(this).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).css("backgroundColor", "#72A68E");
    if (chosenButton.dataset.correct = correct) {
      playSound("correct");
      $("#pressKey").text("Congratulation");
      $(".btn").on("click" , function() {
        currentQuestionNum++;
        nextQuestion();
    })
    } else{
      playSound("wrong");
      $("#pressKey").text("Try Again!");
      $(this).css("backgroundColor", "#BF565F").css("color", "#F2F2F2");
      highscore -=10;
}
  //set current state for answer
  currentState(document.body, correct);
  Array.from(answerValue.children).forEach(button => {
    currentState(button, button.dataset.correct);
  

  });
  if(shuffleQuestions.length > currentQuestionNum + 4) {
  
    $("#yourScore").html = $("#yourScore").text(" Your score is " + highscoreTimer) 
  }
}





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

function playSound(name) {
  var audio = new Audio("sound/" + name + ".mp3");
  audio.play();
}
