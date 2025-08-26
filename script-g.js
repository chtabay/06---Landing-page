// Version G JavaScript - Emotional & Storytelling

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

// Smooth scrolling for navigation links
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

    // Initialize all emotional features
    initializeStoryAnimations();
    initializeEmotionalForm();
    initializeTimelineEffects();
    initializeTestimonialInteractions();
});

// Story animations
function initializeStoryAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('story-animate');
                
                // Track story section views
                const sectionId = entry.target.id || entry.target.className;
                trackEvent('story_section_viewed', {
                    section: sectionId,
                    timestamp: new Date().toISOString()
                });
            }
        });
    }, { threshold: 0.3 });

    // Observe story elements
    const storyElements = document.querySelectorAll('.story-step, .problem-card, .testimonial-card--emotional, .comparison-side');
    storyElements.forEach(element => {
        observer.observe(element);
    });
}

// Timeline effects
function initializeTimelineEffects() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        item.addEventListener('mouseenter', function() {
            // Highlight the timeline item
            this.style.transform = 'translateX(10px)';
            this.style.transition = 'transform 0.3s ease';
            
            // Add emotional feedback
            const problemIcon = this.querySelector('.problem-icon');
            if (problemIcon) {
                problemIcon.style.transform = 'scale(1.2)';
                problemIcon.style.transition = 'transform 0.3s ease';
            }
            
            trackEvent('timeline_item_hovered', {
                item_index: index,
                timestamp: new Date().toISOString()
            });
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            
            const problemIcon = this.querySelector('.problem-icon');
            if (problemIcon) {
                problemIcon.style.transform = 'scale(1)';
            }
        });
    });
}

// Testimonial interactions
function initializeTestimonialInteractions() {
    const testimonialCards = document.querySelectorAll('.testimonial-card--emotional');
    
    testimonialCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            // Add emotional pulse effect
            this.style.animation = 'emotionalPulse 0.6s ease';
            
            setTimeout(() => {
                this.style.animation = '';
            }, 600);
            
            const testimonialTitle = this.querySelector('.testimonial-title')?.textContent;
            trackEvent('testimonial_clicked', {
                testimonial_index: index,
                testimonial_title: testimonialTitle,
                timestamp: new Date().toISOString()
            });
        });
        
        // Add heart effect on hover
        card.addEventListener('mouseenter', function() {
            const emotion = this.querySelector('.testimonial-emotion');
            if (emotion) {
                emotion.style.transform = 'scale(1.1)';
                emotion.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const emotion = this.querySelector('.testimonial-emotion');
            if (emotion) {
                emotion.style.transform = 'scale(1)';
            }
        });
    });
}

// Emotional form handling
function initializeEmotionalForm() {
    const form = document.querySelector('.story-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Validate with emotional messaging
        if (!validateEmotionalForm(data)) {
            return;
        }
        
        // Show emotional loading
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalContent = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="btn__icon">💙</span> Envoi de votre message...';
        submitBtn.disabled = true;
        
        // Track emotional form submission
        trackEvent('emotional_form_submitted', {
            name: data.name,
            company: data.company,
            has_challenge: !!data.challenge,
            challenge_length: data.challenge ? data.challenge.length : 0,
            timestamp: new Date().toISOString()
        });
        
        // Simulate personal response
        setTimeout(() => {
            showEmotionalSuccess(data);
            
            // Reset form with emotional message
            setTimeout(() => {
                this.reset();
                submitBtn.innerHTML = originalContent;
                submitBtn.disabled = false;
            }, 8000);
            
        }, 2500);
    });
    
    // Add real-time character count for challenge field
    const challengeField = form.querySelector('textarea[name="challenge"]');
    if (challengeField) {
        challengeField.addEventListener('input', function() {
            updateCharacterCount(this);
        });
    }
}

function updateCharacterCount(textarea) {
    const maxLength = 500;
    const currentLength = textarea.value.length;
    
    // Remove existing counter
    const existingCounter = textarea.parentNode.querySelector('.character-counter');
    if (existingCounter) {
        existingCounter.remove();
    }
    
    // Add counter
    const counter = document.createElement('div');
    counter.className = 'character-counter';
    counter.style.cssText = `
        text-align: right;
        font-size: 0.875rem;
        color: ${currentLength > maxLength * 0.8 ? '#f59e0b' : '#6b7280'};
        margin-top: 0.25rem;
    `;
    counter.textContent = `${currentLength}/${maxLength} caractères`;
    
    textarea.parentNode.appendChild(counter);
    
    // Add encouraging messages
    if (currentLength > 50 && currentLength < 100) {
        counter.textContent += ' - Parfait, continuez !';
        counter.style.color = '#10b981';
    } else if (currentLength > 200) {
        counter.textContent += ' - Merci pour ces détails';
        counter.style.color = '#6366f1';
    }
}

function validateEmotionalForm(data) {
    const required = ['name', 'company', 'email'];
    const missing = required.filter(field => !data[field] || data[field].trim() === '');
    
    if (missing.length > 0) {
        showEmotionalError(`J'ai besoin de ces informations pour mieux vous comprendre : ${missing.join(', ')}`);
        return false;
    }
    
    // Email validation with emotional message
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showEmotionalError('Votre adresse email semble incorrecte. Pourriez-vous la vérifier ?');
        return false;
    }
    
    return true;
}

function showEmotionalError(message) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.emotional-message');
    existingMessages.forEach(msg => msg.remove());
    
    const form = document.querySelector('.story-form');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'emotional-message emotional-message--error';
    errorDiv.innerHTML = `
        <span class="message-icon">💙</span>
        <span class="message-text">${message}</span>
    `;
    
    form.insertBefore(errorDiv, form.firstChild);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 7000);
}

