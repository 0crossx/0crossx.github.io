// coolproject/js/login.page.js
import { cosmicLogin, googleSignIn } from './auth.js';
import { activateWarpDrive, createStellarNotification } from './cosmicEffects.js';

// 🌠 DOM Elements
const loginForm = document.getElementById('loginForm');
const googleBtn = document.getElementById('googleLogin');
const cosmicPortal = document.getElementById('cosmicPortal');

// 🌀 Initialize Wormhole Effect
function initWormhole() {
  cosmicPortal.innerHTML = '';
  const canvas = document.createElement('canvas');
  cosmicPortal.appendChild(canvas);
  
  canvas.width = 300;
  canvas.height = 300;
  const ctx = canvas.getContext('2d');
  
  let frame = 0;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  
  function renderWormhole() {
    frame += 0.5;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Create spiral galaxy effect
    for (let i = 0; i < 150; i++) {
      const angle = frame * 0.05 + i * 0.1;
      const radius = 5 + (i / 2);
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      const size = 1 + Math.sin(frame * 0.1 + i) * 0.5;
      
      ctx.fillStyle = `hsl(${200 + i % 60}, 80%, 60%)`;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
    
    requestAnimationFrame(renderWormhole);
  }
  
  renderWormhole();
}

// 🚀 Form Submission Handler
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const submitBtn = loginForm.querySelector('button');
  
  // Activate warp drive effect
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<div class="cosmic-spinner"></div>ENTERING WORMHOLE';
  
  try {
    // 1. Start portal animation
    cosmicPortal.style.display = 'block';
    activateWarpDrive(cosmicPortal);
    
    // 2. Authenticate
    await cosmicLogin(email, password);
    
    // 3. Success sequence
    createStellarNotification('Warp signature confirmed!', 'success');
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // 4. Hyperdrive transition
    document.body.style.animation = 'hyperdrive 2s forwards';
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    window.location.href = 'dashboard.html';
    
  } catch (error) {
    // Handle cosmic disturbances
    submitBtn.disabled = false;
    submitBtn.textContent = 'ACCESS PORTAL';
    cosmicPortal.style.display = 'none';
    
    createStellarNotification(error.message, 'error');
    
    // Add gravitational wave effect
    loginForm.style.animation = 'gravitationalWave 0.8s';
    setTimeout(() => loginForm.style.animation = '', 800);
  }
});

// 🔵 Google Login Handler
googleBtn.addEventListener('click', async () => {
  googleBtn.innerHTML = '<div class="cosmic-spinner"></div>CONNECTING TO GOOGLE QUANTUM NETWORK';
  
  try {
    cosmicPortal.style.display = 'block';
    await googleSignIn();
    
    createStellarNotification('Quantum entanglement successful!', 'success');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    document.body.style.animation = 'hyperdrive 1.5s forwards';
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    window.location.href = 'dashboard.html';
    
  } catch (error) {
    googleBtn.innerHTML = '<i class="fab fa-google"></i> Continue with Google';
    cosmicPortal.style.display = 'none';
    createStellarNotification(error.message, 'error');
  }
});

// 🌌 Initialize Cosmic Effects
window.addEventListener('load', () => {
  initWormhole();
  
  // Input field quantum fluctuations
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.style.setProperty('--pulse-color', '#00e5ff');
      input.parentElement.style.animation = 'quantumPulse 2s infinite';
    });
    
    input.addEventListener('blur', () => {
      input.parentElement.style.animation = 'none';
    });
  });
});