var captures = [];
var emotionResults = [];
var facialExpressionLabel = ["怒り", "軽蔑", "嫌悪", "恐怖", "嬉しい", "真顔", "悲しい", "驚き"];

var subscriptionKey = window.__FACEAPI_KEY__;
var targetFacialExpression;

var uriBase = "https://facial-expression-battle.cognitiveservices.azure.com/face/v1.0/detect"

// Request parameters.
var params = {
    "returnFaceId": "true",
    "returnFaceLandmarks": "false",
    "returnFaceAttributes":
        "age,gender,headPose,smile,facialHair,glasses,emotion," +
        "hair,makeup,occlusion,accessories,blur,exposure,noise"
};

var makeblob = function (dataURL) {
    var BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) == -1) {
        var parts = dataURL.split(',');
        var contentType = parts[0].split(':')[1];
        var raw = decodeURIComponent(parts[1]);
        return new Blob([raw], { type: "application/octet-stream" });
    }
    var parts = dataURL.split(BASE64_MARKER);
    var contentType = parts[0].split(':')[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;

    var uInt8Array = new Uint8Array(rawLength);

    for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: "application/octet-stream" });
}

var analyzeFace = function () {
    var video = document.getElementById('js-local-stream');
    var canvas = document.getElementById('local-canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    let context = canvas.getContext("2d").drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    captures.push(canvas.toDataURL("image/png"));

    let imgURL = makeblob(captures[captures.length-1]);

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
        emotionResults.push({result : response.data[0].faceAttributes.emotion});
        drawChart();
      })
      .catch(error => {
        console.log(error.response);
    });
}

var drawChart = function () {
    var chartData = [];

    var emotion = emotionResults[emotionResults.length-1].result

    for (var key in emotion) {
        if (emotion.hasOwnProperty(key)) {
            chartData.push(emotion[key]);
        }
    }

    var ctx = document.getElementById("emotion-chart").getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'radar',

        // The data for our dataset
        data: {
            labels: facialExpressionLabel,
            datasets: [
                {
                    label: "Local Emotion",
                    // backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: chartData
                }
            ]
        },

        // Configuration options go here
        options: {}
    });
    console.log("chart done");
}

var decideFacialExpression = function() {
    var stopImageNumber = Math.floor(Math.random() * facialExpressionLabel.length);
    if (stopImageNumber == 7)
    {
        stopImageNumber = -1;
    }
    return stopImageNumber;
}

var showFaceText = function(stopImageNumber) {
    targetFacialExpression = facialExpressionLabel[stopImageNumber];
    var target = document.getElementById("target-facial-expression");
    target.textContent = targetFacialExpression;
}

var resetFaceText = function() {
    document.getElementById("target-facial-expression").textContent = "????";
}

var countDown = function () {
    $("#countdown-animation").toggle();
    var count = 3;
    var timerId = setInterval(() => {
        if(count > 0) {
            count --;
        } else {
            clearInterval(timerId);
            $("#countdown-animation").toggle();

            var soundShutter = new Audio("/assets/sound/shutter.mp3");
            soundShutter.play();

            analyzeFace();
        }
    }, 900);
}
