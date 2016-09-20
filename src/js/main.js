//jquery on document loading
var pageHeight;
var pageWidth;
//the starting colour followed by the end colour of the fade.
var colours = ["FF5151","964141"];
var fade;
var totalFadeSteps = 20;
$(function(){
    var score = 0;
    var defaultTimeout = 2000;
    var timeout = 2000;
    //object holding all of the timers
    var timers={};
    //holds the count of dots
    var dotCount = 0;
    //bool for when the start button is pressed.
    var btnPress;
    //score
    var score;
    resize();
    //funciton is called when the browser window is resized.
    $(window).resize(function(){
        resize();
    });


    //when the play button is pressed hide it
    $("#play-button").on("click",function(){
        score = 0;
        //updating hte score back to 0
        updateScore();
        //setting back the default timeout
        timeout = defaultTimeout;
        $("#centered-div").addClass("hidden");
        btnPress = true;
        createDot();
        $("#score-div").removeClass("hidden");
    });

    //function for creating a random position returned as an object
    function randomPosition()
    {
        var position ={};
        position["left"] = Math.floor((Math.random() * pageWidth - 50 ) + 20);
        position["top"] = Math.floor((Math.random() * pageHeight - 50) + 20);
        return position
    }

    //funciton for adding a dot to the page
    function createDot(){
        //creating a new fade;
        fade = new Fade("#"+colours[0],"#"+colours[1],totalFadeSteps,".dot");
        dotCount += 1;
        var pos = randomPosition();
        //adding a timeout on the page for the dot so that after a certain amount of
        // mileseconds the user loses if the timeout carrys out
        timers["dot"+dotCount+"timeout"]= setTimeout(function(){
            dotTimeout();
        },timeout);
        timers["dot"+dotCount+"timerCount"]=0;
        //create a new interval callng the timerfunc function.
        timers["dot"+dotCount+"timer"] = setInterval(function(){timerFunc();},timeout / totalFadeSteps);
        //string for the div
        var divStr = "<div id='dot"+dotCount+"'class='dot'  data-dot='"+dotCount+"' style='position:absolute;left:"+
            pos["left"]+"px;top:"+pos["top"]+"px'>";
        //adding the dot div to the page
        $("body").append(divStr).animate({
            backgroundColor:  '#000'
        }, timeout);
    }

    //when the dot is clicked then this function is run
    $("body").on("click",".dot",function(){
        //plus one to the score
        score+= 1;
        //changing score number
        updateScore();
        // making the timeout smaller fractionally
        timeout -= Math.floor(score / 10) * 10;
        console.log(timeout);
        //the dot number is a attr added to the html element
        var dotNo = $(this).attr("data-dot");
        //clearing the timeouts on the dot
        clearTimers();
        //removing the dot from the dom
        $(this).remove();
        // creating a  new dot.
        createDot();
    });

    //function for clearing all of the timers
    function clearTimers(){
        clearTimeout(timers["dot"+dotCount+"timeout"]);
        clearInterval(timers["dot"+dotCount+"timer"]);
        timers["dot"+dotCount+"timerCount"]=0;
    }

    //function that is called when the timeout has passed from the timers object
    // dot+(dotcount)+timeout
    function dotTimeout(){
        //clearing the timeout and intervals
        clearTimers();
        //removing the hidden class and calling the resize method
        $("#centered-div").removeClass("hidden");
        //hiding score
        $("#score-div").addClass("hidden");
        //removing all of the dots
        $(".dot").remove();
        //creating the lose text
        var loseTxt = $("<h3/>",{text:"You have lost the game your score was " + score});
        //prefixing it to the div
        $("#lose-text").html(loseTxt);
        //calling the resize so the play button is still centered
        resize();
    }
    //called when every interval passes from the timers object dot+(dotcount)+timer
    function timerFunc(){
        var count = timers["dot"+dotCount+"timerCount"];
        fade.FadeStep(count);
        timers["dot"+dotCount+"timerCount"] = count+1   ;
    }

    function updateScore(){
        $("#score-div").html(score);
    }

});

//function for getting the size of the page and positioning
function resize(){
    //getting the page height and width of the window
    pageHeight = $(window).height();
    pageWidth = $(window).width();
    var left;
    var top;
    //centering the button if the button isn't hidden
    if(!$('#centered-div').hasClass("hidden")){
        left = pageWidth/2;
        top = pageHeight/2;
        //resizing the centered div to be half of the wifth of the div
        left = Math.floor(left - ($("#centered-div").width() / 2));
        top = Math.floor(top - ($("#centered-div").height() / 2));
        $("#centered-div").css("position","absolute");
        $("#centered-div").css({'left': left +'px','top': top +'px'});
    }
    else{
        left = pageWidth /2;
        top = pageHeight/2;
        //resizing the score
        left = Math.floor(left -($("#score-div").width() / 2));
        top = Math.floor(top - ($("#score-div").height() / 2));
        $("#score-div").css({'left': left +'px'});
    }
}
