const canvas = document.getElementById("main_canvas");
const canvas_b = document.getElementById("background_canvas");
const cty = canvas.getContext("2d");
const ctx = canvas.getContext("2d"); //jakiego rodzaju plansze generujemy

let x_1 = 850;
let y_1 = 300;
let vxl_1 = 0;
let vxr_1 = 0;
let vx_1 = 0;
let vyu_1 = 0;
let vyd_1 = 0;
let vy_1 = 0;

let x_2 =800;
let y_2 = 300;
let vxl_2 = 0;
let vxr_2 = 0;
let vx_2 = 0;
let vyu_2 = 0;
let vyd_2 = 0;
let vy_2 = 0;

const cx = 850;
const cy = 300;


const tileW = 50;
const tileH = 50;

const canvasWidth = 1800;
const canvasHeight = 1080;

const cameraSpeed = 5;
const cameraMargin = 200;





const map_tx = new Image();
map_tx.src = "map.jpg"

const player1_tx = new Image();
player1_tx.src = "MILfin.png"

const player2_tx = new Image();
player2_tx.src = "stone.png"

let previousScaleFactor = 1;

let hasScaled = false;

function distanceFromCenter(distance1, distance2){
  let arr = [distance1, distance2];
  return Math.max(...arr);
}

function updateAnimation() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const distanceFromCenterP1 = Math.sqrt((x_1 - cx) ** 2 + (y_1 - cy) ** 2);
  const distanceFromCenterP2 = Math.sqrt((x_2 - cx) ** 2 + (y_2 - cy) ** 2);
  
  let distanceFromC = distanceFromCenter(distanceFromCenterP1, distanceFromCenterP2);

  // Draw the background map at the adjusted camera 
  const distanceBetweenPlayers = Math.sqrt((x_2 - x_1) ** 2 + (y_2 - y_1) ** 2);

  // Calculate the scale factor based on the distance (adjust the scaling factor as needed)
  if (!hasScaled && distanceFromC < 1800) {
    scaleFactor = 1 / (1 + distanceFromC * 0.0004);
  } else {
    // Set a flag to indicate that scaling has occurred
    hasScaled = true;
  }

  if(hasScaled == true && distanceFromC < 1800){
    scaleFactor = 1 / (1 + distanceFromC * 0.0004)
  }

  

  // Save the current transformation matrix
  
  ctx.save();
  // Translate to the center of the canvas
  ctx.translate(canvas.width / 2, canvas.height / 2);

  // Apply scaling factor
  
  ctx.scale(scaleFactor, scaleFactor);

  // Translate back to the original position
 
  ctx.translate(-canvas.width / 2, -canvas.height / 2);
  

  cty.drawImage(map_tx, -2000, -2000, 6000, 4000);

 

  if (y_1 != 700){
    y_1 += vyd_1;
  }

  if (y_1 != 0){
    y_1 += vyu_1;
  }

  if (y_2 != 700) {
    y_2 += vyd_2;
  }

  if (y_2 != 0){
    y_2 += vyu_2;
  }

  if (x_1 != canvas.width + 300) {
    x_1 += vxr_1;
  }
  if (x_1 != -300) {
    x_1 += vxl_1;
  }

  if (x_2 != canvas.width + 300) {
    x_2 += vxr_2;
  }
  if (x_2 != -300) {
    x_2 += vxl_2;
  }

  // Draw players at their adjusted positions based on the camera
  ctx.drawImage(player2_tx, x_2, y_2, 50, 50);
  ctx.drawImage(player1_tx, x_1, y_1, 50, 50);

  // Restore the previous transformation matrix
  ctx.restore();

  // Update the camera position
  previousScaleFactor = scaleFactor;

  requestAnimationFrame(updateAnimation);
}

updateAnimation();