
addEventListener('keydown', function (e) {
    if (e.code == 'KeyA') player.velocityX = -5;
    if (e.code == 'KeyW') player.velocityY = -5;
    if (e.code == 'KeyD') player.velocityX = 5;
    if (e.code == 'KeyS') player.velocityY = 5;

    if (e.code == 'ArrowLeft') player2.velocityX = -5;
    if (e.code == 'ArrowUp') player2.velocityY = -5;
    if (e.code == 'ArrowRight') player2.velocityX = 5;
    if (e.code == 'ArrowDown') player2.velocityY = 5;
});

addEventListener('keyup', function (e) {
    if (e.code == 'KeyA') player.velocityX = 0;
    if (e.code == 'KeyW') player.velocityY = 0;
    if (e.code == 'KeyD') player.velocityX = 0;
    if (e.code == 'KeyS') player.velocityY = 0;

    if (e.code == 'ArrowLeft') player2.velocityX = 0;
    if (e.code == 'ArrowUp') player2.velocityY = 0;
    if (e.code == 'ArrowRight') player2.velocityX = 0;
    if (e.code == 'ArrowDown') player2.velocityY = 0;
});