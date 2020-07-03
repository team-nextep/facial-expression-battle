// 練習ボタンを押したとき
var practice = function() {
		var stopImageNumber = decideFacialExpression();
		if(document.getElementById("slider").checked){
			playRoulette(stopImageNumber);
			playDrumroll();
		}else{
			setTimeout( () => countDown(), 500);
		}
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

var toggleBattleContainer = function() {
  // Get the checkbox
  var checkBox = document.getElementById("slider");
  // Get the output text
  var battleContainer = document.getElementById("battle-container");

  // ここからしたはかえてちょ
  if (checkBox.checked == true){
    battleContainer.style.display = "block";
  } else {
    battleContainer.style.display = "none";
  }
}
