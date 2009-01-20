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
            guideOpacity: 0.8
        };
        
        var options = $.extend(defaults, options);

        var reticulator = {
            gridCont: '',
            gridCount: 0,
            gridCols: ( options.layoutWidth - (options.layoutColumns * options.gutterWidth) ) / options.layoutColumns
        }
        reticulator.calculateGrid = function(){
            // grid container
            reticulator.gridCont = document.createElement("div");
            reticulator.gridCont.setAttribute('id', 'reticulator_grid_container');
            $(reticulator.gridCont).css({
                width: $(document).width() + "px",
                position: "fixed",
                textAlign: options.gridAlign,
                opacity: options.guideOpacity,
                top: 0
            });
            
            var gridLayout = document.createElement("div");
            $(gridLayout).css({
                width: options.layoutWidth + "px",
                margin: "0px auto"
            })
            $(reticulator.gridCont).append(gridLayout);
            
            for (var i = 0; i < options.layoutColumns * 2; i++) {
                var gridGuide = document.createElement("div");
                $(gridGuide).css({
                    height: $(document).height() + "px",
                    borderLeft: "1px solid " + options.guideColor,
                    marginLeft: reticulator.gridCount + "px"
                });
                
                if(i%2 == 0) reticulator.gridCount = reticulator.gridCount + reticulator.gridCols
                else reticulator.gridCount = reticulator.gridCount + reticulator.gutterWidth
                
                console.log(reticulator.gridCols + reticulator.gridCount)
                $(gridLayout).append(gridGuide);
            }
            
            $(document.body).prepend(reticulator.gridCont);

            // grid container
        };
        
        // resize the grid container
        reticulator.resizeGridCont = function() {
            $(reticulator.gridCont).width( $(document).width() + "px" );
        }
        $(window).resize(function(){ reticulator.resizeGridCont(); });
        
        // 
        reticulator.calculateGrid();
    };
    
})(jQuery);

