// Version F JavaScript - ROI & Calculator

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

// ROI Calculator Variables
let currentMetrics = {
    numProperties: 10,
    avgRent: 800,
    vacancyRate: 5,
    currentPortalCosts: 300,
    timePerRental: 6,
    hourlyRate: 25
};

// Calculator functions
function initializeCalculator() {
    const calculator = document.getElementById('roiCalculator');
    if (!calculator) return;
    
    // Initialize sliders
    initializeSlider('propertiesSlider', 'propertiesValue', 1, 50, 10, updateCalculator);
    initializeSlider('rentSlider', 'rentValue', 400, 2000, 800, updateCalculator);
    initializeSlider('vacancySlider', 'vacancyValue', 0, 30, 5, updateCalculator);
    initializeSlider('costSlider', 'costValue', 100, 1000, 300, updateCalculator);
    initializeSlider('timeSlider', 'timeValue', 2, 20, 6, updateCalculator);
    initializeSlider('hourlySlider', 'hourlyValue', 15, 50, 25, updateCalculator);
    
    // Initial calculation
    updateCalculator();
}

function initializeSlider(sliderId, valueId, min, max, initial, callback) {
    const slider = document.getElementById(sliderId);
    const valueDisplay = document.getElementById(valueId);
    
    if (!slider || !valueDisplay) return;
    
    slider.min = min;
    slider.max = max;
    slider.value = initial;
    
    // Update display
    updateSliderDisplay(slider, valueDisplay);
    
    slider.addEventListener('input', function() {
        updateSliderDisplay(this, valueDisplay);
        if (callback) callback();
    });
}

function updateSliderDisplay(slider, valueDisplay) {
    const id = slider.id;
    const value = parseInt(slider.value);
    
    switch(id) {
        case 'propertiesSlider':
            valueDisplay.textContent = value + ' biens';
            currentMetrics.numProperties = value;
            break;
        case 'rentSlider':
            valueDisplay.textContent = value + '€/mois';
            currentMetrics.avgRent = value;
            break;
        case 'vacancySlider':
            valueDisplay.textContent = value + '%';
            currentMetrics.vacancyRate = value;
            break;
        case 'costSlider':
            valueDisplay.textContent = value + '€/mois';
            currentMetrics.currentPortalCosts = value;
            break;
        case 'timeSlider':
            valueDisplay.textContent = value + 'h/location';
            currentMetrics.timePerRental = value;
            break;
        case 'hourlySlider':
            valueDisplay.textContent = value + '€/h';
            currentMetrics.hourlyRate = value;
            break;
    }
}

function updateCalculator() {
    const metrics = currentMetrics;
    
    // Calculate current situation
    const monthlyRentals = Math.round((metrics.numProperties * 12) / 12); // Average per month
    const annualRentals = metrics.numProperties * (12 / 12); // Simplified
    
    const currentCosts = {
        portalCosts: metrics.currentPortalCosts * 12, // Annual
        timeCosts: (metrics.timePerRental * metrics.hourlyRate * annualRentals * 12), // Time spent per rental
        totalCurrent: 0
    };
    currentCosts.totalCurrent = currentCosts.portalCosts + currentCosts.timeCosts;
    
    // Calculate Seventee costs
    const seventeeCosts = {
        subscription: 120 * 12, // €120/month
        reducedTimeCosts: (2 * metrics.hourlyRate * annualRentals * 12), // 2h instead of 6h
        totalSeventee: 0
    };
    seventeeCosts.totalSeventee = seventeeCosts.subscription + seventeeCosts.reducedTimeCosts;
    
    // Calculate savings
    const annualSavings = currentCosts.totalCurrent - seventeeCosts.totalSeventee;
    const monthlySavings = annualSavings / 12;
    const roi = ((annualSavings / seventeeCosts.subscription) * 100);
    const paybackMonths = seventeeCosts.subscription / monthlySavings;
    
    // Update display
    updateCalculatorDisplay({
        currentCosts,
        seventeeCosts,
        annualSavings,
        monthlySavings,
        roi,
        paybackMonths
    });
    
    // Track calculation
    trackEvent('roi_calculated', {
        properties: metrics.numProperties,
        annual_savings: Math.round(annualSavings),
        roi_percentage: Math.round(roi),
        payback_months: Math.round(paybackMonths),
        timestamp: new Date().toISOString()
    });
}

