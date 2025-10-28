<<<<<<< HEAD
// Navigation active state
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        }
    });
});

// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;
const icon = darkModeToggle.querySelector('i');

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
}

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('darkMode', 'enabled');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('darkMode', null);
    }
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate progress bars
            if (entry.target.id === 'skills') {
                const progressBars = entry.target.querySelectorAll('.progress-bar');
                progressBars.forEach(bar => {
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.width = bar.getAttribute('data-width') + '%';
                    }, 200);
                });
            }
        }
    });
}, observerOptions);

sections.forEach(section => {
    if (section.id !== 'home') {
        observer.observe(section);
    }
});

// Back to top button
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Contact form submission
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Veuillez entrer une adresse email valide.');
        return;
    }

    // Validate message length
    if (message.length < 10) {
        alert('Le message doit contenir au moins 10 caractères.');
        return;
    }

    // Simulate form submission
    console.log('Form submitted:', { name, email, message });
    
    // Show success message
    successMessage.style.display = 'block';
    contactForm.reset();

    // Hide success message after 5 seconds
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 5000);
});

// Real-time form validation
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

emailInput.addEventListener('blur', () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value && !emailRegex.test(emailInput.value)) {
        emailInput.style.borderColor = '#dc3545';
    } else {
        emailInput.style.borderColor = '';
    }
});

messageInput.addEventListener('input', () => {
    if (messageInput.value.length > 0 && messageInput.value.length < 10) {
        messageInput.style.borderColor = '#ffc107';
    } else if (messageInput.value.length >= 10) {
        messageInput.style.borderColor = '#28a745';
    } else {
        messageInput.style.borderColor = '';
    }
});

// Animate skill cards on hover
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(-10px) scale(1)';
    });
});

// Project card animations
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const img = this.querySelector('.project-img i');
        img.style.transform = 'scale(1.2) rotate(5deg)';
        img.style.transition = 'transform 0.3s ease';
    });
    
    card.addEventListener('mouseleave', function() {
        const img = this.querySelector('.project-img i');
        img.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
        navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 20px var(--shadow)';
    }
});

// Add typing effect to hero subtitle
const subtitle = document.querySelector('.hero .subtitle');
const text = subtitle.textContent;
subtitle.textContent = '';
let i = 0;

function typeWriter() {
    if (i < text.length) {
        subtitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}

// Start typing effect after page load
window.addEventListener('load', () => {
    setTimeout(typeWriter, 1000);
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Animate social links
const socialLinks = document.querySelectorAll('.social-links a');
socialLinks.forEach((link, index) => {
    link.style.animationDelay = `${index * 0.1}s`;
    link.style.animation = 'fadeInUp 0.6s ease forwards';
});

// Add cursor trail effect (optional)
document.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 768) {
        const trail = document.createElement('div');
        trail.style.position = 'fixed';
        trail.style.width = '5px';
        trail.style.height = '5px';
        trail.style.borderRadius = '50%';
        trail.style.background = 'var(--accent-orange)';
        trail.style.left = e.clientX + 'px';
        trail.style.top = e.clientY + 'px';
        trail.style.pointerEvents = 'none';
        trail.style.opacity = '0.6';
        trail.style.transition = 'opacity 0.5s ease';
        document.body.appendChild(trail);

        setTimeout(() => {
            trail.style.opacity = '0';
            setTimeout(() => trail.remove(), 500);
        }, 100);
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
            navbarCollapse.classList.remove('show');
        }
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Testimonial Slider
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.testimonials-slider');
    const cards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dots = document.querySelectorAll('.dot');
    
    let currentSlide = 0;
    const totalSlides = cards.length;

    // Fonction pour aller à un slide spécifique
    function goToSlide(slideIndex) {
        if (slideIndex < 0) {
            currentSlide = totalSlides - 1;
        } else if (slideIndex >= totalSlides) {
            currentSlide = 0;
        } else {
            currentSlide = slideIndex;
        }

        // Défilement fluide
        const scrollAmount = cards[currentSlide].offsetLeft - slider.offsetLeft;
        slider.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });

        // Mise à jour des dots
        updateDots();
    }

    // Mise à jour des dots actifs
    function updateDots() {
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Bouton précédent
    prevBtn.addEventListener('click', () => {
        goToSlide(currentSlide - 1);
    });

    // Bouton suivant
    nextBtn.addEventListener('click', () => {
        goToSlide(currentSlide + 1);
    });

    // Clic sur les dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });

    // Auto-play (optionnel - décommenter si souhaité)

    setInterval(() => {
        goToSlide(currentSlide + 1);
    }, 5000);

    // Navigation au clavier
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            goToSlide(currentSlide - 1);
        } else if (e.key === 'ArrowRight') {
            goToSlide(currentSlide + 1);
        }
    });

    // Swipe sur mobile (tactile)
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Swipe gauche
            goToSlide(currentSlide + 1);
        }
        if (touchEndX > touchStartX + 50) {
            // Swipe droite
            goToSlide(currentSlide - 1);
        }
    }
