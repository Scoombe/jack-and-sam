//jquery on document loading
$(function(){
    var pageHeight;
    var pageWidth;
    //object holding all of the timers
    var timers={};
    //holds the count of dots
    var dotCount = 0;
    //bool for when the start button is pressed.
    var btnPress;
    //score
    var score
    console.log("main.js loaded");
    resize();

    //funciton is called when the browser window is resized.
    $(window).resize(function(){
        resize();
    })

    //function for getting the size of the page and positioning
    function resize(){
        //getting the page height and width of the window
        pageHeight = $(window).height();
        pageWidth = $(window).width();
        //centering the button if the button isn't hidden
        if(!$('#play-button').hasClass("hidden")){
            $("#play-button").css("position","absolute");
            $("#play-button").css({'left': pageWidth/2+'px','top': pageHeight/2+'px'});
        }
    };
    //when the play button is pressed hide it
    $("#play-button").on("click",function(){
        $("#play-button").addClass("hidden");
        btnPress = true;
        createDot();
    });

    //function for creating a random position returned as an object
    function randomPosition()
    {
        var position ={};
        position["left"] = Math.floor((Math.random() * pageWidth - 20 ) + 20)
        position["top"] = Math.floor((Math.random() * pageHeight - 20) + 20)
        return position
    }

    //funciton for adding a dot to the page
    function createDot(){
        dotCount += 1
        var pos = randomPosition()
        //adding a timeout on the page for the dot so that after a certain amount of
        // mileseconds the user loses if the timeout carrys out
        timers["dot"+dotCount]= setTimeout(function(){
            dotTimeout();
        },3000)
        //string for the div
        var divStr = "<div class='dot'  data-dot='"+dotCount+"' style='position:absolute;left:"+
            pos["left"]+"px;top:"+pos["top"]+"px'>"
        //adding the dot div to the page
        $("body").append(divStr)
    }
    $("body").on("click",".dot",function(){
        //the dot number is a attr added to the html element
        var dotNo = $(this).attr("data-dot")
        //clearing the timeout on the dot
        clearTimeout(timers["dot"+dotNo]);
        //removing the dot from the dom
        $(this).remove();
        // creating a  new dot.
        createDot();
    });

    function dotTimeout(){
        //removing the hidden class and calling the resize method
        $("#play-button").removeClass("hidden");
        //removing all of the dots
        $(".dot").remove();
        //calling the resize so the play button is still centered
        resize();
        //creating the lose text
        var loseTxt = $("<p/>",{text:"You have lost the game your score was "});
        //prefixing it to the div
        $("#body-fluid").prefix(loseTxt);
    }
});
