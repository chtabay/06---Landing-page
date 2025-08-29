// Version K JavaScript - Refactorisé pour un parcours utilisateur unique et clair

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 Version K - Logique de parcours unique activée');
    
    // Initialisations modernes et ciblées
    initializeSearch();
    initializeVersionSelector();
    initializeScrollAnchors();
    initializeFloatingCta();
    initializeTrustAnimations(); // Gardé de la version précédente
});

// Recherche intelligente (comportement inchangé pour l'instant)
function initializeSearch() {
    const searchInput = document.getElementById('mainSearch');
    const searchButton = document.querySelector('.search-button');
    
    if (!searchInput || !searchButton) return;
    
    const handleSearch = () => {
        const query = searchInput.value.trim();
        if (query.length === 0) {
            searchInput.focus();
            return;
        }
        trackEvent('search_performed', { query: query });
        // Pour l'instant, la recherche redirige vers le tunnel candidat
        window.open('https://candidate.seventee.com/location-appartement-maison', '_blank');
    };
    
    searchButton.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch();
        }
    });
}

// Nouvelle fonction pour la navigation par ancres
function initializeScrollAnchors() {
    const anchorButtons = document.querySelectorAll('.assistance-btn');
    anchorButtons.forEach(button => {
        // L'ID de la section est déjà dans l'attribut onclick
        button.addEventListener('click', () => {
            const sectionId = button.getAttribute('onclick').match(/'([^']+)'/)[1];
            scrollToSection(sectionId);
        });
    });
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        trackEvent('anchor_scroll', { to_section: sectionId });
    }
}

// Nouvelle fonction pour gérer le CTA flottant
function initializeFloatingCta() {
    const floatingCta = document.getElementById('floatingCta');
    const heroSection = document.querySelector('.main-page');
    if (!floatingCta || !heroSection) return;

    const heroHeight = heroSection.offsetHeight;

    window.addEventListener('scroll', () => {
        if (window.scrollY > heroHeight / 2) {
            floatingCta.classList.add('visible');
        } else {
            floatingCta.classList.remove('visible');
        }
    }, { passive: true });
}


// --- Fonctions conservées et globales ---

// Sélecteur de version (inchangé)
function initializeVersionSelector() {
    const versionSelect = document.getElementById('versionSelect');
    if (versionSelect) {
        versionSelect.value = 'index-k.html';
        
        versionSelect.addEventListener('change', function() {
            const selectedVersion = this.value;
            if (selectedVersion && selectedVersion !== 'index-k.html') {
                trackEvent('version_switched', {
                    from: 'index-k.html',
                    to: selectedVersion
                });
                
                window.location.href = selectedVersion;
            }
        });
    }
}

// Fonction globale pour le changement de version (requise par l'HTML)
function switchVersion(path) {
    if (!path) return;
    window.location.href = path;
}

// Analytics simple (inchangé)
function trackEvent(eventName, properties = {}) {
    const eventData = {
        event: eventName,
        timestamp: Date.now(),
        version: 'K',
        ...properties
    };
    
    // Log simple pour debug
    console.log('📊 Event:', eventData);
    
    // En production, envoi vers service analytics
    // analytics.track(eventName, eventData);
}

// Gestion des erreurs simple
window.addEventListener('error', function(event) {
    console.error('Erreur JavaScript:', event.error);
    trackEvent('javascript_error', {
        message: event.error?.message || 'Erreur inconnue'
    });
});

// Performance simple
window.addEventListener('load', function() {
    const loadTime = performance.now();
    trackEvent('page_loaded_complete', {
        loadTime: Math.round(loadTime),
        version: 'K'
    });
    
    console.log(`✅ Version K chargée en ${Math.round(loadTime)}ms`);
});

// Détection du type de device pour analytics
function getDeviceType() {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
}

// Track device info au chargement
window.addEventListener('load', function() {
    trackEvent('device_info', {
        type: getDeviceType(),
        viewport: `${window.innerWidth}x${window.innerHeight}`,
        user_agent: navigator.userAgent.substring(0, 100)
    });
});

// Animations trust bar (inchangé)
function initializeTrustAnimations() {
    const trustNumbers = document.querySelectorAll('.trust-number');
    
    const animateNumber = (element, targetValue) => {
        const isPercentage = targetValue.includes('%');
        const number = parseInt(targetValue.replace(/[^0-9]/g, ''));
        const suffix = isPercentage ? '%' : targetValue.replace(number.toString(), '');
        
        let current = 0;
        const increment = number / 30; // Animation sur 30 frames
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                current = number;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + suffix;
        }, 50);
    };
    
    // Observer pour déclencher l'animation au scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetValue = entry.target.dataset.target || entry.target.textContent;
                animateNumber(entry.target, targetValue);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    trustNumbers.forEach(number => {
        number.dataset.target = number.textContent;
        number.textContent = '0';
        observer.observe(number);
    });
}

// Magnetic hover effect pour les boutons d'assistance
function initializeMagneticButtons() {
    const assistanceButtons = document.querySelectorAll('.assistance-btn');
    
    assistanceButtons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) translateY(-4px)`;
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Gestion responsive simple
window.addEventListener('resize', function() {
    const newDeviceType = getDeviceType();
    trackEvent('viewport_changed', {
        device_type: newDeviceType,
        viewport: `${window.innerWidth}x${window.innerHeight}`
    });
});
