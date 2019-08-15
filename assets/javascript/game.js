
$(document).ready(function() {

//Global variables, setup objects
var correctAnswer, incorrectAnswer, gamePlaying;

var DOM = {
    $start: $("#start")
}

// Initiate function

function init() {
    correctAnswer = 0;
    incorrectAnswer = 0;
    gamePlaying = false;
    //set timer to 00:00
    $("#time").text("0:00");
    
    //display start button
    DOM.$start.css("visibility", "visible");
}

//once start button clicked, button disappears and game starts
DOM.$start.on("click", function(){
    gamePlaying = true;
    DOM.$start.css("visibility", "hidden");
    showQuestions();
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
    //randomly assign ans + four options in UI option fields
    var numbers = [1, 2, 3, 4, 5];
    // function shuffle(el){
    //     for(var x, y, i = el.length; i; x = Math.floor(Math.random() * i), y = el[--i], el[i] = el[x], el[x] = y); 
    //     return el;
    //     }
    // var random = shuffle(numbers);  
    // console.log(random);    

var getNumber = function(el) {
    random = [];
    for(var i = 0; i < el.length; i++) {
        var index =  Math.floor(Math.random() * el.length); // 2, [1, 2, 4, 5]
        var drawn = el.splice(index, 1); // [2]
        drawn.push(random[i]);
    }
    console.log(random);
    return random;
    // if(numbers.length != 0) {
    //     var index =  Math.floor(Math.random() * numbers.length); // 2, [1, 2, 4, 5]
    //     var drawn = numbers.splice(index, 1); // [2]
    //     return drawn[0]; //[2]
    // }
    var getthatNumber = getNumber();
    console.log(getthatNumber);
}


    $("#option" + getNumber[0]).text(allQuestions.question0.ans);
    $("#option" + getNumber[1]).text(allQuestions.question0.opt1);
    $("#option" + getNumber[2]).text(allQuestions.question0.opt2);
    $("#option" + getNumber[3]).text(allQuestions.question0.opt3);
    $("#option" + getNumber[4]).text(allQuestions.question0.opt4);       
};

//Game playing
if(gamePlaying) {

   //timer starts counting down from 1 minute to 0

    // if correct guess made before timer hits 0, display "correct", hide current question and answers, and display next question and answers after a few seconds

    // else if timer reaches 0, display "times up", and display answer in bold. wait a few seconds then display next question and answer.

    //else if incorrect guess made, display "wrong answer", display answer in bold. Wait a few seconds then display next question and answer. 

    // when reach end of questions, show the number of correct answers, incorrect answers, and display start button (initiate function)
}
 

//Initiate game    
init();

});
