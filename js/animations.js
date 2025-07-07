// Animations and Visual Effects JavaScript

// Animation controller object
const AnimationController = {
    initialized: false,
    observers: [],
    
    // Initialize all animations
    init() {
        if (this.initialized) return;
        
        console.log('🎬 Initializing animations...');
        
        this.setupScrollAnimations();
        this.setupParallaxEffects();
        this.setupHoverEffects();
        this.setupGlitchEffects();
        this.setupParticleSystem();
        this.setupMatrixRain();
        
        this.initialized = true;
        console.log('✨ Animations ready!');
    },
    
    // Set up scroll-triggered animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Add specific animations based on element type
                    if (entry.target.classList.contains('product-card')) {
                        this.animateProductCard(entry.target);
                    } else if (entry.target.classList.contains('section-title')) {
                        this.animateSectionTitle(entry.target);
                    }
                }
            });
        }, observerOptions);
        
        // Observe elements for scroll animations
        const elementsToAnimate = document.querySelectorAll(`
            .product-card,
            .section-title,
            .about-content,
            .contact-content,
            .hero-content
        `);
        
        elementsToAnimate.forEach(el => {
            el.classList.add('animate-on-scroll');
            scrollObserver.observe(el);
        });
        
        this.observers.push(scrollObserver);
    },
    
    // Set up parallax effects
    setupParallaxEffects() {
        let ticking = false;
        
        const parallaxElements = document.querySelectorAll('.parallax-element');
        
        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            parallaxElements.forEach(el => {
                const yPos = Math.round(rate * 0.3);
                el.style.transform = `translate3d(0, ${yPos}px, 0)`;
            });
            
            ticking = false;
        };
        
        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };
        
        // Only enable parallax on desktop for performance
        if (window.innerWidth > 768) {
            window.addEventListener('scroll', requestTick, { passive: true });
        }
    },
    
    // Set up hover effects
    setupHoverEffects() {
        // Enhanced hover effect for product cards
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                this.createHoverGlow(e.target);
            });
            
            card.addEventListener('mouseleave', (e) => {
                this.removeHoverGlow(e.target);
            });
        });
        
        // Magnetic effect for buttons
        const buttons = document.querySelectorAll('.btn, .cta-button, .add-to-cart');
        
        buttons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                this.magneticEffect(e, btn);
            });
            
            btn.addEventListener('mouseleave', (e) => {
                btn.style.transform = '';
            });
        });
    },
    
    // Set up glitch effects
    setupGlitchEffects() {
        const glitchElements = document.querySelectorAll('.glitch-text');
        
        glitchElements.forEach(el => {
            // Random glitch triggers
            setInterval(() => {
                if (Math.random() < 0.1) { // 10% chance every interval
                    this.triggerGlitch(el);
                }
            }, 3000);
        });
    },
    
    // Set up particle system
    setupParticleSystem() {
        this.createFloatingParticles();
        
        // Recreate particles periodically
        setInterval(() => {
            this.createFloatingParticles();
        }, 10000);
    },
    
    // Set up matrix rain effect
    setupMatrixRain() {
        const matrixContainer = document.createElement('div');
        matrixContainer.className = 'matrix-rain';
        document.body.appendChild(matrixContainer);
        
        // Create multiple columns of falling characters
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                this.createMatrixColumn(matrixContainer, i);
            }, i * 2000);
        }
    },
    
    // Animation helper functions
    animateProductCard(card) {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.opacity = '1';
        
        // Stagger child elements
        const children = card.querySelectorAll('.product-image, .product-info');
        children.forEach((child, index) => {
            setTimeout(() => {
                child.style.opacity = '1';
                child.style.transform = 'translateY(0)';
            }, index * 100);
        });
    },
    
    animateSectionTitle(title) {
        title.style.opacity = '1';
        title.style.transform = 'translateY(0)';
        
        // Add typing effect
        const text = title.textContent;
        title.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                title.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        setTimeout(typeWriter, 300);
    },
    
    createHoverGlow(element) {
        const glow = document.createElement('div');
        glow.className = 'hover-glow';
        glow.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at center, rgba(255, 0, 128, 0.1) 0%, transparent 70%);
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s ease;
            border-radius: inherit;
        `;
        
        element.style.position = 'relative';
        element.appendChild(glow);
        
        requestAnimationFrame(() => {
            glow.style.opacity = '1';
        });
    },
    
    removeHoverGlow(element) {
        const glow = element.querySelector('.hover-glow');
        if (glow) {
            glow.style.opacity = '0';
            setTimeout(() => {
                glow.remove();
            }, 300);
        }
    },
    
    magneticEffect(e, element) {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const distance = Math.sqrt(x * x + y * y);
        const maxDistance = 50;
        
        if (distance < maxDistance) {
            const strength = (maxDistance - distance) / maxDistance;
            const translateX = x * strength * 0.3;
            const translateY = y * strength * 0.3;
            
            element.style.transform = `translate(${translateX}px, ${translateY}px) scale(1.05)`;
        }
    },
    
    triggerGlitch(element) {
        element.classList.add('glitching');
        
        setTimeout(() => {
            element.classList.remove('glitching');
        }, 200);
    },
    
    createFloatingParticles() {
        const colors = ['#ff0080', '#00ffff', '#8000ff', '#00ff80'];
        const particles = document.querySelector('.neon-particles');
        
        if (!particles) return;
        
        for (let i = 0; i < 3; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.random() * 4 + 2;
            const startX = Math.random() * window.innerWidth;
            const duration = Math.random() * 10 + 5;
            
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                border-radius: 50%;
                box-shadow: 0 0 ${size * 3}px ${color};
                left: ${startX}px;
                top: 100vh;
                pointer-events: none;
                animation: float ${duration}s linear forwards;
            `;
            
            particles.appendChild(particle);
            
            // Remove particle after animation
            setTimeout(() => {
                particle.remove();
            }, duration * 1000);
        }
    },
    
    createMatrixColumn(container, columnIndex) {
        const column = document.createElement('div');
        column.className = 'matrix-column';
        
        const characters = '0123456789ABCDEFアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        let columnText = '';
        
        for (let i = 0; i < 20; i++) {
            columnText += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        
        column.style.cssText = `
            position: absolute;
            left: ${columnIndex * 20}%;
            top: -100%;
            color: var(--neon-green);
            font-family: 'Courier New', monospace;
            font-size: 14px;
            line-height: 16px;
            white-space: pre;
            opacity: 0.3;
            animation: matrix-fall ${15 + Math.random() * 10}s linear infinite;
            animation-delay: ${columnIndex * 2}s;
        `;
        
        column.textContent = columnText;
        container.appendChild(column);
    },
    
    // Text scramble effect
    scrambleText(element, finalText, duration = 1000) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
        const scrambleInterval = 50;
        const iterations = duration / scrambleInterval;
        let currentIteration = 0;
        
        const interval = setInterval(() => {
            let scrambledText = '';
            
            for (let i = 0; i < finalText.length; i++) {
                if (currentIteration * (finalText.length / iterations) > i) {
                    scrambledText += finalText[i];
                } else {
                    scrambledText += characters[Math.floor(Math.random() * characters.length)];
                }
            }
            
            element.textContent = scrambledText;
            currentIteration++;
            
            if (currentIteration >= iterations) {
                element.textContent = finalText;
                clearInterval(interval);
            }
        }, scrambleInterval);
    },
    
    // Create lightning effect
    createLightning(startElement, endElement) {
        const lightning = document.createElement('div');
        lightning.className = 'lightning-bolt';
        
        const startRect = startElement.getBoundingClientRect();
        const endRect = endElement.getBoundingClientRect();
        
        const startX = startRect.left + startRect.width / 2;
        const startY = startRect.top + startRect.height / 2;
        const endX = endRect.left + endRect.width / 2;
        const endY = endRect.top + endRect.height / 2;
        
        const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);
        const distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
        
        lightning.style.cssText = `
            position: fixed;
            left: ${startX}px;
            top: ${startY}px;
            width: ${distance}px;
            height: 2px;
            background: linear-gradient(90deg, var(--neon-blue), var(--neon-pink));
            transform-origin: 0 50%;
            transform: rotate(${angle}deg);
            box-shadow: 0 0 10px var(--neon-blue);
            z-index: 5000;
            pointer-events: none;
            animation: lightning-flash 0.3s ease-out forwards;
        `;
        
        document.body.appendChild(lightning);
        
        setTimeout(() => {
            lightning.remove();
        }, 300);
    },
    
    // Cleanup function
    cleanup() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers = [];
        this.initialized = false;
    }
};

