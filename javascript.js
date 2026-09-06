import { createRenderer } from "./draw.js";
import { Vector, Entity } from "./definitions.js"

const canvas = document.getElementById("myCanvas"); 
const ctx = canvas.getContext("2d");

const renderer = createRenderer(ctx,canvas);




const gridSize = 30

let mouseX = 0
let mouseY = 0
let relativeX = 0
let relativeY = 0


let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;
let mousePressed = false;

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);
document.addEventListener("mousedown", mouseDownHandler);
document.addEventListener("mouseup", mouseUpHandler);
document.addEventListener("mousemove", mouseMoveHandler);

const ownerID = 1

const entityArray = [];



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



const view = {
  x: 0,
  y: 0
}

entityArray[0] = new Entity(0, 0, 30, 0.2, 1)
entityArray[1] = new Entity(50, 50, 30, 0.2, 2)
entityArray[2] = new Entity(90, -50, 20, 0.2, 2)

function setView () {
  for (const entity of entityArray) {
    if (entity.owner == ownerID) {
      view.x = entity.x
      view.y = entity.y
    }
  }
}




function mouseMoveHandler(e) {
  mouseX = event.clientX - canvas.offsetLeft;
  mouseY = event.clientY + canvas.offsetTop;
  relativeX = mouseX - canvas.width/2
  relativeY = mouseY - canvas.height/2
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
  manualMovementVelocityCalculation(player);
}

function manualMovementVelocityCalculation (entity) {
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

function calculatePlayers(entity) {

  if (entity.isPlayer && entity.owner == ownerID) {
    velocityCalculation(entity);
  }
    entity.velocity.x += entity.acceleration.x;
    entity.velocity.y += entity.acceleration.y;    
    entity.x += entity.velocity.x;
    entity.y += entity.velocity.y;
    entity.velocity.x = entity.velocity.x * 0.9
    entity.velocity.y = entity.velocity.y * 0.9
    entity.acceleration.null();
    entity.x = Math.max(Math.min(entity.x, 10000), -10000)
    entity.y = Math.max(Math.min(entity.y, 10000), -10000)



}

function fireBullet() {
  for (const player of entityArray) {
    if (player.isPlayer && player.owner == ownerID) {
      entityArray.push( new Entity(player.x, player.y, player.radius/4, 4,2))
      entityArray[entityArray.length-1].velocity.x += relativeX/22.5
      entityArray[entityArray.length-1].velocity.y += relativeY/12.5

    }
  }
  
}




function calculate() {
  for (const entity of entityArray) {
    calculatePlayers(entity);
    
  }
  if (mousePressed) {
    fireBullet();
  }
}

function gameTick () {
  calculate();
  setView();

  renderer.draw(entityArray, view, ownerID, gridSize);
  
  
  requestAnimationFrame(gameTick);
}

const runButton = document.getElementById("runButton");
runButton.addEventListener("click", () => {
  gameTick();
  runButton.disabled = true;
});