const canvas = document.querySelector('#new-drawing');
const refPhoto = document.querySelector('#ref-photo');
const submitButton = document.querySelector('#submit-drawing');
const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");


canvas.width = refPhoto.width;
canvas.height = refPhoto.height;

canvas.style.width = refPhoto.width;
canvas.style.height = refPhoto.height;

const context = canvas.getContext("2d");

context.beginPath();
// context.fillStyle = "red";
// context.rect(10,20,refPhoto.width-20,refPhoto.height-20);
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


// function startPosition(){
//   painting = true;
// }
// function finishPosition(){
//   painting = false;
//   context.beginPath();
// }





const mouse = {
  x : 0, y : 0,
  lastX:0, lastY:0,
  b1:false, b2:false, b3:false,
  buttonNames: ["b1","b2","b3"]
}

function mouseEvent(event){
  // if(!painting) return;
  context.lineWidth = 1;
  context.lineCap = 'round';

// making mouse pointer draw relative to canvas position and scale
  const bounds = canvas.getBoundingClientRect();
  mouse.x = event.pageX - bounds.left - scrollX;
  mouse.y = event.pageY - bounds.left - scrollY;

if(event.type==="mousedown"){
  mouse[mouse.buttonNames[event.which-1]] = true;
}else if(event.type === "mouseup"){
  mouse[mouse.buttonNames[event.which-1]] = false;
}


  // context.lineTo(e.clientX, e.clientY);
  // context.stroke();
  // context.beginPath();
  // context.moveTo(e.clientX, e.clientY);


}


document.addEventListener('mousedown', mouseEvent);
document.addEventListener('mouseup', mouseEvent);
document.addEventListener('mousemove', mouseEvent);

function mainLoop(time){
  if (mouse.b1){
    context.beginPath();
    context.moveTo(mouse.lastX,mouse.lastY);
    context.lineTo(mouse.x,mouse.y);
    context.stroke();
  }
mouse.lastX = mouse.x;
mouse.lastY = mouse.y;
requestAnimationFrame(mainLoop);

}
requestAnimationFrame(mainLoop);
