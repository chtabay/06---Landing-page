// Version I JavaScript - Restructured Landing Page

document.addEventListener('DOMContentLoaded', function() {
    console.log('Version I - Seventee Landing Page loaded (Restructured)');
    
    // Initialize all functionality with proper sequencing
    initializeSearchFunctionality();
    initializeNavigationHandlers();
    initializeAnimations();
    initializeVersionSelector();
    
    // Initialize performance monitoring
    initializePerformanceMonitoring();
    
    // Add smooth scrolling for anchor links
    setupSmoothScrolling();
    
    // Initialize accessibility features
    setupAccessibility();
    
    // Show choice section by default
    showChoice();
});

// Search functionality
function initializeSearchFunctionality() {
    const searchInput = document.getElementById('mainSearch');
    const searchButton = document.querySelector('.search-button');
    
    if (!searchInput || !searchButton) return;
    
    // Handle search input
    searchInput.addEventListener('input', function() {
        const query = this.value.trim();
        
        if (query.length > 0) {
            searchButton.classList.add('active');
        } else {
            searchButton.classList.remove('active');
        }
    });
    
    // Handle search submission
    const handleSearch = () => {
        const query = searchInput.value.trim();
        
        if (query.length === 0) {
            showNotification('Veuillez saisir une ville, un code postal ou une adresse', 'warning');
            return;
        }
        
        // Track search event
        trackEvent('search_performed', {
            query: query,
            location: 'hero_search'
        });
        
        // Show candidate flow for search
        showCandidatFlow();
        showNotification(`Recherche pour "${query}" - Découvrez nos offres !`, 'success');
        
        console.log('Search query:', query);
    };
    
    // Search button click
    searchButton.addEventListener('click', handleSearch);
    
    // Enter key search
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch();
        }
    });
}

// Navigation handlers for new structure
function initializeNavigationHandlers() {
    // Choice cards
    const choiceCards = document.querySelectorAll('.choice-card');
    choiceCards.forEach(card => {
        card.addEventListener('click', function() {
            const isCandidatChoice = this.classList.contains('candidat-choice');
            const choiceType = isCandidatChoice ? 'candidat' : 'agence';
            
            trackEvent('choice_selected', {
                type: choiceType,
                location: 'main_choice'
            });
            
            if (isCandidatChoice) {
                showCandidatFlow();
            } else {
                showAgenceFlow();
            }
        });
    });
    
    // Bottom buttons
    const bottomBtns = document.querySelectorAll('.bottom-btn');
    bottomBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const btnText = this.textContent.trim();
            trackEvent('bottom_btn_clicked', {
                button: btnText,
                location: 'bottom_buttons'
            });
        });
    });
    
    // Flow CTA buttons
    const flowBtns = document.querySelectorAll('.flow-section .btn--primary');
    flowBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const btnText = this.textContent.trim();
            const isCandidat = btnText.includes('candidat');
            
            trackEvent('flow_cta_clicked', {
                type: isCandidat ? 'candidat' : 'agence',
                button: btnText
            });
            
            if (isCandidat) {
                showNotification('Redirection vers la création de dossier candidat...', 'info');
            } else {
                showNotification('Demande de démo envoyée ! Nous vous contacterons sous 24h.', 'success');
            }
        });
    });
    
    // Video elements
    const videoElements = document.querySelectorAll('.video-placeholder, .video-card, .testimonial-video');
    videoElements.forEach(element => {
        element.addEventListener('click', function() {
            const videoTitle = this.querySelector('h3, h4, p')?.textContent || 'Vidéo';
            
            trackEvent('video_clicked', {
                video_title: videoTitle,
                location: this.closest('section')?.id || 'unknown'
            });
            
            showNotification('Lecture de la vidéo...', 'info');
            console.log('Video clicked:', videoTitle);
        });
    });
}

// Navigation functions for new structure
function showChoice() {
    hideAllSections();
    const aboveTheFold = document.querySelector('.above-the-fold');
    if (aboveTheFold) {
        aboveTheFold.style.display = 'block';
    }
}

