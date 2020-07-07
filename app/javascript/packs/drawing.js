const canvas = document.querySelector('#new-drawing');
const refPhoto = document.querySelector('#ref-photo');
const submitButton = document.querySelector('#submit-drawing');
const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");


canvas.width = refPhoto.width;
canvas.height = refPhoto.height;

const context = canvas.getContext("2d");

context.beginPath();
// context.fillStyle = "red";
context.rect(10,20,refPhoto.width-10,refPhoto.height-10);
// context.fill();


// functions for handling drawing submit to database
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


// functions for drawing on canvas

let painting = false;

function startPosition(){
  painting = true;
}
function finishPosition(){
  painting = false;
  context.beginPath();
}

function draw(e){
  if(!painting) return;
  context.lineWidth = 5;
  context.lineCap = 'round';

  context.lineTo(e.clientX, e.clientY);
  context.stroke();
  context.beginPath();
  context.moveTo(e.clientX, e.clientY);
}

canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', finishPosition);
canvas.addEventListener('mousemove', draw);
