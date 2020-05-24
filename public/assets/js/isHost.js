var isHost = function() {
  var roomId = getParam('remoteId');
	if (roomId == "")
	{
    return true;
  } else {
    return false;
  }
}