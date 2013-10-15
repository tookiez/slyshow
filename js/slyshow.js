
(function($) {
	$.fn.setOverlay = function() {
  		$(this).append("<div id='overlay'><ul></ul></div>");
  		$("#overlay").css("opacity",0).animate({"opacity":1}, 500);
	}
})(jQuery);

(function($) {
	$.fn.addControls = function(opts) {

		$(this).after("<div id='controls'><span rel='left'>"+opts['leftText']+"</span><span rel='right'>"+opts['rightText']+"</span></div><span rel='close'>"+opts['closeText']+"</span>");
		//init variables
		ul = $("#overlay").find("ul");
		li_width = ul.find("li").width();
		actualPos = min = 0;
		max = - (ul.width() - li_width);
		//init variables
		//shadowColor
		if(opts['colorShadow'] != ""){
			ul.find('img').css('box-shadow','0 0 50px '+opts['colorShadow']);
		}

		//mouse Event
		if(opts['mouseControl']){
			$("span[rel='close']").click(function(){
				$("#overlay").fadeOut(500, function(){
					$(this).remove();
				});
			});
			$("#overlay").find("ul").click(function(){
				$("#overlay").fadeOut(500, function(){
					$(this).remove();
				});
			});
			$("span[rel='left']").click(function(){
				if(actualPos == min){
					actualPos = - ul.width() + li_width;
				}else{
					actualPos = actualPos + li_width;
				}
				ul.animate({left:actualPos+"px"}, opts['speed']);
			});
		}
		//mouse Event _ END

		//keyboard Event
		if(opts['keyboardControl']){
			$('html').keydown(function(event) {
				//esc
				if (event.which == 27) {
					$("#overlay").fadeOut(500, function(){
						$(this).remove();
					});
					event.preventDefault();
				}
			});
			$('html').keydown(function(event) {
				//left
				if (event.which == 37) {
					if(actualPos == min){
						actualPos = - ul.width() + li_width;
					}else{
						actualPos = actualPos + li_width;
					}
					ul.animate({left:actualPos+"px"}, opts['speed']);
					event.preventDefault();
				}
			});
			$('html').keydown(function(event) {
				//right
				if (event.which == 39) {
					if(actualPos == max ){
						actualPos = 0;
					}else{
						actualPos = actualPos - li_width;
					}
					ul.animate({left:actualPos+"px"}, opts['speed']);
					event.preventDefault();
				}
			});
		}
		//keyboard Event _ END

		$("span[rel='right']").click(function(){
			if(actualPos == max ){
				actualPos = 0;
			}else{
				actualPos = actualPos - li_width;
			}
			ul.animate({left:actualPos+"px"}, opts['speed']);
		});			
	}
})(jQuery);

(function($) {
	$.fn.getBackgroundArray = function() {
		var background = new Array();
		$(this).each(function(index){
			 background[index] = $(this).css("background-image").replace('url(','').replace(')','');
		});
		return background;
	}
})(jQuery);

(function($) {
	$.fn.slyshow = function(opts) {
		var opts = $.extend({}, {
	        speed			: 300,
	        colorShadow		: "",
	        leftText		: "&larr;",
	        rightText		: "&rarr;",
	        closeText		: "X",
	        actual_el		: 0,
	        keyboardControl	: true,
	        mouseControl	: true,
  	        responsive		: true	        
  		},opts);

		ground = $(this).attr('class').split(" ");
		var background = $('.'+ground[0]).getBackgroundArray();
		$("body").setOverlay();
		$.each(background,function( index, value ) {
			overlay = $("#overlay").find("ul");
			overlay.append("<li><img src='"+value+"' alt='' rel=coin_"+index+" /></li>").ready(function(){
				img = overlay.find("img[rel=coin_"+index+"]");
				img.css({
					maxWidth 	: img.parent("li").width()*0.9,
					maxHeight 	: img.parent("li").height()*0.9
				}).css({
					left 	: ((overlay.width() - img.width()) /2)+"px",
					top	 	: ((overlay.height() - img.height()) /2)+"px",
				});
				li = img.parent("li");
				li.css({
					width 	: (overlay.width())+"px",
					height	: (overlay.height())+"px",
				});
			});
			opts['actual_el'] = ground[1].replace("ground_","");
			num_el = index;
		});
		ul = li.parent("ul");
		ul.css({
			width 	: (overlay.width()*(num_el+1))+"px",
			height	: (overlay.height())+"px",
			left 	: "-"+(li.width()*opts['actual_el'])+"px"
		});
		ul.addControls(opts);

		if(opts['responsive'] == true){
			$(window).resize(function() {
				$("#overlay").remove();
				$('.'+ground[0]).slyshow(opts);
			});
		}


	}
})(jQuery);