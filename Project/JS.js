const canvas = document.getElementById("main_canvas");
const canvas_b = document.getElementById("background_canvas");
const cty = canvas.getContext("2d");
const ctx = canvas.getContext("2d"); //jakiego rodzaju plansze generujemy

let x_1 = 0;
let y_1 = 0;
let vxl_1 = 0;
let vxr_1 = 0;
let vx_1 = 0;
let vy_1 = 0;

let x_2 = 0;
let y_2 = 0;
let vxl_2 = 0;
let vxr_2 = 0;
let vx_2 = 0;
let vy_2 = 0;


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

function updateAnimation() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the background map at the adjusted camera 
  
  const distanceBetweenPlayers = Math.sqrt((x_2 - x_1) ** 2 + (y_2 - y_1) ** 2);

  // Calculate the scale factor based on the distance (adjust the scaling factor as needed)
  const scaleFactor = 1 / (1 + distanceBetweenPlayers * 0.0011);


  if(distanceBetweenPlayers < 2000){
  ctx.scale(scaleFactor / previousScaleFactor, scaleFactor / previousScaleFactor);
  }

  cty.drawImage(map_tx, 0, 0, 6000, 4000);

  
 // x_1 += vxr_1;
  y_1 += vy_1;

  
  x_2 += vxr_2;
  y_2 += vy_2;

  if (x_1 != 5700){
    x_1 += vxr_1;
  } 
  if(x_1 != 0){
    x_1 += vxl_1;
  }

  if (x_2 != 5700){
    x_2 += vxr_2;
  }
  if(x_2 !=0){
    x_2 += vxl_2;
  }



  // Draw players at their adjusted positions based on the camera
  ctx.drawImage(player2_tx, x_2, y_2, 50, 50);
  ctx.drawImage(player1_tx, x_1, y_1, 50, 50);

  // Update the camera position
  previousScaleFactor = scaleFactor;

  requestAnimationFrame(updateAnimation);
}


updateAnimation();