function showCandidatFlow() {
    hideAllSections();
    const candidatFlow = document.getElementById('candidat-flow');
    if (candidatFlow) {
        candidatFlow.classList.remove('hidden');
        candidatFlow.style.display = 'block';
        candidatFlow.scrollIntoView({ behavior: 'smooth' });
    }
}

function showAgenceFlow() {
    hideAllSections();
    const agenceFlow = document.getElementById('agence-flow');
    if (agenceFlow) {
        agenceFlow.classList.remove('hidden');
        agenceFlow.style.display = 'block';
        agenceFlow.scrollIntoView({ behavior: 'smooth' });
    }
}

function showVideo() {
    hideAllSections();
    const videoSection = document.getElementById('video-section');
    if (videoSection) {
        videoSection.classList.remove('hidden');
        videoSection.style.display = 'block';
        videoSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function showTestimonials() {
    hideAllSections();
    const testimonialsSection = document.getElementById('testimonials-section');
    if (testimonialsSection) {
        testimonialsSection.classList.remove('hidden');
        testimonialsSection.style.display = 'block';
        testimonialsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function requestDemo() {
    showAgenceFlow();
    trackEvent('demo_requested_direct', { location: 'bottom_button' });
}

function hideAllSections() {
    const sections = document.querySelectorAll('.flow-section');
    sections.forEach(section => {
        section.classList.add('hidden');
        section.style.display = 'none';
    });
    
    const aboveTheFold = document.querySelector('.above-the-fold');
    if (aboveTheFold) {
        aboveTheFold.style.display = 'none';
    }
}

// Advanced animation and interaction system
function initializeAnimations() {
    // Enhanced Intersection Observer with stagger animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Track section views with enhanced analytics
                trackEvent('section_viewed', {
                    section: entry.target.id || entry.target.className,
                    timing: performance.now(),
                    viewport_height: window.innerHeight
                });
            }
        });
    }, observerOptions);
    
    // Observe sections for animation
    const sections = document.querySelectorAll('.hero, .choice-section, .bottom-buttons, .flow-section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Add advanced CSS animations
    addAnimationStyles();
    
    // Magnetic hover effects for choice cards
    initializeMagneticEffects();
    
    // Initialize micro-interactions
    initializeMicroInteractions();
}

// Modern CSS animations and micro-interactions
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Advanced Animation System */
        .hero, .choice-section, .bottom-buttons, .flow-section {
            opacity: 0;
            transform: translateY(40px);
            transition: opacity 1s cubic-bezier(0.4, 0, 0.2, 1), transform 1s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hero.animate-in {
            opacity: 1;
            transform: translateY(0);
            transition-delay: 0.1s;
        }
        
        .choice-section.animate-in {
            opacity: 1;
            transform: translateY(0);
            transition-delay: 0.3s;
        }
        
        .bottom-buttons.animate-in {
            opacity: 1;
            transform: translateY(0);
            transition-delay: 0.5s;
        }
        
        .flow-section.animate-in {
            opacity: 1;
            transform: translateY(0);
            transition-delay: 0.2s;
        }
        
        /* Choice card animations */
        .choice-card {
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Bottom button animations */
        .bottom-btn {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Video element animations */
        .video-placeholder, .video-card, .testimonial-video {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Performance Optimizations */
        .choice-card, .bottom-btn, .video-card {
            will-change: transform;
        }
        
        /* Reduced Motion Support */
        @media (prefers-reduced-motion: reduce) {
            * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }
    `;
    document.head.appendChild(style);
}

// Magnetic effects for choice cards
function initializeMagneticEffects() {
    const magneticElements = document.querySelectorAll('.choice-card');
    
    magneticElements.forEach(element => {
        let timeout;
        
        element.addEventListener('mouseenter', function(e) {
            clearTimeout(timeout);
            this.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        element.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const moveX = x * 0.1;
            const moveY = y * 0.1;
            
            this.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.02)`;
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            this.style.transform = 'translate(0px, 0px) scale(1)';
            
            // Reset transform after animation
            timeout = setTimeout(() => {
                this.style.transition = '';
            }, 500);
        });
    });
}

