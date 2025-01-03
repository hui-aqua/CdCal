const canvas = document.getElementById('clothCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gravity = 0.1;
const friction = 0.99;
const clothWidth = 50;
const clothHeight = 30;
const spacing = 10;

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.oldX = x;
        this.oldY = y;
        this.pinned = false;
    }

    update() {
        if (this.pinned) return;
        let vx = (this.x - this.oldX) * friction;
        let vy = (this.y - this.oldY) * friction;

        this.oldX = this.x;
        this.oldY = this.y;
        this.x += vx;
        this.y += vy + gravity;

        if (this.x > canvas.width) {
            this.x = canvas.width;
            this.oldX = this.x + vx * friction;
        } else if (this.x < 0) {
            this.x = 0;
            this.oldX = this.x + vx * friction;
        }

        if (this.y > canvas.height) {
            this.y = canvas.height;
            this.oldY = this.y + vy * friction;
        } else if (this.y < 0) {
            this.y = 0;
            this.oldY = this.y + vy * friction;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fill();
    }
}

class Constraint {
    constructor(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
        this.length = spacing;
    }

    update() {
        let dx = this.p1.x - this.p2.x;
        let dy = this.p1.y - this.p2.y;
        let distance = Math.sqrt(dx * dy + dy * dy);
        let difference = this.length - distance;
        let percent = difference / distance / 2;
        let offsetX = dx * percent;
        let offsetY = dy * percent;

        if (!this.p1.pinned) {
            this.p1.x += offsetX;
            this.p1.y += offsetY;
        }
        if (!this.p2.pinned) {
            this.p2.x -= offsetX;
            this.p2.y -= offsetY;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.moveTo(this.p1.x, this.p1.y);
        ctx.lineTo(this.p2.x, this.p2.y);
        ctx.stroke();
    }
}

const points = [];
const constraints = [];

for (let y = 0; y <= clothHeight; y++) {
    for (let x = 0; x <= clothWidth; x++) {
        let point = new Point(x * spacing, y * spacing);
        if (y === 0) point.pinned = true;
        points.push(point);

        if (x !== 0) constraints.push(new Constraint(points[points.length - 1], points[points.length - 2]));
        if (y !== 0) constraints.push(new Constraint(points[points.length - 1], points[x + (y - 1) * (clothWidth + 1)]));
    }
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < 5; i++) {
        constraints.forEach(constraint => constraint.update());
    }
    points.forEach(point => point.update());
    constraints.forEach(constraint => constraint.draw());
    points.forEach(point => point.draw());
    requestAnimationFrame(update);
}

update();