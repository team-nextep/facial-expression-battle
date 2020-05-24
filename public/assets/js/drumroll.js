var playDrumroll = function () {
    var soundDrumStart = new Audio("/assets/sound/drumroll-start.mp3");
    var soundDrumEnd = new Audio("/assets/sound/drumroll-end.mp3");

    soundDrumStart.play();

    setTimeout( function () {
        soundDrumStart.currentTime = 0;
    }, 4000);

    setTimeout( function () {
    soundDrumStart.pause();
    soundDrumStart.currentTime = 0;

    soundDrumEnd.play();
    }, 8000);
}
