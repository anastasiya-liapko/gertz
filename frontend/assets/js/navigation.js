'use strict';

$("a[href^='#']").click(function(e) {
	e.preventDefault();

	var value;
	var width = $(window).width();
	width < 576 ? value = 87 : '';
	width >= 576 ? value = 110 : '';
	width >= 1200 ? value = 65 : '';
	
	var position = $($(this).attr("href")).offset().top - value;

	$("body, html").animate({
		scrollTop: position
	} /* speed */ );

	$(".navbar-collapse").removeClass("show");
	$('.navbar-toggler-icon').toggleClass('animate');
});

$(window).scroll(function() {
	if ($(this).scrollTop() > 1){
	  $('.header').addClass("sticky");
	}
	else{
	  $('.header').removeClass("sticky");
	}
});