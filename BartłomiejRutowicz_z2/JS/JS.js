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

let xo = 0;
let yo = 0;

const tileW = 200;
const tileH = 100;

const gridCols = 9;
const gridRows = 9;
const map = [
    "|","|","|","|","|","|","|","|","|",
    "|","|","|","|","|","|","|","|","|",
    ".",".",".",".",".",".",".",".",".",
    ".",".",".",".",".",".",".",".",".",
    "/","/","/","/","/","/","/","/","/",
    "/","/","/","/","/","/","/","/","/",
]

function drawMap(){
    for(let eachRow = 0; eachRow < gridRows; eachRow++){
        for(let eachCol = 0; eachCol < gridCols; eachCol++){
            let arrayIndex = eachRow * gridRows + eachCol;

            if(map[arrayIndex] === "|"){
                cty.fillStyle = "rgba(153, 153, 102)"
                cty.fillRect(tileW*eachCol, tileH * eachRow, tileW, tileH)

            }else if(map[arrayIndex] === "."){
                cty.fillStyle = "yellow"
                cty.fillRect(tileW * eachCol, tileH * eachRow, tileW, tileH)
            }else{
                cty.fillStyle = "red"
                cty.fillRect(tileW * eachCol, tileH * eachRow, tileW, tileH)
            }
        }
    }
}

function updateAnimation(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    x += vxl;
    x += vxr;
    y += vy;
    
    
    drawMap();
    ctx.fillStyle = "green";
    ctx.fillRect(x, y, 50, 50); // kwadrat o wymiarach 50x50px stworzony w punkcie 0,0

    ctx.fillStyle = "rgba(0, 0, 255, 0.5)"; //ostatnie to poziom przezroczystosci
    ctx.fill();
    ctx.beginPath();
    ctx.arc(xo, yo, 50, 0, 2 * Math.PI);
    ctx.stroke();
    
    requestAnimationFrame(updateAnimation);
}


updateAnimation();