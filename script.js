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





//header menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.header-nav-list');
    
    menuBtn.addEventListener('click', function() {
        navList.classList.toggle('active');
        this.textContent = navList.classList.contains('active') ? '✕' : '☰';
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.header-nav-item a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navList.classList.remove('active');
                menuBtn.textContent = '☰';
            }
        });
    });
});






// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;
        
        // Calculate the target position (accounting for fixed header)
        const headerHeight = document.querySelector('.header-main-nav').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        // Animate the scroll
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Update URL without jumping
        if (history.pushState) {
            history.pushState(null, null, targetId);
        } else {
            window.location.hash = targetId;
        }
    });
});





// Booking form submission
document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    fetch('sendmail.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Show success popup
            document.getElementById('thankYouPopup').style.display = 'flex';
            // Reset form
            form.reset();

             // Auto-close popup after 3 seconds (ADD THIS PART)
             setTimeout(() => {
                document.getElementById('thankYouPopup').style.display = 'none';
            }, 3000);
        } else {
            // Show error messages
            alert(data.errors.join('\n'));
        }
    })
    .catch(error => {
        alert('Network error. Please try again.');
    })
    .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
    });
});

// Close popup handler
document.querySelector('.popup-close-btn').addEventListener('click', function() {
    document.getElementById('thankYouPopup').style.display = 'none';
});
