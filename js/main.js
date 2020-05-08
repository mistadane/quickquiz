const options = document.querySelector('.options').children;
const question = document.querySelector('.question');
const questionNumberSpan = document.querySelector('.question-num-value');
const totalQuestionSpan = document.querySelector('.total-question');
const correctAnswersSpan = document.querySelector('.correct-answers');
const totalQuestionSpan2 = document.querySelector('.total-question2');
const percentage = document.querySelector('.percentage');
const op1 = document.querySelector('.option1');
const op2 = document.querySelector('.option2');
const op3 = document.querySelector('.option3');
const op4 = document.querySelector('.option4');



let questionIndex;
let index = 0;
let score = 0;
let myArray = [];
let myArr = [];

// questions, options amd answers
let questions = [
  {
    q: "Inside which HTML element do we put the JavaScript?",
    options: ["<script>", "<javascript>", "<js>", "<scripting>"],
    answer: 0
  },
  {
    q: "What is the capital of Brazil?",
    options: ["Rio", "Sao Paolo", "Brasilia", "Janerio"],
    answer: 2
  },
  {
    q: "Who is the current captain of Paris Saint Germain?",
    options: ["Neymar", "Thiago Silva", "Edinson Cavani", "Kylian Mbappé"],
    answer: 1
  },
  {
    q: "What is the correct syntax for referring to an external script called 'xxx.js'?",
    options: ["<script href='xxx.js'>", "<script name='xxx.js'>", "<script src='xxx.js'>", "<script file='xxx.js'>"],
    answer: 2
  },
  {
    q: "Boston is the capital of which State?",
    options: ["Florida", "Newyork", "Ohio", "Massachusetts"],
    answer: 3
  },
]

// set questions number
totalQuestionSpan.innerHTML = questions.length;

function load() {
  questionNumberSpan.innerHTML = index + 1;
   question.innerHTML = questions[questionIndex].q;
   op1.innerText = questions[questionIndex].options[0];
   op2.innerText = questions[questionIndex].options[1];
   op3.innerText = questions[questionIndex].options[2];
   op4.innerText = questions[questionIndex].options[3];
   index++;
}


function check(element) {
  if (element.id == questions[questionIndex].answer) {
    element.classList.add('correct');
    score++;
    console.log('score:'+score)
  } else {
    element.classList.add('wrong');
  }

  disabledOptions()
}


function disabledOptions() {
    for (let i=0; i<options.length; i++) {
      options[i].classList.add('disabled');
      if (options[i].id==questions[questionIndex].answer){
        options[i].classList.add('correct');
      }
    }
}

function enableOptions() {
  for (let i=0; i<options.length; i++) {
    options[i].classList.remove('disabled', 'correct', 'wrong');
  }
}

// Random Question
function randomQuestion() {
  let randomNumber = Math.floor(Math.random() * questions.length);
  let hitDuplicate = 0
  if(index == questions.length) {
    quizOver();
  } else {
    if (myArray.length>0) {
      for (i=0; i<myArray.length; i++) {
        if (myArray[i]== randomNumber){
          hitDuplicate= 1;
          break;
        }
      }

      if (hitDuplicate == 1) {
        randomQuestion();
      } else {
        questionIndex = randomNumber;
        load();
        myArr.push(questionIndex);
      }
    }
    if (myArray.length == 0) {
      questionIndex = randomNumber;
      load();
      myArr.push(questionIndex);
    }
      
    
      myArray.push(randomNumber);
      
      
  }

      
}

function _(x) {
  return document.getElementById(x);
}


//Next question 
function validate() {
  if (!options[0].classList.contains('disabled')) {
    _('optionError').innerHTML = 'Select an option';
    return false;
  } else {
    enableOptions();
    randomQuestion();
  }
}

function next() {
  validate();
}

function quizOver() {
  document.querySelector('.quiz-over').classList.add("show");
  correctAnswersSpan.innerHTML = score;
  totalQuestionSpan2.innerHTML =questions.length;
  percentage.innerHTML = (score/questions.length) *100 +"%";
}

function playAgain() {
  window.location.reload();
}

window.onload = function() {
  randomQuestion();
}