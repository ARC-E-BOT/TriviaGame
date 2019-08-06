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
let timeRemaining;

//cloning the main questions and answers array makes resetting the game 100% easier 
let questionsAnswers = [...mainQuestionsAnswers]; //this clones an array

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