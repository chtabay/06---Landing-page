// Version J JavaScript - Modern SaaS Landing Page
// Inspired by Mila, Cognitool, Momentum patterns

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Version J - Seventee Landing Page loaded');
    
    // Initialize all functionality with modern patterns
    initializeAdvancedSearch();
    initializeModernNavigation();
    initializeAnimationSystem();
    initializeVersionSelector();
    initializePerformanceTracking();
    initializeTrustSignals();
    initializeAccessibility();
    
    // Show main page by default
    showMainPage();
    
    // Track page load
    trackEvent('page_loaded', {
        version: 'J',
        timestamp: Date.now(),
        user_agent: navigator.userAgent
    });
});

// Advanced Search with Modern UX
function initializeAdvancedSearch() {
    const searchInput = document.getElementById('mainSearch');
    const searchButton = document.querySelector('.search-button');
    const searchWrapper = document.querySelector('.search-input-wrapper');
    
    if (!searchInput || !searchButton) return;
    
    let searchTimeout;
    
    // Enhanced input handling with debouncing
    searchInput.addEventListener('input', function() {
        const query = this.value.trim();
        
        // Clear previous timeout
        clearTimeout(searchTimeout);
        
        // Debounced search suggestions
        searchTimeout = setTimeout(() => {
            if (query.length > 2) {
                // Simulate search suggestions (would be real API call)
                showSearchSuggestions(query);
                trackEvent('search_input', { query_length: query.length });
            } else {
                hideSearchSuggestions();
            }
        }, 300);
        
        // Visual feedback
        if (query.length > 0) {
            searchWrapper.classList.add('has-content');
            searchButton.style.background = 'var(--primary-color)';
        } else {
            searchWrapper.classList.remove('has-content');
            searchButton.style.background = '';
        }
    });
    
    // Handle search submission
    const handleSearch = () => {
        const query = searchInput.value.trim();
        
        if (query.length === 0) {
            showNotification('Veuillez saisir une ville ou un code postal', 'warning');
            searchInput.focus();
            return;
        }
        
        // Enhanced validation
        if (query.length < 2) {
            showNotification('Veuillez saisir au moins 2 caractères', 'warning');
            return;
        }
        
        // Track search with enhanced data
        trackEvent('search_performed', {
            query: query,
            query_type: detectQueryType(query),
            location: 'hero_search',
            timestamp: Date.now()
        });
        
        // Visual feedback
        searchButton.innerHTML = '<span>Recherche...</span>';
        searchWrapper.style.opacity = '0.7';
        
        // Simulate API call delay
        setTimeout(() => {
            // Show candidate flow with search context
            showCandidatFlow(query);
            showNotification(`Recherche lancée pour "${query}" - Découvrez nos offres !`, 'success');
            
            // Reset button
            searchButton.innerHTML = '<span>Commencer</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
            searchWrapper.style.opacity = '1';
        }, 1000);
    };
    
    // Button click
    searchButton.addEventListener('click', handleSearch);
    
    // Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch();
        }
    });
    
    // Focus enhancements
    searchInput.addEventListener('focus', function() {
        searchWrapper.classList.add('focused');
        trackEvent('search_focused');
    });
    
    searchInput.addEventListener('blur', function() {
        searchWrapper.classList.remove('focused');
        // Hide suggestions after a delay
        setTimeout(hideSearchSuggestions, 200);
    });
}