function updateCalculatorDisplay(results) {
    // Current costs
    updateElementText('currentPortalCosts', formatCurrency(results.currentCosts.portalCosts));
    updateElementText('currentTimeCosts', formatCurrency(results.currentCosts.timeCosts));
    updateElementText('currentTotalCosts', formatCurrency(results.currentCosts.totalCurrent));
    
    // Seventee costs
    updateElementText('seventeeSubscription', formatCurrency(results.seventeeCosts.subscription));
    updateElementText('seventeeTimeCosts', formatCurrency(results.seventeeCosts.reducedTimeCosts));
    updateElementText('seventeeTotalCosts', formatCurrency(results.seventeeCosts.totalSeventee));
    
    // Savings
    updateElementText('annualSavings', formatCurrency(results.annualSavings));
    updateElementText('monthlySavings', formatCurrency(results.monthlySavings));
    
    // ROI metrics
    updateElementText('roiPercentage', Math.round(results.roi) + '%');
    updateElementText('paybackMonths', Math.round(results.paybackMonths) + ' mois');
    
    // Update ROI color based on value
    const roiElement = document.getElementById('roiPercentage');
    if (roiElement) {
        if (results.roi > 200) {
            roiElement.style.color = '#10b981'; // Green
        } else if (results.roi > 100) {
            roiElement.style.color = '#3b82f6'; // Blue
        } else {
            roiElement.style.color = '#6b7280'; // Gray
        }
    }
    
    // Update savings highlight
    updateSavingsHighlight(results.annualSavings, results.monthlySavings);
}

function updateElementText(id, text) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = text;
    }
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

function updateSavingsHighlight(annual, monthly) {
    const highlightElements = document.querySelectorAll('.savings-amount');
    highlightElements.forEach(element => {
        element.textContent = formatCurrency(annual);
    });
    
    const monthlyElements = document.querySelectorAll('.monthly-savings');
    monthlyElements.forEach(element => {
        element.textContent = formatCurrency(monthly) + '/mois';
    });
}

// Form handling with ROI context
function initializeROIForm() {
    const form = document.getElementById('roiForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Validate
        if (!validateROIForm(data)) {
            return;
        }
        
        // Show loading
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalContent = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="btn__icon">📊</span> Calcul en cours...';
        submitBtn.disabled = true;
        
        // Track form submission with calculator context
        trackEvent('roi_form_submitted', {
            name: data.name,
            company: data.company,
            properties: data.properties,
            estimated_savings: getCurrentEstimatedSavings(),
            current_roi: getCurrentROI(),
            timestamp: new Date().toISOString()
        });
        
        // Simulate ROI analysis
        setTimeout(() => {
            showROISuccess(data);
            
            // Reset form
            setTimeout(() => {
                this.reset();
                submitBtn.innerHTML = originalContent;
                submitBtn.disabled = false;
            }, 8000);
            
        }, 2500);
    });
}

function validateROIForm(data) {
    const required = ['name', 'company', 'email', 'properties'];
    const missing = required.filter(field => !data[field] || data[field].trim() === '');
    
    if (missing.length > 0) {
        showROIError(`Informations manquantes pour calculer votre ROI : ${missing.join(', ')}`);
        return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showROIError('Email invalide - nous en avons besoin pour vous envoyer votre analyse ROI');
        return false;
    }
    
    // Properties validation
    const numProperties = parseInt(data.properties);
    if (isNaN(numProperties) || numProperties < 1) {
        showROIError('Nombre de biens invalide');
        return false;
    }
    
    return true;
}

