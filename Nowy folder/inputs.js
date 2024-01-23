

addEventListener("keydown", function(event){
    if(event.code == "KeyD") 
        vxr_1 = 10;
})

addEventListener("keyup", function(event){
    if(event.code == "KeyD") 
        vxr_1 = 0;
    else if(event.code == "ArrowRight")
        vxr_2 = 0;
})

addEventListener("keydown", function(event){
    if(event.code == "KeyA") 
        vxl_1 = -10;
})

addEventListener("keyup", function(event){
    if(event.code == "KeyA") 
        vxl_1 = 0;
})