// Micro-interactions for enhanced user experience
function initializeMicroInteractions() {
    // Button press feedback
    const buttons = document.querySelectorAll('.btn, .choice-card, .bottom-btn');
    buttons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.96)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Search input focus effects
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('focus', function() {
            const wrapper = this.closest('.search-input-wrapper');
            wrapper.style.transform = 'scale(1.02)';
        });
        
        searchInput.addEventListener('blur', function() {
            const wrapper = this.closest('.search-input-wrapper');
            wrapper.style.transform = 'scale(1)';
        });
    }
}

// Version selector functionality
function initializeVersionSelector() {
    const versionSelect = document.getElementById('versionSelect');
    if (versionSelect) {
        versionSelect.value = 'index-i.html';
        
        versionSelect.addEventListener('change', function() {
            const selectedVersion = this.value;
            if (selectedVersion && selectedVersion !== 'index-i.html') {
                trackEvent('version_switched', {
                    from: 'index-i.html',
                    to: selectedVersion
                });
                
                window.location.href = selectedVersion;
            }
        });
    }
}

// Smooth scrolling for navigation
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                trackEvent('nav_link_clicked', {
                    target: targetId,
                    text: this.textContent.trim()
                });
            }
        });
    });
}

// Accessibility features
function setupAccessibility() {
    // Add focus management
    const interactiveElements = document.querySelectorAll('button, input, select, a, .choice-card, .bottom-btn');
    
    interactiveElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.classList.add('focus-visible');
        });
        
        element.addEventListener('blur', function() {
            this.classList.remove('focus-visible');
        });
    });
    
    // Keyboard navigation for choice cards
    const choiceCards = document.querySelectorAll('.choice-card');
    choiceCards.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Add accessibility styles
    const accessibilityStyles = document.createElement('style');
    accessibilityStyles.textContent = `
        .focus-visible {
            outline: 2px solid var(--primary-color);
            outline-offset: 2px;
        }
        
        .choice-card:focus {
            outline: 2px solid var(--primary-color);
            outline-offset: 2px;
        }
        
        /* High contrast mode support */
        @media (prefers-contrast: high) {
            .hero__subtitle {
                color: var(--text-dark);
            }
            
            .choice-card {
                border-width: 4px;
            }
        }
    `;
    document.head.appendChild(accessibilityStyles);
}

// Notification system
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
    
    // Add notification styles if not already present
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
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
            
            .notification--warning {
                background: #d97706;
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

// Analytics and tracking
function trackEvent(eventName, properties = {}) {
    // In a real application, you would send this to your analytics service
    console.log('Event tracked:', eventName, properties);
}

// Switch version function (called by select)
function switchVersion(path) {
    if (!path) return;
    window.location.href = path;
}

// Enhanced performance monitoring
function initializePerformanceMonitoring() {
    // Core Web Vitals tracking
    if ('PerformanceObserver' in window) {
        // Track Largest Contentful Paint
        try {
            new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lcp = entries[entries.length - 1];
                trackEvent('lcp_measured', { value: lcp.startTime });
            }).observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
            console.log('LCP observer not supported');
        }
        
        // Track First Input Delay
        try {
            new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    trackEvent('fid_measured', { value: entry.processingStart - entry.startTime });
                });
            }).observe({ entryTypes: ['first-input'] });
        } catch (e) {
            console.log('FID observer not supported');
        }
    }
    
    // Track custom metrics
    setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0];
        if (navigation) {
            trackEvent('page_performance', {
                loadTime: Math.round(navigation.loadEventEnd - navigation.fetchStart),
                domContentLoaded: Math.round(navigation.domContentLoadedEventEnd - navigation.fetchStart),
                version: 'index-i.html'
            });
        }
    }, 1000);
}

// Error handling
window.addEventListener('error', function(event) {
    console.error('JavaScript error:', event.error);
    
    // Track errors for debugging
    trackEvent('javascript_error', {
        message: event.error?.message || 'Unknown error',
        filename: event.filename || 'Unknown file',
        lineno: event.lineno || 0,
        colno: event.colno || 0
    });
});

window.addEventListener('load', function() {
    // Track page load time
    const loadTime = performance.now();
    trackEvent('page_loaded', {
        loadTime: Math.round(loadTime),
        version: 'index-i.html'
    });
    
    console.log(`Page loaded in ${Math.round(loadTime)}ms`);
});