var captures = [];

processImage = function() {
    // Replace <Subscription Key> with your valid subscription key.
    var subscriptionKey = window.__FACEAPI_KEY__;

    var uriBase =
        "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";

    // Request parameters.
    var params = {
        "returnFaceId": "true",
        "returnFaceLandmarks": "false",
        "returnFaceAttributes":
            "age,gender,headPose,smile,facialHair,glasses,emotion," +
            "hair,makeup,occlusion,accessories,blur,exposure,noise"
    };

    var localVideo = document.getElementById("js-local-stream");
    var localCanvas = document.getElementById("local-canvas");
    let context = localCanvas.getContext("2d").drawImage(localVideo, 0, 0, 400, 240);
    captures.push(localCanvas.toDataURL("image/png"));

    const imgURL = makeblob(captures[captures.length-1]);

    // Perform the REST API call.
    // $.ajax({
    //     url: uriBase + "?" + $.param(params),

    //     // Request headers.
    //     beforeSend: function(xhrObj){
    //         // xhrObj.setRequestHeader("Content-Type","application/json");
    //         xhrObj.setRequestHeader("Content-Type","application/json");
    //         xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
    //     },

    //     type: "POST",

    //     // Request body.
    //     data: '{"url": ' + '"' + sourceImageUrl + '"}',
    //     // data: imgURL,
    // })

    // .done(function(data) {
    //     // Show formatted JSON on webpage.
    //     // $("#responseTextArea").val(JSON.stringify(data, null, 2));
    //     console.log(data[0].faceAttributes.emotion);
    // })

    // .fail(function(jqXHR, textStatus, errorThrown) {
    //     // Display error message.
    //     var errorString = (errorThrown === "") ?
    //         "Error. " : errorThrown + " (" + jqXHR.status + "): ";
    //     errorString += (jqXHR.responseText === "") ?
    //         "" : (jQuery.parseJSON(jqXHR.responseText).message) ?
    //             jQuery.parseJSON(jqXHR.responseText).message :
    //                 jQuery.parseJSON(jqXHR.responseText).error.message;
    //     alert(errorString);
    // });

    axios.post(
        uriBase + "?" + $.param(params),
        imgURL,
        {
          headers: {
            "Content-Type": "application/octet-stream",
            "Ocp-Apim-Subscription-Key": subscriptionKey,
          }
        },
      )
      .then(response => {
        console.log(response.data[0].faceAttributes.emotion)

      })
      .catch(error => {
        console.log(error.response)
      });
};

makeblob = function (dataURL) {
    var BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) == -1) {
        var parts = dataURL.split(',');
        var contentType = parts[0].split(':')[1];
        var raw = decodeURIComponent(parts[1]);
        return new Blob([raw], { type: contentType });
    }
    var parts = dataURL.split(BASE64_MARKER);
    var contentType = parts[0].split(':')[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;

    var uInt8Array = new Uint8Array(rawLength);

    for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
}
