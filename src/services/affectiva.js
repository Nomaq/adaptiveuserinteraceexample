
let Affectiva = {
    init(response){
 const affdex = window.affdex;
 const $ = window.$;
 console.log(window);
        /*
   SDK Needs to create video and canvas nodes in the DOM in order to function
   Here we are adding those nodes a predefined div.
*/
var divRoot = $("#affdex_elements")[0];

// The captured frame's width in pixels
var width = 1280;

// The captured frame's height in pixels
var height = 1024;

/*
   Face detector configuration - If not specified, defaults to
   affdex.FaceDetectorMode.LARGE_FACES
   affdex.FaceDetectorMode.LARGE_FACES=Faces occupying large portions of the frame
   affdex.FaceDetectorMode.SMALL_FACES=Faces occupying small portions of the frame
*/
var faceMode = affdex.FaceDetectorMode.LARGE_FACES;

//Construct a CameraDetector and specify the image width / height and face detector mode.
var detector = new affdex.CameraDetector(divRoot, width, height, faceMode);
/* 
  onImageResults success is called when a frame is processed successfully and receives 3 parameters:
  - Faces: Dictionary of faces in the frame keyed by the face id.
           For each face id, the values of detected emotions, expressions, appearane metrics 
           and coordinates of the feature points
  - image: An imageData object containing the pixel values for the processed frame.
  - timestamp: The timestamp of the captured image in seconds.
*/
detector.addEventListener("onImageResultsSuccess", function (faces, image, timestamp) {
    let MoodEnum = {
        happy : 0,
        angry : 1,
        indifferent : 2,
        stressed : 3
    };
    let faceDetected = false;
    let mood;
    let age;
    
    if (faces.length > 0) {
        faceDetected = true;
 }
        //If joy of the first face is over 50% then show in log
        // console.log("Emotions: " + JSON.stringify(faces[0].emotions, function(key, val) {
        // return val.toFixed ? Number(val.toFixed(0)) : val;
        // }));
 else{
   faceDetected = false;
 }
  
  if(faceDetected){
        if(faces[0].emotions.anger>10){
                mood = MoodEnum.angry;
        }else if(faces[0].emotions.joy>15){
                mood = MoodEnum.happy;
        }else{
                mood = MoodEnum.indifferent;
        }
        // console.log(faces[0].appearance.age);
        switch(faces[0].appearance.age){
                case 'Under 18': {
                        age = 10;
                        break;
                };
                case '18 - 24': {
                        age = 20;
                        break;
                };
                case '25 - 34': {
                       age = 30;
                        break;
                };
                case '35 - 44': {
                        age = 40;
                        break;
                };
                case '45 - 54': {
                        age = 50;
                        break;
                };
                case '55 - 64': {
                        age = 60;
                        break;
                };
                case '65+': {
                        age = 70;
                        break;
                };
                //Default is left out because an unkown age will just keep the last known age
                // default:{
                //         this.age = 40;
                // };
        }
  }
  
  else{
        faceDetected = false;
}
    response(faceDetected,mood,age);
});

/* 
  onImageResults success receives 3 parameters:
  - image: An imageData object containing the pixel values for the processed frame.
  - timestamp: An imageData object contain the pixel values for the processed frame.
  - err_detail: A string contains the encountered exception.
*/
detector.addEventListener("onImageResultsFailure", function (image, timestamp, err_detail) {
console.log(image, timestamp, err_detail);
});

detector.addEventListener("onWebcamConnectSuccess", function() {
	console.log("I was able to connect to the camera successfully.");
});

detector.addEventListener("onWebcamConnectFailure", function() {
	console.log("I've failed to connect to the camera :(");
});


detector.detectEmotions.joy = true;
detector.detectEmotions.anger = true;
detector.detectAppearance.age = true;

detector.start();

    },
};

export default Affectiva;