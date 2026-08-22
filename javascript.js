const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

gridSize = 30

let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;
let mousePressed = false;

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);
document.addEventListener("mousedown", mouseDownHandler);
document.addEventListener("mouseup", mouseUpHandler);

const ownerID = 1

const entityArray = [];

class Vector {
  constructor(x,y) {
    this.x = x
    this.y = y
  }
  null() {
    this.x = 0
    this.y = 0
  }
}
/*
class Barrel {
  constructor(length, width) {
    this.length = length
    this.width = width
    this.angle = 0
    this.bulletstats = {
      class: 0,
      size: this.width,
      speed: 0,  gonna make this rely on player stats 

    }
  }
}
  I'll be using something like this later. first i wanna see if i can get bullets to work at all
*/

class Entity {
  constructor(x, y, radius, speed, owner) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.velocity = new Vector(0,0);
    this.acceleration = new Vector(0,0);
    this.speed = speed;
    this.owner = owner;
    this.barrel = [];
    this.isPlayer = true;
  }
}

const view = {
  x: 0,
  y: 0
}

entityArray[0] = new Entity(0, 0, 30, 0.2, 1)
entityArray[1] = new Entity(50, 50, 30, 0.2, 2)
entityArray[2] = new Entity(90, -50, 20, 0.2, 2)

function setView () {
  for (entity of entityArray) {
    if (entity.owner == ownerID) {
      view.x = entity.x
      view.y = entity.y
    }
  }
}

function drawPlayerBody () {
  if (entity.owner == ownerID) {
      drawOwnPlayerBody();
  } else {
    drawOtherPlayerBody();
  }

}


function drawOwnPlayerBody () {
  ctx.beginPath();
  ctx.arc(canvas.width/2, canvas.height/2, entity.radius, 0, Math.PI*2)
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawOtherPlayerBody () {
  ctx.beginPath();
  ctx.arc(canvas.width/2-view.x+entity.x, canvas.height/2-view.y+entity.y, entity.radius, 0, Math.PI*2)
  ctx.fillStyle = "#dd0000";
  ctx.fill();
  ctx.closePath();
}

function drawEntity () {
  if (entity.isPlayer) {
    drawPlayerBody();
  }
}

function drawGrid () {
  ctx.lineWidth = 1;
  for (let gx = 0; gx < canvas.width+gridSize ; gx += gridSize) {
    ctx.beginPath();
    ctx.moveTo(gx - view.x%gridSize, 0);
    ctx.lineTo(gx - view.x%gridSize, canvas.height);
    ctx.stroke();
  }
  for (let gy = 0; gy < canvas.height+gridSize; gy += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, gy - view.y%gridSize);
    ctx.lineTo(canvas.width, gy - view.y%gridSize);
    ctx.stroke();
  }
    
}

function keyDownHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = true;
  } 
  if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = true;
  }
  if (e.key === "Up" || e.key === "ArrowUp") {
    upPressed = true;
  } 
  if (e.key === "Down" || e.key === "ArrowDown") {
    downPressed = true;
  }  
}

function keyUpHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = false;
  } 
  if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = false;
  }
  if (e.key === "Up" || e.key === "ArrowUp") {
    upPressed = false;
  } 
  if (e.key === "Down" || e.key === "ArrowDown") {
    downPressed = false;
  }  
}

function mouseDownHandler() {
  mousePressed = true;
}

function mouseUpHandler() {
  mousePressed = false;
}

function velocityCalculation (player) {
  manualMovementVelocityCalculation();
}

function manualMovementVelocityCalculation () {
  let addedX = 0;
  let addedY = 0
  if (rightPressed) {
    addedX += entity.speed;
  }
  if (leftPressed) {
    addedX -= entity.speed;
  }
  if (upPressed) {
    addedY -= entity.speed;
  }
  if (downPressed) {
    addedY += entity.speed;
  }
  if (Math.sqrt(addedX**2, addedY**2) >= entity.speed) {
    addedX *= 2**0.5 * 0.5
    addedY *= 2**0.5 * 0.5
  }
  entity.acceleration.x += addedX;
  entity.acceleration.y += addedY;
}

function calculatePlayers() {

  if (entity.isPlayer && entity.owner == ownerID) {
    velocityCalculation();
  }
    entity.velocity.x += entity.acceleration.x;
    entity.velocity.y += entity.acceleration.y;    
    entity.x += entity.velocity.x;
    entity.y += entity.velocity.y;
    entity.velocity.x = entity.velocity.x * 0.9
    entity.velocity.y = entity.velocity.y * 0.9
    entity.acceleration.null();
    entity.x = Math.max(Math.min(entity.x, 500), -500)
    entity.y = Math.max(Math.min(entity.y, 500), -500)



}

function drawText() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText(`x: ${entityArray[0].x}`, 8, 20);
  ctx.fillText(`y: ${entityArray[0].y}`, 8, 40);
  ctx.fillText(`velocity x: ${entityArray[0].velocity.x}`, 8, 60);
  ctx.fillText(`velocity y: ${entityArray[0].velocity.y}`, 8, 80);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  setView();
  drawGrid();
  for (entity of entityArray) {
    drawEntity();
  }
  drawText();
  
}

function calculate() {
  for (entity of entityArray) {
    calculatePlayers()
  }
  if (mousePressed) {
    entityArray.push(new Entity(entityArray[0].x, entityArray[0].y, 20, 0.2, 2))
  }
}

function gameTick () {
  calculate();
  draw();
  requestAnimationFrame(gameTick);
}

const runButton = document.getElementById("runButton");
runButton.addEventListener("click", () => {
  gameTick();
  runButton.disabled = true;
});