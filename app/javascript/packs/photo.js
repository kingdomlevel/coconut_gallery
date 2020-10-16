const selfieCam = document.querySelector("#selfie-cam");
const photoCanvas = document.querySelector("canvas#taken-photo");
const newPhotoButton = document.querySelector("button#take-photo");
const clearPhotoButton = document.querySelector("button#clear-photo");
const hiddenField = document.querySelector("input#photo_picture");
const uploadButton = document.querySelector("#upload-photo");
const allowCameraText = document.querySelector('#allow-camera-text');
const getStartedButton = document.querySelector('button.get-started')
const introText = document.querySelector('section#intro-text')
const cameraSection = document.querySelector('section#camera');

const constraints = {
  video:{
    width:{
      min: 420,
      max: 420,
      ideal: 420
    },
    height:{
      min: 580,
      max: 580,
      ideal: 580
    },
    facingMode: "user",
    aspectRatio: 0.72413793103
  }  
};


getStartedButton.addEventListener("click", () => {
  // change visibilty of intro / camera sections
  cameraSection.classList.remove('hidden');
  introText.classList.add('hidden');

  // request camera access
  navigator.mediaDevices.getUserMedia(constraints)
    .then(stream => {
      selfieCam.srcObject = stream;
      newPhotoButton.classList.remove("hidden");
      allowCameraText.classList.add("hidden");
    })
    .catch(() => {
      console.log("FATAL: CAMERA ACCESS REFUSED");
      allowCameraText.classList.remove("hidden")
    });
})

//  Take photo:
newPhotoButton.addEventListener("click", function(){
  let sx;

  // handle HTML portriat axes flip
  if (window.screen.orientation.type == "portrait-primary") {
    photoCanvas.width = selfieCam.videoHeight;
    photoCanvas.height = selfieCam.videoWidth;
    photoCanvas.style.transform = "scaleX(-1)";
    sx = (selfieCam.videoWidth / 2) - (photoCanvas.width / 2);

    // draw image
    photoCanvas.getContext("2d").drawImage(
      selfieCam,
      sx,
      0,
      photoCanvas.width,  // sWidth
      photoCanvas.height,   // sHeight
      0,  // dx
      0,  // dy
      photoCanvas.height, // dWidth
      ((photoCanvas.height / photoCanvas.width) * photoCanvas.height)  // dHeight
    );
  } else {
    photoCanvas.width = selfieCam.videoWidth;
    photoCanvas.height = selfieCam.videoHeight;
    photoCanvas.style.transform = "scaleX(-1)";
    sx = (selfieCam.videoWidth / 2) - (photoCanvas.width / 2);
    const sy = (selfieCam.videoHeight / 2) - (photoCanvas.height / 2);

    // draw image
    photoCanvas.getContext("2d").drawImage(
      selfieCam,
      sx,
      sy,
      photoCanvas.width,  // sWidth
      photoCanvas.height,   // sHeight
      0,  // dx
      0,  // dy
      photoCanvas.width, // dWidth
      photoCanvas.height  // dHeight
    );
  }

  
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

// cancel stream when:
//   - nav links clicked
//   - upload photo button clicked
//   - title bar (wonky logo) link clicked
document.querySelectorAll('.navBar a, #upload-photo, body > a').forEach(el => {
  el.addEventListener('click', () => {
    if (selfieCam.srcObject) {
      selfieCam.srcObject.getTracks()[0].stop();
    }
  });
});

