// Version H JavaScript - Ultra Minimal & Action Focused

// Version switcher
function switchVersion(version) {
    if (version && version !== '') {
        window.location.href = version;
    }
}

// Demo modal functions
function openDemo() {
    const modal = document.getElementById('demoModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus on first input
        setTimeout(() => {
            const firstInput = modal.querySelector('input[name="name"]');
            if (firstInput) {
                firstInput.focus();
            }
        }, 300);
        
        // Track demo open
        trackEvent('demo_opened', {
            source: 'main_cta',
            timestamp: new Date().toISOString()
        });
    }
}

function closeDemo() {
    const modal = document.getElementById('demoModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Track demo close
        trackEvent('demo_closed', {
            timestamp: new Date().toISOString()
        });
    }
}

// Track events
function trackEvent(eventName, properties = {}) {
    console.log('Event:', eventName, properties);
    
    // Send to analytics if available
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, properties);
    }
    
    // Send to other tracking systems
    if (typeof mixpanel !== 'undefined') {
        mixpanel.track(eventName, properties);
    }
}

// Form handling
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('demoForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = {
            name: formData.get('name'),
            company: formData.get('company'),
            phone: formData.get('phone')
        };
        
        // Validate
        if (!data.name || !data.company || !data.phone) {
            showError('Tous les champs sont requis');
            return;
        }
        
        // Phone validation
        const phoneRegex = /^[\d\s\-\+\(\)\.]{10,}$/;
        if (!phoneRegex.test(data.phone)) {
            showError('Numéro de téléphone invalide');
            return;
        }
        
        // Show loading
        const submitBtn = this.querySelector('.form__submit');
        const originalContent = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="submit__text">Connexion...</span><span class="submit__icon">⏳</span>';
        submitBtn.disabled = true;
        
        // Track form submission
        trackEvent('demo_requested', {
            name: data.name,
            company: data.company,
            phone_provided: !!data.phone,
            timestamp: new Date().toISOString()
        });
        
        // Simulate immediate call
        setTimeout(() => {
            showSuccess(data);
            
            // Reset form after success
            setTimeout(() => {
                this.reset();
                submitBtn.innerHTML = originalContent;
                submitBtn.disabled = false;
                closeDemo();
            }, 3000);
            
        }, 1500);
    });
});

// Error handling
function showError(message) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.form-message');
    existingMessages.forEach(msg => msg.remove());
    
    const form = document.getElementById('demoForm');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-message form-message--error';
    errorDiv.innerHTML = `
        <span class="message-icon">⚠️</span>
        <span class="message-text">${message}</span>
    `;
    
    form.insertBefore(errorDiv, form.firstChild);
    
    // Auto remove
    setTimeout(() => {
        errorDiv.remove();
    }, 4000);
    
    // Track error
    trackEvent('form_error', {
        error_message: message,
        timestamp: new Date().toISOString()
    });
}

function showSuccess(data) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.form-message');
    existingMessages.forEach(msg => msg.remove());
    
    const form = document.getElementById('demoForm');
    const successDiv = document.createElement('div');
    successDiv.className = 'form-message form-message--success';
    successDiv.innerHTML = `
        <span class="message-icon">📞</span>
        <span class="message-text">Guillaume vous appelle dans 30 secondes !</span>
    `;
    
    form.insertBefore(successDiv, form.firstChild);
    
    // Update form title
    const title = document.querySelector('.demo-form__title');
    if (title) {
        title.textContent = `Merci ${data.name} !`;
    }
    
    const subtitle = document.querySelector('.demo-form__subtitle');
    if (subtitle) {
        subtitle.textContent = 'Restez près de votre téléphone';
    }
    
    // Track success
    trackEvent('demo_success', {
        name: data.name,
        company: data.company,
        timestamp: new Date().toISOString()
    });
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // ESC to close modal
    if (e.key === 'Escape') {
        closeDemo();
    }
    
    // Enter on hero to open demo
    if (e.key === 'Enter' && !document.querySelector('.modal.active')) {
        openDemo();
    }
});

// Click outside modal to close
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal__overlay')) {
        closeDemo();
    }
});

// Page load tracking
document.addEventListener('DOMContentLoaded', function() {
    trackEvent('page_loaded', {
        version: 'H',
        user_agent: navigator.userAgent,
        screen_width: window.screen.width,
        screen_height: window.screen.height,
        timestamp: new Date().toISOString()
    });
    
    // Track time on page
    let timeOnPage = 0;
    const trackingInterval = setInterval(() => {
        timeOnPage += 10;
        
        // Track engagement milestones
        if (timeOnPage === 30) {
            trackEvent('engaged_30s', { timestamp: new Date().toISOString() });
        } else if (timeOnPage === 60) {
            trackEvent('engaged_1min', { timestamp: new Date().toISOString() });
        } else if (timeOnPage === 120) {
            trackEvent('engaged_2min', { timestamp: new Date().toISOString() });
        }
    }, 10000);
    
    // Clear interval on page unload
    window.addEventListener('beforeunload', () => {
        clearInterval(trackingInterval);
        trackEvent('page_unload', {
            time_on_page: timeOnPage,
            timestamp: new Date().toISOString()
        });
    });
});

// Button interaction tracking
document.addEventListener('DOMContentLoaded', function() {
    const mainBtn = document.querySelector('.btn');
    if (mainBtn) {
        mainBtn.addEventListener('mouseenter', () => {
            trackEvent('cta_hover', { timestamp: new Date().toISOString() });
        });
        
        mainBtn.addEventListener('click', () => {
            trackEvent('cta_clicked', { timestamp: new Date().toISOString() });
        });
    }
    
    // Phone/email clicks
    const phoneLink = document.querySelector('.footer__phone');
    const emailLink = document.querySelector('.footer__email');
    
    if (phoneLink) {
        phoneLink.addEventListener('click', () => {
            trackEvent('phone_clicked', {
                phone_number: phoneLink.getAttribute('href'),
                timestamp: new Date().toISOString()
            });
        });
    }
    
    if (emailLink) {
        emailLink.addEventListener('click', () => {
            trackEvent('email_clicked', {
                email: emailLink.getAttribute('href'),
                timestamp: new Date().toISOString()
            });
        });
    }
});

// Add dynamic message styles
const style = document.createElement('style');
style.textContent = `
    .form-message {
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 500;
        animation: slideDown 0.3s ease;
    }
    
    .form-message--error {
        background: #fee2e2;
        color: #dc2626;
        border: 1px solid #fecaca;
    }
    
    .form-message--success {
        background: #d1fae5;
        color: #065f46;
        border: 1px solid #a7f3d0;
    }
    
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .message-icon {
        font-size: 1.2em;
    }
    
    .message-text {
        flex: 1;
    }
`;
document.head.appendChild(style);

// Performance tracking
window.addEventListener('load', function() {
    // Track page performance
    if ('performance' in window && 'timing' in window.performance) {
        const timing = window.performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        
        trackEvent('page_performance', {
            load_time: loadTime,
            dom_ready: timing.domContentLoadedEventEnd - timing.navigationStart,
            timestamp: new Date().toISOString()
        });
    }
});

// Viewport tracking
function trackViewport() {
    trackEvent('viewport_info', {
        width: window.innerWidth,
        height: window.innerHeight,
        device_pixel_ratio: window.devicePixelRatio,
        timestamp: new Date().toISOString()
    });
}

// Track viewport on load and resize
window.addEventListener('load', trackViewport);
window.addEventListener('resize', debounce(trackViewport, 1000));

// Debounce function
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