// Modern Navigation System
function initializeModernNavigation() {
    // Choice cards with enhanced interactions
    const choiceCards = document.querySelectorAll('.choice-card');
    choiceCards.forEach(card => {
        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
        
        // Click handling with loading state
        card.addEventListener('click', function() {
            const isCandidatChoice = this.classList.contains('candidat-choice');
            const choiceType = isCandidatChoice ? 'candidat' : 'agence';
            
            // Visual feedback
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            trackEvent('choice_selected', {
                type: choiceType,
                location: 'main_choice',
                timing: performance.now()
            });
            
            // Show loading state
            showLoadingOverlay();
            
            setTimeout(() => {
                hideLoadingOverlay();
                if (isCandidatChoice) {
                    showCandidatFlow();
                } else {
                    showAgenceFlow();
                }
            }, 800);
        });
        
        // Keyboard navigation
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Action buttons with enhanced feedback
    const actionBtns = document.querySelectorAll('.action-btn');
    actionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const btnText = this.querySelector('.action-title').textContent;
            
            trackEvent('action_btn_clicked', {
                button: btnText,
                location: 'bottom_actions'
            });
            
            // Visual feedback
            this.style.transform = 'scale(0.96)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Enhanced CTA buttons
    const ctaBtns = document.querySelectorAll('.btn--primary');
    ctaBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const btnText = this.textContent.trim();
            const isCandidat = btnText.toLowerCase().includes('candidat');
            const isTest = btnText.toLowerCase().includes('tester');
            
            trackEvent('cta_clicked', {
                type: isCandidat ? 'candidat' : 'agence',
                button: btnText,
                is_test: isTest
            });
            
            // Enhanced feedback
            if (isCandidat) {
                showNotification('🎯 Création de votre dossier candidat...', 'info');
                // Simulate redirection
                setTimeout(() => {
                    showNotification('✅ Redirection vers l\'espace candidat', 'success');
                }, 2000);
            } else if (isTest) {
                showNotification('🚀 Lancement de votre période d\'essai gratuite...', 'info');
                setTimeout(() => {
                    showNotification('✅ Accès démo envoyé ! Consultez vos emails.', 'success');
                }, 2000);
            } else {
                showNotification('📧 Demande de démo envoyée ! Nous vous contacterons sous 24h.', 'success');
            }
        });
    });
}

// Navigation Functions with Enhanced Transitions
function showMainPage() {
    hideAllSections();
    document.querySelector('.above-the-fold').style.display = 'block';
    fadeInElement(document.querySelector('.above-the-fold'));
}

function showCandidatFlow(searchQuery = null) {
    hideAllSections();
    const candidatFlow = document.getElementById('candidat-flow');
    if (candidatFlow) {
        candidatFlow.classList.remove('hidden');
        candidatFlow.style.display = 'block';
        fadeInElement(candidatFlow);
        candidatFlow.scrollIntoView({ behavior: 'smooth' });
        
        // Update content based on search query
        if (searchQuery) {
            updateCandidatFlowForSearch(searchQuery);
        }
    }
}

function showAgenceFlow() {
    hideAllSections();
    const agenceFlow = document.getElementById('agence-flow');
    if (agenceFlow) {
        agenceFlow.classList.remove('hidden');
        agenceFlow.style.display = 'block';
        fadeInElement(agenceFlow);
        agenceFlow.scrollIntoView({ behavior: 'smooth' });
    }
}

function showDemo() {
    hideAllSections();
    const demoSection = document.getElementById('demo-section');
    if (demoSection) {
        demoSection.classList.remove('hidden');
        demoSection.style.display = 'block';
        fadeInElement(demoSection);
        demoSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function showTestimonials() {
    hideAllSections();
    const testimonialsSection = document.getElementById('testimonials-section');
    if (testimonialsSection) {
        testimonialsSection.classList.remove('hidden');
        testimonialsSection.style.display = 'block';
        fadeInElement(testimonialsSection);
        testimonialsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function showSecurity() {
    hideAllSections();
    const securitySection = document.getElementById('security-section');
    if (securitySection) {
        securitySection.classList.remove('hidden');
        securitySection.style.display = 'block';
        fadeInElement(securitySection);
        securitySection.scrollIntoView({ behavior: 'smooth' });
    }
}

function showChoice() {
    showMainPage();
    // Scroll to choice section
    setTimeout(() => {
        document.querySelector('.choice-section').scrollIntoView({ behavior: 'smooth' });
    }, 300);
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

// Advanced Animation System
function initializeAnimationSystem() {
    // Enhanced Intersection Observer
    const observerOptions = {
        threshold: [0.1, 0.25, 0.5],
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const element = entry.target;
            
            if (entry.isIntersecting) {
                // Staggered animations
                const children = element.querySelectorAll('.choice-card, .testimonial-quick, .action-btn, .feature-item');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate-in');
                    }, index * 100);
                });
                
                element.classList.add('animate-in');
                
                // Track section views with enhanced analytics
                trackEvent('section_viewed', {
                    section: element.id || element.className,
                    scroll_depth: Math.round((window.scrollY / document.body.scrollHeight) * 100),
                    viewport_height: window.innerHeight,
                    timing: performance.now()
                });
            }
        });
    }, observerOptions);
    
    // Observe sections
    const sections = document.querySelectorAll('.hero, .choice-section, .social-proof, .bottom-actions, .flow-section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Magnetic hover effects
    initializeMagneticEffects();
    
    // Parallax effects
    initializeParallaxEffects();
    
    // Loading animations
    initializeLoadingAnimations();
}

