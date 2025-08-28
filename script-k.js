// Version K JavaScript - Fidèle au croquis original
// Design minimaliste et fonctionnalités essentielles

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 Version K - Seventee Landing Page évoluée (SaaS 2025)');
    
    // Initialisation moderne
    initializeSearch();
    initializeNavigation();
    initializeVersionSelector();
    initializeSearchSuggestions();
    initializeTrustAnimations();
    initializeMagneticButtons();
    
    // Afficher la page principale par défaut
    showMainPage();
    
    // Track simple
    trackEvent('page_loaded', { version: 'K-Enhanced' });
});

// Recherche intelligente avec suggestions
function initializeSearch() {
    const searchInput = document.getElementById('mainSearch');
    const searchButton = document.querySelector('.search-button');
    const suggestions = document.getElementById('searchSuggestions');
    
    if (!searchInput || !searchButton) return;
    
    // Gestion de la recherche
    const handleSearch = () => {
        const query = searchInput.value.trim();
        
        if (query.length === 0) {
            alert('Veuillez saisir une ville, un code postal ou une adresse');
            searchInput.focus();
            return;
        }
        
        // Track search
        trackEvent('search_performed', {
            query: query,
            location: 'main_search'
        });
        
        // Afficher le flow candidat avec la recherche
        showCandidatFlow();
        
        console.log('Recherche effectuée:', query);
    };
    
    // Événements
    searchButton.addEventListener('click', handleSearch);
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch();
        }
    });
    
    // Focus amélioré avec suggestions
    searchInput.addEventListener('focus', function() {
        this.parentElement.style.borderColor = 'var(--primary-color)';
        if (suggestions) {
            suggestions.style.display = 'block';
        }
    });
    
    searchInput.addEventListener('blur', function() {
        setTimeout(() => {
            if (!this.value) {
                this.parentElement.style.borderColor = '';
            }
            if (suggestions) {
                suggestions.style.display = 'none';
            }
        }, 200);
    });
}

// Navigation simple entre les pages
function initializeNavigation() {
    // Gestion des sections principales
    const candidatSection = document.querySelector('.candidat-section');
    const agencesSection = document.querySelector('.agences-section');
    
    if (candidatSection) {
        candidatSection.addEventListener('click', function() {
            trackEvent('section_clicked', { type: 'candidat' });
            showCandidatFlow();
        });
    }
    
    if (agencesSection) {
        agencesSection.addEventListener('click', function() {
            trackEvent('section_clicked', { type: 'agence' });
            showAgenceFlow();
        });
    }
    
    // Gestion des boutons CTA
    const ctaButtons = document.querySelectorAll('.section-btn, .flow-btn-primary');
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const btnText = this.textContent.trim();
            trackEvent('cta_clicked', { button: btnText });
            
            // Feedback visuel simple
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Log des redirections vers les vraies URLs
            if (btnText.includes('dossier')) {
                console.log('Redirection vers: https://candidate.seventee.com/location-appartement-maison');
            } else if (btnText.includes('démo')) {
                console.log('Redirection vers: https://landingpage.seventee.com/fr/demandez-une-démo-de-seventee');
            }
        });
    });
    
    // Gestion des boutons d'orientation
    const orientationBtns = document.querySelectorAll('.orientation-btn');
    orientationBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const btnText = this.textContent.trim();
            trackEvent('orientation_clicked', { button: btnText });
        });
    });
}

// Fonctions de navigation - Simple et direct
function showMainPage() {
    hideAllPages();
    document.getElementById('main-page').style.display = 'block';
}

function showCandidatFlow() {
    hideAllPages();
    const candidatFlow = document.getElementById('candidat-flow');
    candidatFlow.classList.add('active');
    candidatFlow.scrollIntoView({ behavior: 'smooth' });
}

function showAgenceFlow() {
    hideAllPages();
    const agenceFlow = document.getElementById('agence-flow');
    agenceFlow.classList.add('active');
    agenceFlow.scrollIntoView({ behavior: 'smooth' });
}

function showProprietaireHelp() {
    hideAllPages();
    const helpPage = document.getElementById('proprietaire-help');
    helpPage.classList.add('active');
    helpPage.scrollIntoView({ behavior: 'smooth' });
    trackEvent('help_page_viewed', { type: 'proprietaire' });
}

function showCandidatHelp() {
    hideAllPages();
    const helpPage = document.getElementById('candidat-help');
    helpPage.classList.add('active');
    helpPage.scrollIntoView({ behavior: 'smooth' });
    trackEvent('help_page_viewed', { type: 'candidat' });
}

function showAgenceHelp() {
    hideAllPages();
    const helpPage = document.getElementById('agence-help');
    helpPage.classList.add('active');
    helpPage.scrollIntoView({ behavior: 'smooth' });
    trackEvent('help_page_viewed', { type: 'agence' });
}

function hideAllPages() {
    // Cacher la page principale
    const mainPage = document.getElementById('main-page');
    if (mainPage) {
        mainPage.style.display = 'none';
    }
    
    // Cacher tous les flows et pages d'aide
    const allPages = document.querySelectorAll('.flow-page, .help-page');
    allPages.forEach(page => {
        page.classList.remove('active');
    });
}

// Sélecteur de version
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

// Fonction globale pour le changement de version
function switchVersion(path) {
    if (!path) return;
    window.location.href = path;
}

// Analytics simple - Tracking minimal
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

// Fonctions globales pour les événements HTML
window.showMainPage = showMainPage;
window.showCandidatFlow = showCandidatFlow;
window.showAgenceFlow = showAgenceFlow;
window.showProprietaireHelp = showProprietaireHelp;
window.showCandidatHelp = showCandidatHelp;
window.showAgenceHelp = showAgenceHelp;
window.switchVersion = switchVersion;

// Améliorations UX simples
document.addEventListener('DOMContentLoaded', function() {
    // Hover effects simples sur les cards
    const cards = document.querySelectorAll('.section-card, .step-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Focus amélioré pour l'accessibilité
    const focusableElements = document.querySelectorAll('button, input, select, a');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--primary-color)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
    
    // Gestion du retour (boutons back)
    const backButtons = document.querySelectorAll('.back-btn');
    backButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            showMainPage();
            trackEvent('back_clicked');
        });
    });
    
    // Gestion des raccourcis clavier simples
    document.addEventListener('keydown', function(e) {
        // Escape = retour à l'accueil
        if (e.key === 'Escape') {
            showMainPage();
        }
        
        // Alt + C = flow candidat
        if (e.altKey && e.key === 'c') {
            e.preventDefault();
            showCandidatFlow();
        }
        
        // Alt + A = flow agence
        if (e.altKey && e.key === 'a') {
            e.preventDefault();
            showAgenceFlow();
        }
    });
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

// Nouvelles fonctions SaaS modernes

// Initialisation des suggestions de recherche
function initializeSearchSuggestions() {
    const suggestions = document.getElementById('searchSuggestions');
    if (!suggestions) return;
    
    const suggestionItems = suggestions.querySelectorAll('.suggestion-item');
    suggestionItems.forEach(item => {
        item.addEventListener('click', function() {
            const searchInput = document.getElementById('mainSearch');
            const cityName = this.textContent.split(' ')[1]; // Extraire le nom de la ville
            
            if (searchInput) {
                searchInput.value = cityName;
                suggestions.style.display = 'none';
                trackEvent('suggestion_selected', { city: cityName });
            }
        });
    });
}

// Animations trust bar
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
