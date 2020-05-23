var processImage = function() {
  var stopImageNumber = decideFacialExpression();
  playRoulette(stopImageNumber);
	setTimeout( () => countDown(), 3000);
};

var playRoulette = function(stopImageNumber){

	$('.roulette').find('img').hover(function(){
		console.log($(this).height());
	});
	var appendLogMsg = function(msg) {
		$('#msg')
	.append('<p class="muted">' + msg + '</p>')
	.scrollTop(100000000);

	}
	var p = {
		startCallback : function() {
			appendLogMsg('start');
		},
		slowDownCallback : function() {
			appendLogMsg('slowdown');
		},
		stopCallback : function($stopElm) {
			appendLogMsg('stop');
		},
		stopImageNumber : stopImageNumber
	}
	var rouletter = $('div.roulette');
	rouletter.roulette(p);
  rouletter.roulette('start');
}
