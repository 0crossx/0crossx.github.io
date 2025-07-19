// coolproject/js/signup.js
import { cosmicSignUp, googleSignIn } from './auth.js';
import { showStellarNotification } from './cosmicHelpers.js';

// 🌠 DOM Elements
const signupForm = document.getElementById('signupForm');
const googleBtn = document.getElementById('googleSignup');
const cosmicCanvas = document.createElement('canvas');
document.body.appendChild(cosmicCanvas);

// 🪐 Canvas Setup for Cosmic Background
cosmicCanvas.style.position = 'fixed';
cosmicCanvas.style.top = '0';
cosmicCanvas.style.left = '0';
cosmicCanvas.style.width = '100vw';
cosmicCanvas.style.height = '100vh';
cosmicCanvas.style.zIndex = '-1';
cosmicCanvas.style.opacity = '0.7';

const ctx = cosmicCanvas.getContext('2d');
let particles = [];

// 🌌 Initialize Cosmic Particle Field
function initCosmicField() {
  cosmicCanvas.width = window.innerWidth;
  cosmicCanvas.height = window.innerHeight;
  
  particles = Array.from({ length: 150 }, () => ({
    x: Math.random() * cosmicCanvas.width,
    y: Math.random() * cosmicCanvas.height,
    size: Math.random() * 3 + 1,
    speedX: Math.random() * 2 - 1,
    speedY: Math.random() * 2 - 1,
    color: `hsl(${Math.random() * 60 + 200}, 80%, 60%)`
  }));
}

// ✨ Animate Cosmic Particles
function animateCosmicField() {
  ctx.clearRect(0, 0, cosmicCanvas.width, cosmicCanvas.height);
  
  particles.forEach(particle => {
    ctx.fillStyle = particle.color;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();
    
    // Movement with boundary checking
    particle.x += particle.speedX;
    particle.y += particle.speedY;
    
    if (particle.x < 0 || particle.x > cosmicCanvas.width) particle.speedX *= -1;
    if (particle.y < 0 || particle.y > cosmicCanvas.height) particle.speedY *= -1;
  });
  
  requestAnimationFrame(animateCosmicField);
}

// 🚀 Form Submission Handler
signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const submitBtn = signupForm.querySelector('button');
  
  // Create pulsating effect
  submitBtn.innerHTML = '<div class="cosmic-loader"></div>';
  submitBtn.style.background = 'linear-gradient(135deg, #7c4dff, #00e5ff)';
  
  try {
    // 1. Create cosmic account
    await cosmicSignUp(email, password, username);
    
    // 2. Show success animation
    showStellarNotification('success', 'Portal activated! Warping to dashboard...');
    
    // 3. Redirect with cosmic transition
    setTimeout(() => {
      document.body.style.background = 'radial-gradient(circle, #7c4dff, #0a0a16)';
      window.location.href = 'dashboard.html';
    }, 2000);
    
  } catch (error) {
    submitBtn.textContent = 'ACTIVATE PORTAL';
    submitBtn.style.background = 'linear-gradient(135deg, #b388ff, #7c4dff)';
    
    // Show animated error
    showStellarNotification('error', error.message);
    
    // Add cosmic shake effect
    signupForm.style.animation = 'cosmicShake 0.5s';
    setTimeout(() => signupForm.style.animation = '', 500);
  }
});

// 🔵 Google Signup Handler
googleBtn.addEventListener('click', async () => {
  googleBtn.innerHTML = '<div class="cosmic-loader"></div>';
  
  try {
    await googleSignIn();
    showStellarNotification('success', 'Google warp drive engaged!');
    setTimeout(() => window.location.href = 'dashboard.html', 1500);
  } catch (error) {
    googleBtn.innerHTML = '<i class="fab fa-google"></i> Continue with Google';
    showStellarNotification('error', error.message);
  }
});

// 🌓 Initialize Cosmic Effects
window.addEventListener('load', () => {
  initCosmicField();
  animateCosmicField();
  
  // Add input field cosmic glow
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('focus', () => {
      input.style.boxShadow = '0 0 15px rgba(0, 229, 255, 0.5)';
    });
    
    input.addEventListener('blur', () => {
      input.style.boxShadow = '0 0 5px rgba(179, 136, 255, 0.3)';
    });
  });
});

// 📡 Dynamic Background Resize
window.addEventListener('resize', () => {
  cosmicCanvas.width = window.innerWidth;
  cosmicCanvas.height = window.innerHeight;
});