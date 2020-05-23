var url = location.href;
const localId = document.getElementById('js-local-id').innerText;

var inviteUrl = document.getElementById('js-invite-url');
var urlWithId = url + "/" + localId; 
inviteUrl.innerText = urlWithId;

new ClipboardJS('.btn');