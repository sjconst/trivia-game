
$(document).ready(function() {

//Global variables, setup objects
var correctAnswer, incorrectAnswer, gamePlaying;

var DOM = {
    $start: $("#start"),
    $time: $("#time")
}

// Initiate function

function init() {
    correctAnswer = 0;
    incorrectAnswer = 0;
    gamePlaying = false;      
    timerReset();
    
    //display start button
    DOM.$start.css("visibility", "visible");
}

//once start button clicked, button disappears and game starts
DOM.$start.on("click", function(){
    gamePlaying = true;
    DOM.$start.css("visibility", "hidden");
    showQuestions();
    timerStart();
})

// Question constructor and questions
var Question = function(id, ques, ans, opt1, opt2, opt3, opt4){
    this.id = id;
    this.ques = ques;
    this.ans = ans;
    this.opt1 = opt1;
    this.opt2 = opt2;
    this.opt3 = opt3;
    this.opt4 = opt4;
};
//create new questions
var allQuestions = {
    question0: new Question(
        0, 
        "What is the world's longest river?",
        "the Nile",
        "the Amazon river",
        "the Yangtze",
        "the Mekong",
        "the Seine"
        ),
    question1: new Question(
        1, 
        "What is the capital of Burkina Faso?",
        "Ouagadougou",
        "Lagos",
        "Kigali",
        "Dar es Salaam",
        "Dakar"
        ),
    question2: new Question(
        2, 
        "What is the world's biggest island?",
        "Greenland",
        "Iceland",
        "Great Britain",
        "Madagascar",
        "Cuba"
        ),

    }
//display new Questions
function showQuestions(){
     $("#question").text(allQuestions.question0.ques);

    //randomly assign ans + four options in UI option fields using Fisher-Yates shuffle algorithm                                         
    var numbers = [1, 2, 3, 4, 5]; 
    function shuffle(el) {
        var j, x, i;
        for (i = el.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = el[i];
            el[i] = el[j];
            el[j] = x;
        }
        return el;
    }
    var random = shuffle(numbers);  
    $("#option" + random[0]).text(allQuestions.question0.ans).addClass("ans");
    $("#option" + random[1]).text(allQuestions.question0.opt1);
    $("#option" + random[2]).text(allQuestions.question0.opt2);
    $("#option" + random[3]).text(allQuestions.question0.opt3);
    $("#option" + random[4]).text(allQuestions.question0.opt4);       
};

//Timer Functions
var time = 0;
var intervalID;
function timerStart() {
    if(gamePlaying) {        
        intervalID = setInterval(count, 1000);
    }    
};

function timerReset() {
    time = 60;
    DOM.$time.text("1:00");
    clearInterval(intervalID);
};

function count() {
    if(time > 0) {
        time--;
        var converted = timeConverter(time);
        DOM.$time.text(converted);
        }
};    

function timeConverter(t){
    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    if (minutes === 0) {
        minutes = "00";
    } else if (minutes < 10) {
        minutes = "0" + minutes;
    }
    return minutes + ":" + seconds;
};

$("")
    // if correct guess made before timer hits 0, display "correct", hide current question and answers, and display next question and answers after a few seconds

    // else if timer reaches 0, display "times up", and display answer in bold. wait a few seconds then display next question and answer.

    //else if incorrect guess made, display "wrong answer", display answer in bold. Wait a few seconds then display next question and answer. 

    // when reach end of questions, show the number of correct answers, incorrect answers, and display start button (initiate function)
 
//Initiate game    
init();

});
