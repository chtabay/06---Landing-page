// Version D JavaScript - Social Proof & Authority

// Version switcher function
function switchVersion(version) {
    if (version && version !== '') {
        window.location.href = version;
    }
}

// Track events for analytics
function trackEvent(eventName, properties = {}) {
    // Analytics tracking would go here
    console.log('Event tracked:', eventName, properties);
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for all anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Initialize all interactive features
    initializeSocialProofAnimations();
    initializeFormHandling();
    initializeMetricsCounter();
    initializeTestimonialInteractions();
});

// Social proof animations
function initializeSocialProofAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });

    // Observe testimonial cards
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach(card => {
        observer.observe(card);
    });

    // Observe proof cards
    const proofCards = document.querySelectorAll('.proof-card');
    proofCards.forEach(card => {
        observer.observe(card);
    });
}

// Metrics counter animation
function initializeMetricsCounter() {
    const metrics = document.querySelectorAll('.client-count__number, .metric__number, .proof-card__metric');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    metrics.forEach(metric => {
        observer.observe(metric);
    });
}

function animateCounter(element) {
    const target = element.textContent;
    const isPercentage = target.includes('%');
    const isNumber = /^\d+\+?$/.test(target);
    
    if (isNumber) {
        const finalNumber = parseInt(target.replace('+', ''));
        const duration = 2000;
        const increment = finalNumber / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= finalNumber) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (target.includes('+') ? '+' : '');
            }
        }, 16);
    } else if (isPercentage) {
        const finalNumber = parseInt(target.replace('%', ''));
        const duration = 2000;
        const increment = finalNumber / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= finalNumber) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + '%';
            }
        }, 16);
    }
}

// Testimonial interactions
function initializeTestimonialInteractions() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-4px) scale(1)';
        });
        
        card.addEventListener('click', function() {
            const authorName = this.querySelector('.author-name')?.textContent;
            trackEvent('testimonial_clicked', {
                author: authorName
            });
        });
    });
}

// Form handling with social proof
function initializeFormHandling() {
    const form = document.querySelector('.form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Validate form
        if (!validateForm(data)) {
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="btn__icon">⏳</span> Envoi en cours...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            showSuccessMessage();
            trackEvent('form_submitted', {
                company: data.company,
                properties: data.properties
            });
            
            // Add social proof update
            updateRecentSignups(data.company);
            
            // Reset form
            this.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

function validateForm(data) {
    const required = ['name', 'company', 'email'];
    const missing = required.filter(field => !data[field] || data[field].trim() === '');
    
    if (missing.length > 0) {
        showError(`Veuillez remplir les champs obligatoires : ${missing.join(', ')}`);
        return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showError('Veuillez entrer une adresse email valide');
        return false;
    }
    
    return true;
}

function showError(message) {
    // Remove existing error
    const existingError = document.querySelector('.form-error');
    if (existingError) {
        existingError.remove();
    }
    
    const form = document.querySelector('.form');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error';
    errorDiv.style.cssText = `
        background: #fee2e2;
        color: #dc2626;
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 1rem;
        font-weight: 500;
    `;
    errorDiv.textContent = message;
    
    form.insertBefore(errorDiv, form.firstChild);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

function showSuccessMessage() {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.form-error, .form-success');
    existingMessages.forEach(msg => msg.remove());
    
    const form = document.querySelector('.form');
    const successDiv = document.createElement('div');
    successDiv.className = 'form-success';
    successDiv.style.cssText = `
        background: #d1fae5;
        color: #065f46;
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 1rem;
        font-weight: 500;
        text-align: center;
    `;
    successDiv.innerHTML = `
        <span class="success-icon">✅</span>
        <strong>Demande envoyée avec succès !</strong><br>
        Guillaume vous contactera dans les 2 heures.
    `;
    
    form.insertBefore(successDiv, form.firstChild);
    
    setTimeout(() => {
        successDiv.remove();
    }, 10000);
}

function updateRecentSignups(newCompany) {
    const recentSignups = document.querySelector('.recent-signups');
    if (!recentSignups) return;
    
    // Create new signup element
    const newSignup = document.createElement('div');
    newSignup.className = 'recent-signup';
    newSignup.innerHTML = `
        <span class="signup-time">À l'instant</span>
        <span class="signup-company">${newCompany}</span>
    `;
    newSignup.style.cssText = `
        background: #d1fae5;
        border-left: 4px solid #10b981;
        animation: slideIn 0.5s ease;
    `;
    
    // Insert at the top
    const firstSignup = recentSignups.querySelector('.recent-signup');
    if (firstSignup) {
        recentSignups.insertBefore(newSignup, firstSignup);
    }
    
    // Remove oldest if more than 3
    const allSignups = recentSignups.querySelectorAll('.recent-signup');
    if (allSignups.length > 3) {
        allSignups[allSignups.length - 1].remove();
    }
    
    // Update client count
    updateClientCount();
}

function updateClientCount() {
    const clientCountElement = document.querySelector('.client-count__number');
    if (clientCountElement && clientCountElement.textContent === '25+') {
        clientCountElement.textContent = '26+';
        
        // Add sparkle effect
        const sparkle = document.createElement('span');
        sparkle.textContent = '✨';
        sparkle.style.cssText = `
            position: absolute;
            animation: sparkle 1s ease;
            margin-left: 1rem;
        `;
        clientCountElement.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(-100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes sparkle {
        0%, 100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(1.5) rotate(180deg);
            opacity: 0.7;
        }
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// CTA button tracking
document.addEventListener('DOMContentLoaded', function() {
    const ctaButtons = document.querySelectorAll('.btn--primary, .btn--outline');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            const section = this.closest('section')?.id || 'unknown';
            
            trackEvent('cta_clicked', {
                button_text: buttonText,
                section: section,
                timestamp: new Date().toISOString()
            });
        });
    });
});

// Phone number click tracking
document.addEventListener('DOMContentLoaded', function() {
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('phone_clicked', {
                phone_number: this.getAttribute('href'),
                context: this.closest('section')?.id || 'unknown'
            });
        });
    });
});

// Social proof updates
function initializeLiveSocialProof() {
    const messages = [
        "📈 +2 nouvelles agences cette semaine",
        "🎉 1000+ locations réussies ce mois",
        "⭐ Nouveau témoignage 5 étoiles reçu",
        "🚀 +15% de croissance client ce trimestre"
    ];
    
    let currentIndex = 0;
    
    setInterval(() => {
        const socialProofElements = document.querySelectorAll('.cta-social-proof__text');
        if (socialProofElements.length > 0) {
            const element = socialProofElements[0];
            element.style.opacity = '0';
            
            setTimeout(() => {
                element.innerHTML = messages[currentIndex];
                element.style.opacity = '1';
                currentIndex = (currentIndex + 1) % messages.length;
            }, 300);
        }
    }, 8000);
}

// Initialize live social proof after page load
setTimeout(initializeLiveSocialProof, 3000);
