/* jQuery Reticulator
* Version 0.01
* Written by Manuel Muñoz Solera (mamuso@mamuso.net)
* @requires jQuery v1.2
*
* Copyright 2009 Manuel Muñoz Solera
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
*/

/*
* @description Plugin that overlays a defined grid to follow for layout purposes
*
*/

(function($) {
    // configuration
    var defaults = {
        layoutWidth: 951,
        layoutColumns: 16,
        gutterWidth: 9,
        gridAlign: "center",
        guideColor: "#00FF00",
        guideOpacity: 0.7
    }

    var options;
    var reticulator = {};

    $.reticulator = function(o) {
        reticulator.init(o);
        var grid = reticulator.calculateGrid();

        $(window).resize(function(){ reticulator.resizeGridCont(grid); });

        // bind the key combination alt + a
        $(document).bind("keydown", function(e) {
            var key = String.fromCharCode(e.keyCode);
            if(reticulator.key == null) reticulator.key = e.keyCode;
            else if(reticulator.key == "18" && key == "A") {
                (e.preventDefault) ? e.preventDefault() : e.returnValue = false;
                reticulator.toggleGrid(grid);
            }
        });

        $(document).bind("keyup", function(e) {
            reticulator.key = null;
        });
    };

    // Allows the grid background to be set on elements
    $.fn.reticulator = function(o)
    {
        reticulator.init(o);
        var data = reticulator.generateBackground();
        this.css('backgroundImage', 'url('+data+')');
    }

    // Initialises options and resets grid width, etc.
    reticulator.init = function(o) {
        defaults = {
            layoutWidth: 951,
            layoutColumns: 16,
            gutterWidth: 9,
            gridAlign: "center",
            guideColor: "#00FF00",
            guideOpacity: 0.7
        }

        options = $.extend(defaults, o);

        reticulator.gridCont = '';
        reticulator.gridCols = ( options.layoutWidth - (
            (options.layoutColumns - 1) * options.gutterWidth) ) /
            options.layoutColumns;
    }

    reticulator.calculateGrid = function(){
        var cummulativecount = 0
        // grid container
        reticulator.gridCont = document.createElement("div");
        $(reticulator.gridCont).css({
            width: $(window).width() + "px",
            position: "fixed",
            textAlign: options.gridAlign,
            opacity: options.guideOpacity,
            top: 0,
            left: 0,
            zIndex: 1000000
        });

        var gridLayout = document.createElement("div");

        if(options.gridAlign == "center") marginval = "0px auto"
        else if(options.gridAlign == "left") marginval = "0px"
        else if(options.gridAlign == "right") marginval = "0px 0px 0px auto"

        $(gridLayout).css({
            width: options.layoutWidth + "px",
            margin: marginval,
            position: "relative"
        })
        $(reticulator.gridCont).append(gridLayout);

        if(options.gutterWidth == 0) guides = options.layoutColumns;
        else guides = options.layoutColumns * 2;

        for (var i = 0; i < guides; i++) {
            var gridGuide = document.createElement("div");
            $(gridGuide).css({
                position: "absolute",
                height: $(document).height() + "px",
                borderLeft: "1px solid " + options.guideColor,
                left: cummulativecount + "px"
            });

            if(i%2 == 0) cummulativecount = cummulativecount + reticulator.gridCols;
            else cummulativecount = cummulativecount + options.gutterWidth;

            $(gridLayout).append(gridGuide);
        }

        $(document.body).prepend(reticulator.gridCont);

        // grid container
        return reticulator.gridCont;
    };

    // resize the grid container
    reticulator.resizeGridCont = function(gridCont) {
        $(gridCont).children().children().height( $(document).height() + "px" );
        $(gridCont).width( $(document).width() + "px" );
    };

    reticulator.toggleGrid = function(gridCont){
        $(gridCont).toggle();
    }

    // Draw the grid background to a canvas, and then return the data URL
    // Does not work in Chrome or Safari because they do not implement
    // toDatURL() yet https://bugs.webkit.org/show_bug.cgi?id=23687 ,
    // and naturally doesn't work in IE
    reticulator.generateBackground = function() {
        var ctx = document.createElement('canvas').getContext('2d');

        ctx.canvas.width = reticulator.gridCols + options.gutterWidth;
        ctx.canvas.height = 1;

        ctx.globalAlpha = options.guideOpacity;
        ctx.fillStyle = options.guideColor;
        ctx.fillRect(0, 0, reticulator.gridCols, 1);
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(reticulator.gridCols, 0, options.gutterWidth, 1);

        return ctx.canvas.toDataURL();
    }

})(jQuery);
