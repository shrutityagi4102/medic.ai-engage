import {
    side_data,
    emotionSeconds,
    emotionArray,
    heartrate,
    screenshotImage,
    textResponses,
    clearData
} from "./data_storage.js";

// button
const reset = document.getElementById("reset");
const nextquestion = document.getElementById("next-question");
const record = document.getElementById("record");
const capture = document.getElementById("capture");
const resultspanel = document.getElementById("results-panel");

// text spots
const progress = document.getElementById("progress");
const instructions = document.getElementById("instructions");
const question = document.getElementById("question");
const questiontitle = document.getElementById("question-title");
const bpmDisplay = document.getElementById("bpm-count");
const canvas = document.getElementById('canvas1');
const video = document.getElementById('player');
var currIndex = 0;
var currStep = 0;
var maxStep = side_data[side_data.length - 1].step;
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var recognition = new SpeechRecognition();
var localImage = null;


// when next question is clicked
nextquestion.addEventListener("click", () => {
    // check to make sure it can't go any further
    if (currIndex != side_data.length - 1) {
        currIndex++;
        currStep = side_data[currIndex].step;
        console.log(side_data[currIndex]);
        if (side_data[currIndex].type === "speak")
            textResponses.push("");
        updateSideData();
    } else {
        getResults();
    }
})

reset.addEventListener("click", () => {
    currIndex = 0;
    currStep = 0;
    clearData();
    updateSideData();
})

function updateSideData() {
    progress.innerHTML = currStep + "/" + maxStep;
    instructions.innerHTML = side_data[currIndex].instructions;
    question.innerHTML = side_data[currIndex].question;
    if (side_data[currIndex].question === "")
        questiontitle.innerHTML = "";
    else
        questiontitle.innerHTML = "Question";
}

function updateBPM(BPM) {
    bpmDisplay.innerHTML = BPM + " BPM";
}

record.addEventListener("click", () => {
    if (side_data[currIndex].type === "speak")
        runSpeechRecognition();
    else if (side_data[currIndex].type === "photo")
        runPhotoTake();
    else
        console.log("Record button won't do anything at the moment you silly goose!");
})

async function runPhotoTake() {
    question.innerHTML = "Your photo has been taken!";
    localImage = await captureImage();
}

function runSpeechRecognition() {
    var output = document.getElementById("output");
    var action = document.getElementById("action");
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var recognition = new SpeechRecognition();

    recognition.onstart = function() {
        document.getElementById('record').setAttribute("style", "background-color:white");
        console.log("Begin speaking");
    };

    recognition.onspeechend = function() {
        document.getElementById('record').setAttribute("style", "background-color:rgb(75,189,214)")
        console.log("Stopped speaking");
        recognition.stop();
    }

    recognition.onresult = function(event) {
        var transcript = event.results[0][0].transcript;
        var confidence = event.results[0][0].confidence;
        console.log(transcript);
        textResponses[textResponses.length - 1] = textResponses[textResponses.length - 1] + " " + transcript;

    };

    recognition.start();
}

function captureImage() {
    return new Promise((resolve, reject) => {
        {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
            canvas.toBlob((blob) => {
                let img = new Image();
                img.src = (window.URL ? URL : webkitURL).createObjectURL(blob);
                console.log(img);
                return resolve(img);
            });
        }
    })
}


function getResults() {
    console.log("Getting results");
    const formData = new FormData();
    formData.append("emotionSeconds[]", emotionSeconds);
    formData.append("emotionArray[]", emotionArray);
    formData.append("heartrate[]", heartrate);
    formData.append("textResponses[]", textResponses);
    formData.append("image", localImage);
    console.log(Array.from(formData));
    jQuery.ajax({
        url: '/getResults',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        method: 'POST',
        type: 'POST',
        success: function(data) {
            console.log("Data Received");
            var jsondata = JSON.parse(data);
            console.log(jsondata);
            useData(jsondata);
        }
    });
    console.log("Data Sent");
}

