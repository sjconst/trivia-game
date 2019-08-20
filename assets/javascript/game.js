
$(document).ready(function() {

//Global variables, setup objects
var gamePlaying, state;

//UI Functions and Methods
var DOM = {
    $start: $("#start"),
    $time: $("#time"),
    $questions: $("#question"),
    $popup: $("#winlose")
};

var tally = {
    correctAnswer: 0,
    incorrectAnswer: 0,
    totalCorrect: [],
    totalIncorrect: []
}

function displayStart() {
    DOM.$start.css("visibility", "visible");
};

function hideStart() {
    DOM.$start.css("visibility", "hidden");
};

function correctCount(){
    //correct answer count
    tally.correctAnswer++;    
    state = tally.correctAnswer + tally.incorrectAnswer;
    return state;
};

function incorrectCount(){
    tally.incorrectAnswer++;    
    state = tally.correctAnswer + tally.incorrectAnswer;
    return state;
}

function showQuestions(el){
    var random = allQuestions.shuffle(); 
    var keys = Object.values(allQuestions)[el];    
    $("#question").text(keys.ques);
    $("#option" + random[0]).text(keys.ans).addClass("ans"); 
    $("#option" + random[1]).text(keys.opt1); 
    $("#option" + random[2]).text(keys.opt2);
    $("#option" + random[3]).text(keys.opt3); 
    $("#option" + random[4]).text(keys.opt4);    
};

var winlose = {
    ansBold: function(){
        $(".ans").css("font-weight", "600");
    },
    timesUp: function(){
        DOM.$popup.text("Time's up!");
        winlose.ansBold();
    },
    correct: function(){     
        DOM.$popup.text("Correct!");
        winlose.ansBold();
    },
    wrong: function(){
        DOM.$popup.text("Wrong answer!");
        winlose.ansBold();
    },
    reset: function(){
        DOM.$popup.empty();
        $(".option").css("font-weight", "100");
    }

}

// Initiate function
function init() {
    gamePlaying = false; 
    tally.correctAnswer = 0;
    tally.incorrectAnswer = 0;         
    timer.timerReset();
    displayStart();  
    state = 0;  
};

//Question constructor and objects
var Question = function(ques, ans, opt1, opt2, opt3, opt4){
    this.ques = ques;
    this.ans = ans;
    this.opt1 = opt1;
    this.opt2 = opt2;
    this.opt3 = opt3;
    this.opt4 = opt4;
};

var allQuestions = {
    question0: new Question(
        "What is the world's longest river?",
        "the Nile",
        "the Amazon river",
        "the Yangtze",
        "the Mekong",
        "the Seine"
    ),
    question1: new Question(
        "What is the capital of Burkina Faso?",
        "Ouagadougou",
        "Lagos",
        "Kigali",
        "Dar es Salaam",
        "Dakar"
    ),
    question2: new Question(
        "What is the world's biggest island?",
        "Greenland",
        "Iceland",
        "Great Britain",
        "Madagascar",
        "Cuba"
    ),
    question3: new Question(
        "What is the world's tallest mountain?",
        "Everest",
        "K2",
        "Broad Peak",
        "Mount Kilimanjar",
        "Denali"
    ),     
    //randomly assign ans + four options in UI option fields using modern Fisher-Yates shuffle algorithm  
    shuffle: function() {
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
            return random = shuffle(numbers);  
    }    
}

//Timer object
var timer = {
    time: 0,
    intervalID: 0,
    converted: 0,
    timerStart: function() {        
            if(gamePlaying) {
            timer.intervalID = setInterval(timer.count, 1000);
            }
    },
    timerReset: function() {
            timer.time = 10; //change to 60 once deployed
            DOM.$time.text("0:10"); //change to "1:00" once deployed
            clearInterval(timer.intervalID);
    },
    count: function(){
            if(timer.time > 0) {
                timer.time--;
                timer.converted = timer.timeConverter(timer.time);
                DOM.$time.text(timer.converted);
            } else if (timer.time <= 0) {
                winlose.timesUp();               
            }
    },
    timeConverter: function(t){
        var minutes = Math.floor(t / 60);
        var seconds = t - (minutes * 60);
        if (seconds < 10) {
            seconds = "0" + seconds;
        };
        if (minutes === 0) {
            minutes = "00";
        } else if (minutes < 10) {
            minutes = "0" + minutes;
        };
        return minutes + ":" + seconds;
    }
};
// Event handlers
//once start button clicked, button disappears and game starts
DOM.$start.on("click", function(){
    gamePlaying = true;
    hideStart();
    showQuestions(state);
    timer.timerStart();       
});

//when answer selected
$(".option").on("click", function() {
    if($(this).hasClass("ans")){
        winlose.correct();     
        $(this).removeClass("ans");     
        correctCount();
        setTimeout(function(){
            showQuestions(state);
            winlose.reset();
            timer.timerReset();
            timer.timerStart();
        }, 3000);        
    } else {
        winlose.wrong();
        $(".option").removeClass("ans");
        incorrectCount();
        setTimeout(function(){
            showQuestions(state);
            winlose.reset();
            timer.timerReset();
            timer.timerStart();
        }, 3000);
    }
    // if correct guess made before timer hits 0, display "correct", hide current question and answers, and display next question and answers after a few seconds
    
    // else if timer reaches 0, display "times up", and display answer in bold. wait a few seconds then display next question and answer.

    //else if incorrect guess made, display "wrong answer", display answer in bold. Wait a few seconds then display next question and answer. 

    // when reach end of questions, show the number of correct answers, incorrect answers, and display start button (initiate function)
})

 
//Initiate game    
init();

});
