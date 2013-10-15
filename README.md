slyshow
=======

Coin-image animation and resposive lightbox

All begin with...

&lte;div class='ground ground_0'&gte;&lte;/div&gte;
&lte;div class='ground ground_1'&gte;&lte;/div&gte;
...
&lte;div class='ground ground_N'&gte;&lte;/div&gte;

...and remember to add:
&lte;link href="css/slyshow.css" rel="stylesheet" type="text/css"&gte;
...
&lte;script type="text/javascript" src="http://code.jquery.com/jquery-2.0.2.min.js" &gte;
&lte;/script&gte;&lte;script type="text/javascript" src="js/slyshow.js" &gte;&lte;/script&gte;

Insert on your HTML all div tag that you want, but remember, class can have any name you want, but must have this sintax:

class='nameClass nameClass_1'
You can personalize every single coin width your preferred background...

.nameClass_0{
	background-image: url('../img/8775428047_653ee3989e_o.jpg');
	background-position: 0 0;
	background-repeat: no-repeat;
}

...and personalized the dimension of the coins(remember width and height must be same, otherwise you'll have eggs!)

.nameClass{
	width: 320px;
	height: 320px;
}

In the end add, in header or in your custom javascript file these strings

$(document).ready(function(){
	$(".ground").click(function(){
		$(this).slyshow();
	});
});

Can personalize the slyshow options, these are the defaults:

$(this).slyshow({
    speed		: 300,			//transition speed in milliseconds
    colorShadow		: "",			//color of the image's shadow
    leftText		: "←",			//name for the left button
    rightText		: "→",			//name for the right button
    closeText		: "X",			//name for the close button
    actual_el		: 0,			//current element(automatically updated by the script)
    keyboardControl	: true,			//is keyboard controlled?
    mouseControl	: true,			//is mouse controlled?
    responsive		: true			//is responsive?	  	
});

Known bugs and problems
The actual element option leads to 0 everytime window is resized.
After window's resize, key next/prev make crazy things!
For now, doesn't support link on image, and not even html codes.