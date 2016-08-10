//jquery on document loading
$(function(){
    var pageHeight;
    var pageWidth;
    //object holding all of the timers
    var timers={};
    //bool for when the start button is pressed.
    var btnPress;
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
            console.log("The page height is "+ pageHeight + " the page length is "+ pageWidth);
        }
    };
    //when the play button is pressed hdie it
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
        var pos = randomPosition()
        //creating a div and assigning a click event and passing the button to the dotClick function
        $("body").append("<div class='dot' style='position:absolute;left:"+pos["left"]+"px;top:"+pos["top"]+"px'>")
        $("</div>",
            {
                "class": "dot",
                click: function () {
                    dotClick($(this));
                },
                //adding the random pos to the left and top attrs
                left: pos["left"],
                top: pos["top"]
            });
    }
});
