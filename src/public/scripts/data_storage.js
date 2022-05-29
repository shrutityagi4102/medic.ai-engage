const side_data = [{
        "step": 0,
        "question": "",
        "instructions": "In this procedure, you will be able to get live results on your physical, social, emotional and mental health. Press Next to begin.",
        "type": "null"
    },
    {
        "step": 1,
        "question": "Do you feel physcially fit? Are you excercising regularly",
        "instructions": "Respond to the question by pressing the 'Record' button and Press Next when completed ",
        "type": "speak"
    },
    {
        "step": 2,
        "question": "How is your work-life balance? Are you able to maintain your relationships?",
        "instructions": "Respond to the question by pressing the 'Record' button and Press Next when completed ",
        "type": "speak"
    },
    {
        "step": 3,
        "question": "Are you feeling positive, joyous and happy? Are you in a good state of mind?",
        "instructions": "Respond to the question by pressing the 'Record' button and Press Next when completed ",
        "type": "speak"
    },
    {
        "step": 4,
        "question": "Do you feel your friends and family are supportive and have your back in tough times?",
        "instructions": "Respond to the question by pressing the 'Record' button and Press Next when completed ",
        "type": "speak"
    },
    {
        "step": 5,
        "question": "Flash a SMILE :)",
        "instructions": "Last Step! Smile towards the camera to take a photo of yourself!",
        "type": "photo"
    },
    {
        "step": 6,
        "question": "Thanks !",
        "instructions": "Great Job! Click Next and scroll down to proceed and see your results!",
        "type": "null"
    }
]

var emotionSeconds = {
    "angry": 0,
    "disgusted": 0,
    "fearful": 0,
    "happy": 0,
    "neutral": 0,
    "sad": 0,
    "surprised": 0,
    "offcamera": 0
}
var emotionArray = [];
var heartrate = [];
var textResponses = [];
var screenshotImage = 0;

function clearData() {
    emotionSeconds = {
        "angry": 0,
        "disgusted": 0,
        "fearful": 0,
        "happy": 0,
        "neutral": 0,
        "sad": 0,
        "surprised": 0,
        "offcamera": 0
    }
    emotionArray = [];
    heartrate = [];
    textResponses = [];
    screenshotImage = 0;
    console.log("Successfully reset data!");
}

export { side_data, emotionSeconds, emotionArray, heartrate, textResponses, screenshotImage, clearData };