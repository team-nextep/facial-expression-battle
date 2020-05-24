var processImage = function() {
  var stopImageNumber = decideFacialExpression();
	playRoulette(stopImageNumber);
	var db = firebase.firestore();
	db.collection("room").add({
		stopImageNumber: stopImageNumber
	}).catch(function(error) {
		console.error("データプッシュエラー： ");
	});
};

var playRoulette = function(stopImageNumber){

	var p = {
		startCallback : function() {
		},
		slowDownCallback : function() {
		},
		stopCallback : function() {
			showFaceText();
			setTimeout( () => countDown(), 3000);
		},
		stopImageNumber : stopImageNumber
	}
	var rouletter = $('div.roulette');
	rouletter.roulette(p);
  rouletter.roulette('start');
}
