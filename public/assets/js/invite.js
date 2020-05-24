var invite = function() {
    var url = location.href;
    const localId = document.getElementById('js-local-id').innerText;

    var inviteUrl = document.getElementById('js-invite-url');
    var urlWithId = url + "?remoteId=" + localId;
    inviteUrl.innerText = urlWithId;

    new ClipboardJS('.invite-button');
    db.collection("room").doc(getRoomId()).set({
        stopImageNumber: -1000
    }).catch(function(error) {
        console.error("データプッシュエラー： ");
    });
    myRoomId = getRoomId();
    UIkit.notification({
        message: '招待URLをコピーしました！',
        status: 'primary',
        pos: 'top-center',
        timeout: 2000
    });    
}
