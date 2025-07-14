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