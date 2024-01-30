

document.addEventListener('keydown', function(event) {
    if(event.code === 'KeyD') {
        vx = gameSpeed;
        vx = 0;
    } else if(event.code === 'KeyA') {
        vx = -gameSpeed;
        vx = 0;
    }
});

document.addEventListener('keyup', function(event) {
    if(event.code === 'KeyD') {
        vx = 0;
    } else if(event.code === 'KeyA') {
        vx = 0;
    }
});
/*
addEventListener("keydown", function(event){
    if(event.code == "Space") 
        gravity = -10;
})

addEventListener("keyup", function(event){
    if(event.code == "Space") 
        gravity = 10;
})
*/