// Additional CSS for animations (injected dynamically)
const animationStyles = `
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.6s ease;
    }
    
    .animate-on-scroll.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .glitching {
        animation: intense-glitch 0.2s infinite !important;
    }
    
    @keyframes intense-glitch {
        0% { transform: skewX(0deg); }
        20% { transform: skewX(10deg); }
        40% { transform: skewX(-10deg); }
        60% { transform: skewX(5deg); }
        80% { transform: skewX(-5deg); }
        100% { transform: skewX(0deg); }
    }
    
    @keyframes lightning-flash {
        0% { opacity: 0; transform: scaleX(0) rotate(var(--angle)); }
        50% { opacity: 1; transform: scaleX(1) rotate(var(--angle)); }
        100% { opacity: 0; transform: scaleX(1) rotate(var(--angle)); }
    }
    
    @keyframes matrix-fall {
        0% { transform: translateY(-100vh); opacity: 0; }
        10% { opacity: 0.3; }
        90% { opacity: 0.3; }
        100% { transform: translateY(100vh); opacity: 0; }
    }
`;

// Inject animation styles
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    AnimationController.init();
});

// Handle window resize for responsive animations
window.addEventListener('resize', () => {
    // Disable parallax on mobile
    if (window.innerWidth <= 768) {
        const parallaxElements = document.querySelectorAll('.parallax-element');
        parallaxElements.forEach(el => {
            el.style.transform = '';
        });
    }
});

// Export for global access
window.AnimationController = AnimationController;
