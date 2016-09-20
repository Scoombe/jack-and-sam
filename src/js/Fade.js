/**
 * Created by sc on 20/09/2016.
 */

function Fade(startColour,endColour,totalSteps,jqueryObjectString) {
    var start = startColour;
    var end = endColour;
    var steps = totalSteps;
    var Object = jqueryObjectString;
    this.FadeStep = function (count) {
        var Difference = {};
        var colors = colourInts();
        var step;
        var CurrentStep = {};
        //geting all of the diffrerences between the R G and B
        Difference["R"] = colors["endInt"].R - colors["startInt"].R;
        Difference["G"] = colors["endInt"].G - colors["startInt"].G;
        Difference["B"] = colors["endInt"].B - colors["startInt"].B;
        //initing the current step of colour
        //adding the step to the starting color;
        CurrentStep["R"] = colors["startInt"].R + (Math.floor(Difference["R"] / steps) * count + 1);
        CurrentStep["G"] = colors["startInt"].G + (Math.floor(Difference["G"] / steps) * count + 1);
        CurrentStep["B"] = colors["startInt"].B + (Math.floor(Difference["B"] / steps) * count + 1);
        AddColour(CurrentStep);
    };
    colourInts = function() {
        //converting the starting colour to a number
        var startInt = {
            RGB: start,
            R: parseInt(start.slice(1, 3), 16),
            G: parseInt(start.slice(3, 5), 16),
            B: parseInt(start.slice(5, 7), 16)
        };
        //converting the end colour to integers
        var endInt = {
            RGB: end,
            R: parseInt(end.slice(1, 3), 16),
            G: parseInt(end.slice(3, 5), 16),
            B: parseInt(end.slice(5, 7), 16)
        }
        return {
            "startInt": startInt,
            "endInt": endInt
        };
    };
    //function for the changing of the colours over a certain time
    AddColour = function(Colour) {
        var colourString = "#"
        var colourString = colourString + (Colour["R"]).toString(16);
        var colourString = colourString + (Colour["G"]).toString(16);
        var colourString = colourString + (Colour["B"]).toString(16);
        $(Object).css("background-color", colourString);
    };
};