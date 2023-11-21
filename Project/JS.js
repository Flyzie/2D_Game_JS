const canvas = document.getElementById("main_canvas");
const canvas_b = document.getElementById("background_canvas");
const cty = canvas.getContext("2d");
const ctx = canvas.getContext("2d"); //jakiego rodzaju plansze generujemy

let x = 0;
let y = 0;
let vxl = 0;
let vxr = 0;
let vx = 0;
let vy = 0;


const tileW = 50;
const tileH = 50;

const canvasWidth = 2040;
const canvasHeight = 1080;

const cameraSpeed = 5;
const cameraMargin = 200;


const map = [
    ["|","|","|","|","|","|","|","|","|"],
    ["|","|","|","|","|","|","|","|","|"],
    [".",".",".",".",".",".",".",".","."],
    [".",".",".",".",".",".",".",".","."],
    ["/","/","/","/","/","/","/","/","/"],
    ["/","/","/","/","/","/","/","/","/"]
]

const wood_tx = new Image();
wood_tx.src = "wood.png";

const stars_tx = new Image();
stars_tx.src = "stars.png";

const stone_tx = new Image();
stone_tx.src = "stone.png";

const player_tx = new Image();
player_tx.src = "MILfin.png"


function readMapFromFile(fileInput) {
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const content = e.target.result;
            const rows = content.split('\n');
            const newArray = [];

            for (let i = 0; i < rows.length; i++) {
                newArray.push(rows[i].trim().split(''));
            }

            // Update the map array
            map.length = 0;
            map.push(...newArray);
        };

        reader.readAsText(file);
    } else {
        console.error('No file selected');
    }
}


function cameraControll(){

    // Move the camera when player approaches the edge of the canvas
    if (x < cameraMargin || x > canvasWidth - cameraMargin || y < cameraMargin || y > canvasHeight - cameraMargin) {
    const camX = Math.max(0, Math.min(x - canvas.width / 2, canvas.width * map[0].length - canvas.width));
    const camY = Math.max(0, Math.min(y - canvas.height / 2, canvas.height * map.length - canvas.height));

    cty.setTransform(1, 0, 0, 1, -camX, -camY);
    }
}


function drawMap(array){
    let colPos = 0;
    for (let i = 0; i < array.length; i++){
       // let arrayElement = array[i];
        let rowPos = 0;
        for(let j =0; j < array[i].length; j++){
            if (array[i][j] === "|"){
                cty.drawImage(stars_tx, rowPos, colPos, tileW, tileH)
            }else if (array[i][j] === "."){
                cty.drawImage(wood_tx, rowPos, colPos, tileW, tileH)

            }else if (array[i][j] === "/"){
                cty.drawImage(stone_tx, rowPos, colPos, tileW, tileH)
            }
            rowPos += 50;
        }
        rowPos = 0;
        colPos += 50;
    }

}

function updateAnimation(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    x += vxl;
    x += vxr;
    y += vy;
    
    cameraControll();
    drawMap(map);
    ctx.drawImage(player_tx, x, y, 50, 50);
    
    requestAnimationFrame(updateAnimation);
}


updateAnimation();