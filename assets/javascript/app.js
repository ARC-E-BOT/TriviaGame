//stating the questions array of objects because ... YES OBJECTS!!!!
const mainQuestionsAnswers = [
    {
        question: "How many pounds does the Spartan armor weigh?",
        answersArray: ["2000 Pounds", "500 Pounds", "1000 Pounds", "348 Pounds"],
        answer: "1000 Pounds"
    },
    {
        question: "How many lines of dialogue did halo 3 have?",
        answersArray: ["35,000 lines", "40,000 lines", "50,000 lines", "20,000 lines"],
        answer: "35,000 lines"
    }
];
//create the gif variables for winning gifs and loosing gifs 
const correctGifs = ["https://media.giphy.com/media/YcTBVh0Nxfc3u/giphy.gif", "https://media.giphy.com/media/oUZpDwCBxPAgU/giphy.gif", "http://giphygifs.s3.amazonaws.com/media/di3nQtWT7o98s/giphy.gif","https://media.giphy.com/media/xeHmnqQQVa2hq/giphy.gif"];
const incorrectGifs = ["https://media.giphy.com/media/7avMUQ3fX0ctW/giphy.gif","https://media.giphy.com/media/y8ElyAPEPZRpm/giphy.gif","http://giphygifs.s3.amazonaws.com/media/BWuqx9UiFIgq4/giphy.gif","https://media.giphy.com/media/mSJzBZCArJhNm/giphy.gif"] 

//declaring global variables
const userTally = {
    correct: 0,
    incorrect: 0,
    unanswered: 0
};
let currentQuestion = undefined;
let timeOutRemaining;
let isTimeOutRunning = false;
let counterInterval;
let isCounting = false;
let counter = 15;
let previousCount = 0;
//cloning the main questions and answers array makes resetting the game 100% easier 
let questionsAnswers = [...mainQuestionsAnswers]; //this clones an array GOOGLE is fun!

//pull the html elements we will be editing
const gameBox = document.getElementById("game-box");

document.getElementById("main-menu-button").addEventListener("click",function(){
    createQuestion();
})



/*
    below creates the end of game screen and asks if the user would like to start over
*/
function endgame(){
    gameBox.innerHTML = `
    <h3 id="time-remaining" class="game-box-text">Time Remaining: ${previousCount} Seconds</h3>
    <h3 id="time-remaining" class="game-box-text">Game Over, your Score is below!</h3>
    <br>
    <h3 class="game-answer-text">Correct Answers: ${userTally.correct}</h3>
    <h3 class="game-answer-text">Incorrect Answers: ${userTally.incorrect}</h3>
    <h3 class="game-answer-text">Unanswered: ${userTally.unanswered}</h3>
    <br>
    `;
    let newButton = document.createElement("button");
    newButton.className = "button";
    newButton.textContent = "Start Over?";
    newButton.addEventListener("click", function(){
        //restart game
        restartGame();
    });
    gameBox.appendChild(newButton);
}

function restartGame(){
    /*
    resetting all variables to defaults
    ==============================
    */
    userTally.correct = 0;
    userTally.incorrect = 0;
    userTally.unanswered = 0;
    questionsAnswers = [...mainQuestionsAnswers];
    currentQuestion = undefined;
    isTimeOutRunning = false;
    isCounting = false;
    counter = 15;
    previousCount = 0;
    //creating a new question
    createQuestion();
}

/* 
    once the function below is called with the 2 args either true or false 
    run clear times function
    clear the game box
    make some local variables to help generate the answer screen html
*/
function createAnswerScreen(isCorrect, isOutOfTime){
    clearTimes();
    gameBox.innerHTML = "";
    let statement;
    let correctAnswer = "";
    let endGif;
    let localTimeout;
    if(isCorrect){
        // set the statement variable string to correct and set the end gif to a random gif from the correct gifs
        statement = "Correct!";
        endGif = correctGifs[Math.floor(Math.random() * correctGifs.length)];
        //add one to correct variable
        userTally.correct++;
    } else if(isOutOfTime){
        //set statement to "Out of Time!" and set the correct answer string to the correct answer to help the user learn the correct answer and get a random incorrect gif
        statement = "Out of Time!";
        correctAnswer = `the correct answer was: ${currentQuestion.answer}`;
        endGif = incorrectGifs[Math.floor(Math.random() * incorrectGifs.length)];
        //add one to unanswered variable
        userTally.unanswered++;
    } else {
        //set statement to "Incorrect!" and set the correct answer string to the correct answer to help the user learn the correct answer and get a random incorrect gif
        statement = "Incorrect!";
        correctAnswer = `the correct answer was: ${currentQuestion.answer}`;
        endGif = incorrectGifs[Math.floor(Math.random() * incorrectGifs.length)];
        //add one to incorrect variable
        userTally.incorrect++;
    }
    /*
        here we see that if nothing has been done to the correct answer string then it will not actually show up on the screen
    */
    gameBox.innerHTML = `
        <h3 id="time-remaining" class="game-box-text">Time Remaining: ${previousCount} Seconds</h3>
        <h3 id="question" class="game-box-text">${statement}</h3>
        <h3 id="answer" class="game-answer-text">${correctAnswer}</h3>
        <img class="answer-image" src="${endGif}">
        `;
    /*
        set a time out to keep the screen loaded for 3 seconds and then try to create questions
    */
    localTimeout = setTimeout(function(){
        clearTimeout(localTimeout);
        createQuestion();
    },3000)
}

