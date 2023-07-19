import { observer, hidden } from "./scrollAnimation.js";
import { showProjectInfo, hideProjectInfo } from './hoverEffects.js';
import { toggleMenu } from './ham.js';


const nav = document.getElementById('Nav');
const sections = document.querySelectorAll('.hide');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const dots = [];



// Add event listeners for mouseenter and mouseleave events
const projectImage = document.querySelector('.project-image');
projectImage.addEventListener('mouseenter', showProjectInfo);
projectImage.addEventListener('mouseleave', hideProjectInfo);

// Flag to track mouse movement
let isMouseMoving = false;
let mouseX = 0;
let mouseY = 0;

// Mouse move event listener
document.addEventListener('mousemove', function(event) {
  isMouseMoving = true;
  mouseX = event.clientX;
  mouseY = event.clientY;
});

// Mouse stop event listener
document.addEventListener('mouseup', function() {
  isMouseMoving = false;
  resetDotsPosition();
});



//We set the width and height of the canvas to match the width and height of the web page, so it takes up the entire page.
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//Now, we define a 'Dot' class, which represents a dot on the canvas. Each dot has properties like position, speed, size, and color.
class Dot {
  constructor(x, y, speedX, speedY, radius, color) {
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;
    this.radius = radius;
    this.color = color;
    this.originalSpeedX = speedX; // Store the original speed for reference
    this.originalSpeedY = speedY; // Store the original speed for reference
    this.originalX = x; // Store the original x position for reference
    this.originalY = y; // Store the original y position for reference
  }

  // drawing on the canvas
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  // The 'update' method of the Dot class updates the dot's position based on its speed. If the dot reaches the edges of the canvas, its speed is reversed to make it bounce back.
  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.speedX = -this.speedX;
    }

    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.speedY = -this.speedY;
    }

    this.draw();
  }

  // Update dot speed based on mouse movement
  updateSpeed() {
    if (isMouseMoving) {
      const distanceX = mouseX - this.x;
      const distanceY = mouseY - this.y;
      const distanceSquared = distanceX * distanceX + distanceY * distanceY;
      const speedScale = 300; // Adjust the strength of repulsive force
        
      this.speedX = this.originalSpeedX + (distanceX / distanceSquared) * speedScale;
      this.speedY = this.originalSpeedY + (distanceY / distanceSquared) * speedScale;
    } else {
      this.speedX = this.originalSpeedX;
      this.speedY = this.originalSpeedY;
    }
  }

  // Reset dot position to original position
  resetPosition() {
    this.x = this.originalX;
    this.y = this.originalY;
  }
}

// Create the dots
function createDots() {
  for (let i = 0; i < 400; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const speedX = (Math.random() - 0.5) * 4;
    const speedY = (Math.random() - 0.5) * 4;
    const radius = Math.random() * 1 + 0.1;
    const color = 'white';
    dots.push(new Dot(x, y, speedX, speedY, radius, color));
  }
}

// Clear the canvas then update and draw each dot in the 'dots' array. This creates the animation effects as if the dots were moving around.
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < dots.length; i++) {
    dots[i].updateSpeed(); // Update dot speed based on mouse movement
    dots[i].update();
  }
}

// Reset all dots to their original positions
function resetDotsPosition() {
  for (let i = 0; i < dots.length; i++) {
    dots[i].resetPosition();
  }
}

createDots();
animate();

