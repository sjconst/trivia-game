$(document).ready(function() {
//Global variables, setup objects
var gamePlaying, state, noQuestions;
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
        "Mount Kilimanjaro",
        "Denali"
    ),
    question4: new Question(
        "What is the Great Barrier Reef made of?",
        "Coral",
        "Shipwrecks",
        "Bones",
        "Algae",
        "Kelp"
    ),
    question5: new Question(
        "How many U.S. states border Mexico?",
        "5",
        "4",
        "3",
        "7",
        "6"
    ),
    question6: new Question(
        "What is the largest country in South America?",
        "Brazil",
        "Uruguay",
        "Chile",
        "Argentina",
        "Venezuela"
    )     
};
// Counting object
var tally = {
    correctAnswer: 0,
    incorrectAnswer: 0,
    correctCount: function(){
        this.correctAnswer++;    
        state = this.correctAnswer + this.incorrectAnswer;
        return state;
    },
    incorrectCount: function(){
        this.incorrectAnswer++;    
        state = this.correctAnswer + this.incorrectAnswer;
        return state;
    },
    questions: function(){
        var arr = Object.keys(allQuestions);     
        return arr.length;
    }
};
noQuestions = tally.questions();
//UI Object and Methods
var DOM = {
    $start: $("#start"),
    $time: $("#time"),
    $questions: $("#question"),
    $allQuestions: $(".questions"),
    $popup: $("#winlose"),
    displayStart: function(){
        this.$start.css("visibility", "visible");
    },
    hideStart: function(){
        this.$start.css("visibility", "hidden");
    },
    ansBold: function(){
        $(".ans").css("font-weight", "600");
    },
    timesUp: function(){
        this.$popup.text("Time's up!");
        this.ansBold();      
    },
    correct: function(){     
        this.$popup.text("Correct!");
        this.ansBold();       
    },
    wrong: function(){
        this.$popup.text("Wrong answer!");
        this.ansBold();
    },
    reset: function(){
        $(".option").removeClass("ans");
        this.$popup.empty().removeClass("tally");
        $(".option").css("font-weight", "100");
    },
    finalCount: function(){
        this.$allQuestions.css("visibility", "hidden");
        this.$popup.empty();
        this.$popup.html("<div> Total correct: " + tally.correctAnswer).addClass("tally");
        this.$popup.append("<br> Total incorrect: " + tally.incorrectAnswer);
    }
};
//Questions
var displayQuestions = {
    nextQuestion: function() {
        if(state != noQuestions){
            gamePlaying = false;
            setTimeout(function(){
                gamePlaying = true;
                // Un-bold answer
                DOM.reset();
                //display next question
                displayQuestions.showQuestions(state);    
                //reset time
                timer.timerReset(); 
                //start timer 
                timer.timerStart();                  
            }, 2000);  
        }  
    },
    showQuestions: function(el){
        var random = displayQuestions.shuffle(); 
        var keys = Object.values(allQuestions)[el];    
        $("#question").text(keys.ques);
        $("#option" + random[0]).text(keys.ans).addClass("ans"); 
        $("#option" + random[1]).text(keys.opt1); 
        $("#option" + random[2]).text(keys.opt2);
        $("#option" + random[3]).text(keys.opt3); 
        $("#option" + random[4]).text(keys.opt4);    
    },
    timerUp: function(){
        DOM.timesUp();
        tally.incorrectCount(); 
        if(state === noQuestions) {  
            displayQuestions.theEnd();        
        } else if(gamePlaying === true) {
            displayQuestions.nextQuestion();  
        };     
    },
    theEnd: function(){        
        DOM.finalCount();
        timer.timerReset();
        gamePlaying = false;
        setTimeout(function(){
            init();
        }, 3000);
    },
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
};
// Initiate function
function init() {
    gamePlaying = false; 
    tally.correctAnswer = 0;
    tally.incorrectAnswer = 0;     
    DOM.reset();  
    timer.timerReset();
    DOM.displayStart();  
    state = 0;  
};
//Timer object
var timer = {
    t: 0,
    time: 0,
    intervalID: 0,
    converted: 0,    
    maxTime: 20,
    timerStart: function() {        
            if(gamePlaying) {            
            timer.intervalID = setInterval(timer.count, 1000);                  
            timer.t = setTimeout(displayQuestions.timerUp, (parseInt(timer.maxTime) * 1000));      
            }
    },
    timerReset: function() {                    
            clearInterval(timer.intervalID);
            clearTimeout(timer.t);
            this.time = parseInt(timer.maxTime); 
            DOM.$time.text("00:" + timer.maxTime); 
    },
    count: function(){
            if(timer.time > 0) {
                timer.time--;
                timer.converted = timer.timeConverter(timer.time);
                DOM.$time.text(timer.converted);
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
//once start button clicked, start button disappears, question displayed, timer starts
DOM.$start.on("click", function(){
    gamePlaying = true;
    DOM.hideStart();
    DOM.$allQuestions.css("visibility", "visible"); 
    displayQuestions.showQuestions(state);
    timer.timerStart();       
});
//when option selected
$(".option").on("click", function() {
    if(gamePlaying === true){
        if($(this).hasClass("ans")){
            //Bold correct answer, show "Correct!"      
            DOM.correct();    
            //Add correct guess count
            tally.correctCount();     
            if(state === noQuestions) {                
                displayQuestions.theEnd();
            } else {
                //after two seconds
                displayQuestions.nextQuestion();  
            }           
        } else {
            //Bold correct answer, show "Wrong!"
            DOM.wrong();
            tally.incorrectCount();  
            if (state === noQuestions) {              
                displayQuestions.theEnd();
            } else {
                //after two seconds
                displayQuestions.nextQuestion();   
            }        
        }
    }
});
//Initiate game    
init();
});
