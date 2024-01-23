const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;

let gameSpeed = 5;

let keys = {};

class Player{
    constructor(sprite, speed) {
        this.x = CANVAS_WIDTH / 2;
        this.y = 500;
        this.width = 100;
        this.height = 100;
        this.speed = speed * gameSpeed;
        this.sprite = sprite;
        this.isRotated = false;
    }
    update() {
        gameSpeed = 0;
        if (keys['KeyA']) {
            this.x -= this.speed;
            this.isRotated = true;
            gameSpeed = -slider.value;
        }
        if (keys['KeyD']) {
            this.x += this.speed;
            this.isRotated = false;
            gameSpeed = slider.value;
        }
        if (this.x < -this.width) {
            this.x = CANVAS_WIDTH;
        }
        if (this.x > CANVAS_WIDTH) {
            this.x = -this.width;
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

class Layer {
    constructor(image, speedModifier) {
        this.x = 0;
        this.y = 0;
        this.width = 2400;
        this.height = 700;
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
const backgroundLayer5 = new Image();
backgroundLayer5.src = './parallax/layer1.png';

const layer1 = new Layer(backgroundLayer1, 0.2);
const layer2 = new Layer(backgroundLayer2, 0.4);
const layer3 = new Layer(backgroundLayer3, 0.6);
const layer4 = new Layer(backgroundLayer4, 0.8);
const layer5 = new Layer(backgroundLayer5, 1); 

const playerSprite = new Image();
playerSprite.src = './img/grib1.png';

const player = new Player(playerSprite, 2);

const slider = document.getElementById('slider');
slider.value = gameSpeed;
const output = document.querySelector('p');
output.textContent = `Speed: ${gameSpeed}`;

slider.addEventListener('change', ()=> {
    gameSpeed = slider.value;
    output.textContent = `Speed: ${gameSpeed}`;
});

const gameObjects = [layer1, layer2, layer3, layer4, layer5];

let x = 0;
let x2 = 2400;

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  gameObjects.forEach(object => {
    object.update();
    object.draw();
  });

  player.update();
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
