const selfieCam = document.querySelector("#selfie-cam");
const photoCanvas = document.querySelector("canvas#taken-photo");
const newPhotoButton = document.querySelector("button#take-photo");
const clearPhotoButton = document.querySelector("button#clear-photo");
const hiddenField = document.querySelector("input#photo_picture");
const uploadButton = document.querySelector("#upload-photo");

const constraints = {
  video:{
    width:420,
    height:580
  }  
};

navigator.mediaDevices.getUserMedia(constraints)
.then(stream =>{
  selfieCam.srcObject = stream;
});

//  Take photo:
newPhotoButton.addEventListener("click", function(){
  
  photoCanvas.width = selfieCam.videoWidth;
  photoCanvas.height = selfieCam.videoHeight;
  
  photoCanvas.getContext("2d").drawImage(selfieCam,0,0);
  
  const dataURL = photoCanvas.toDataURL();
  hiddenField.value = dataURL;

  // display clear photo button, hide take photo button
  clearPhotoButton.classList.remove("hidden")
  newPhotoButton.classList.add("hidden");

  // display upload photo button:
  uploadButton.classList.remove("hidden");
})


// Clear photo:
clearPhotoButton.addEventListener("click", () => {
  photoCanvas.getContext("2d").clearRect(0, 0, photoCanvas.width, photoCanvas.height);
  
  // hide clear photo button, display take photo button
  clearPhotoButton.classList.add("hidden");
  newPhotoButton.classList.remove("hidden");

  // hide upload photo button:
  uploadButton.classList.add("hidden");
});


