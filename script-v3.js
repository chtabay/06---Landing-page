// V3 Script - Version simplifiée et directe

// Version switcher function
function switchVersion(version) {
    if (version && version !== '') {
        window.location.href = version;
    }
}

// Rotating hero messages
const heroMessages = [
    'Vous en avez marre de <span class="highlight">trier 50 candidatures</span> ?',
    'Votre standard <span class="highlight">sature</span> à chaque annonce ?',
    'Vous perdez <span class="highlight">6h par location</span> en tri ?',
    'Vos coûts de diffusion <span class="highlight">explosent</span> ?',
    'Vous dites "c\'est déjà loué" <span class="highlight">50 fois par jour</span> ?',
    'Vos équipes sont <span class="highlight">épuisées</span> par le tri ?'
];

let currentMessageIndex = 0;

function rotateHeroMessage() {
    const messageElement = document.querySelector('.rotating-message');
    if (!messageElement) return;
    
    // Fade out
    messageElement.style.opacity = '0';
    messageElement.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
        // Change message
        currentMessageIndex = (currentMessageIndex + 1) % heroMessages.length;
        messageElement.innerHTML = heroMessages[currentMessageIndex];
        
        // Fade in
        messageElement.style.opacity = '1';
        messageElement.style.transform = 'translateY(0)';
    }, 300);
}

// Initialize message rotation
function initializeMessageRotation() {
    const messageElement = document.querySelector('.rotating-message');
    if (!messageElement) return;
    
    // Set initial message
    messageElement.innerHTML = heroMessages[0];
    
    // Start rotation after 3 seconds, then every 4 seconds
    setTimeout(() => {
        setInterval(rotateHeroMessage, 4000);
    }, 3000);
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

    // Initialize city autocomplete
    initializeCityAutocomplete();
    
    // Initialize message rotation
    initializeMessageRotation();
});