// Magnetic Effects for Premium UX
function initializeMagneticEffects() {
    const magneticElements = document.querySelectorAll('.choice-card, .action-btn');
    
    magneticElements.forEach(element => {
        let timeout;
        
        element.addEventListener('mouseenter', function() {
            clearTimeout(timeout);
            this.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        element.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const moveX = x * 0.05;
            const moveY = y * 0.05;
            
            this.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.02)`;
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            this.style.transform = 'translate(0px, 0px) scale(1)';
            
            timeout = setTimeout(() => {
                this.style.transition = '';
            }, 500);
        });
    });
}

// Parallax Effects
function initializeParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.hero::before');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Loading Animations
function initializeLoadingAnimations() {
    // Create loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loading-content">
            <div class="loading-spinner"></div>
            <p>Chargement...</p>
        </div>
    `;
    document.body.appendChild(loadingOverlay);
    
    // Add loading styles
    const loadingStyles = document.createElement('style');
    loadingStyles.textContent = `
        .loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            z-index: 9999;
            display: none;
            align-items: center;
            justify-content: center;
        }
        
        .loading-content {
            text-align: center;
        }
        
        .loading-spinner {
            width: 40px;
            height: 40px;
            border: 3px solid var(--gray-200);
            border-top: 3px solid var(--primary-color);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .loading-overlay.show {
            display: flex;
        }
    `;
    document.head.appendChild(loadingStyles);
}

// Performance Tracking & Analytics
function initializePerformanceTracking() {
    // Core Web Vitals
    if ('PerformanceObserver' in window) {
        // LCP - Largest Contentful Paint
        try {
            new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lcp = entries[entries.length - 1];
                trackEvent('core_web_vital', {
                    metric: 'LCP',
                    value: Math.round(lcp.startTime),
                    rating: lcp.startTime < 2500 ? 'good' : lcp.startTime < 4000 ? 'needs-improvement' : 'poor'
                });
            }).observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
            console.log('LCP observer not supported');
        }
        
        // FID - First Input Delay
        try {
            new PerformanceObserver((list) => {
                list.getEntries().forEach(entry => {
                    const fid = entry.processingStart - entry.startTime;
                    trackEvent('core_web_vital', {
                        metric: 'FID',
                        value: Math.round(fid),
                        rating: fid < 100 ? 'good' : fid < 300 ? 'needs-improvement' : 'poor'
                    });
                });
            }).observe({ entryTypes: ['first-input'] });
        } catch (e) {
            console.log('FID observer not supported');
        }
        
        // CLS - Cumulative Layout Shift
        try {
            let clsValue = 0;
            new PerformanceObserver((list) => {
                list.getEntries().forEach(entry => {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                    }
                });
                
                trackEvent('core_web_vital', {
                    metric: 'CLS',
                    value: Math.round(clsValue * 1000) / 1000,
                    rating: clsValue < 0.1 ? 'good' : clsValue < 0.25 ? 'needs-improvement' : 'poor'
                });
            }).observe({ entryTypes: ['layout-shift'] });
        } catch (e) {
            console.log('CLS observer not supported');
        }
    }
    
    // Custom performance metrics
    setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0];
        if (navigation) {
            trackEvent('page_performance', {
                loadTime: Math.round(navigation.loadEventEnd - navigation.fetchStart),
                domContentLoaded: Math.round(navigation.domContentLoadedEventEnd - navigation.fetchStart),
                firstByte: Math.round(navigation.responseStart - navigation.fetchStart),
                version: 'J'
            });
        }
    }, 1000);
}

