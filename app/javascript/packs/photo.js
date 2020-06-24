// console.log("Hello, world, from photo.js");

const selfieCam = document.querySelector("#selfie-cam");
const photoCanvas = document.querySelector("#taken-photo");
const newPhotoButton = document.querySelector("#take-photo");
const hiddenField = document.querySelector("#photo_picture");

const constraints = {
  video:{
    width:420,
    height:580
  }

};

newPhotoButton.addEventListener("click", function(event){

  photoCanvas.width = selfieCam.videoWidth;
  photoCanvas.height = selfieCam.videoHeight;

  photoCanvas.getContext("2d").drawImage(selfieCam,0,0);
  const dataURL = photoCanvas.toDataURL();
  hiddenField.value = dataURL;


})



navigator.mediaDevices.getUserMedia(constraints)
.then(stream =>{
  selfieCam.srcObject = stream;
});