function showEmotionalSuccess(data) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.emotional-message');
    existingMessages.forEach(msg => msg.remove());
    
    const form = document.querySelector('.story-form');
    const successDiv = document.createElement('div');
    successDiv.className = 'emotional-message emotional-message--success';
    
    const personalizedMessage = data.challenge ? 
        `Merci ${data.name} pour votre confiance. J'ai bien reçu votre message et je comprends vos défis. Je vous réponds personnellement sous 2h.` :
        `Merci ${data.name} ! J'ai hâte de découvrir votre histoire et de voir comment nous pouvons vous aider. Je vous contacte très rapidement.`;
    
    successDiv.innerHTML = `
        <span class="message-icon">💚</span>
        <span class="message-text">
            <strong>${personalizedMessage}</strong><br>
            <em>- Guillaume, fondateur de Seventee</em>
        </span>
    `;
    
    form.insertBefore(successDiv, form.firstChild);
    
    // Update form header
    const formHeader = form.querySelector('.form-header');
    if (formHeader) {
        formHeader.innerHTML = `
            <span class="form-icon">💚</span>
            <span class="form-title">Message envoyé avec le cœur</span>
        `;
    }
    
    // Add heart animation
    setTimeout(() => {
        addHeartAnimation();
    }, 1000);
}

function addHeartAnimation() {
    const hearts = ['💚', '💙', '💜'];
    const container = document.body;
    
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.cssText = `
                position: fixed;
                top: 50%;
                left: ${50 + (Math.random() - 0.5) * 20}%;
                font-size: 2rem;
                pointer-events: none;
                animation: heartFloat 3s ease-out forwards;
                z-index: 10000;
            `;
            
            container.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 3000);
        }, i * 200);
    }
}

// Emotional scroll effects
function initializeEmotionalScrollEffects() {
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add emotional header effects
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
    
    // Add parallax effect to story elements
    const parallaxElements = document.querySelectorAll('.story-quote, .transformation-quote');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const inView = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (inView) {
                const translateY = scrolled * 0.1;
                element.style.transform = `translateY(${translateY}px)`;
            }
        });
    });
}

// Initialize emotional interactions
document.addEventListener('DOMContentLoaded', function() {
    initializeEmotionalScrollEffects();
    
    // Add emotional touch to buttons
    const emotionalButtons = document.querySelectorAll('.btn--emotional');
    emotionalButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
            this.style.boxShadow = '0 8px 25px rgba(99, 102, 241, 0.3)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
        
        button.addEventListener('click', function() {
            trackEvent('emotional_cta_clicked', {
                button_text: this.textContent.trim(),
                timestamp: new Date().toISOString()
            });
        });
    });
    
    // Track emotional engagement
    trackEmotionalEngagement();
});

function trackEmotionalEngagement() {
    let engagementScore = 0;
    const startTime = Date.now();
    
    // Track time on emotional sections
    const emotionalSections = document.querySelectorAll('.section--problem-story, .section--transformation, .section--emotional-testimonials');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                engagementScore += 10;
                
                // Track long viewing
                setTimeout(() => {
                    if (entry.isIntersecting) {
                        engagementScore += 20;
                        trackEvent('emotional_deep_engagement', {
                            section: entry.target.className,
                            engagement_score: engagementScore,
                            timestamp: new Date().toISOString()
                        });
                    }
                }, 10000); // 10 seconds
            }
        });
    }, { threshold: 0.5 });
    
    emotionalSections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Track emotional interactions
    document.addEventListener('click', (e) => {
        if (e.target.closest('.testimonial-card--emotional')) {
            engagementScore += 15;
        }
        if (e.target.closest('.problem-card')) {
            engagementScore += 10;
        }
    });
    
    // Track page exit with engagement score
    window.addEventListener('beforeunload', () => {
        const sessionTime = Date.now() - startTime;
        trackEvent('emotional_session_end', {
            engagement_score: engagementScore,
            session_time_seconds: Math.floor(sessionTime / 1000),
            timestamp: new Date().toISOString()
        });
    });
}

// Phone and email tracking with emotional context
document.addEventListener('DOMContentLoaded', function() {
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('emotional_phone_clicked', {
                phone_number: this.getAttribute('href'),
                context: 'emotional_contact',
                timestamp: new Date().toISOString()
            });
        });
    });
    
    emailLinks.forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('emotional_email_clicked', {
                email: this.getAttribute('href'),
                context: 'emotional_contact',
                timestamp: new Date().toISOString()
            });
        });
    });
});

// Add emotional CSS animations
const style = document.createElement('style');
style.textContent = `
    .story-animate {
        animation: storyFadeIn 0.8s ease forwards;
    }
    
    @keyframes storyFadeIn {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes emotionalPulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.02);
            box-shadow: 0 8px 30px rgba(99, 102, 241, 0.2);
        }
    }
    
    @keyframes heartFloat {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-100px) scale(0.5);
        }
    }
    
    .emotional-message {
        padding: 1.5rem;
        border-radius: 12px;
        margin-bottom: 1.5rem;
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;
        font-weight: 500;
        animation: emotionalSlideIn 0.5s ease;
        line-height: 1.5;
    }
    
    .emotional-message--error {
        background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
        color: #7f1d1d;
        border: 1px solid #fecaca;
        border-left: 4px solid #ef4444;
    }
    
    .emotional-message--success {
        background: linear-gradient(135deg, #f0fdf4 0%, #d1fae5 100%);
        color: #14532d;
        border: 1px solid #a7f3d0;
        border-left: 4px solid #10b981;
    }
    
    @keyframes emotionalSlideIn {
        from {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
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
    
    .header {
        transition: transform 0.3s ease;
    }
    
    .character-counter {
        font-family: 'Inter', sans-serif;
        font-weight: 500;
    }
`;
document.head.appendChild(style);