function showROIError(message) {
    showMessage(message, 'error');
}

function showROISuccess(data) {
    const currentSavings = getCurrentEstimatedSavings();
    const currentROI = getCurrentROI();
    
    const message = `
        <strong>${data.name}, votre analyse ROI est prête !</strong><br>
        Économies estimées : <span style="color: #10b981; font-weight: 700;">${formatCurrency(currentSavings)}/an</span><br>
        ROI : <span style="color: #3b82f6; font-weight: 700;">${Math.round(currentROI)}%</span><br>
        <em>Guillaume vous envoie le rapport détaillé sous 30 minutes.</em>
    `;
    
    showMessage(message, 'success');
}

function showMessage(message, type) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.roi-message');
    existingMessages.forEach(msg => msg.remove());
    
    const form = document.getElementById('roiForm');
    const messageDiv = document.createElement('div');
    messageDiv.className = `roi-message roi-message--${type}`;
    messageDiv.innerHTML = `
        <span class="message-icon">${type === 'error' ? '⚠️' : '📊'}</span>
        <span class="message-text">${message}</span>
    `;
    
    form.insertBefore(messageDiv, form.firstChild);
    
    setTimeout(() => {
        messageDiv.remove();
    }, type === 'error' ? 5000 : 10000);
}

function getCurrentEstimatedSavings() {
    const metrics = currentMetrics;
    const currentCosts = (metrics.currentPortalCosts * 12) + (metrics.timePerRental * metrics.hourlyRate * metrics.numProperties * 12);
    const seventeeCosts = (120 * 12) + (2 * metrics.hourlyRate * metrics.numProperties * 12);
    return currentCosts - seventeeCosts;
}

function getCurrentROI() {
    const savings = getCurrentEstimatedSavings();
    const investment = 120 * 12; // Annual subscription
    return (savings / investment) * 100;
}

// Interactive case studies
function initializeCaseStudies() {
    const caseCards = document.querySelectorAll('.case-card');
    
    caseCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            // Add visual feedback
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 300);
            
            const caseTitle = this.querySelector('.case-title')?.textContent;
            trackEvent('case_study_clicked', {
                case_index: index,
                case_title: caseTitle,
                timestamp: new Date().toISOString()
            });
            
            // Show detailed modal or expand content
            showCaseStudyDetails(index);
        });
    });
}

function showCaseStudyDetails(index) {
    const cases = [
        {
            title: "Agence Centrale Lyon",
            details: "15 biens → Économies de 4 200€/an → ROI de 292%",
            story: "En 6 mois, cette agence a divisé par 3 son temps de gestion locative et éliminé 80% des appels parasites."
        },
        {
            title: "Réseaux Privilège",
            details: "35 biens → Économies de 8 500€/an → ROI de 590%",
            story: "Grâce à la préqualification automatique, ils se concentrent maintenant sur les dossiers de qualité."
        },
        {
            title: "Immobilier Presqu'île",
            details: "8 biens → Économies de 2 800€/an → ROI de 194%",
            story: "Même avec un portefeuille modeste, le retour sur investissement est immédiat et mesurable."
        }
    ];
    
    const caseData = cases[index];
    if (!caseData) return;
    
    alert(`${caseData.title}\n\n${caseData.details}\n\n${caseData.story}\n\nContactez-nous pour une analyse détaillée de votre situation !`);
}

// Guarantee interactions
function initializeGuarantees() {
    const guaranteeCards = document.querySelectorAll('.guarantee-card');
    
    guaranteeCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        card.addEventListener('click', function() {
            const guaranteeTitle = this.querySelector('h3')?.textContent;
            trackEvent('guarantee_clicked', {
                guarantee_index: index,
                guarantee_title: guaranteeTitle,
                timestamp: new Date().toISOString()
            });
        });
    });
}

