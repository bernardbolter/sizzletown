$(window).load(function() {
    $('#slider').nivoSlider({
    	effects: 'random',
    	directionNav: false,
    	controlNav: false
    });
});

$(document).ready(function() {
	$('.navigation').singlePageNav({
		speed: 1000
	});
});