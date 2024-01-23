const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 823;
const CANVAS_HEIGHT = canvas.height = 800;

const Ground = document.getElementById('Ground');
const HugeTree = document.getElementById('TheTreeBehind1');
const Grass = document.getElementById('Grass');
const TheTreeBehind2 = document.getElementById('TheTreeBehind1');
const TheTreeBehind1 = document.getElementById('TheTreeBehind2');
const Character = document.getElementById('Character'); // Add the ID of your character GIF

class Layer {
    constructor(image, movSpeed, y_Position) {
        this.x = 0;
        this.y = y_Position;
        this.width = 823;
        this.height = 800;
        this.x2 = this.width;
        this.image = image;
        this.movSpeed = movSpeed;
        this.direction = 0; // 0 for no movement, 1 for right, -1 for left
        
    }
    draw() {
        ctx.drawImage(this.image, this.x, this.y);
        ctx.drawImage(this.image, this.x2, this.y);
    }

    update() {
        if (this.direction === 1) {
            if (this.x < -823) {
                this.x = 823 - this.movSpeed + this.x2;
            } else {
                this.x -= this.movSpeed;
            }
            if (this.x2 < -823) {
                this.x2 = 823 - this.movSpeed + this.x;
            } else {
                this.x2 -= this.movSpeed;
            }
        } else if (this.direction === -1) {
            if (this.x > 823) {
                this.x = -823 + this.x2 + this.movSpeed;
            } else {
                this.x += this.movSpeed;
            }
            if (this.x2 > 823) {
                this.x2 = -823 + this.x + this.movSpeed;
            } else {
                this.x2 += this.movSpeed;
            }
        }
    }
}

class CharacterLayer extends Layer {
    constructor(image, movSpeed, y_Position) {
        super(image, movSpeed, y_Position);
        this.isMirrored = false; // Dodaj nową właściwość do śledzenia, czy postać jest odbita
    }

    draw() {
        // Odwracanie postaci w lewo, jeśli jest odbita
        if (this.isMirrored) {
            ctx.save();
            ctx.scale(-1, 1);
            ctx.drawImage(this.image, -this.x - this.width, this.y);
            ctx.drawImage(this.image, -this.x2 - this.width, this.y);
            ctx.restore();
        } else {
            // Rysowanie normalne, jeśli nie jest odbita
            ctx.drawImage(this.image, this.x, this.y);
            ctx.drawImage(this.image, this.x2, this.y);
        }
    }
    update = function() {
        if (this.direction === 1) {
            if (this.x > 823) {
                this.x = -823 + this.x2 + this.movSpeed;
            } else {
                this.x += this.movSpeed;
            }
            if (this.x2 > 823) {
                this.x2 = -823 + this.x + this.movSpeed;
            } else {
                this.x2 += this.movSpeed;
            }
        } else if (this.direction === -1) {
            if (this.x < -823) {
                this.x = 823 - this.movSpeed + this.x2;
            } else {
                this.x -= this.movSpeed;
            }
            if (this.x2 < -823) {
                this.x2 = 823 - this.movSpeed + this.x;
            } else {
                this.x2 -= this.movSpeed;
            }
        }
    };
}

const TheTreeLayer1 = new Layer(TheTreeBehind1, 0.1, 110);
const TheTreeLayer2 = new Layer(TheTreeBehind2, 0.3, 120);
const HugeTreeLayer = new Layer(HugeTree, 0.5, 110);
const GrassLayer = new Layer(Grass, 0.7, 260);
const GroundLayer = new Layer(Ground, 1, 260);
const CharacterObj = new CharacterLayer(Character, 0.7, 180);

const gameObjects = [TheTreeLayer1, TheTreeLayer2, HugeTreeLayer, GrassLayer, GroundLayer,CharacterObj];

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    gameObjects.forEach(object => {
        object.update();
        object.draw();
    });

    requestAnimationFrame(animate);
}

document.addEventListener('keydown', function (event) {
    if (event.key === 'd' || event.key === 'D') {
        gameObjects.forEach(object => {
            object.direction = 1;
        });
    } else if (event.key === 'a' || event.key === 'A') {
        gameObjects.forEach(object => {
            object.direction = -1;
        });
    }
});

document.addEventListener('keyup', function (event) {
    if (event.key === 'd' || event.key === 'D' || event.key === 'a' || event.key === 'A') {
        gameObjects.forEach(object => {
            object.direction = 0;
        });
    }
});

animate();
