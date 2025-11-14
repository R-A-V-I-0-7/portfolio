// ===== Particle Canvas Animation =====
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 80;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }

    draw() {
        ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                ctx.strokeStyle = `rgba(99, 102, 241, ${0.15 * (1 - distance / 150)})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    connectParticles();
    requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ===== Typing Animation =====
const typingText = document.querySelector('.typing-text');
const phrases = [
    'scalable applications',
    'AI-driven solutions',
    'modern web experiences',
    'efficient backends',
    'beautiful interfaces'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(type, 1000);
});

// ===== Stats Counter Animation =====
const statNumbers = document.querySelectorAll('.stat-number');

const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
            statObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

statNumbers.forEach(stat => statObserver.observe(stat));

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (target === 95 ? '%' : '+');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (target === 95 ? '%' : '+');
        }
    }, 30);
}

// ===== Scroll Animations =====
const fadeElements = document.querySelectorAll('[data-aos]');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) translateX(0) rotateY(0) rotateX(0)';
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(el => {
    el.style.opacity = '0';
    const animType = el.getAttribute('data-aos');
    
    if (animType === 'fade-up') {
        el.style.transform = 'translateY(30px)';
    } else if (animType === 'fade-right') {
        el.style.transform = 'translateX(-30px)';
    } else if (animType === 'fade-left') {
        el.style.transform = 'translateX(30px)';
    } else if (animType === 'zoom-in') {
        el.style.transform = 'scale(0.9)';
    } else if (animType === 'flip-left') {
        el.style.transform = 'rotateY(-15deg)';
    }
    
    el.style.transition = 'all 0.8s ease';
    const delay = el.getAttribute('data-aos-delay');
    if (delay) {
        el.style.transitionDelay = delay + 'ms';
    }
    
    fadeObserver.observe(el);
});

// ===== Active Navigation Link =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== 3D Card Tilt Effect =====
// ========================================
// TERMINAL CARD ANIMATIONS
// ========================================

const cardFront = document.querySelector('.card-front');
const card3d = document.querySelector('.card-3d');

if (cardFront && card3d) {
    console.log('✅ Terminal card initialized');
    
    // 3D Tilt Effect on Mouse Move
    cardFront.addEventListener('mousemove', (e) => {
        const rect = cardFront.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate rotation (reduced values for subtle effect)
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card3d.style.transform = `
            perspective(1500px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg)
        `;
    });

    // Reset on Mouse Leave
    cardFront.addEventListener('mouseleave', () => {
        card3d.style.transform = 'perspective(1500px) rotateX(0) rotateY(0)';
    });

    // Interactive Dots with Ripple Effect
    const dots = document.querySelectorAll('.terminal-dots .dot');
    
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            // Create ripple
            const ripple = document.createElement('span');
            const dotColor = window.getComputedStyle(dot).backgroundColor;
            
            ripple.style.cssText = `
                position: absolute;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                background: ${dotColor};
                opacity: 0.6;
                pointer-events: none;
                animation: ripple-effect 0.6s ease-out;
            `;
            
            ripple.style.left = (e.offsetX - 15) + 'px';
            ripple.style.top = (e.offsetY - 15) + 'px';
            
            dot.parentElement.style.position = 'relative';
            dot.parentElement.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
            
            // Add bounce animation to dot
            dot.style.animation = 'none';
            setTimeout(() => {
                dot.style.animation = 'bounce-dot 0.5s ease';
            }, 10);
        });
    });
} else {
    console.error('❌ Terminal card elements not found');
}

// Add CSS animations dynamically
const terminalStyles = document.createElement('style');
terminalStyles.textContent = `
    @keyframes ripple-effect {
        to {
            transform: scale(2.5);
            opacity: 0;
        }
    }
    
    @keyframes bounce-dot {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.4); }
    }
`;
document.head.appendChild(terminalStyles);

console.log('🚀 Terminal animations loaded');


// ===== Mobile Menu Toggle =====
const mobileToggle = document.querySelector('.mobile-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


// ===== Skill Bar Animation on Scroll =====
const skillCards = document.querySelectorAll('.skill-card');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate all progress bars in this card
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.setProperty('--progress-width', width);
                // Trigger reflow to restart animation
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
            
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

skillCards.forEach(card => {
    skillObserver.observe(card);
});

// ========================================
// THEME TOGGLE (Dark/Light Mode)
// ========================================

const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem('theme') || 'dark';

// Apply the saved theme on page load
function initTheme() {
    htmlElement.setAttribute('data-theme', currentTheme);
    updateThemeToggle(currentTheme);
}

// Update toggle button appearance
function updateThemeToggle(theme) {
    const sunIcon = themeToggle.querySelector('.sun-icon');
    const moonIcon = themeToggle.querySelector('.moon-icon');
    
    if (theme === 'light') {
        sunIcon.style.opacity = '1';
        sunIcon.style.transform = 'rotate(0deg) scale(1)';
        moonIcon.style.opacity = '0';
        moonIcon.style.transform = 'rotate(-90deg) scale(0)';
    } else {
        sunIcon.style.opacity = '0';
        sunIcon.style.transform = 'rotate(90deg) scale(0)';
        moonIcon.style.opacity = '1';
        moonIcon.style.transform = 'rotate(0deg) scale(1)';
    }
}

// Toggle theme
function toggleTheme() {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeToggle(newTheme);
    
    // Optional: Add a subtle animation to the whole page
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
}

// Event listener
themeToggle.addEventListener('click', toggleTheme);

// Initialize theme on page load
initTheme();

// Optional: Detect system theme preference
function detectSystemTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (!localStorage.getItem('theme')) {
        const systemTheme = prefersDark ? 'dark' : 'light';
        htmlElement.setAttribute('data-theme', systemTheme);
        updateThemeToggle(systemTheme);
    }
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        htmlElement.setAttribute('data-theme', newTheme);
        updateThemeToggle(newTheme);
    }
});

// Call on load
detectSystemTheme();


console.log('%c🚀 Portfolio Loaded Successfully!', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with ❤️ by Ravi Bhushan Prasad', 'color: #ec4899; font-size: 14px;');
