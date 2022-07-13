const quizPage = document.getElementById("quizPage");
const startBtn = document.getElementById("startBtn");
const questions = document.getElementById("quizQuestions");
const answers = document.getElementById("quizAnswers");
let timer = document.getElementById("countdown");
const score = document.getElementById("score");
const highScoreBox = document.querySelector(".highScoreBox");
const highScoreBtn = document.getElementById("highScoreBtn");
highScoreBtn.setAttribute("onclick", "viewHighScore()");
const highscorePage = document.getElementById("highscorePage");
const highscoreHistory = document.getElementById("highscoreHistory");
const name = document.getElementById("name");
const submit = document.getElementById("submit");
const scorePage = document.getElementById("scoreForm");
let scoreTracker;
let scoreArray = [];
let activeIndex = 1;
let timeLeft = 59;
const timeComplete = 0;
let games = [];


// Array for the coding quiz questions
const questionsObject = [
    {
        question: "Javascript goes under which HTML element?",
        answers: {
            1: "script",
            2: "js", 
            3: "javascript", 
            4: "link",
        },
        correctAnswer: "script",
    },

    {
        question: "What tag is used to define a link or hyperlink to another page?",
        answers: {
            1: "<meta>",
            2: "<a>",
            3: "<link>",
            4: "<strong>",
        },
        correctAnswer: "<a>",
    },

    {
        question: "What element is a container for all head elements, and may include the document title, scripts, style, meta information, and more?",
        answers: {
            1: "<br>",
            2: "<body></body",
            3: "<title></title>",
            4: "<head></head>",
        },
        correctAnswer: "<head></head>",
    },

    {
        question: "What type of loop continues through a block of code as long as the specified conditon remains true",
        answers: {
            1: "else loop",
            2: "conditional loop",
            3: "while loop",
            4: "for loop",
        },
        correctAnswer: "while loop",
    },

    {
        question: "What is the CSS property that is used to specify the edges of a table?",
        answers: {
        1: "borders",
        2: "fill",
        3: "margins",
        4: "boxes",
        },
        correctAnswer: "borders",
    },

    {
        question: "Arrays in Javascript can be used to store __________________ ?",
        answers: {
        1: "numbers and strings",
        2: "other arrays",
        3: "booleans",
        4: "all of the above"
        },
        correctAnswer: "all of the above",
    },

    {
        question: "The condition in an if/else statement is enclosed within ________________? ",
        answers: {
        1: "quotes",
        2: "curly brackets",
        3: "parantheses",
        4: "square brackets",
        },
        correctAnswer: "curly brackets",
    },

    {
        question: "Which event occurs when the user clicks on an HTML element?",
        answers: {
        1: "onchange",
        2: "onclick",
        3: "change",
        4: "clickbtn",
        },
        correctAnswer: "onclick",
    }
];

// Start game button
startBtn.addEventListener("click", function () {
        countdown()
        renderQuestions(questionsObject[0]);
    });
    
quizQuestions.addEventListener("click", function (event) {
        if (activeIndex === 8) {
            score.textContent = timeLeft;
        } else if (
            event.target.textContent !== questionsObject[activeIndex - 1].correctAnswer
        ) {
    
            timeLeft -=5;
        } else {
            activeIndex++;
            renderQuestions(questionsObject[activeIndex - 1]);
        }
    });

// Quiz questions displaying on main page
function renderQuestions(firstQuestion) {
    quizQuestions.innerHTML = "";

    const questionTitle = document.createElement("h2");
    const answerList = document.createElement("ol");
    const answer1 = document.createElement("li");
    const answer2 = document.createElement("li");
    const answer3 = document.createElement("li");
    const answer4 = document.createElement("li");
    const answer5 = document.createElement("li");
    const answer6 = document.createElement("li");
    const answer7 = document.createElement("li");
    const answer8 = document.createElement("li");

    questionTitle.textContent = firstQuestion.question;
    answer1.textContent = firstQuestion.answers[1];
    answer2.textContent = firstQuestion.answers[2];
    answer3.textContent = firstQuestion.answers[3];
    answer4.textContent = firstQuestion.answers[4];
    answer5.textContent = firstQuestion.answers[5];
    answer6.textContent = firstQuestion.answers[6];
    answer7.textContent = firstQuestion.answers[7];
    answer8.textContent = firstQuestion.answers[8];


    answerList.append(answer1);
    answerList.append(answer2);
    answerList.append(answer3);
    answerList.append(answer4);
    quizQuestions.append(questionTitle);
    quizQuestions.append(answerList);
}

// Timer countdown
function countdown() {
    const timeInterval = setInterval(function () {
        if (timeLeft > 1 && activeIndex !== 8) {
        timer.textContent = timeLeft;
        timeLeft--;
        } else {
          clearInterval(timeInterval);
    }
    }, 1000);
}

// Timer will subtract 5 secs for every incorrect answer
function choiceSelected(answers) {
    if(answers.innerText !== questionsObject[firstQuestion].answers) {
        timeLeft = timeLeft - 5;
    }
    firstQuestion++;
    renderQuestions(firstQuestion);
};


// // To display highscore page when button is clicked
     function viewHighScore() {
        highscorePage.style.display = "block";
        quizPage.style.display = "none";
      }

// Render highscores from local storage
submit.addEventListener("click", function (event) {
    event.preventDefault();
    let game = {
        name: name.value,
        score: timeLeft,
    };
    games.push(game);
    storeGames();
    renderGames();
});

function renderGames() {
    for (let i = 0; i < games.length; i++) {
        console.log(games[i]);
        const highScores = document.createElement("li");
        highScores.textContent = games[i].name + " " + games[i].score;
        highscoreHistory.append(highScores);
    }

}

function storeGames() {
    console.log(games);
    localStorage.setItem("games", JSON.stringify(games));
}