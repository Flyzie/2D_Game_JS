const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 1920;
const CANVAS_HEIGHT = canvas.height = 1080;

let gameSpeed = 5;
let gravity = 1;

let keys = {};
let platforms = [];

let vx = 0;




class Player{
    constructor(sprite, speed) {
        this.x = CANVAS_WIDTH / 2;
        this.y = 725;
        this.width = 100;
        this.height = 100;
        this.speed = speed * gameSpeed;
        this.sprite = sprite;
        this.isRotated = false;

        this.vx = vx;
        this.vy = 0; // Velocity in Y direction
        this.gravity = gravity;
        this.canJump = false;

        this.horizontalJumpDistance = 2; // Adjust the value as needed
      
        this.maxJump = 15;
    }

    update(deltaTime) {
        gameSpeed = 0;
        if (keys['KeyA']) {
            this.x += this.vx;
            this.isRotated = true;
            gameSpeed = -slider.value;
        }
        if (keys['KeyD']) {
            this.x += this.vx;
            this.isRotated = false;
            gameSpeed = slider.value;
        }
        if (this.x < -this.width) {
            this.x = CANVAS_WIDTH;
        }
        if (this.x > CANVAS_WIDTH) {
            this.x = -this.width;
        }
    
        if (keys['Space'] && this.canJump ) {
            let newAcceleration = -2 * this.maxJump / (this.horizontalJumpDistance * this.horizontalJumpDistance);

            this.vy = -Math.sqrt(2 * Math.abs(newAcceleration) * this.maxJump);
            this.canJump = false;

            console.log("Max Jump Height: ", this.maxJump);
            console.log("Horizontal Jump Distance: ", this.horizontalJumpDistance);
            console.log("Calculated v_0: ", -this.vy); // v_0 is the upward velocity
            console.log("Calculated g: ", newAcceleration);
        }
            this.x += this.vx;
            this.y += this.vy;
            this.vy += deltaTime + 0.5 * this.gravity;
            
        if (checkPlatformCollisions(this.x, this.y, this.width, this.height)) {
            this.y -= this.vy;
            this.vy = 0;
            this.canJump = true;
        }
    }

    draw() {
        ctx.save();
        if (this.isRotated) {
            ctx.scale(-1, 1);
            ctx.drawImage(this.sprite, -this.x - this.width, this.y, this.width, this.height);
        } else {
            ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
        }
        ctx.restore();
    }
}

const platformImg = new Image();
platformImg.src = './img/sprite_ground.png';

class Platform{
    constructor(x, y, tileSize, img) {
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.img = img;
    }
    update() {
        this.x -= gameSpeed;
    }
    draw() {
        ctx.drawImage(this.img, this.x, this.y, this.tileSize, this.tileSize);
    }
}
for (let x = 0; x <= 4000; x += 100) {
    const platform = new Platform(x, 800, 100, platformImg);
    platforms.push(platform);
}

for (let x = 600; x <= 1400; x += 100) {
    const platform = new Platform(x, 500, 100, platformImg);
    platforms.push(platform);
}

for (let x = 1400; x <= 2400; x += 100) {
    const platform = new Platform(x, 300, 100, platformImg);
    platforms.push(platform);
}

const platform1 = new Platform(400, 600, 100, platformImg);
platforms.push(platform1);


function checkPlatformCollisions(playerX, playerY, playerWidth, playerHeight) {
        for (const platform of platforms) {
            const platformX = platform.x;
            const platformY = platform.y;
    
            if (
                playerX < platformX + platform.tileSize &&
                playerX + playerWidth > platformX &&
                playerY < platformY + platform.tileSize &&
                playerY + playerHeight > platformY
            ) {
                jump = true;
                return true; // Collision detected
            }
        }
    
        return false; // No collision
    }


class Layer {
        constructor(image, speedModifier) {
                this.x = 0;
                this.y = 0;
                this.width = 2400;
                this.height = 900;
                this.x2 = this.width;
                this.image = image;
                this.speedModifier = speedModifier;
                this.speed = gameSpeed * this.speedModifier;
    }
    update() {
        this.speed = gameSpeed * this.speedModifier;
        if (this.x <= -this.width){ 
            this.x = this.width;
        }
        if (this.x2 <= -this.width){ 
            this.x2 = this.width;
        }
        if (this.x > this.width) {
            this.x = -this.width + 2;
        }
        if (this.x2 > this.width) {
            this.x2 = -this.width + 2;
        }
        this.x = Math.floor(this.x - this.speed);
        this.x2 = Math.floor(this.x2 - this.speed);
    }
    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
    }
}




const backgroundLayer1 = new Image();
backgroundLayer1.src = './parallax/layer5.png';
const backgroundLayer2 = new Image();
backgroundLayer2.src = './parallax/layer4.png';
const backgroundLayer3 = new Image();
backgroundLayer3.src = './parallax/layer3.png';
const backgroundLayer4 = new Image();
backgroundLayer4.src = './parallax/layer2.png';
const layer1 = new Layer(backgroundLayer1, 0.2);
const layer2 = new Layer(backgroundLayer2, 0.4);
const layer3 = new Layer(backgroundLayer3, 0.6);
const layer4 = new Layer(backgroundLayer4, 0.8);

const playerSprite = new Image();
playerSprite.src = './img/grib1.png';

const player = new Player(playerSprite, 2);

const slider = document.getElementById('slider');
slider.value = gameSpeed;
const output = document.querySelector('.display1');
output.textContent = `Speed: ${gameSpeed}`;
const slider2 = document.getElementById('slider1');
slider2.value = player.maxJump;
const output2 = document.querySelector('.display2');
output2.textContent = `Max Jump Height: ${player.maxJump}`;
const slider3 = document.getElementById('slider2');
slider3.value = player.horizontalJumpDistance;
const output3 = document.querySelector('.display3');
output3.textContent = `Horizontal Jump Distance: ${player.horizontalJumpDistance}`;


slider.addEventListener('change', ()=> {
    gameSpeed = slider.value;
    output.textContent = `Speed: ${gameSpeed}`;
});

slider2.addEventListener('change', ()=> {
    player.maxJump = slider2.value;
    output2.textContent = `Max Jump Height: ${player.maxJump}`;
});

slider3.addEventListener('change', ()=> {
    player.horizontalJumpDistance = slider3.value;
    output3.textContent = `Horizontal Jump Distance: ${player.horizontalJumpDistance}`;
});



const gameObjects = [layer1, layer2, layer3, layer4];

let x = 0;
let x2 = 2400;

let lastTime = Date.now();


function animate() {
    let now = Date.now();
    let deltaTime = (now - lastTime) / 10000.0; // Convert to seconds
    lastTime = now;

  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  gameObjects.forEach(object => {
    object.update();
    object.draw();
  });

  platforms.forEach(platform => {
    platform.update();
    platform.draw();
  });

  player.update(deltaTime);
  player.draw();
  requestAnimationFrame(animate);
}

window.addEventListener('keydown', function(e) {
    keys[e.code] = true;
});

window.addEventListener('keyup', function(e) {
    keys[e.code] = false;
});

animate();