// Trust Signals & Security Features
function initializeTrustSignals() {
    // Security badge animations
    const trustItems = document.querySelectorAll('.trust-item');
    trustItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 100);
        }, index * 200);
    });
    
    // Security section interactions
    const securityCards = document.querySelectorAll('.security-card');
    securityCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderColor = 'var(--primary-color)';
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.borderColor = '';
            this.style.transform = '';
        });
    });
    
    // Trust validation
    setTimeout(() => {
        showNotification('🔒 Connexion sécurisée établie', 'success', 2000);
    }, 3000);
}

// Enhanced Accessibility
function initializeAccessibility() {
    // Enhanced focus management
    const interactiveElements = document.querySelectorAll('button, input, select, a, [tabindex="0"]');
    
    interactiveElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.classList.add('focus-visible');
            // Ensure element is visible
            this.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        });
        
        element.addEventListener('blur', function() {
            this.classList.remove('focus-visible');
        });
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Alt + H = Home
        if (e.altKey && e.key === 'h') {
            e.preventDefault();
            showMainPage();
            showNotification('Retour à l\'accueil', 'info');
        }
        
        // Alt + C = Contact
        if (e.altKey && e.key === 'c') {
            e.preventDefault();
            document.querySelector('.nav__link--highlight').click();
        }
        
        // Escape = Back to choice
        if (e.key === 'Escape') {
            const currentSection = document.querySelector('.flow-section:not(.hidden)');
            if (currentSection) {
                showChoice();
            }
        }
    });
    
    // Announce page changes for screen readers
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.style.position = 'absolute';
    announcer.style.left = '-10000px';
    announcer.style.width = '1px';
    announcer.style.height = '1px';
    announcer.style.overflow = 'hidden';
    document.body.appendChild(announcer);
    
    window.announcePageChange = function(message) {
        announcer.textContent = message;
    };
}

// Version Selector
function initializeVersionSelector() {
    const versionSelect = document.getElementById('versionSelect');
    if (versionSelect) {
        versionSelect.value = 'index-j.html';
        
        versionSelect.addEventListener('change', function() {
            const selectedVersion = this.value;
            if (selectedVersion && selectedVersion !== 'index-j.html') {
                trackEvent('version_switched', {
                    from: 'index-j.html',
                    to: selectedVersion
                });
                
                showNotification('Changement de version...', 'info');
                setTimeout(() => {
                    window.location.href = selectedVersion;
                }, 500);
            }
        });
    }
}

// Utility Functions
function fadeInElement(element) {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s ease';
    
    setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }, 50);
}

function showLoadingOverlay() {
    const overlay = document.querySelector('.loading-overlay');
    if (overlay) {
        overlay.classList.add('show');
    }
}

function hideLoadingOverlay() {
    const overlay = document.querySelector('.loading-overlay');
    if (overlay) {
        overlay.classList.remove('show');
    }
}

function detectQueryType(query) {
    if (/^\d{5}$/.test(query)) return 'postal_code';
    if (/^\d+/.test(query)) return 'address_number';
    if (query.toLowerCase().includes('arrondissement') || /\d+e/.test(query)) return 'district';
    return 'city_name';
}

function updateCandidatFlowForSearch(query) {
    const videoPlaceholder = document.querySelector('#candidat-flow .video-placeholder p');
    if (videoPlaceholder) {
        videoPlaceholder.textContent = `Vidéo : Trouvez votre logement à ${query}`;
    }
}

