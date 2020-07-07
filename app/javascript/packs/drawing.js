const canvas = document.querySelector('#new-drawing');
const refPhoto = document.querySelector('#ref-photo');
const submitButton = document.querySelector('#submit-drawing');
const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");


canvas.width = refPhoto.width;
canvas.height = refPhoto.height;

const context = canvas.getContext("2d");

context.beginPath();
context.fillStyle = "red";
context.rect(10,20,100,200);
context.fill();

submitButton.addEventListener("click",()=>{
  const dataURL=canvas.toDataURL();

  const newDrawing={
    flagged_innapropriate:false,
    moderated:false,
    photo_id:refPhoto.dataset.id,
    picture:dataURL
  }
  fetch(`/photos/${refPhoto.dataset.id}/drawings`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "X-CSRF-Token":csrf
    },
    body:JSON.stringify(newDrawing)

  })
})
