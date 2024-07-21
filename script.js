const startButton = document.querySelector("#start-btn")
const nextButton = document.querySelector("#next-btn")
const questionContainerElement = document.querySelector("#question-container");
const questionElement = document.querySelector('#question');
const answerButtonsElement = document.querySelector('#answer-buttons');

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
})

function startGame() {
  startButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - .5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove('hide');
  setNextQuestion();

}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button);
  })
}

function resetState() {
  nextButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    startButton.innerText = 'Restart';
    startButton.classList.remove('hide');
  }

}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'What is 2 + 2?',
    answers: [
      { text: '4', correct: true },
      { text: '22', correct: false }
    ]
  },
  {
    question: 'What is 2 x 20?',
    answers: [
      { text: '4', correct: false },
      { text: '22', correct: false },
      { text: '40', correct: true },
      { text: '0', correct: false }
    ]
  },
  {
    question: 'What is 20 / 2?',
    answers: [
      { text: '4', correct: false },
      { text: '22', correct: false },
      { text: '40', correct: false },
      { text: '10', correct: true }
    ]
  },
  {
    question: 'What is 110 - 50?',
    answers: [
      { text: '78', correct: false },
      { text: '60', correct: true },
      { text: '40', correct: false },
      { text: '90', correct: false }
    ]
  },
  {
    question: 'What is 200 x 2?',
    answers: [
      { text: '4', correct: false },
      { text: '22', correct: false },
      { text: '400', correct: true },
      { text: '0', correct: false }
    ]
  }
]