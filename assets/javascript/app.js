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
let counter = 0;

//cloning the main questions and answers array makes resetting the game 100% easier 
let questionsAnswers = [...mainQuestionsAnswers]; //this clones an array GOOGLE is fun!


function changeQuestion(){

}

function timeOut(){
    if(isTimeOutRunning) {
        isTimeOutRunning = false;
        clearTimeout(timeOutRemaining);
    }
    if (isCounting){
        isCounting = false;
        clearInterval(counterInterval);
        counter = 0;
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
        }, 30000)
    }
}

/*
    the function below does the following:
        -if the isCounting variable is set to false
            -the isCounting variable will be set to true
            -set the counter to 0
            -attach an interval of 1 second to the counterInterval variable
*/
function counterLoop(){
    if(!isCounting){
        isCounting = true;
        counter = 0;
        counterInterval = setInterval(function(){
            counter++;
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
    const index = Math.floor(Math.random() * questionsAnswers.length);
    currentQuestion = questionsAnswers[index];
    questionsAnswers.splice(index,1);
}