function showSearchSuggestions(query) {
    // Simulate search suggestions (would be real API in production)
    const suggestions = [
        `${query} - Paris`,
        `${query} - Lyon`,
        `${query} - Marseille`
    ];
    
    // Implementation would show dropdown with suggestions
    console.log('Search suggestions for:', query, suggestions);
}

function hideSearchSuggestions() {
    // Hide search suggestions dropdown
    console.log('Hide search suggestions');
}

// Enhanced Notification System
function showNotification(message, type = 'info', duration = 5000) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    
    // Icons for different types
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    
    notification.innerHTML = `
        <div class="notification__content">
            <span class="notification__icon">${icons[type] || icons.info}</span>
            <span class="notification__message">${message}</span>
            <button class="notification__close" onclick="this.parentElement.parentElement.remove()">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        </div>
    `;
    
    // Add enhanced notification styles
    if (!document.querySelector('#notification-styles-j')) {
        const style = document.createElement('style');
        style.id = 'notification-styles-j';
        style.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                z-index: 10000;
                max-width: 400px;
                padding: 16px 20px;
                border-radius: 12px;
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
                animation: slideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.2);
            }
            
            .notification--success {
                background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                color: white;
            }
            
            .notification--error {
                background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
                color: white;
            }
            
            .notification--info {
                background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
                color: white;
            }
            
            .notification--warning {
                background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
                color: white;
            }
            
            .notification__content {
                display: flex;
                align-items: center;
                gap: 12px;
            }
            
            .notification__icon {
                font-size: 18px;
                flex-shrink: 0;
            }
            
            .notification__message {
                flex: 1;
                font-weight: 500;
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
                flex-shrink: 0;
            }
            
            .notification__close:hover {
                opacity: 1;
                background: rgba(255, 255, 255, 0.1);
            }
            
            @keyframes slideInRight {
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
    
    // Auto-remove
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1) reverse';
            setTimeout(() => {
                notification.remove();
            }, 400);
        }
    }, duration);
    
    // Track notification
    trackEvent('notification_shown', {
        type: type,
        message: message,
        duration: duration
    });
}

// Analytics & Tracking
function trackEvent(eventName, properties = {}) {
    // Enhanced tracking with more context
    const eventData = {
        event: eventName,
        timestamp: Date.now(),
        page_version: 'J',
        user_agent: navigator.userAgent.substring(0, 100),
        viewport: `${window.innerWidth}x${window.innerHeight}`,
        scroll_position: window.scrollY,
        ...properties
    };
    
    // In production, send to analytics service
    console.log('📊 Event tracked:', eventData);
    
    // Store locally for debugging
    if (typeof localStorage !== 'undefined') {
        const events = JSON.parse(localStorage.getItem('seventee_events_j') || '[]');
        events.push(eventData);
        localStorage.setItem('seventee_events_j', JSON.stringify(events.slice(-100))); // Keep last 100 events
    }
}

// Global functions for HTML onclick handlers
window.showCandidatFlow = showCandidatFlow;
window.showAgenceFlow = showAgenceFlow;
window.showDemo = showDemo;
window.showTestimonials = showTestimonials;
window.showSecurity = showSecurity;
window.showChoice = showChoice;
window.switchVersion = function(path) {
    if (!path) return;
    window.location.href = path;
};

// Error handling
window.addEventListener('error', function(event) {
    trackEvent('javascript_error', {
        message: event.error?.message || 'Unknown error',
        filename: event.filename || 'Unknown file',
        lineno: event.lineno || 0,
        colno: event.colno || 0,
        stack: event.error?.stack?.substring(0, 500) || 'No stack trace'
    });
    
    console.error('JavaScript error:', event.error);
});

// Performance monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    trackEvent('page_fully_loaded', {
        loadTime: Math.round(loadTime),
        version: 'J'
    });
    
    console.log(`🚀 Version J loaded in ${Math.round(loadTime)}ms`);
});
