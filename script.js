// Replace the existing script.js with this:

document.addEventListener('DOMContentLoaded', function() {
    // Slideshow functionality
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    
    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }
    
    // Change slide every 5 seconds
    setInterval(nextSlide, 5000);
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Mobile menu toggle
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.className = 'mobile-menu-button';
    mobileMenuButton.innerHTML = '☰';
    document.querySelector('.main-header .container').prepend(mobileMenuButton);
    
    mobileMenuButton.addEventListener('click', () => {
        document.querySelector('.main-nav').classList.toggle('active');
    });
    
    // Sticky header on scroll
    window.addEventListener('scroll', () => {
        const mainHeader = document.querySelector('.main-header');
        if (window.scrollY > 100) {
            mainHeader.classList.add('sticky');
        } else {
            mainHeader.classList.remove('sticky');
        }
    });
});








// services-animation.js - Optional for enhanced interactivity
document.addEventListener('DOMContentLoaded', function() {
    // Animate service items on scroll
    const serviceSection = document.querySelector('.services-section');
    const serviceItems = document.querySelectorAll('.service-item');
    
    function checkScroll() {
        const sectionTop = serviceSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
            serviceItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 100);
            });
            window.removeEventListener('scroll', checkScroll);
        }
    }
    
    // Initialize items for animation
    serviceItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.5s ease-out';
    });
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Check on load in case already in view
    
    // Optional click handler for service items
    serviceItems.forEach(item => {
        item.addEventListener('click', function() {
            // Add your custom click behavior here
            // Example: window.location.href = '#contact';
        });
    });
});



//forms
document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(el => {
    el.addEventListener('focus', () => {
        el.closest('.form-group').classList.add('focused');
    });
    el.addEventListener('blur', () => {
        if (!el.value) el.closest('.form-group').classList.remove('focused');
    });
});