function useData(data) {
    let htmlData = `<div class="row" style="margin-top: 7rem;margin-bottom: 3rem;">
    <div class="col">
        <div class="container">
            <div class="text-center border rounded border-dark shadow" data-aos="zoom-in" data-aos-once="true" style="padding: 1rem;background-color: white;">
                <h1 class="text-center" style="font-weight: bold;">Total Score: 85%</h1>
            </div>
        </div>
    </div>
</div>
<div class="row people" style="margin-bottom: 3rem;">
    <div class="col-md-6 col-lg-4 item">
        <div class="text-center border rounded border-dark shadow box" data-aos="zoom-in" data-aos-once="true" style="background-color: white;padding: 2rem;">
            <h1 class="name" style="font-weight: bold;">Mental Health</h1><img src="/application/assets/img/brain.png">
            <h3 class="name" style="font-weight: bold;font-size: 3rem;">85%</h3>
        </div>
    </div>
    <div class="col-md-6 col-lg-4 item">
        <div class="text-center border rounded border-dark shadow box" data-aos="zoom-in" data-aos-once="true" style="background-color: white;padding: 2rem;">
            <h1 class="name" style="font-weight: bold;">Physical Health</h1><img src="/application/assets/img/applemuscle.png">
            <h3 class="name" style="font-weight: bold;font-size: 3rem;">81%</h3>
        </div>
    </div>
    <div class="col-md-6 col-lg-4 item">
        <div class="text-center border rounded border-dark shadow box" data-aos="zoom-in" data-aos-once="true" style="background-color: white;padding: 2rem;">
            <h1 class="name" style="font-weight: bold;">Social Health</h1><img src="/application/assets/img/socialhealth.png">
            <h3 class="name" style="font-weight: bold;font-size: 3rem;">90%</h3>
        </div>
    </div>
</div>
<div class="row" style="margin-bottom: 3rem;">
    <div class="col-7">
        <div class="border rounded border-dark shadow" data-aos="zoom-in" data-aos-once="true" style="padding: 2rem;background-color: white;">
            <h1 class="text-center"><strong>&nbsp;</strong>Mood Data 🙂😚🤨🤯😭&nbsp;<span style="text-decoration: underline;"></span></a><br></h1>
            <p style="font-size: 1.3rem;"><strong>Sad - 40%</strong><br></strong><strong>Neutral - 31%</strong><br><strong>Happy - 13%</strong><br><strong>Angry - 10%</strong><br><strong>Surprised - 5%</strong><br></p>
        </div>
    </div>
    <div class="col">
        <div class="text-center border rounded border-dark shadow" data-aos="zoom-in" data-aos-once="true" style="padding: 2rem;background-color: white;">
            <h1 class="text-center">Emotion Analysis</h1>
            <p style="font-size: 1.3rem;"><strong>Your seem a bit on the sadder side. To cheer yourself up, we recommend getting some exercise, socialising, or doing something you enjoy!</strong></p>
        </div>
    </div>
</div>

<div class="row" style="margin-bottom: 3rem;">
    <div class="col">
        <div class="container">
            <div class="text-center border rounded border-dark shadow" data-aos="zoom-in" data-aos-once="true" style="padding: 1rem;background-color: white;">
                <h1 class="text-center" style="font-weight: bold;">Articles To Read</h1>
            </div>
        </div>
    </div>
</div>
<div class="row" style="margin-bottom: 3rem;">
    <div class="col-3">
        <div class="text-center border rounded border-dark shadow" data-aos="zoom-in" data-aos-once="true" style="padding: 2rem;background-color: white;">
        <a href="https://www.heart.org/en/healthy-living/fitness/fitness-basics/why-is-physical-activity-so-important-for-health-and-wellbeing"><h1 class="text-center">Physical Health</h1></a>
            <img  width="200" height="200"src="/application/assets/img/h.png">
        </div>
    </div>
    <div class="col-3">
        <div class="text-center border rounded border-dark shadow" data-aos="zoom-in" data-aos-once="true" style="padding: 2rem;background-color: white;">
        <a href="https://www.helpguide.org/articles/mental-health/building-better-mental-health.htm"><h1 class="text-center">Mental Health</h1></a>
            <img width="200" height="200"src="/application/assets/img/m.png">
        </div>
    </div>
    <div class="col-3">
        <div class="text-center border rounded border-dark shadow" data-aos="zoom-in" data-aos-once="true" style="padding: 2rem;background-color: white;">
        <a href="https://www.webmd.com/balance/what-to-know-about-emotional-health#:~:text=Emotional%20health%20is%20one%20aspect,to%20a%20professional%20for%20help."><h1 class="text-center">Emotional Health</h1></a>
            <img width="200" height="200"src="/application/assets/img/e.png">
        </div>
    </div>
    <div class="col-3">
        <div class="text-center border rounded border-dark shadow" data-aos="zoom-in" data-aos-once="true" style="padding: 2rem;background-color: white;">
        <a href="https://www.etsu.edu/com/gme/resident-wellness/social.php#:~:text=Social%20Health%20is%20a%20term,supported%20in%20their%20daily%20lives."><h1 class="text-center">Social Health</h1></a>
            <img width="200" height="200"src="/application/assets/img/s.png">
        </div>
    </div>
</div>`;
    $('#results-panel').html(htmlData);
}

export {
    updateBPM
};