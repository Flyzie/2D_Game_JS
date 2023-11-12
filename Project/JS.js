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

const tileW = 50;
const tileH = 50;

const gridCols = 9;
const gridRows = 9;
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
    
    
    drawMap(map);
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