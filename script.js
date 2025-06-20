document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.getElementById('header');

    mobileToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('show');
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('show');
        });
    });

    function smoothScroll(targetId) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = header.offsetHeight;
            const elementPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    }

    [...navLinks, ...mobileLinks].forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            smoothScroll(targetId);
        });
    });

    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {

                navLinks.forEach(link => link.classList.remove('active'));

                const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
                if (activeLink && activeLink.classList.contains('nav-link')) {
                    activeLink.classList.add('active');
                }
            }
        });
    }

    function handleHeaderScroll() {
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        }
    }

    window.addEventListener('scroll', function() {
        updateActiveNav();
        handleHeaderScroll();
    });

    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');
    const callbackBtn = document.getElementById('callback-btn');

    function showSuccessMessage(isCallback = false) {
        const successTitle = successMessage.querySelector('.success-title');
        const successText = successMessage.querySelector('.success-text');
        
        if (isCallback) {
            successTitle.textContent = 'Спасибо!';
            successText.textContent = 'Мы перезвоним вам в течение 15 минут.';
        } else {
            successTitle.textContent = 'Спасибо за заявку!';
            successText.textContent = 'Мы свяжемся с вами в ближайшее время.';
        }
        
        successMessage.classList.add('show');
        contactForm.style.display = 'none';

        setTimeout(function() {
            successMessage.classList.remove('show');
            contactForm.style.display = 'flex';
            resetForm();
        }, 3000);
    }

    function resetForm() {
        contactForm.reset();
    }

    function validateForm() {
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        
        if (!name || !phone) {
            alert('Пожалуйста, заполните обязательные поля: имя и телефон');
            return false;
        }
        
        return true;
    }

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            showSuccessMessage(false);
        }
    });

    callbackBtn.addEventListener('click', function() {
        const phone = document.getElementById('phone').value.trim();
        
        if (!phone) {
            alert('Пожалуйста, укажите номер телефона для звонка.');
            document.getElementById('phone').focus();
            return;
        }
        
        showSuccessMessage(true);
    });

    function animateOnScroll() {
        const animatedElements = document.querySelectorAll('.service-card, .about-content, .hero-content');
        
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    function initAnimations() {
        const animatedElements = document.querySelectorAll('.service-card, .about-content');
        
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
    }

    initAnimations();
    updateActiveNav();

    window.addEventListener('scroll', animateOnScroll);

    animateOnScroll();

    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    document.addEventListener('click', function(e) {
        if (!mobileToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.remove('show');
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            mobileMenu.classList.remove('show');
        }
    });

    const formInputs = document.querySelectorAll('.form-input, .form-select, .form-textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });

    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.service-card').forEach(card => {
            observer.observe(card);
        });
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

window.addEventListener('scroll', function() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    }
});

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.warn('Failed to load image:', this.src);
        });
    });
});

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const debouncedScroll = debounce(function() {
    updateActiveNav();
    handleHeaderScroll();
}, 10);

window.addEventListener('scroll', debouncedScroll);