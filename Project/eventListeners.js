addEventListener("keydown", function(event){
    console.log(event.code);
})

addEventListener("keydown", function(event){
    if(event.code == "KeyD") 
        vxr_1 = 10;
        else if(event.code == "ArrowRight")
        vxr_2 = 10;
})

addEventListener("keyup", function(event){
    if(event.code == "KeyD") 
        vxr_1 = 0;
        else if(event.code == "ArrowRight")
        vxr_2 = 0;
})

addEventListener("keydown", function(event){
    if(event.code == "KeyW") 
        vy_1 = -10;
    else if(event.code == "ArrowUp")
        vy_2 = -10;
})

addEventListener("keyup", function(event){
    if(event.code == "KeyW") 
        vy_1 = 0;
    else if(event.code == "ArrowUp")
        vy_2 = 0;
})

addEventListener("keydown", function(event){
    if(event.code == "KeyA") 
        vxl_1 = -10;
    else if(event.code == "ArrowLeft")
        vxl_2 = -10;
})

addEventListener("keyup", function(event){
    if(event.code == "KeyA") 
        vxl_1 = 0;
    else if(event.code == "ArrowLeft")
        vxl_2 = 0;
})

addEventListener("keydown", function(event){
    if(event.code == "KeyS") 
        vy_1 = 10;
    else if(event.code == "ArrowDown")
        vy_2 = 10;
})

addEventListener("keyup", function(event){
    if(event.code == "KeyS") 
        vy_1 = 0;
    else if(event.code == "ArrowDown")
        vy_2 = 0;
})