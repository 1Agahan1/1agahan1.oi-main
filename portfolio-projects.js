const header = document.getElementById('main-header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add/remove scrolled class based on scroll position
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Project items animation
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Stop observing once animation is triggered
        }
    });
}, observerOptions);

// Observe all project items
document.querySelectorAll('.project-item').forEach(item => {
    observer.observe(item);
});
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Project hover effect enhancement
document.querySelectorAll('.project-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Animated background for each project item
function createAnimatedBackgroundForProjects() {
    document.querySelectorAll('.project-item').forEach(projectItem => {
        // Remove existing background if it exists
        const existingBg = projectItem.querySelector('.animated-background');
        if (existingBg) {
            existingBg.remove();
        }

        const animatedBg = document.createElement('div');
        animatedBg.className = 'animated-background';
        
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'animated-dots';

        for (let i = 0; i < 30; i++) {
            const dot = document.createElement('div');
            dot.className = 'dot';
            const size = Math.random() * 18 + 10; // 10px to 28px
            dot.style.width = `${size}px`;
            dot.style.height = `${size}px`;
            dot.style.left = `${Math.random() * 100}%`;
            dot.style.top = `${Math.random() * 100}%`;
            dot.style.setProperty('--delay', Math.random() * 2);
            dotsContainer.appendChild(dot);
        }

        animatedBg.appendChild(dotsContainer);
        projectItem.insertBefore(animatedBg, projectItem.firstChild);

        // Mouse move effect
        let ticking = false;
        const handleMouseMove = (e) => {
            const rect = projectItem.getBoundingClientRect();
            const clientX = e.clientX;
            const clientY = e.clientY;
            const dots = dotsContainer.querySelectorAll('.dot');
            dots.forEach(dot => {
                const dotRect = dot.getBoundingClientRect();
                const dotCenterX = dotRect.left + dotRect.width / 2;
                const dotCenterY = dotRect.top + dotRect.height / 2;
                const deltaX = clientX - dotCenterX;
                const deltaY = clientY - dotCenterY;
                const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                const strength = Math.max(0, 1 - distance / 150);
                const moveX = deltaX * strength * -0.1;
                const moveY = deltaY * strength * -0.1;
                dot.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        };
        projectItem.addEventListener('mousemove', (e) => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleMouseMove(e);
                    ticking = false;
                });
                ticking = true;
            }
        });
        projectItem.addEventListener('mouseleave', () => {
            const dots = dotsContainer.querySelectorAll('.dot');
            dots.forEach(dot => {
                dot.style.transform = 'translate(0, 0)';
            });
        });
    });
}

document.addEventListener('DOMContentLoaded', createAnimatedBackgroundForProjects);

// Dark mode toggle functionality
function setupDarkModeToggle() {
    const toggleBtn = document.getElementById('dark-mode-toggle');
    if (!toggleBtn) return;
    const body = document.body;
    // Helper to update icon
    function updateIcon() {
        if (body.classList.contains('dark-mode')) {
            toggleBtn.classList.remove('fa-sun');
            toggleBtn.classList.add('fa-moon');
        } else {
            toggleBtn.classList.remove('fa-moon');
            toggleBtn.classList.add('fa-sun');
        }
        toggleBtn.classList.add('icon-animate');
        setTimeout(() => toggleBtn.classList.remove('icon-animate'), 300);
    }
    // Load preference
    const darkModePref = localStorage.getItem('darkMode');
    if (darkModePref === 'enabled') {
        body.classList.add('dark-mode');
    }
    updateIcon();
    toggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.setItem('darkMode', 'disabled');
        }
        updateIcon();
    });
}
document.addEventListener('DOMContentLoaded', setupDarkModeToggle);

// Mobile menu functionality
const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('#menu-nav');

const mobileMenu = () => {
  menu.classList.toggle('is-active');
  menuLinks.classList.toggle('active');
};

menuLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.remove('is-active');
    menuLinks.classList.remove('active');
  });
});

menu.addEventListener('click', mobileMenu);

// Scroll-to-top button functionality
function setupScrollToTop() {
  const btn = document.getElementById('scrollToTop');
  if (!btn) return;
  // Show/hide button on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
      btn.style.display = 'flex';
    } else {
      btn.style.display = 'none';
    }
  });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  // Hide initially
  btn.style.display = 'none';
}
document.addEventListener('DOMContentLoaded', setupScrollToTop);