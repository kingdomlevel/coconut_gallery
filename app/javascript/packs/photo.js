// console.log("Hello, world, from photo.js");

const selfieCam = document.querySelector("#selfie-cam");

const constraints = {
  video:{
    width:120,
    height:1280
  }

};

navigator.mediaDevices.getUserMedia(constraints)
.then(stream =>{
  selfieCam.srcObject = stream;
});