/*
    beginning of the question screen creation
    ===============================================================
    this chooses a new question
    if after the question choice currentQuestion is undefined then the game is over 
    else clear the game box
    add the countdown
    add the question 
    make the buttons and add them 
    run the main loop to keep track of time
*/
function createQuestion(){
    questionChooser();
    if(currentQuestion === undefined){
        //run endgame
        endgame();
    } else {
        gameBox.innerHTML = "";
        gameBox.appendChild(createHThree("time-remaining","game-box-text",`Time Remaining: ${counter} Seconds`));
        gameBox.appendChild(createHThree("question","game-box-text",currentQuestion.question)); 
        makeQuestionButtons(currentQuestion.answersArray, currentQuestion.answer);
        mainLoop();
    }
}

// this function takes an array of "possible answers" and the actual answer and turns them into buttons
function makeQuestionButtons(arr, answer){
    //looping through each string in the array 
    arr.forEach((item, index) => {
        //if the item is not the first item add a line break before the button gets made
        if(index !== 0){
            const br = document.createElement("br");
            gameBox.appendChild(br);
        }
        //make button set its class to button and set its text to the item of the array we are currently on
        const newButton = document.createElement("button");
        newButton.className = "button";
        newButton.textContent = item;
        //if the current item we are on is the answer give it the click function that says they got it correct else it is incorrect
        if(item === answer){
            newButton.addEventListener("click", function(){
                //run correct answer
                createAnswerScreen(true, false);
            })
        } else {
            newButton.addEventListener("click", function(){
                //run incorrect answer
                createAnswerScreen(false, false);
            })
        }
        gameBox.appendChild(newButton);
    });
}

/*
    the below function
    creates a new <h3></h3> tag
    sets the id of the h3 tag
    sets the class of the h3
    sets the text of the h3 
    and returns it for use outside the function
*/
function createHThree(id,className,text){
    let newHThree = document.createElement("h3");
    newHThree.id = id;
    newHThree.className = className;
    newHThree.textContent = text;
    return newHThree;
}
//==============================================

/*
    if the previously set timeout is still running
        set the isTimeOutRunning variable to false
        clear the timeout
    if the counter is still running 
        set the isCounting variable to false
        clear the interval 
        reset the counter to 15
*/
function clearTimes(){
    if(isTimeOutRunning) {
        isTimeOutRunning = false;
        clearTimeout(timeOutRemaining);
    }
    if (isCounting){
        isCounting = false;
        clearInterval(counterInterval);
        previousCount = counter;
        counter = 15;
    }
}

/*
    the below function does the following:
        -if the isTimeOutRunning variable is false
            -set it to true
            -run the counterLoop function
            -start a timeout using the timeOutRemaining variable (so it can be cleared in the future)
*/
function mainLoop(){
    if(!isTimeOutRunning){
        isTimeOutRunning = true;
        counterLoop();
        timeOutRemaining = setTimeout(function(){
            createAnswerScreen(false, true);
        }, 15000)
    }
}

/*
    the function below does the following:
        -if the isCounting variable is set to false
            -the isCounting variable will be set to true
            -set the counter to 15
            -attach an interval of 1 second to the counterInterval variable
*/
function counterLoop(){
    if(!isCounting){
        isCounting = true;
        counter = 15;
        counterInterval = setInterval(function(){
            counter--;
            document.getElementById("time-remaining").textContent = `Time Remaining: ${counter} Seconds`;
        }, 1000)
    }
}

/*
    in the function below we are:
        -getting an random index number for the questions array
        -setting the current question to the question in the index number position in the array
        -deleting said question from the array
*/
function questionChooser(){
    if(questionsAnswers.length <= 0){
        currentQuestion = undefined;
    } else {
        const index = Math.floor(Math.random() * questionsAnswers.length);
        currentQuestion = questionsAnswers[index];
        questionsAnswers.splice(index,1);
    }
}