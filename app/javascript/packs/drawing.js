const refPhoto = document.querySelector('#ref-photo');
const canvas = document.querySelector('#new-drawing');
const submitButton = document.querySelector('#submit-drawing');
const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");
const penExample = document.querySelector('#pen-example');
const refDot = document.querySelector('#ref-dot');




// set canvas size whenever the photo loads
refPhoto.onload = function () {
  canvas.width = refPhoto.width;
  canvas.height = refPhoto.height;

  canvas.style.width = refPhoto.width;
  canvas.style.height = refPhoto.height;
}

colourWheelCanvas.onload = drawCiricle(currentColour);

let penSize = 2;
const context = canvas.getContext("2d");
const penExampleContext = penExample.getContext("2d");


//// HANDLE DRAWING:
// set drawing style
context.strokeStyle = "black";
context.lineWidth = penSize;
context.lineCap = "round";

// change line width
lineWidth.addEventListener("input", function(){
  let penSize = lineWidth.value;
  penExampleContext.lineWidth = penSize;
  context.lineWidth = penSize;
  drawExample();
})

// show example line width
function drawExample(){
  penExampleContext.clearRect(0,0,penExample.width,penExample.height);
  penExampleContext.beginPath();
  penExampleContext.moveTo(10,10);
  penExampleContext.lineTo(70,10);
  penExampleContext.stroke();
}

// COLOUR WHEEL FUNCTIONS
//
// draw a circle

let circleImage = colourWheelContext.createImageData(50,50);
let ciricleData = circleImage.data;
let length= 100*100*4;
for (let i = 0; i < length; i+=4){
  data[i]=255;
  data[i+1]=0;

}

$(()=>{
  const colourWheelCanvas = document.querySelector('#colour-wheel');
  const colourWheelContext = colourWheelCanvas.getContext("2d");
  // get slider values
  //
  let currentColour = {
    hue:180,
    saturation:1.0,
    value:1.0,
    alpha:255
  };

  function drawCiricle(red,green,blue,alpha){
    let wheelRadius = 50;
    let wheelImage = colourWheelContext.createImageData(2*radius, 2*radius);
    let wheelData = wheelImage.data;

    for (let x = -wheelRadius; x < wheelRadius; x++){
      for(let y = -wheelRadius; y < radius; y++){
        let distance = Math.sqrt(x*x + y*y);

        if (distance > radius){
          continue;
        }

        let rowLength = 2*radius;
        let adjustedX = x + wheelRadius;
        let adjustedY = y + wheelRadius;
        let pixelWidth = 4;
        let index = (adjustedX+(adjustedY*rowLength))*pixelWidth;
        wheelData[index] = red;
        wheelData[index+1] = green;
        wheelData[index+2] = blue;
        wheelData[index+3] = alpha;
      }
    }

    colourWheelContext.putImageData(image,0,0);
  }

})



// convert hue values to colour
function hsv2rgb(hue, saturation, value) {
  let chroma = value * saturation;
  let hue1 = hue / 60;
  let x = chroma * (1- Math.abs((hue1 % 2) - 1));
  let r1, g1, b1;
  if (hue1 >= 0 && hue1 <= 1) {
    ([r1, g1, b1] = [chroma, x, 0]);
  } else if (hue1 >= 1 && hue1 <= 2) {
    ([r1, g1, b1] = [x, chroma, 0]);
  } else if (hue1 >= 2 && hue1 <= 3) {
    ([r1, g1, b1] = [0, chroma, x]);
  } else if (hue1 >= 3 && hue1 <= 4) {
    ([r1, g1, b1] = [0, x, chroma]);
  } else if (hue1 >= 4 && hue1 <= 5) {
    ([r1, g1, b1] = [x, 0, chroma]);
  } else if (hue1 >= 5 && hue1 <= 6) {
    ([r1, g1, b1] = [chroma, 0, x]);
  }

  let m = value - chroma;
  let [r,g,b] = [r1+m, g1+m, b1+m];

  // Change r,g,b values from [0,1] to [0,255]
  return [255*r,255*g,255*b];
}


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
