const canvas = document.getElementById("main_canvas");
const ctx = canvas.getContext("2d"); 


const tileW = 50;
const tileH = 50;

const gridCols = 9;
const gridRows = 6;
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
                ctx.fillStyle = "rgba(153, 153, 102)"
                ctx.fillRect(tileW*eachCol, tileH * eachRow, TileW, TileH)

            }else if(map[arrayIndex] === "."){
                ctx.fillStyle = "yellow"
                ctx.fillRect(tileW * eachCol, tileH * eachRow, TileW, TileH)
            }else{
                ctx.fillStyle = "red"
                ctx.fillRect(tileW * eachCol, tileH * eachRow, TileW, TileH)
            }
        }
    }
}