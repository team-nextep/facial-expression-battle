// 練習ボタンを押したとき
var practice = function () {
  var stopImageNumber = decideFacialExpression();
  if (document.getElementById("switch").checked) {
    playRoulette(stopImageNumber);
    playDrumroll();
  } else {
    setTimeout(() => countDown(), 500);
  }
};

var playRoulette = function (stopImageNumber) {
  var p = {
    startCallback: function () {},
    slowDownCallback: function () {},
    stopCallback: function () {
      showFaceText(stopImageNumber);
      setTimeout(() => countDown(), 3000);
    },
    stopImageNumber: stopImageNumber,
  };
  var rouletter = $("div.roulette");
  rouletter.roulette(p);
  rouletter.roulette("start");
};

// ToggleBattleContainer
$(function() {
	$('#switch').change(function() {
		var battleContainer = document.getElementById("battle-container");
		if ($(this).prop('checked')) {
			battleContainer.style.display = "block";
		} else {
			battleContainer.style.display = "none";
		}
	})
})
