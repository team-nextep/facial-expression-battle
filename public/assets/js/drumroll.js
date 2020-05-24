var playDrumroll = function () {
    var soundDrumStart = new Audio("/assets/sound/drumroll-start.mp3");
    var soundDrumEnd = new Audio("/assets/sound/drumroll-end.mp3");

    soundDrumStart.volume = 0.1;
    soundDrumEnd.volume = 0.1;


    soundDrumStart.play();

    setTimeout( function () {
        soundDrumStart.currentTime = 0;
    }, 3500);

    setTimeout( function () {
    soundDrumStart.pause();
    soundDrumStart.currentTime = 0;

    soundDrumEnd.play();
    }, 7000);
}
