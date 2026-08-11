const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

gridSize = 30

let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

const ownerID = 1

const playerArray = [];

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

class Player {
  constructor(x, y, radius, speed, owner) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.velocity = new Vector(0,0);
    this.acceleration = new Vector(0,0);
    this.speed = speed;
    this.owner = owner;
  }
}

const view = {
  x: 0,
  y: 0
}

playerArray[0] = new Player(0, 0, 30, 0.2, 1)
playerArray[1] = new Player(50, 50, 30, 0.2, 2)
playerArray[2] = new Player(90, -50, 20, 0.2, 2)

function setView () {
  for (player of playerArray) {
    if (player.owner == ownerID) {
      view.x = player.x
      view.y = player.y
    }
  }
}

function drawPlayerBody () {
  for (player of playerArray) {
      if (player.owner == ownerID) {
        drawOwnPlayerBody();
    } else {
      drawOtherPlayerBody();
    }
  }
}

function drawOwnPlayerBody () {
  ctx.beginPath();
  ctx.arc(canvas.width/2, canvas.height/2, player.radius, 0, Math.PI*2)
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawOtherPlayerBody () {
  ctx.beginPath();
  ctx.arc(canvas.width/2-view.x+player.x, canvas.height/2-view.y+player.y, player.radius, 0, Math.PI*2)
  ctx.fillStyle = "#dd0000";
  ctx.fill();
  ctx.closePath();
}

function drawPlayer () {
  drawPlayerBody();
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

function velocityCalculation (player) {
  manualMovementVelocityCalculation();
}

function manualMovementVelocityCalculation () {
  let addedX = 0;
  let addedY = 0
  if (rightPressed) {
    addedX += player.speed;
  }
  if (leftPressed) {
    addedX -= player.speed;
  }
  if (upPressed) {
    addedY -= player.speed;
  }
  if (downPressed) {
    addedY += player.speed;
  }
  if (Math.sqrt(addedX**2, addedY**2) >= player.speed) {
    addedX *= 2**0.5 * 0.5
    addedY *= 2**0.5 * 0.5
  }
  player.acceleration.x += addedX;
  player.acceleration.y += addedY;
}

function calculatePlayers() {
  for (player of playerArray) {
    if (player.owner == ownerID) {
      velocityCalculation(player);
    }
    player.velocity.x += player.acceleration.x;
    player.velocity.y += player.acceleration.y;    
    player.x += player.velocity.x;
    player.y +=player.velocity.y;
    player.velocity.x = player.velocity.x * 0.9
    player.velocity.y = player.velocity.y * 0.9
    player.acceleration.null();
    player.x = Math.max(Math.min(player.x, 500), -500)
    player.y = Math.max(Math.min(player.y, 500), -500)
  }



}

function drawText() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText(`x: ${playerArray[0].x}`, 8, 20);
  ctx.fillText(`y: ${playerArray[0].y}`, 8, 40);
  ctx.fillText(`velocity x: ${playerArray[0].velocity.x}`, 8, 60);
  ctx.fillText(`velocity y: ${playerArray[0].velocity.y}`, 8, 80);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  setView();
  drawGrid();
  drawPlayer();
  drawText();
  
}

function calculate() {
  calculatePlayers()
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