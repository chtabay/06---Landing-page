// Version E JavaScript - Urgency & Scarcity

// Version switcher function
function switchVersion(version) {
    if (version && version !== '') {
        window.location.href = version;
    }
}

// Track events for analytics
function trackEvent(eventName, properties = {}) {
    console.log('Event tracked:', eventName, properties);
}

// Countdown functionality
let countdownDate = new Date();
countdownDate.setDate(countdownDate.getDate() + 15);
countdownDate.setHours(12, 45, 0, 0); // 15 days, 12 hours, 45 minutes from now

function updateCountdown() {
    const now = new Date().getTime();
    const distance = countdownDate.getTime() - now;
    
    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        
        // Update main countdown
        const mainCountdown = document.getElementById('mainCountdown');
        if (mainCountdown) {
            document.getElementById('countdownDays').textContent = days;
            document.getElementById('countdownHours').textContent = hours;
            document.getElementById('countdownMinutes').textContent = minutes;
        }
        
        // Update header countdown
        const headerCountdown = document.getElementById('countdownTimer');
        if (headerCountdown) {
            document.getElementById('days').textContent = days;
            document.getElementById('hours').textContent = hours;
            document.getElementById('minutes').textContent = minutes;
        }
        
        // Update form countdown
        const formTimer = document.getElementById('formTimer');
        if (formTimer) {
            formTimer.textContent = `${days}j ${hours}h`;
        }
        
        // Update footer countdown
        const footerCountdown = document.getElementById('footerCountdown');
        if (footerCountdown) {
            footerCountdown.textContent = `${days}j ${hours}h ${minutes}m`;
        }
    } else {
        // Countdown expired
        document.querySelectorAll('.countdown-number, .timer-digits span').forEach(el => {
            el.textContent = '0';
        });
        
        // Show expired message
        showCountdownExpired();
    }
}

function showCountdownExpired() {
    const urgencyBar = document.querySelector('.urgency-bar');
    if (urgencyBar) {
        urgencyBar.innerHTML = `
            <div class="container">
                <div class="urgency-content">
                    <span class="urgency-icon">⚠️</span>
                    <span class="urgency-text">
                        <strong>OFFRE EXPIRÉE</strong> - Contactez-nous pour les prochaines disponibilités
                    </span>
                </div>
            </div>
        `;
        urgencyBar.style.background = '#6b7280';
    }
}

// Spots remaining functionality
let spotsRemaining = 5;

function updateSpotsRemaining() {
    const spotElements = document.querySelectorAll('#remainingSpots, #spotsLeft, #timelineSpots, #formSpots');
    spotElements.forEach(el => {
        if (el) {
            el.textContent = spotsRemaining;
        }
    });
    
    // Update urgency based on spots
    if (spotsRemaining <= 2) {
        document.querySelectorAll('.urgency-number').forEach(el => {
            el.style.animation = 'pulse 1s infinite';
            el.style.color = '#dc2626';
        });
    }
    
    // If no spots left
    if (spotsRemaining <= 0) {
        showSpotsExhausted();
    }
}

function showSpotsExhausted() {
    const urgencyBar = document.querySelector('.urgency-bar');
    if (urgencyBar) {
        urgencyBar.innerHTML = `
            <div class="container">
                <div class="urgency-content">
                    <span class="urgency-icon">🚫</span>
                    <span class="urgency-text">
                        <strong>COMPLET</strong> - Liste d'attente disponible
                    </span>
                </div>
            </div>
        `;
        urgencyBar.style.background = '#dc2626';
    }
    
    // Disable form
    const form = document.getElementById('urgentForm');
    if (form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.textContent = 'REJOINDRE LA LISTE D\'ATTENTE';
            submitBtn.style.background = '#6b7280';
        }
    }
}

// Live activity simulation
const activityMessages = [
    { time: 'Il y a 12 minutes', text: 'Agence du Parc (Lyon 3ème) a réservé sa place' },
    { time: 'Il y a 35 minutes', text: 'Jean M. consulte actuellement cette page' },
    { time: 'Il y a 1 heure', text: 'Régie Central (Lyon 1er) a demandé plus d\'infos' },
    { time: 'Il y a 2 heures', text: 'Sophie L. a téléchargé la brochure' },
    { time: 'Il y a 3 heures', text: 'Immobilier Presqu\'île a réservé sa place' }
];

let currentActivityIndex = 0;

function updateLiveActivity() {
    const activityFeed = document.getElementById('activityFeed');
    if (!activityFeed) return;
    
    // Add new activity
    const newActivity = document.createElement('div');
    newActivity.className = 'activity-item';
    newActivity.innerHTML = `
        <span class="activity-time">${activityMessages[currentActivityIndex].time}</span>
        <span class="activity-text">${activityMessages[currentActivityIndex].text}</span>
    `;
    
    // Fade in animation
    newActivity.style.opacity = '0';
    newActivity.style.transform = 'translateY(-10px)';
    activityFeed.insertBefore(newActivity, activityFeed.firstChild);
    
    setTimeout(() => {
        newActivity.style.transition = 'all 0.5s ease';
        newActivity.style.opacity = '1';
        newActivity.style.transform = 'translateY(0)';
    }, 100);
    
    // Remove old activities (keep max 3)
    const activities = activityFeed.querySelectorAll('.activity-item');
    if (activities.length > 3) {
        activities[activities.length - 1].remove();
    }
    
    currentActivityIndex = (currentActivityIndex + 1) % activityMessages.length;
}

