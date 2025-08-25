// Landing Page JavaScript

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Form submissions
    setupFormHandlers();
    
    // Initialize page with default state
    showCandidateSection();
});

// Show Agency Section
function showAgencySection() {
    const agencySection = document.getElementById('agences');
    const candidateSection = document.getElementById('candidats');
    
    if (agencySection && candidateSection) {
        agencySection.classList.remove('hidden');
        candidateSection.classList.add('hidden');
        
        // Scroll to agency section
        agencySection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // Update active states
        updateTargetCardStates('agency');
    }
}

// Show Candidate Section
function showCandidateSection() {
    const agencySection = document.getElementById('agences');
    const candidateSection = document.getElementById('candidats');
    
    if (agencySection && candidateSection) {
        candidateSection.classList.remove('hidden');
        agencySection.classList.add('hidden');
        
        // Scroll to candidate section
        candidateSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // Update active states
        updateTargetCardStates('candidate');
    }
}

// Update target card visual states
function updateTargetCardStates(activeType) {
    const targetCards = document.querySelectorAll('.target-card');
    targetCards.forEach((card, index) => {
        card.classList.remove('active');
        if ((activeType === 'agency' && index === 0) || 
            (activeType === 'candidate' && index === 1)) {
            card.classList.add('active');
        }
    });
}

// Tab functionality for "How it works" section
function showTab(tabId) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active class from all tab buttons
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    // Show selected tab content
    const targetTab = document.getElementById(tabId);
    if (targetTab) {
        targetTab.classList.add('active');
    }
    
    // Add active class to clicked button
    const clickedButton = event.target;
    if (clickedButton) {
        clickedButton.classList.add('active');
    }
}

// Form handlers
function setupFormHandlers() {
    // Demo form handler
    const demoForm = document.querySelector('.demo-form');
    if (demoForm) {
        demoForm.addEventListener('submit', handleDemoFormSubmit);
    }
    
    // Contact form handler
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }
}

// Handle demo form submission
function handleDemoFormSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = {
        agencyName: formData.get('agencyName') || event.target.querySelector('input[placeholder*="agence"]').value,
        email: formData.get('email') || event.target.querySelector('input[type="email"]').value,
        phone: formData.get('phone') || event.target.querySelector('input[type="tel"]').value,
        volume: formData.get('volume') || event.target.querySelector('select').value,
        message: formData.get('message') || event.target.querySelector('textarea').value
    };
    
    // Basic validation
    if (!data.email || !data.phone) {
        showNotification('Veuillez remplir tous les champs obligatoires', 'error');
        return;
    }
    
    // Simulate form submission (replace with actual API call)
    showNotification('Demande de démo envoyée ! Nous vous contacterons sous 24h.', 'success');
    
    // Reset form
    event.target.reset();
    
    // In a real application, you would send this data to your backend:
    // fetch('/api/demo-request', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(data)
    // });
    
    console.log('Demo request submitted:', data);
}

// Handle contact form submission
function handleContactFormSubmit(event) {
    event.preventDefault();
    
    const email = event.target.querySelector('input[type="email"]').value;
    
    if (!email) {
        showNotification('Veuillez saisir votre email', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Inscription réussie ! Vous recevrez nos actualités.', 'success');
    
    // Reset form
    event.target.reset();
    
    console.log('Newsletter subscription:', email);
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <span class="notification__message">${message}</span>
            <button class="notification__close" onclick="this.parentElement.parentElement.remove()">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        </div>
    `;
    
    // Add styles for notification
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
            max-width: 400px;
            padding: 16px;
            border-radius: 8px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            animation: slideIn 0.3s ease-out;
        }
        
        .notification--success {
            background: #059669;
            color: white;
        }
        
        .notification--error {
            background: #dc2626;
            color: white;
        }
        
        .notification--info {
            background: #2563eb;
            color: white;
        }
        
        .notification__content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
        }
        
        .notification__close {
            background: none;
            border: none;
            color: inherit;
            cursor: pointer;
            padding: 4px;
            border-radius: 4px;
            opacity: 0.8;
            transition: opacity 0.2s;
        }
        
        .notification__close:hover {
            opacity: 1;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    
    if (!document.querySelector('#notification-styles')) {
        style.id = 'notification-styles';
        document.head.appendChild(style);
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Track user interactions for analytics
function trackEvent(eventName, properties = {}) {
    // In a real application, you would send this to your analytics service
    console.log('Event tracked:', eventName, properties);
    
    // Example: Google Analytics 4
    // gtag('event', eventName, properties);
    
    // Example: Custom analytics
    // analytics.track(eventName, properties);
}

// Add click tracking to important elements
document.addEventListener('DOMContentLoaded', function() {
    // Track target card clicks
    const targetCards = document.querySelectorAll('.target-card');
    targetCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            const targetType = index === 0 ? 'agency' : 'candidate';
            trackEvent('target_selected', { type: targetType });
        });
    });
    
    // Track CTA button clicks
    const ctaButtons = document.querySelectorAll('.btn--primary');
    ctaButtons.forEach(button => {
        button.addEventListener('click', () => {
            trackEvent('cta_clicked', { 
                text: button.textContent.trim(),
                location: button.closest('section')?.id || 'unknown'
            });
        });
    });
    
    // Track phone number clicks
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', () => {
            trackEvent('phone_clicked', { 
                number: link.getAttribute('href').replace('tel:', '')
            });
        });
    });
});

// Intersection Observer for animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            
            // Track section views
            if (entry.target.id) {
                trackEvent('section_viewed', { section: entry.target.id });
            }
        }
    });
}, observerOptions);

// Observe sections for animation
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Add CSS for fade-in animation
    const style = document.createElement('style');
    style.textContent = `
        section {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        section.fade-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .hero {
            opacity: 1;
            transform: none;
        }
    `;
    document.head.appendChild(style);
});

// Add keyboard navigation support
document.addEventListener('keydown', function(event) {
    // ESC to close any open modals/notifications
    if (event.key === 'Escape') {
        const notifications = document.querySelectorAll('.notification');
        notifications.forEach(notification => notification.remove());
    }
    
    // Enter on target cards
    if (event.key === 'Enter' && event.target.classList.contains('target-card')) {
        event.target.click();
    }
});

// Add focus management for better accessibility
document.addEventListener('DOMContentLoaded', function() {
    // Add tabindex to interactive elements that don't have it
    const targetCards = document.querySelectorAll('.target-card');
    targetCards.forEach(card => {
        if (!card.hasAttribute('tabindex')) {
            card.setAttribute('tabindex', '0');
        }
    });
    
    // Add focus styles
    const style = document.createElement('style');
    style.textContent = `
        .target-card:focus {
            outline: 2px solid var(--primary-color);
            outline-offset: 2px;
        }
        
        .btn:focus {
            outline: 2px solid var(--primary-color);
            outline-offset: 2px;
        }
    `;
    document.head.appendChild(style);
});
