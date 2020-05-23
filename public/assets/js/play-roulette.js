var processImage = function() {
  var stopImageNumber = decideFacialExpression();
  playRoulette(stopImageNumber);
};

var playRoulette = function(stopImageNumber){

	var p = {
		startCallback : function() {
		},
		slowDownCallback : function() {
		},
		stopCallback : function() {
			setTimeout( () => countDown(), 800);
		},
		stopImageNumber : stopImageNumber
	}
	var rouletter = $('div.roulette');
	rouletter.roulette(p);
  rouletter.roulette('start');
}