// Form handling with urgency
function initializeUrgentForm() {
    const form = document.getElementById('urgentForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Validate
        if (!validateUrgentForm(data)) {
            return;
        }
        
        // Show loading with urgency
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalContent = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="btn__icon">⏳</span> RÉSERVATION EN COURS...';
        submitBtn.disabled = true;
        
        // Track urgent form submission
        trackEvent('urgent_form_submitted', {
            name: data.name,
            company: data.company,
            spots_remaining: spotsRemaining,
            time_remaining: Math.floor((countdownDate - new Date()) / (1000 * 60 * 60)),
            timestamp: new Date().toISOString()
        });
        
        // Simulate reservation
        setTimeout(() => {
            showUrgentSuccess(data);
            
            // Decrease spots
            spotsRemaining--;
            updateSpotsRemaining();
            
            // Add to live activity
            addToLiveActivity(data.company);
            
            // Reset form
            setTimeout(() => {
                this.reset();
                submitBtn.innerHTML = originalContent;
                submitBtn.disabled = false;
                
                // Close any modals if needed
                const modal = document.querySelector('.modal.active');
                if (modal) {
                    modal.classList.remove('active');
                }
            }, 5000);
            
        }, 2000);
    });
}

function validateUrgentForm(data) {
    const required = ['name', 'company', 'email', 'phone'];
    const missing = required.filter(field => !data[field] || data[field].trim() === '');
    
    if (missing.length > 0) {
        showUrgentError(`Tous les champs sont obligatoires pour la réservation express`);
        return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showUrgentError('Email invalide');
        return false;
    }
    
    // Phone validation
    const phoneRegex = /^[\d\s\-\+\(\)\.]{10,}$/;
    if (!phoneRegex.test(data.phone)) {
        showUrgentError('Numéro de téléphone invalide');
        return false;
    }
    
    return true;
}

function showUrgentError(message) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.urgent-message');
    existingMessages.forEach(msg => msg.remove());
    
    const form = document.getElementById('urgentForm');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'urgent-message urgent-message--error';
    errorDiv.innerHTML = `
        <span class="message-icon">⚠️</span>
        <span class="message-text">${message}</span>
    `;
    
    form.insertBefore(errorDiv, form.firstChild);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

function showUrgentSuccess(data) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.urgent-message');
    existingMessages.forEach(msg => msg.remove());
    
    const form = document.getElementById('urgentForm');
    const successDiv = document.createElement('div');
    successDiv.className = 'urgent-message urgent-message--success';
    successDiv.innerHTML = `
        <span class="message-icon">🎉</span>
        <span class="message-text">
            <strong>${data.name}, votre place est réservée !</strong><br>
            Guillaume vous appelle dans les 60 minutes.
        </span>
    `;
    
    form.insertBefore(successDiv, form.firstChild);
    
    // Update form header
    const formHeader = document.querySelector('.form-urgency-header');
    if (formHeader) {
        formHeader.innerHTML = `
            <span class="form-urgency-icon">🎉</span>
            <span class="form-urgency-text">PLACE RÉSERVÉE AVEC SUCCÈS</span>
        `;
        formHeader.style.background = '#10b981';
    }
}

function addToLiveActivity(company) {
    const activityFeed = document.getElementById('activityFeed');
    if (!activityFeed) return;
    
    const newActivity = document.createElement('div');
    newActivity.className = 'activity-item';
    newActivity.innerHTML = `
        <span class="activity-time">À l'instant</span>
        <span class="activity-text">${company} vient de réserver sa place !</span>
    `;
    newActivity.style.background = '#d1fae5';
    newActivity.style.borderLeft = '4px solid #10b981';
    
    activityFeed.insertBefore(newActivity, activityFeed.firstChild);
    
    // Remove oldest
    const activities = activityFeed.querySelectorAll('.activity-item');
    if (activities.length > 3) {
        activities[activities.length - 1].remove();
    }
}

// Smooth scrolling
document.addEventListener('DOMContentLoaded', function() {
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
});

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
    // Start countdown
    updateCountdown();
    setInterval(updateCountdown, 60000); // Update every minute
    
    // Initialize spots
    updateSpotsRemaining();
    
    // Start live activity
    updateLiveActivity();
    setInterval(updateLiveActivity, 45000); // Every 45 seconds
    
    // Initialize form
    initializeUrgentForm();
    
    // Track page load
    trackEvent('urgency_page_loaded', {
        spots_remaining: spotsRemaining,
        time_remaining_hours: Math.floor((countdownDate - new Date()) / (1000 * 60 * 60)),
        timestamp: new Date().toISOString()
    });
});

// Phone number click tracking
document.addEventListener('DOMContentLoaded', function() {
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('urgent_phone_clicked', {
                phone_number: this.getAttribute('href'),
                spots_remaining: spotsRemaining,
                timestamp: new Date().toISOString()
            });
        });
    });
});

// Add urgent message styles
const style = document.createElement('style');
style.textContent = `
    .urgent-message {
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 1rem;
        display: flex;
        align-items: flex-start;
        gap: 0.5rem;
        font-weight: 500;
        animation: urgentSlideIn 0.3s ease;
    }
    
    .urgent-message--error {
        background: #fee2e2;
        color: #dc2626;
        border: 1px solid #fecaca;
        border-left: 4px solid #dc2626;
    }
    
    .urgent-message--success {
        background: #d1fae5;
        color: #065f46;
        border: 1px solid #a7f3d0;
        border-left: 4px solid #10b981;
    }
    
    @keyframes urgentSlideIn {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .message-icon {
        font-size: 1.2em;
        flex-shrink: 0;
        margin-top: 0.1rem;
    }
    
    .message-text {
        flex: 1;
        line-height: 1.4;
    }
    
    .activity-item {
        transition: all 0.3s ease;
    }
    
    .activity-item:hover {
        background: #f8fafc;
    }
`;
document.head.appendChild(style);
