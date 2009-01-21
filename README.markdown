jQuery Reticulator
==================

Caution!!
---------

This plugin is under development and is not completly ready to work, but you can try it at you own risk (well... this don't kill your mother).

This is...
----------

Reticulator takes its name from the fancy [Fireworks extenison](http://sofanaranja.com/reticulator/) created by [Ale Muñoz](http://bomberstudios.com/). Now this extension is part of [OrangeCommands](http://bomberstudios.com/orangecommands).

I like the idea of the CSS frameworks like [YUI](http://developer.yahoo.com/yui/grids/), [blueprint](http://www.blueprintcss.org/), [960](http://960.gs/), the über complete [compass-style](http://compass-style.org/)... but in my real work I don't use this tools. With this plugin you can define your regular grid and use it like the Fireworks guides.

The grid will always be over the content.

Yes, you can! (now)
------------------

- Use multiple grids
- Toggle the grids visibility with alt + a
- Eeehm... anything else


Yes, you will!
-------------

- Use solid grids
- Visit a website (at least a post) with examples and all this stuff.
- See beautiful test (thanks to [jshoulda](http://jshoulda.scriptia.net/))
- Use it as bookmarklet (I'm not sure about that)

Yes, I know
-----------

At this moment is not tested en explorer, but as I say is under development.

How to use it
-------------

You need to include in your html jquery (at least 1.2) and jquery.reticulator.js. After that you can call the grid as:

        jQuery(document).ready(function($) {
            $.reticulator();
        });

This will build a basic centered grid (width => 951, columns => 16, gutter => 9)

You can configure your own grid using:

- **layoutWidth**: default 951
- **layoutColumns**: default 16 
- **gutterWidth**: default 9,
- **gridAlign**: default center, you can use also left and right
- **guideColor**: default #00FF00 like fireworks
- **guideOpacity**: default 0.7


More to come!
