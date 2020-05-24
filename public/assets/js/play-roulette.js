var db = firebase.firestore();

var getRoomId = function() {
	var roomId = getParam('remoteId');
	if (roomId == "")
	{
		roomId =  document.getElementById('js-local-id').innerText;
	}
	return roomId;
}
var myRoomId = getRoomId();

// バトルボタンを押したとき
var processImage = function() {
	myRoomId = getRoomId();
	var stopImageNumber = decideFacialExpression();
	db.collection("room").doc(myRoomId).set({
		stopImageNumber: stopImageNumber
	}).catch(function(error) {
		console.error("データプッシュエラー： ");
	});
};

var initClientState = true;

// Firebaseでデータが更新されたとき
if (isHost() == false) {
	db.collection("room").doc(myRoomId)
	.onSnapshot(function(doc) {
		if (initClientState) {
			initClientState = false;
		} else {
			var stopImageNumber = doc.data().stopImageNumber;
			playRoulette(stopImageNumber);
			playDrumroll();
		}
	});
}

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
