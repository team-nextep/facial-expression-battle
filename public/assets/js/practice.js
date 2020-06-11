// 練習ボタンを押したとき
var practice = function() {
    var stopImageNumber = decideFacialExpression();
	playRoulette(stopImageNumber);
	playDrumroll();
};

var playRoulette = function(stopImageNumber){
	var p = {
		startCallback : function() {
		},
		slowDownCallback : function() {
		},
		stopCallback : function() {
			showFaceText(stopImageNumber);
			setTimeout( () => countDown(), 3000);
		},
		stopImageNumber : stopImageNumber
	}
	var rouletter = $('div.roulette');
	rouletter.roulette(p);
  rouletter.roulette('start');
}
