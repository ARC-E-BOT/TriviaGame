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
//cloning the main questions and answers array makes resetting the game 100% easier 
let questionsAnswers = [...mainQuestionsAnswers]; //this clones an array GOOGLE is fun!

//pull the html elements we will be editing
const gameBox = document.getElementById("game-box");

document.getElementById("main-menu-button").addEventListener("click",function(){
    createQuestion()
})

/* 
    <h3 id="time-remaining" class="game-box-text">Time Remaining: 0 Seconds</h3>
    <h3 id="question" class="game-box-text">Out of Time!</h3>
    <h3 id="answer" class="game-answer-text">the correct answer was: floopin</h3>
    <img src="https://media.giphy.com/media/YcTBVh0Nxfc3u/giphy.gif">
*/
function createAnswerScreen(isCorrect){
    gameBox.innerHTML = "";
}


//  ===============================================================

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
            })
        } else {
            newButton.addEventListener("click", function(){
                //run incorrect answer
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

function timeOut(){
    if(isTimeOutRunning) {
        isTimeOutRunning = false;
        clearTimeout(timeOutRemaining);
    }
    if (isCounting){
        isCounting = false;
        clearInterval(counterInterval);
        counter = 15;
    }
    userTally.unanswered++;

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
            timeOut();
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