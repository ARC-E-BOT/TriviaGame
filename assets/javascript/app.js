//stating the questions array of objects because ... YES OBJECTS!!!!
const questionsAnswers = [
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