// City autocomplete functionality
function initializeCityAutocomplete() {
    const searchInput = document.getElementById('city-search');
    if (!searchInput) return;

    const cities = [
        'Lyon 1er', 'Lyon 2e', 'Lyon 3e', 'Lyon 4e', 'Lyon 5e', 'Lyon 6e', 'Lyon 7e', 'Lyon 8e', 'Lyon 9e',
        'Villeurbanne', 'Vénissieux', 'Saint-Priest', 'Caluire-et-Cuire', 'Bron', 'Décines-Charpieu',
        'Vaulx-en-Velin', 'Rillieux-la-Pape', 'Oullins', 'Pierre-Bénite', 'Sainte-Foy-lès-Lyon',
        '69001', '69002', '69003', '69004', '69005', '69006', '69007', '69008', '69009',
        '69100', '69200', '69300', '69400', '69500', '69600', '69700', '69800', '69900',
        'Paris', 'Marseille', 'Toulouse', 'Nice', 'Nantes', 'Montpellier', 'Strasbourg', 'Bordeaux',
        'Lille', 'Rennes', 'Reims', 'Toulon', 'Grenoble', 'Dijon', 'Angers', 'Nîmes'
    ];

    let dropdown = null;
    let highlightedIndex = -1;

    searchInput.addEventListener('input', function() {
        const value = this.value.toLowerCase();
        
        if (value.length < 2) {
            hideDropdown();
            return;
        }

        const matches = cities.filter(city => 
            city.toLowerCase().includes(value)
        ).slice(0, 8);

        if (matches.length > 0) {
            showDropdown(matches);
        } else {
            hideDropdown();
        }
    });

    searchInput.addEventListener('keydown', function(e) {
        if (!dropdown) return;

        switch(e.key) {
            case 'ArrowDown':
                e.preventDefault();
                updateHighlight(1);
                break;
            case 'ArrowUp':
                e.preventDefault();
                updateHighlight(-1);
                break;
            case 'Enter':
                e.preventDefault();
                if (highlightedIndex >= 0) {
                    selectCity(dropdown.children[highlightedIndex].textContent);
                }
                break;
            case 'Escape':
                hideDropdown();
                break;
        }
    });

    searchInput.addEventListener('blur', function() {
        // Delay hiding to allow click on dropdown
        setTimeout(() => {
            hideDropdown();
        }, 200);
    });

    function showDropdown(matches) {
        hideDropdown();
        
        dropdown = document.createElement('div');
        dropdown.className = 'city-dropdown';
        dropdown.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            border: 1px solid #ddd;
            border-top: none;
            border-radius: 0 0 8px 8px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            z-index: 1000;
            max-height: 200px;
            overflow-y: auto;
        `;

        matches.forEach((city, index) => {
            const item = document.createElement('div');
            item.textContent = city;
            item.style.cssText = `
                padding: 12px 16px;
                cursor: pointer;
                border-bottom: 1px solid #f0f0f0;
                transition: background-color 0.2s;
            `;
            
            item.addEventListener('mouseenter', () => {
                updateHighlight(index - highlightedIndex);
            });
            
            item.addEventListener('click', () => {
                selectCity(city);
            });
            
            dropdown.appendChild(item);
        });

        searchInput.parentElement.style.position = 'relative';
        searchInput.parentElement.appendChild(dropdown);
        highlightedIndex = -1;
    }

    function hideDropdown() {
        if (dropdown) {
            dropdown.remove();
            dropdown = null;
            highlightedIndex = -1;
        }
    }

    function updateHighlight(direction) {
        if (!dropdown) return;

        const items = dropdown.children;
        if (items.length === 0) return;

        // Remove previous highlight
        if (highlightedIndex >= 0) {
            items[highlightedIndex].style.backgroundColor = '';
        }

        // Update index
        highlightedIndex += direction;
        
        if (highlightedIndex < 0) {
            highlightedIndex = items.length - 1;
        } else if (highlightedIndex >= items.length) {
            highlightedIndex = 0;
        }

        // Add new highlight
        items[highlightedIndex].style.backgroundColor = '#f0f8ff';
    }

    function selectCity(city) {
        searchInput.value = city;
        hideDropdown();
        // Here you could trigger a search or redirect
        console.log('Selected city:', city);
    }
}

// Flow navigation functions
function showCandidateFlow() {
    hideAllFlows();
    document.getElementById('candidate-flow').style.display = 'block';
    document.getElementById('candidate-flow').scrollIntoView({ behavior: 'smooth' });
}

function showAgencyFlow() {
    hideAllFlows();
    document.getElementById('agency-flow').style.display = 'block';
    document.getElementById('agency-flow').scrollIntoView({ behavior: 'smooth' });
}

function showMainSolution() {
    hideAllFlows();
    document.getElementById('solution').scrollIntoView({ behavior: 'smooth' });
}

function hideAllFlows() {
    const flows = ['candidate-flow', 'agency-flow'];
    flows.forEach(flowId => {
        const element = document.getElementById(flowId);
        if (element) {
            element.style.display = 'none';
        }
    });
}

// Form handlers
function setupFormHandlers() {
    // Search form handler
    const searchForm = document.querySelector('.search-bar');
    if (searchForm) {
        const searchBtn = searchForm.querySelector('.search-btn');
        const searchInput = searchForm.querySelector('.search-input');
        
        if (searchBtn && searchInput) {
            searchBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const city = searchInput.value.trim();
                if (city) {
                    // Here you would typically redirect to search results
                    console.log('Searching for:', city);
                    alert(`Recherche pour: ${city}\n\nCette fonctionnalité sera bientôt disponible !`);
                }
            });
        }
    }
}

// Initialize form handlers when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setupFormHandlers();
});

// Video card click handlers
document.addEventListener('DOMContentLoaded', function() {
    const videoCards = document.querySelectorAll('.video-card');
    videoCards.forEach(card => {
        card.addEventListener('click', function() {
            const videoTitle = this.querySelector('h3, h4')?.textContent || 'Vidéo';
            const videoType = this.classList.contains('video-card--main') ? 'démonstration' : 'témoignage';
            
            console.log('Video clicked:', videoTitle);
            
            // Here you would typically open a video modal or redirect to video
            alert(`${videoType.charAt(0).toUpperCase() + videoType.slice(1)} : ${videoTitle}\n\nCette vidéo sera bientôt disponible !`);
            
            // Track video click
            trackEvent('video_clicked', { 
                video_type: videoType,
                video_title: videoTitle 
            });
        });
    });
});

// Add some interactive feedback
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to solution cards
    const solutionCards = document.querySelectorAll('.solution-card');
    solutionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add click feedback to audience buttons
    const audienceBtns = document.querySelectorAll('.audience-btn');
    audienceBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Add a subtle click animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
});

// Simple analytics tracking (placeholder)
function trackEvent(eventName, properties = {}) {
    console.log('Event tracked:', eventName, properties);
    // Here you would integrate with your analytics platform
}

// Track important user interactions
document.addEventListener('DOMContentLoaded', function() {
    // Track audience selection
    const audienceBtns = document.querySelectorAll('.audience-btn');
    audienceBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const audience = this.classList.contains('audience-btn--candidate') ? 'candidate' : 'agency';
            trackEvent('audience_selected', { audience });
        });
    });

    // Track CTA clicks
    const ctaButtons = document.querySelectorAll('.btn--primary');
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const ctaText = this.textContent.trim();
            trackEvent('cta_clicked', { cta_text: ctaText });
        });
    });

    // Track contact option clicks
    const contactOptions = document.querySelectorAll('.contact-option');
    contactOptions.forEach(option => {
        option.addEventListener('click', function() {
            const contactType = this.querySelector('h3').textContent.trim();
            trackEvent('contact_clicked', { contact_type: contactType });
        });
    });
});
