/**
 * ZentraTek Landing Page - Main JavaScript
 * Handles: Mobile menu, smooth scrolling, animations, form validation
 */

// ============================================
// Mobile Menu Toggle
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');

            // Update button aria-label for accessibility
            const isExpanded = !mobileMenu.classList.contains('hidden');
            mobileMenuButton.setAttribute('aria-label', isExpanded ? 'Cerrar menú' : 'Abrir menú');
        });

        // Close mobile menu when clicking on a link
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                mobileMenuButton.setAttribute('aria-label', 'Abrir menú');
            });
        });
    }
});

// ============================================
// Smooth Scroll for Anchor Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');

        // Only prevent default for hash links (not just "#")
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ============================================
// Intersection Observer for Fade-in Animations
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optionally unobserve after animation to improve performance
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.fade-in-element');
    fadeElements.forEach(element => {
        observer.observe(element);
    });
});

// ============================================
// Navbar Background on Scroll
// ============================================
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('shadow-md');
    } else {
        nav.classList.remove('shadow-md');
    }
});

// ============================================
// Contact Form Handling (FormSubmit.co)
// ============================================
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // Get form data
        const formData = new FormData(contactForm);
        const data = {
            nombre: formData.get('nombre'),
            email: formData.get('email'),
            mensaje: formData.get('mensaje')
        };

        // Basic validation - only prevent if there are errors
        if (!validateEmail(data.email)) {
            e.preventDefault();
            alert('Por favor, ingresa un email válido.');
            return;
        }

        if (data.nombre.trim().length < 2) {
            e.preventDefault();
            alert('Por favor, ingresa tu nombre completo.');
            return;
        }

        if (data.mensaje.trim().length < 10) {
            e.preventDefault();
            alert('Por favor, escribe un mensaje más detallado (mínimo 10 caracteres).');
            return;
        }

        // Validation passed - show loading state and let form submit normally
        const submitButton = contactForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="flex items-center justify-center gap-2">Enviando...</span>';

        // Form will submit normally to FormSubmit.co (don't prevent default here!)
        // User will be redirected to FormSubmit's thank you page
    });
}

/**
 * Validate email format
 */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Show form success or error message
 */
function showFormMessage(type, customMessage = null) {
    // Hide both messages first
    formSuccess.classList.add('hidden');
    formError.classList.add('hidden');

    if (type === 'success') {
        formSuccess.classList.remove('hidden');
        // Reinitialize Lucide icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }

        // Auto-hide after 5 seconds
        setTimeout(() => {
            formSuccess.classList.add('hidden');
        }, 5000);
    } else {
        if (customMessage) {
            const errorText = formError.querySelector('p.text-sm');
            if (errorText) {
                errorText.textContent = customMessage;
            }
        }
        formError.classList.remove('hidden');

        // Reinitialize Lucide icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }

        // Auto-hide after 5 seconds
        setTimeout(() => {
            formError.classList.add('hidden');
        }, 5000);
    }
}

// ============================================
// Lazy Loading Images (if you add images later)
// ============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('loading-skeleton');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    // Observe all images with data-src attribute
    document.addEventListener('DOMContentLoaded', function() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    });
}

// ============================================
// Keyboard Navigation Enhancement
// ============================================
document.addEventListener('keydown', function(e) {
    // Close mobile menu on Escape key
    if (e.key === 'Escape') {
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuButton = document.getElementById('mobile-menu-button');

        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            if (mobileMenuButton) {
                mobileMenuButton.setAttribute('aria-label', 'Abrir menú');
                mobileMenuButton.focus();
            }
        }
    }
});

// ============================================
// Performance: Reduce Motion for Users with Preferences
// ============================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Disable animations for users who prefer reduced motion
    document.documentElement.style.scrollBehavior = 'auto';
}

// ============================================
// Console Welcome Message (Optional Easter Egg)
// ============================================
console.log('%c¡Hola! 👋', 'font-size: 20px; font-weight: bold; color: #0066FF;');
console.log('%c¿Te interesa trabajar con nosotros? Envíanos un mensaje a consultoria@zentratek.com', 'font-size: 14px; color: #00D9B1;');
console.log('%cZentraTek - Tecnología sencilla, equilibrada y eficiente', 'font-size: 12px; color: #6C757D;');
