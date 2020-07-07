const canvas = document.querySelector('#new-drawing');
const refPhoto = document.querySelector('#ref-photo');

canvas.width = refPhoto.width;
canvas.height = refPhoto.height;

const context = canvas.getContext("2d");

context.beginPath();
context.fillStyle = "red";
context.rect(10,20,100,200);
context.fill();