// Dynamic ROI scenarios
function initializeROIScenarios() {
    const scenarios = [
        { properties: 5, rent: 600, label: "Petite agence" },
        { properties: 15, rent: 800, label: "Agence moyenne" },
        { properties: 30, rent: 1000, label: "Grande agence" }
    ];
    
    scenarios.forEach((scenario, index) => {
        const button = document.createElement('button');
        button.className = 'btn btn--outline scenario-btn';
        button.textContent = scenario.label;
        button.addEventListener('click', () => {
            applyScenario(scenario);
            trackEvent('scenario_applied', {
                scenario: scenario.label,
                properties: scenario.properties,
                timestamp: new Date().toISOString()
            });
        });
        
        const container = document.querySelector('.calculator-scenarios');
        if (container) {
            container.appendChild(button);
        }
    });
}

function applyScenario(scenario) {
    // Update sliders
    const propertiesSlider = document.getElementById('propertiesSlider');
    const rentSlider = document.getElementById('rentSlider');
    
    if (propertiesSlider) {
        propertiesSlider.value = scenario.properties;
        updateSliderDisplay(propertiesSlider, document.getElementById('propertiesValue'));
    }
    
    if (rentSlider) {
        rentSlider.value = scenario.rent;
        updateSliderDisplay(rentSlider, document.getElementById('rentValue'));
    }
    
    // Recalculate
    updateCalculator();
    
    // Visual feedback
    const calculator = document.getElementById('roiCalculator');
    if (calculator) {
        calculator.style.animation = 'roiUpdate 0.5s ease';
        setTimeout(() => {
            calculator.style.animation = '';
        }, 500);
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
    initializeCalculator();
    initializeROIForm();
    initializeCaseStudies();
    initializeGuarantees();
    initializeROIScenarios();
    
    // Track page load
    trackEvent('roi_page_loaded', {
        timestamp: new Date().toISOString()
    });
});

// Phone and email tracking with ROI context
document.addEventListener('DOMContentLoaded', function() {
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('roi_phone_clicked', {
                phone_number: this.getAttribute('href'),
                estimated_savings: getCurrentEstimatedSavings(),
                context: 'roi_contact',
                timestamp: new Date().toISOString()
            });
        });
    });
    
    emailLinks.forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('roi_email_clicked', {
                email: this.getAttribute('href'),
                estimated_savings: getCurrentEstimatedSavings(),
                context: 'roi_contact',
                timestamp: new Date().toISOString()
            });
        });
    });
});

// Add ROI-specific CSS animations
const style = document.createElement('style');
style.textContent = `
    .roi-message {
        padding: 1.5rem;
        border-radius: 12px;
        margin-bottom: 1.5rem;
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;
        font-weight: 500;
        animation: roiSlideIn 0.5s ease;
        line-height: 1.6;
    }
    
    .roi-message--error {
        background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
        color: #7f1d1d;
        border: 1px solid #fecaca;
        border-left: 4px solid #ef4444;
    }
    
    .roi-message--success {
        background: linear-gradient(135deg, #f0fdf4 0%, #d1fae5 100%);
        color: #14532d;
        border: 1px solid #a7f3d0;
        border-left: 4px solid #10b981;
    }
    
    @keyframes roiSlideIn {
        from {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
    
    @keyframes roiUpdate {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.02);
            box-shadow: 0 8px 30px rgba(59, 130, 246, 0.2);
        }
    }
    
    .message-icon {
        font-size: 1.5em;
        flex-shrink: 0;
        margin-top: 0.1rem;
    }
    
    .message-text {
        flex: 1;
        line-height: 1.6;
    }
    
    .scenario-btn {
        margin: 0.5rem;
        transition: all 0.3s ease;
    }
    
    .scenario-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(59, 130, 246, 0.2);
    }
    
    .calculator-scenarios {
        text-align: center;
        margin-top: 1rem;
        padding-top: 1rem;
        border-top: 1px solid #e5e7eb;
    }
`;
document.head.appendChild(style);
