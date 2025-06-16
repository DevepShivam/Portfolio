// Mobile navigation toggle
document.querySelector('.hamburger').addEventListener('click', function() {
    this.classList.toggle('active');
    document.querySelector('.main-nav ul').classList.toggle('active');
    document.body.classList.toggle('no-scroll');
});

// Portfolio filtering system
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission handling
const contactForm = document.getElementById('contact-form');
const formStatus = document.querySelector('.form-status');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    
    fetch(this.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            formStatus.innerHTML = 'Thank you for your message! I will get back to you soon.';
            formStatus.classList.add('success');
            contactForm.reset();
        } else {
            throw new Error('Network response was not ok');
        }
    })
    .catch(error => {
        formStatus.innerHTML = 'Oops! There was a problem submitting your form.';
        formStatus.classList.add('error');
    });
});

// Set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Back to top button visibility
window.addEventListener('scroll', function() {
    const backToTop = document.querySelector('.back-to-top');
    if (window.pageYOffset > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

// Animate skill bars on scroll
function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        bar.style.width = '0';
        
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                bar.style.width = level + '%';
                observer.unobserve(bar);
            }
        });
        
        observer.observe(bar);
    });
}

window.addEventListener('load', animateSkills);