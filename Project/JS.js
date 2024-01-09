class Wall {
  constructor(row, column, type) {
    this.row = row;
    this.column = column;
    this.type = type; // You might want to store the type of the wall for further customization
  }
}

const canvas = document.getElementById("main_canvas");
const canvas_b = document.getElementById("background_canvas");
const winScreen = document.querySelector('dialog');
const closeBtn = document.querySelector('dialog button');
const cty = canvas.getContext("2d");
const ctx = canvas.getContext("2d");

let x_1 = -430;
let y_1 = -160;
let vxl_1 = 0;
let vxr_1 = 0;
let vx_1 = 0;
let vyu_1 = 0;
let vyd_1 = 0;
let vy_1 = 0;

let x_2 = -430;
let y_2 = -160;
let vxl_2 = 0;
let vxr_2 = 0;
let vx_2 = 0;
let vyu_2 = 0;
let vyd_2 = 0;
let vy_2 = 0;

const cx = 850;
const cy = 300;

const tileW = 75;
const tileH = 75;

const canvasWidth = 1800;
const canvasHeight = 1080;

let scaleFactor = 1;


const walls = [];

const wood_tx = new Image();
wood_tx.src = "wood.png";

const stars_tx = new Image();
stars_tx.src = "stars.png";

const stone_tx = new Image();
stone_tx.src = "stone.png";

function readMapFromFile(fileInput) {
  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const content = e.target.result;
      const rows = content.split('\n');

      walls.length = 0;

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i].trim().split('');
        for (let j = 0; j < row.length; j++) {
            walls.push(new Wall(i, j, row[j]));
        }
      }
      generateOffset(-7, -3, walls);
    };

    reader.readAsText(file);
  } else {
    console.error('No file selected');
  }
}

function generateOffset(xOf, yOf, array){
  for (const wall of array){
    wall.column = wall.column + xOf;
    wall.row = wall.row + yOf;
  }
}

function drawMap(array) {
  // Draw walls based on Wall objects
    for (const wall of array) {
      if(wall.type === '/'){
        cty.drawImage(stone_tx, wall.column * tileW , wall.row * tileH , tileW, tileH);
      }
      if(wall.type === '*'){
        cty.drawImage(stars_tx, wall.column * tileW , wall.row * tileH , tileW, tileH);
      }
      if(wall.type ==='.'){
        cty.drawImage(wood_tx, wall.column * tileW , wall.row * tileH , tileW, tileH);
      }
    }
}

const map_tx = new Image();
map_tx.src = "map.jpg";

const player1_tx = new Image();
player1_tx.src = "MILfin.png";

const player2_tx = new Image();
player2_tx.src = "stone.png";

let previousScaleFactor = 1;
let hasScaled = false;

function distanceFromCenter(distance1, distance2) {
  let arr = [distance1, distance2];
  return Math.max(...arr);
}

function checkWallCollisions(playerX, playerY, playerWidth, playerHeight) {
  for (const wall of walls) {
    const wallX = wall.column * tileW;
    const wallY = wall.row * tileH;

    if (
      playerX < wallX + tileW &&
      playerX + playerWidth > wallX &&
      playerY < wallY + tileH &&
      playerY + playerHeight > wallY && wall.type === '/'
    ) {
      return true; // Collision detected
    }
  }

  return false; // No collision
}

closeBtn.addEventListener('click', ()=>{
  location.reload();
  dialog.close();
})

function checkIfFinished(playerX, playerY){
  for(const wall of walls){
    if (playerX == wall.column * tileW && playerY == wall.row * tileH && wall.type == '*') {

        winScreen.showModal();
    }
}
}

function drawPointer(playerX, playerY){
  centerX = playerX + tileW / 2;
  centerY = playerY + tileH / 2;
  
  const pointerRadius = 10;
  const pointerColor = 'yellow';

  for (const wall of walls) {
    if (wall.type === '*') {
      const wallX = wall.column * tileW + tileW / 2;
      const wallY = wall.row * tileH + tileH / 2;

      // Calculate angle to the target wall
      const angle = Math.atan2(wallY - centerY, wallX - centerX);

      // Calculate position for the pointer (circle) based on the angle
      const pointerX = centerX + Math.cos(angle) * (pointerRadius + 60);
      const pointerY = centerY + Math.sin(angle) * (pointerRadius + 60);

      // Draw the pointer (circle)
      ctx.beginPath();
      ctx.arc(pointerX, pointerY, pointerRadius, 0, 2 * Math.PI);
      ctx.fillStyle = pointerColor;
      ctx.fill();
    }
  }
}

function updateAnimation() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  

  const distanceFromCenterP1 = Math.sqrt((x_1 - cx) ** 2 + (y_1 - cy) ** 2);
  const distanceFromCenterP2 = Math.sqrt((x_2 - cx) ** 2 + (y_2 - cy) ** 2);

  let distanceFromC = distanceFromCenter(distanceFromCenterP1, distanceFromCenterP2);

  if (!hasScaled && distanceFromC < 1800) {
    scaleFactor = 1 / (1 + distanceFromC * 0.0005);
  } else {
    hasScaled = true;
  }

  if (hasScaled == true && distanceFromC < 1800) {
    scaleFactor = 1 / (1 + distanceFromC * 0.0004);
  }

  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.scale(scaleFactor, scaleFactor);
  ctx.translate(-canvas.width / 2, -canvas.height / 2);

  cty.rect(-2000, -2000, 6000, 4000);
  cty.fillStyle = `rgb(238,119,75)`;
  cty.fill();

  drawMap(walls);
  drawPointer(x_1, y_1);
  drawPointer(x_2, y_2);

  if (vxr_1 > 0 && !checkWallCollisions(x_1 + vxr_1, y_1, 50, 50)) {
    x_1 += vxr_1;
  }
  if (vxl_1 < 0 && !checkWallCollisions(x_1 + vxl_1, y_1, 50, 50)) {
    x_1 += vxl_1;
  }
  if (vyu_1 < 0 && !checkWallCollisions(x_1, y_1 + vyu_1, 50, 50)) {
    y_1 += vyu_1;
  }
  if (vyd_1 > 0 && !checkWallCollisions(x_1, y_1 + vyd_1, 50, 50)) {
    y_1 += vyd_1;
  }

  if (vxr_2 > 0 && !checkWallCollisions(x_2 + vxr_2, y_2, 50, 50)) {
    x_2 += vxr_2;
  }
  if (vxl_2 < 0 && !checkWallCollisions(x_2 + vxl_2, y_2, 50, 50)) {
    x_2 += vxl_2;
  }
  if (vyu_2 < 0 && !checkWallCollisions(x_2, y_2 + vyu_2, 50, 50)) {
    y_2 += vyu_2;
  }
  if (vyd_2 > 0 && !checkWallCollisions(x_2, y_2 + vyd_2, 50, 50)) {
    y_2 += vyd_2;
  }

  checkIfFinished(x_1, y_1);
  checkIfFinished(x_2, y_1);

  ctx.drawImage(player2_tx, x_2, y_2, 50, 50);
  ctx.drawImage(player1_tx, x_1, y_1, 50, 50);

  ctx.restore();
  previousScaleFactor = scaleFactor;

  requestAnimationFrame(updateAnimation);
}

updateAnimation();
