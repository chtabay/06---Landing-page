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
    
    // Initialize page with candidate section visible by default
    // (No need to call function as it's already the default layout)
    
    // Initialize city autocomplete
    initializeCityAutocomplete();

    // Try to swap hero illustration with local asset if available
    trySwapHeroImage();

    // Init version selector if present
    const versionSelect = document.getElementById('versionSelect');
    if (versionSelect) {
        versionSelect.value = detectCurrentVariant();
    }
});

// Show Agency Section
function showAgencySection() {
    const agencySection = document.getElementById('agences');
    const candidateSection = document.getElementById('candidats');
    const discoverCta = document.getElementById('discoverAgencyCta');
    const backCta = document.getElementById('backToCandidatesCta');
    
    if (agencySection && candidateSection) {
        agencySection.classList.remove('hidden');
        candidateSection.classList.add('hidden');
        if (discoverCta && backCta) {
            discoverCta.classList.add('hidden');
            backCta.classList.remove('hidden');
        }
        
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
    const discoverCta = document.getElementById('discoverAgencyCta');
    const backCta = document.getElementById('backToCandidatesCta');
    
    if (agencySection && candidateSection) {
        candidateSection.classList.remove('hidden');
        agencySection.classList.add('hidden');
        if (discoverCta && backCta) {
            discoverCta.classList.remove('hidden');
            backCta.classList.add('hidden');
        }
        
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

// City Autocomplete functionality
function initializeCityAutocomplete() {
    const cityInput = document.getElementById('citySearch');
    const dropdown = document.getElementById('autocompleteDropdown');
    
    if (!cityInput || !dropdown) return;
    
    const cities = [
        'Lyon 1er (69001)', 'Lyon 2ème (69002)', 'Lyon 3ème (69003)', 'Lyon 4ème (69004)', 'Lyon 5ème (69005)', 'Lyon 6ème (69006)', 'Lyon 7ème (69007)', 'Lyon 8ème (69008)', 'Lyon 9ème (69009)',
        'Villeurbanne (69100)', 'Vénissieux (69200)', 'Caluire-et-Cuire (69300)', 'Bron (69500)', 'Vaulx-en-Velin (69120)', 'Saint-Priest (69800)', 'Rillieux-la-Pape (69140)',
        'Meyzieu (69330)', 'Décines-Charpieu (69150)', 'Oullins (69600)', 'Sainte-Foy-lès-Lyon (69110)', 'Tassin-la-Demi-Lune (69160)', 'Écully (69130)', 'Givors (69700)',
        'Saint-Genis-Laval (69230)', 'Francheville (69340)', 'Chassieu (69680)', 'Dardilly (69570)', 'Limonest (69760)', "Marcy-l'Étoile (69280)", "Collonges-au-Mont-d'Or (69660)",
        'Charbonnières-les-Bains (69260)', 'Neuville-sur-Saône (69250)'
    ];
    
    let highlightedIndex = -1;
    
    cityInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        
        if (query.length === 0) {
            hideDropdown();
            return;
        }
        
        const filteredCities = cities.filter(city => 
            city.toLowerCase().includes(query)
        );
        
        if (filteredCities.length > 0) {
            showDropdown(filteredCities);
        } else {
            hideDropdown();
        }
        
        highlightedIndex = -1;
    });
    
    cityInput.addEventListener('keydown', function(e) {
        const items = dropdown.querySelectorAll('.autocomplete-item');
        
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            highlightedIndex = Math.min(highlightedIndex + 1, items.length - 1);
            updateHighlight(items);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            highlightedIndex = Math.max(highlightedIndex - 1, -1);
            updateHighlight(items);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (highlightedIndex >= 0 && items[highlightedIndex]) {
                selectCity(items[highlightedIndex].textContent);
            }
        } else if (e.key === 'Escape') {
            hideDropdown();
        }
    });
    
    cityInput.addEventListener('blur', function() {
        // Delay hiding to allow click on dropdown items
        setTimeout(hideDropdown, 150);
    });
    
    function showDropdown(cities) {
        dropdown.innerHTML = '';
        
        cities.forEach(city => {
            const item = document.createElement('div');
            item.className = 'autocomplete-item';
            item.textContent = city;
            item.addEventListener('click', () => selectCity(city));
            dropdown.appendChild(item);
        });
        
        dropdown.style.display = 'block';
    }
    
    function hideDropdown() {
        dropdown.style.display = 'none';
        highlightedIndex = -1;
    }
    
    function updateHighlight(items) {
        items.forEach((item, index) => {
            if (index === highlightedIndex) {
                item.classList.add('highlighted');
            } else {
                item.classList.remove('highlighted');
            }
        });
    }
    
    function selectCity(city) {
        cityInput.value = city;
        hideDropdown();
        // Track city selection
        trackEvent('city_selected', { city: city });
    }
}

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

// Swap hero image with local asset if present
function trySwapHeroImage() {
    const heroImg = document.querySelector('.hero__img');
    if (!heroImg) return;

    const candidates = [
        'Ressources/Seventee_Assets/hero_seventee.webp',
        'Ressources/Seventee_Assets/hero_seventee.jpg',
        'Ressources/Seventee_Assets/hero_seventee.png',
        'Ressources/Seventee_Assets/hero.webp',
        'Ressources/Seventee_Assets/hero.jpg',
        'Ressources/Seventee_Assets/hero.png'
    ];

    let replaced = false;
    const testNext = (index) => {
        if (index >= candidates.length || replaced) return;
        const testImg = new Image();
        testImg.onload = function() {
            if (replaced) return;
            heroImg.src = candidates[index];
            replaced = true;
        };
        testImg.onerror = function() {
            testNext(index + 1);
        };
        testImg.src = candidates[index] + '?v=' + Date.now();
    };

    testNext(0);
}

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

// Switch between variants
function switchVersion(path) {
    if (!path) return;
    window.location.href = path;
}

function detectCurrentVariant() {
    const file = (window.location.pathname.split('/').pop() || 'index.html');
    if (file === '' || file === 'index.html') return 'index.html';
    if (file === 'index-alt.html') return 'index-alt.html';
    if (file === 'compare.html') return 'compare.html';
    return 'index.html';
}
