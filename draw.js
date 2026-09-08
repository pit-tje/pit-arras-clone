export function createRenderer(ctx, canvas) {

  function draw(entityArray, view, ownerID, gridSize) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(view, gridSize);
    for (const entity of entityArray) {
      drawEntity(entity, view, ownerID);
    }

    drawText(entityArray);
    
  }

  function drawEntity (entity,view,ownerID) {
    
    drawPlayerBody(entity,view,ownerID);

  }


  function drawPlayerBody (entity,view,ownerID) {
    if (entity.owner == ownerID) {
        drawOwnPlayerBody(entity);
    } else {
      drawOtherPlayerBody(entity,view);
    }

  }

  function drawOwnPlayerBody (entity) {
    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/2, entity.radius, 0, Math.PI*2)
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }

  function drawOtherPlayerBody (entity,view) {
    ctx.beginPath();
    ctx.arc(canvas.width/2-view.x+entity.x, canvas.height/2-view.y+entity.y, entity.radius, 0, Math.PI*2)
    ctx.fillStyle = "#dd0000";
    ctx.fill();
    ctx.closePath();
  }



  function drawGrid (view, gridSize) {
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

  function drawText(entityArray) {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText(`x: ${entityArray[0].x}`, 8, 20);
    ctx.fillText(`y: ${entityArray[0].y}`, 8, 40);
    ctx.fillText(`velocity x: ${entityArray[0].velocity.x}`, 8, 60);
    ctx.fillText(`velocity y: ${entityArray[0].velocity.y}`, 8, 80);
  }
  return{draw}
}