=======
// Navigation active state
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        }
    });
});

// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;
const icon = darkModeToggle.querySelector('i');

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
}

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('darkMode', 'enabled');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('darkMode', null);
    }
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate progress bars
            if (entry.target.id === 'skills') {
                const progressBars = entry.target.querySelectorAll('.progress-bar');
                progressBars.forEach(bar => {
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.width = bar.getAttribute('data-width') + '%';
                    }, 200);
                });
            }
        }
    });
}, observerOptions);

sections.forEach(section => {
    if (section.id !== 'home') {
        observer.observe(section);
    }
});

// Back to top button
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Contact form submission
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Veuillez entrer une adresse email valide.');
        return;
    }

    // Validate message length
    if (message.length < 10) {
        alert('Le message doit contenir au moins 10 caractères.');
        return;
    }

    // Simulate form submission
    console.log('Form submitted:', { name, email, message });
    
    // Show success message
    successMessage.style.display = 'block';
    contactForm.reset();

    // Hide success message after 5 seconds
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 5000);
});

// Real-time form validation
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

emailInput.addEventListener('blur', () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value && !emailRegex.test(emailInput.value)) {
        emailInput.style.borderColor = '#dc3545';
    } else {
        emailInput.style.borderColor = '';
    }
});

messageInput.addEventListener('input', () => {
    if (messageInput.value.length > 0 && messageInput.value.length < 10) {
        messageInput.style.borderColor = '#ffc107';
    } else if (messageInput.value.length >= 10) {
        messageInput.style.borderColor = '#28a745';
    } else {
        messageInput.style.borderColor = '';
    }
});

// Animate skill cards on hover
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(-10px) scale(1)';
    });
});

// Project card animations
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const img = this.querySelector('.project-img i');
        img.style.transform = 'scale(1.2) rotate(5deg)';
        img.style.transition = 'transform 0.3s ease';
    });
    
    card.addEventListener('mouseleave', function() {
        const img = this.querySelector('.project-img i');
        img.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
        navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 20px var(--shadow)';
    }
});

// Add typing effect to hero subtitle
const subtitle = document.querySelector('.hero .subtitle');
const text = subtitle.textContent;
subtitle.textContent = '';
let i = 0;

function typeWriter() {
    if (i < text.length) {
        subtitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}

// Start typing effect after page load
window.addEventListener('load', () => {
    setTimeout(typeWriter, 1000);
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Animate social links
const socialLinks = document.querySelectorAll('.social-links a');
socialLinks.forEach((link, index) => {
    link.style.animationDelay = `${index * 0.1}s`;
    link.style.animation = 'fadeInUp 0.6s ease forwards';
});

// Add cursor trail effect (optional)
document.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 768) {
        const trail = document.createElement('div');
        trail.style.position = 'fixed';
        trail.style.width = '5px';
        trail.style.height = '5px';
        trail.style.borderRadius = '50%';
        trail.style.background = 'var(--accent-orange)';
        trail.style.left = e.clientX + 'px';
        trail.style.top = e.clientY + 'px';
        trail.style.pointerEvents = 'none';
        trail.style.opacity = '0.6';
        trail.style.transition = 'opacity 0.5s ease';
        document.body.appendChild(trail);

        setTimeout(() => {
            trail.style.opacity = '0';
            setTimeout(() => trail.remove(), 500);
        }, 100);
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
            navbarCollapse.classList.remove('show');
        }
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Testimonial Slider
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.testimonials-slider');
    const cards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dots = document.querySelectorAll('.dot');
    
    let currentSlide = 0;
    const totalSlides = cards.length;

    // Fonction pour aller à un slide spécifique
    function goToSlide(slideIndex) {
        if (slideIndex < 0) {
            currentSlide = totalSlides - 1;
        } else if (slideIndex >= totalSlides) {
            currentSlide = 0;
        } else {
            currentSlide = slideIndex;
        }

        // Défilement fluide
        const scrollAmount = cards[currentSlide].offsetLeft - slider.offsetLeft;
        slider.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });

        // Mise à jour des dots
        updateDots();
    }

    // Mise à jour des dots actifs
    function updateDots() {
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Bouton précédent
    prevBtn.addEventListener('click', () => {
        goToSlide(currentSlide - 1);
    });

    // Bouton suivant
    nextBtn.addEventListener('click', () => {
        goToSlide(currentSlide + 1);
    });

    // Clic sur les dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });

    // Auto-play (optionnel - décommenter si souhaité)

    setInterval(() => {
        goToSlide(currentSlide + 1);
    }, 5000);

    // Navigation au clavier
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            goToSlide(currentSlide - 1);
        } else if (e.key === 'ArrowRight') {
            goToSlide(currentSlide + 1);
        }
    });

    // Swipe sur mobile (tactile)
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Swipe gauche
            goToSlide(currentSlide + 1);
        }
        if (touchEndX > touchStartX + 50) {
            // Swipe droite
            goToSlide(currentSlide - 1);
        }
    }
>>>>>>> 4f6c714955edf87738fc0ece68b1a12fbd5fb556
});