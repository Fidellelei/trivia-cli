
const readline = require("readline");

// Create CLI input/output
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Game state variables
let score = 0;
let currentQuestion = 0;
let timeLeft = 60;
let timer;

// Quiz questions
const questions = [
  {
    question: "Who wrote the novel 'Things Fall Apart'?",
    options: [
      "A. Wole Soyinka",
      "B. Chinua Achebe",
      "C. Ngugi wa Thiong'o",
      "D. Ama Ata Aidoo"
    ],
    answer: "B"
  },
  {
    question: "Who is the main character in 'Things Fall Apart'?",
    options: [
      "A. Okonkwo",
      "B. Obi",
      "C. Ezeulu",
      "D. Nnaife"
    ],
    answer: "A"
  },
  {
    question: "Which country is Chinua Achebe from?",
    options: [
      "A. Ghana",
      "B. Kenya",
      "C. Nigeria",
      "D. Liberia"
    ],
    answer: "C"
  },
  {
    question: "Who wrote 'The Beautyful Ones Are Not Yet Born'?",
    options: [
      "A. Ayi Kwei Armah",
      "B. Buchi Emecheta",
      "C. Cyprian Ekwensi",
      "D. Flora Nwapa"
    ],
    answer: "A"
  },
  {
    question: "What is a common theme in West African prose literature?",
    options: [
      "A. Space travel",
      "B. Colonialism and tradition",
      "C. Robots",
      "D. Ice hockey"
    ],
    answer: "B"
  },
  {
    question: "Who wrote 'The Joys of Motherhood'?",
    options: [
      "A. Buchi Emecheta",
      "B. Mariama Ba",
      "C. Chimamanda Adichie",
      "D. Flora Nwapa"
    ],
    answer: "A"
  },
  {
    question: "Which author wrote 'So Long a Letter'?",
    options: [
      "A. Mariama Ba",
      "B. Chinua Achebe",
      "C. Wole Soyinka",
      "D. Ama Ata Aidoo"
    ],
    answer: "A"
  },
  {
    question: "In many West African novels, conflict often occurs between:",
    options: [
      "A. Tradition and modernity",
      "B. Cats and dogs",
      "C. Summer and winter",
      "D. Mountains and rivers"
    ],
    answer: "A"
  }
];
//start game function
function startGame() {
  
  console.log("      WELCOME TO TRIVIA CLI   ");
  console.log("Answer using A, B, C, or D");
  console.log("You have 60 seconds total.");
  console.log("");

  startTimer();
  askQuestion();
}

//timer function
function startTimer() {
  timer = setInterval(() => {
    timeLeft--;

    process.stdout.write(`Time Left: ${timeLeft}s   \r`);

    if (timeLeft <= 0) {
      clearInterval(timer);
      console.log("\nTime is up!");
      endGame();
    }
  }, 1000);
}

//question function
function askQuestion() {
  // If all questions completed
  if (currentQuestion >= questions.length) {
    endGame();
    return;
  }

  const q = questions[currentQuestion];

  console.log(`\nQuestion ${currentQuestion + 1}:`);
  console.log(q.question);

  q.options.forEach(option => console.log(option));

  rl.question("Your answer: ", userInput => {
    checkAnswer(userInput.trim().toUpperCase());
  });
}

//check answer function
function checkAnswer(userAnswer) {
  const correctAnswer = questions[currentQuestion].answer;

  if (userAnswer === correctAnswer) {
    console.log("Correct!");
    score++;
  } else {
    console.log(`Wrong! Correct answer: ${correctAnswer}`);
  }

  currentQuestion++;
  askQuestion();
}

//end game function
function endGame() {
  clearInterval(timer);
  console.log("           GAME OVER   ");
  console.log(`Final Score: ${score}/${questions.length}`);

  const percentage = (score / questions.length) * 100;

  if (percentage === 100) {
    console.log("Outstanding Performance!");
  } else if (percentage >= 60) {
    console.log("Good Job!");
  } else {
    console.log("Keep Practicing!");
  }

  // Array iteration method (map)
  console.log("\nQuestions Summary:");
  questions.map((item, index) => {
    console.log(`${index + 1}. ${item.question}`);
  });

  rl.close();
}

// Start the game
startGame();