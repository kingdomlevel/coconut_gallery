const refPhoto = document.querySelector('#ref-photo');
const canvas = document.querySelector('#new-drawing');
const submitButton = document.querySelector('#submit-drawing');
const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");
const penExample = document.querySelector('#pen-example');
const refDot = document.querySelector('#ref-dot');
const penColor = document.querySelector('#lineColor');
const reset = document.querySelector('#reset');

canvas.width = refPhoto.width;
canvas.height = refPhoto.height;

canvas.style.width = refPhoto.width;
canvas.style.height = refPhoto.height;

// initial pen width
let penSize = 2;
// initial pen colour
let lineColorSelect = "#000000";
let context = canvas.getContext("2d");
const penExampleContext = penExample.getContext("2d");


//// HANDLE DRAWING:
// set drawing style
context.strokeStyle = lineColorSelect;
context.lineWidth = penSize;
context.lineCap = "round";


// change line width
lineWidth.addEventListener("input", function(){
  let penSize = lineWidth.value;
  penExampleContext.lineWidth = penSize;
  context.lineWidth = penSize;
  drawExample();
})

// draw once on load:
drawExample();

// change line colour
penColor.addEventListener("input", updateFirst,false);
penColor.addEventListener("change",watchColorPicker,false);

function updateFirst(event){
  let lineColorSelect = event.target.value;
  drawExample();
}

function watchColorPicker(event){
   context.strokeStyle = event.target.value;
   drawExample();
}


// show example line width
function drawExample(){
  penExampleContext.clearRect(0,0,penExample.width,penExample.height);
  penExampleContext.beginPath();
  penExampleContext.moveTo(5,15);
  penExampleContext.lineTo(35,15);
  penExampleContext.strokeStyle=context.strokeStyle;
  penExampleContext.stroke();
}

// clear drawing canvas
reset.addEventListener('click',()=>{
  context.clearRect(0,0,canvas.width,canvas.height);
})

// define mouse object
const mouse = {
  x: 0, y: 0,
  lastX: 0, lastY: 0,
  b1: false, b2: false, b3: false,   // 3 mouse buttons
  buttonNames: ["b1", "b2", "b3"]
}

function mouseEvent(event) {
  // making mouse pointer draw relative to canvas position and scale
  const bounds = canvas.getBoundingClientRect();
  mouse.x = event.pageX - bounds.left - scrollX;
  mouse.y = event.pageY - bounds.top - scrollY;

  refDot.style.left = `${mouse.x}px`;
  refDot.style.top = `${mouse.y}px`;

  // normalise mouse coordinates to top left position of canvas
  mouse.x /= bounds.width;
  mouse.y /= bounds.height;

  // scale mouse coordinates to canvas coordinates
  mouse.x *= canvas.width;
  mouse.y *= canvas.height;


  if (event.type === "mousedown") {
    mouse[mouse.buttonNames[event.which - 1]] = true;
    submitButton.classList.remove("hidden");
  } else if (event.type === "mouseup") {
    mouse[mouse.buttonNames[event.which - 1]] = false;
  }
}


document.addEventListener('mousedown', mouseEvent);
document.addEventListener('mouseup', mouseEvent);
document.addEventListener('mousemove', mouseEvent);

document.addEventListener('touchstart', mouseEvent);
document.addEventListener('touchend', mouseEvent);
document.addEventListener('touchmove', mouseEvent);

// draw loop to repeat
function mainLoop() {
  // only draw if left click is pressed
  if (mouse.b1) {
    context.beginPath();
    context.moveTo(mouse.lastX, mouse.lastY);
    context.lineTo(mouse.x, mouse.y);
    context.stroke();
  }
  // update mouse pos
  mouse.lastX = mouse.x;
  mouse.lastY = mouse.y;

  // loop
  requestAnimationFrame(mainLoop);

}

// call on load
requestAnimationFrame(mainLoop);




//// functions for handling drawing submit to database
submitButton.addEventListener("click", () => {
  const dataURL = canvas.toDataURL();

  const newDrawing = {
    flagged_innapropriate: false,
    moderated: false,
    photo_id: refPhoto.dataset.id,
    picture: dataURL
  }
  fetch(`/photos/${refPhoto.dataset.id}/drawings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": csrf
    },
    body: JSON.stringify(newDrawing)
  }).then(() => {
    window.location.replace(`/photos/${refPhoto.dataset.id}`);
  })
})


// set canvas size whenever the photo loads
window.addEventListener("load", () => {
  console.log("window load");
  canvas.width = refPhoto.width;
  canvas.height = refPhoto.height;

  canvas.style.width = refPhoto.width;
  canvas.style.height = refPhoto.height;
});