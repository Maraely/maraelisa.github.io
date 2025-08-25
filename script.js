// scroll animations
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in');

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// smooth scroll for nav
function initSmoothScroll() {
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
}

//  effect for background orbs
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelectorAll('.bg-orb');
        const speed = 0.5;

        parallax.forEach((orb, index) => {
            const yPos = scrolled * speed * (index + 1) * 0.3;
            orb.style.transform = `translateY(${yPos}px)`;
        });

        // Floating skills parallax
        const skills = document.querySelectorAll('.skill-orb');
        skills.forEach((skill, index) => {
            const yPos = scrolled * 0.2 * (index + 1);
            skill.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
        });
    });
}

// nav background on scroll
function initNavScroll() {
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.nav');
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(15, 15, 35, 0.9)';
            nav.style.backdropFilter = 'blur(30px)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.1)';
            nav.style.backdropFilter = 'blur(20px)';
        }
    });
}

// typing effect for hero text
function initTypingEffect() {
    const subtitle = document.querySelector('.hero-subtitle');
    const text = '✨ Web Development Student ✨';
    subtitle.innerHTML = '';

    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            subtitle.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }

    setTimeout(typeWriter, 1000);
}

// enhanced cursor trail effect on desktop)
function initCursorTrail() {

    if (window.innerWidth > 768) {
        const cursor = document.createElement('div');
        cursor.className = 'cursor-trail';
        cursor.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      background: radial-gradient(circle, var(--primary), var(--secondary));
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      opacity: 0.7;
      transition: all 0.1s ease;
      filter: blur(2px);
    `;
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
        });
    }
}

// initialize everything
document.addEventListener('DOMContentLoaded', function() {
    initSmoothScroll();
    initParallax();
    initNavScroll();
    initTypingEffect();
    initCursorTrail();

    //initial scroll animation
    handleScrollAnimations();

    window.addEventListener('scroll', handleScrollAnimations);

    //intersection observer for better performance
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.fade-in').forEach((el) => {
        observer.observe(el);
    });

    //loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease';
        document.body.style.opacity = '1';
    }, 100);



//reduce animations on mobile for better performance
if (window.innerWidth <= 768) {
    document.addEventListener('DOMContentLoaded', function() {
        // Disable heavy animations on mobile
        document.querySelectorAll('.bg-orb').forEach(orb => {
            orb.style.animation = 'none';
        });
    });
}

//error for missing images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
        });
    });
});