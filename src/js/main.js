//jquery on document loading
var pageHeight;
var pageWidth;
var colors = ["FF5151","F34F4F","E34E4E","DA4C4C","D44B4B","CB4848","BD4545","AE4444"];
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
    var score
    resize();
    //funciton is called when the browser window is resized.
    $(window).resize(function(){
        resize();
    })


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
        position["left"] = Math.floor((Math.random() * pageWidth - 50 ) + 20)
        position["top"] = Math.floor((Math.random() * pageHeight - 50) + 20)
        return position
    }

    //funciton for adding a dot to the page
    function createDot(){
        dotCount += 1
        var pos = randomPosition()
        //adding a timeout on the page for the dot so that after a certain amount of
        // mileseconds the user loses if the timeout carrys out
        timers["dot"+dotCount+"timeout"]= setTimeout(function(){
            dotTimeout();
        },timeout);
        timers["dot"+dotCount+"timerCount"]=0;
        //create a new
        //string for the div
        var divStr = "<div id='dot"+dotCount+"'class='dot'  data-dot='"+dotCount+"' style='position:absolute;left:"+
            pos["left"]+"px;top:"+pos["top"]+"px'>"
        //adding the dot div to the page
        $("body").append(divStr).animate({
            backgroundColor:  '#000'
        }, timeout);
    }
    $("body").on("click",".dot",function(){
        //plus one to the score
        score+= 1;
        //changing score number
        updateScore();
        // timeout =
        timeout -= Math.floor(score / 10) * 10;
        console.log(timeout);
        //the dot number is a attr added to the html element
        var dotNo = $(this).attr("data-dot")
        //clearing the timeout on the dot
        clearTimeout(timers["dot"+dotCount+"timeout"]);
        clearTimeout(timers["dot"+dotCount+"timer"]);
        timers["dot"+dotCount+"timerCount"];
        //removing the dot from the dom
        $(this).remove();
        // creating a  new dot.
        createDot();
    });

    function dotTimeout(){
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

    function timerFunc(){
        var count = timers["dot"+dotCount+"timerCount"];
        $("#dot"+dotCount).css("background-color", "#"+colors[count])
        timers["dot"+dotCount+"timerCount"] = count+1   ;
    }

    function updateScore(){
        $("#score-div").html(score);
    }
    //todo create remove timers function that removes the timeout and interva from the dot count

    //fade function
    //step is equal to the
    function colorFade(startColour,endColour,steps){
        var difference;
        var loopDifference;
        var currentColor;
        var start=  {RGB:      startColour,
                     R:        ParseInt(startColour.slice(1,3),16),
                     G:        ParseInt(startColour.slice(3,5),16),
                     B:        ParseInt(startColour.slice(5,7),16)}
        var end=    {RGB:      endColour,
                     R:        ParseInt(endColour.slice(1,3),16),
                     G:        ParseInt(endColour.slice(3,5),16),
                     B:        ParseInt(endColour.slice(5,7),16)}

        //looping through the R G and B values to the end RGB
        for(var i = 1;i < 3;i++){
            difference = end(i) - start(i);
            //making sure that the step is
            difference = (end(i) - start(i)) / steps;
            for(var i = 1; i < steps; i++ ){

            }
        }
        //todo for loop to go from the start colour to the end color.
        var timer = new setTimeout(function(){

        })
        return currentColor;
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
        left = Math.floor(left -($("#score-div").width() / 2))
        top = Math.floor(top - ($("#score-div").height() / 2));
        $("#score-div").css({'left': left +'px'});
    }
};
