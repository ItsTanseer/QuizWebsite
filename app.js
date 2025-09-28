const params = new URLSearchParams(window.location.search);
const categoryId = params.get("category") || 18; 

const URL = `https://opentdb.com/api.php?amount=10&category=${categoryId}&difficulty=easy&type=multiple`;

const startBtn = document.querySelector(".btn");
const qnText = document.querySelector(".questionText");
const optionContainer = document.querySelector(".options");
const restartBtn = document.getElementById('restart');
restartBtn.style.display="none"
restartBtn.disabled=true;

let questions = [];
let currentIndex = 0;
let score=0;
startBtn.addEventListener("click", async () => {
  let response = await fetch(URL);
  let data = await response.json();

  questions = data.results;
  currentIndex = 0;

  startBtn.style.display = "none";
  createQuiz(questions[currentIndex]);
});

const createQuiz = (questionData) => {
  qnText.innerHTML = questionData.question; 
  optionContainer.innerHTML = "";

  let answers = [questionData.correct_answer, ...questionData.incorrect_answers];
  let shuffledAnswers = shuffle(answers);

  shuffledAnswers.forEach((answer, index) => {
    let opt = document.createElement("button");
    opt.classList.add("option");
    opt.innerText = `${String.fromCharCode(65 + index)}. ${answer}`;

    opt.addEventListener("click", () => {
      checkAnswer(opt, answer, questionData.correct_answer);
    });

    optionContainer.appendChild(opt);
  });

  let nextBtn = document.createElement("button");
  nextBtn.innerText = "Next";
  nextBtn.classList.add("nextBtn");
  nextBtn.disabled = true;

  nextBtn.addEventListener("click", () => {
    currentIndex++;
    if (currentIndex < questions.length) {
      createQuiz(questions[currentIndex]);
    } else {
      qnText.innerText = `Quiz Completed! Your score is ${score}`;
      restartBtn.disabled=false;
      restartBtn.style.display='block';
      restartBtn.addEventListener('click', ()=> {
        window.location.replace('Home.html');

      })

      
      optionContainer.innerHTML = "";
    }
  });

  optionContainer.appendChild(nextBtn);
};

function checkAnswer(optionElement, selectedAnswer, correctAnswer) {
  let options = document.querySelectorAll(".option");

  options.forEach((btn) => {
    btn.disabled = true;
    if (btn.innerText.includes(correctAnswer)) {
      btn.classList.add("correct");
    }
  });

  if (selectedAnswer === correctAnswer) {
    optionElement.classList.add("correct");
    score=score+1;
  } else {
    optionElement.classList.add("wrong");
  }

  document.querySelector(".nextBtn").disabled = false; 
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
