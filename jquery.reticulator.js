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
    $.reticulator = function(options) {
        var defaults = {
            layoutWidth: 951,
            layoutColumns: 16,
            gutterWidth: 9,
            gridAlign: "center",
            guideColor: "#00FF00",
            guideOpacity: 0.7
        };
        
        var options = $.extend(defaults, options);

        var reticulator = {
            gridCont: '',
            gridCols: ( options.layoutWidth - (options.layoutColumns * options.gutterWidth) ) / options.layoutColumns
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
            
            for (var i = 0; i < (options.layoutColumns * 2); i++) {
                var gridGuide = document.createElement("div");
                $(gridGuide).css({
                    position: "absolute",
                    height: $(document).height() + "px",
                    borderLeft: "1px solid " + options.guideColor,
                    left: cummulativecount + "px"
                });
                
                if(i%2 == 0) cummulativecount = Math.round(cummulativecount) + Math.round(reticulator.gridCols);
                else cummulativecount = Math.round(cummulativecount) + Math.round(options.gutterWidth);
                
                $(gridLayout).append(gridGuide);
            }
            
            $(document.body).prepend(reticulator.gridCont);

            // grid container
        };
        
        // resize the grid container
        reticulator.resizeGridCont = function() {
            $(reticulator.gridCont).children().children().height( $(document).height() + "px" );
            $(reticulator.gridCont).width( $(document).width() + "px" );
        };
        
        reticulator.toggleGrid = function(){
            $(reticulator.gridCont).toggle();
        }
        
        $(window).resize(function(){ reticulator.resizeGridCont(); });
        
        // bind the key combination alt + a
        $(document).bind("keydown", function(e) { 
            var key = String.fromCharCode(e.keyCode);
            if(reticulator.key == null) reticulator.key = e.keyCode;
            else if(reticulator.key == "18" && key == "A") reticulator.toggleGrid();
        });
        
        $(document).bind("keyup", function(e) { 
            reticulator.key = null;
        });
        
        reticulator.calculateGrid();
    };
    
})(jQuery);

