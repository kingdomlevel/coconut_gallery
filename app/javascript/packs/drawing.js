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



// deal w drawing
let shouldDraw = false;

const getXProp = (event) => {
  if ("layerX" in event) {
    // desktop
    return event.layerX;
  } else if ("touches" in event) {
    // mobile
    return event.touches[0].clientX - event.target.getBoundingClientRect().left;
  }
}

const getYProp = (event) => {
  if ("layerX" in event) {
    return event.layerY;
  } else if ("touches" in event) {
    return event.touches[0].clientY - event.target.getBoundingClientRect().top;
  }
}

const drawStart = (event) => {
  const xProp = getXProp(event);
  const yProp = getYProp(event);
  
  shouldDraw = true;
  context.moveTo(xProp, yProp);
  context.beginPath();
  submitButton.classList.remove("hidden");
};

const drawEnd = () => {
  shouldDraw = false;
};

const drawMove = event => {
  const xProp = getXProp(event);
  const yProp = getYProp(event);
  
  // move ref dot:
  refDot.style.left = `${xProp}px`;
  refDot.style.top = `${yProp}px`;

  if (shouldDraw) {
    context.lineTo(xProp, yProp);
    context.stroke();
    context.beginPath();
    context.moveTo(xProp, yProp);
  }
};

canvas.addEventListener("mousedown", drawStart);
canvas.addEventListener("mouseup", drawEnd);
canvas.addEventListener("mousemove", drawMove);
canvas.addEventListener("touchstart", drawStart);
canvas.addEventListener("touchend", drawEnd);
canvas.addEventListener("touchmove", drawMove);
canvas.addEventListener("mouseleave", drawEnd);





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
  canvas.width = refPhoto.width;
  canvas.height = refPhoto.height;

  canvas.style.width = refPhoto.width;
  canvas.style.height = refPhoto.height;
});