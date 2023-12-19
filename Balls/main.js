const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const circles = [];
let separationEnabled = true;
let collisionResolutionEnabled = true;

function Circle(x, y, radius, dx, dy, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
}

function drawCircle(circle) {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
    ctx.fillStyle = circle.color;
    ctx.fill();
    ctx.closePath();
}

function checkCollision(circle1, circle2) {
    const distance = Math.sqrt(Math.pow(circle2.x - circle1.x, 2) + Math.pow(circle2.y - circle1.y, 2));
    return distance < circle1.radius + circle2.radius;
}

function resolveCollision(circle1, circle2) {
    //odleglosci miedzy kulkami
    const dx = circle2.x - circle1.x;
    const dy = circle2.y - circle1.y;
    //wektory normalne (dyktują w którą strone leci po odbiciu)
    const normalX = dx / Math.sqrt(dx ** 2 + dy ** 2);
    const normalY = dy / Math.sqrt(dx ** 2 + dy ** 2);

    //wzgledna predkosc w kierunku wektora normalnego
    const relativeVelocityX = circle2.dx - circle1.dx;
    const relativeVelocityY = circle2.dy - circle1.dy;

    const dotProduct = (relativeVelocityX * normalX) + (relativeVelocityY * normalY);
    //sprawdzenie czy okregi sie zblizaja
    if (dotProduct < 0) {
        //zmiana pędu
        const impulse = 2 * dotProduct / (1 / circle1.radius + 1 / circle2.radius);
        circle1.dx += impulse * normalX / circle1.radius;
        circle1.dy += impulse * normalY / circle1.radius;
        circle2.dx -= impulse * normalX / circle2.radius;
        circle2.dy -= impulse * normalY / circle2.radius;
    }
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < circles.length; i++) {
        const circle = circles[i];

        // Odbijanie od brzegów ekranu
        if (circle.x - circle.radius < 0 || circle.x + circle.radius > canvas.width) {
            circle.dx = -circle.dx;
        }

        if (circle.y - circle.radius < 0 || circle.y + circle.radius > canvas.height) {
            circle.dy = -circle.dy;
        }

        // Ruch okręgów
        circle.x += circle.dx;
        circle.y += circle.dy;

        // Detekcja kolizji
        for (let j = i + 1; j < circles.length; j++) {
            const otherCircle = circles[j];

            if (checkCollision(circle, otherCircle)) {
                if (collisionResolutionEnabled) {
                    resolveCollision(circle, otherCircle);
                }

                if (separationEnabled) {
                    //kierunek w ktorym odbywa sie separacja
                    const angle = Math.atan2(otherCircle.y - circle.y, otherCircle.x - circle.x);
                    //o ile okręgi nachodzą na siebie
                    const overlap = circle.radius + otherCircle.radius - Math.sqrt(Math.pow(otherCircle.x - circle.x, 2) + Math.pow(otherCircle.y - circle.y, 2));
                    //określają, o ile każdy z okręgów powinien się przesunąć w celu uniknięcia kolizji
                    const separationX = overlap * Math.cos(angle);
                    const separationY = overlap * Math.sin(angle);
                    
                    // okręgi oddzielają się nawzajem, eliminując nakładkę i unikając kolizji
                    circle.x -= separationX / 2;
                    circle.y -= separationY / 2;
                    otherCircle.x += separationX / 2;
                    otherCircle.y += separationY / 2;
                }
            }
        }

        // Rysowanie okręgów
        drawCircle(circle);
    }

    requestAnimationFrame(update);
}

function init() {
    for (let i = 0; i < 12; i++) {
        const radius = Math.random() * 30 + 20;
        const x = Math.random() * (canvas.width - 2 * radius) + radius;
        const y = Math.random() * (canvas.height - 2 * radius) + radius;
        const dx = (Math.random() - 0.5) * 4;
        const dy = (Math.random() - 0.5) * 4;
        const color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;

        circles.push(new Circle(x, y, radius, dx, dy, color));
    }

    update();
}

// Wyłączanie/włączanie separacji i odbijania
document.addEventListener('keydown', (event) => {
    switch(event.key){
        case 't':
            separationEnabled = !separationEnabled;
            break;
        case 'r':
            collisionResolutionEnabled = !collisionResolutionEnabled;
            break;
    }
});

init();