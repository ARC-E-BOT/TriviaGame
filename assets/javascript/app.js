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


document.getElementById("main-menu-button").addEventListener("click",function(){

})



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