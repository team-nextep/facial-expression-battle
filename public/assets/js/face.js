var captures = [];
var emotionResults = [];

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

processImage = function() {
    analyzeFace("local");
    analyzeFace("remote");
    drawChart();
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

analyzeFace = function (channel) {
    var video = document.getElementById(`js-${channel}-stream`);
    var canvas = document.getElementById(`${channel}-canvas`);
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    let context = canvas.getContext("2d").drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    captures.push(canvas.toDataURL("image/png"));

    const imgURL = makeblob(captures[captures.length-1]);

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
        // console.log(response.data[0].faceAttributes.emotion);
        if (channel == "local") {
            emotionResults.push({[channel]: response.data[0].faceAttributes.emotion});
        } else if (channel == "remote") {
            emotionResults[emotionResults.length-1].remote = response.data[0].faceAttributes.emotion;
        }

        console.log(emotionResults);
      })
      .catch(error => {
        console.log(error.response);
    });
}

drawChart = function () {
    var ctx = document.getElementById("emotion-chart").getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'radar',

        // The data for our dataset
        data: {
            labels: ["anger", "contempt", "disgust", "fear", "happiness", "neutral", "sadness", "surprise"],
            datasets: [
                {
                    label: "Local Emotion",
                    // backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: [0, 10, 5, 2, 20, 30, 45, 50]
                }, {
                    label: "Remote Emotion",
                    // backgroundColor: 'rgb(132, 99, 255)',
                    borderColor: 'rgb(132, 99, 255)',
                    data: [0, 15, 15, 12, 2, 3, 45, 5]
                }

            ]
        },

        // Configuration options go here
        options: {}
    });
    console.log("chart done");
}
