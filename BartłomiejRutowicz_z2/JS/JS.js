const canvas = document.getElementById("main_canvas");
const ctx = canvas.getContext("2d"); //jakiego rodzaju plansze generujemy

let x = 0;
let y = 0;
let vxl = 0;
let vxr = 0;
let vx = 0;
let vy = 0;

let xo = 0;
let yo = 0;




function updateAnimation(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    x += vxl;
    x += vxr;
    y += vy;
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