const canvas = document.getElementById("galazy");
const ctx = canvas.getContext("2d");

// Screen Sizing (bug I cant fix)
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const stars = [];
const maxStars = 150;

// Creation of Star
function createStar() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: 0,
    maxSize: 2 + Math.random() * 2,
    alpha: 0,
    life: 0,
    speed: 0.02 + Math.random() * 0.02,
    color: Math.random() < 0.5 
      ? `hsl(${Math.random() * 60 + 200}, 100%, 80%)`  
      : `hsl(50, 100%, 90%)`                            
  };
}

// Detail of Star
function drawStar(s) {
  ctx.save();
  ctx.translate(s.x, s.y); 
  ctx.globalAlpha = s.alpha;
  ctx.strokeStyle = s.color;
  ctx.shadowBlur = 8;
  ctx.shadowColor = s.color;
  ctx.lineWidth = 1.5;

  ctx.beginPath();
  ctx.moveTo(0, -s.size * 1.5); 
  ctx.lineTo(0, s.size * 1.5);
  ctx.moveTo(-s.size, 0);       
  ctx.lineTo(s.size, 0);
  ctx.stroke();

  ctx.restore();
}

// Star Animation
function updateStar(s) {
  s.life += s.speed;
  s.alpha = Math.sin(s.life * Math.PI);
  s.size = s.maxSize * s.alpha;
  if (s.life >= 1) Object.assign(s, createStar());
}

// Main Animation Loop
function animate() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.2)"; 
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (stars.length < maxStars) stars.push(createStar());
  stars.forEach(s => { updateStar(s); drawStar(s); });

  requestAnimationFrame(animate);
}

animate();


