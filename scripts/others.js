//JavaScript Document

// Reroll button gives red border around selected die
var $rollkeepButton=$('#pressRoll,#pressKeep');
var $rerollButton=$('#reroll1,#reroll2,#reroll3,#reroll4,#reroll5');

$rollkeepButton.click(function(){
	$(this).siblings('div').children().removeClass('selected');
	$(this).siblings('div').find('img').removeClass('selected');
});

$rerollButton.click(function(){
	$(this).parent().siblings('img').toggleClass('selected');
	$(this).parent().parent('div').toggleClass('selected');	
});

// end red border



// slider UI

$(function() {
	$('#betSlider').slider({
		value: 0,
		min: 0,
		max: 200,
		step: 10,
		slide: function(event,ui){
			$('#bettingAmount').val(ui.value);
		}
	});
	//$('#bettingAmount').val($('#betSlider').slider('value'));
});

// end of slider UI
