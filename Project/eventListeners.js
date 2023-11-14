addEventListener("keydown", function(event){
    console.log(event.code);
})

addEventListener("keydown", function(event){
    if(event.code == "KeyD") 
        vxr = 10;
})

addEventListener("keyup", function(event){
    if(event.code == "KeyD") 
        vxr = 0;
})

addEventListener("keydown", function(event){
    if(event.code == "KeyW") 
        vy = -10;
})

addEventListener("keyup", function(event){
    if(event.code == "KeyW") 
        vy = 0;
})

addEventListener("keydown", function(event){
    if(event.code == "KeyA") 
        vxl = -10;
})

addEventListener("keyup", function(event){
    if(event.code == "KeyA") 
        vxl = 0;
})

addEventListener("keydown", function(event){
    if(event.code == "KeyS") 
        vy = 10;
})

addEventListener("keyup", function(event){
    if(event.code == "KeyS") 
        vy = 0;
})