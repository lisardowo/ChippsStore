// Configuration and constants
const CONFIG = {
    // API endpoints (for future backend integration)
    API_BASE_URL: 'https://api.neonretro.com',
    PRODUCTS_ENDPOINT: './data/products.json',
    
    // Animation settings
    ANIMATION_DURATION: 300,
    STAGGER_DELAY: 100,
    
    // Cart settings
    MAX_QUANTITY_PER_ITEM: 10,
    CURRENCY: 'USD',
    CURRENCY_SYMBOL: '$',
    
    // UI settings
    NOTIFICATION_DURATION: 4000,
    DEBOUNCE_DELAY: 300,
    
    // Breakpoints (should match CSS)
    BREAKPOINTS: {
        mobile: 576,
        tablet: 768,
        desktop: 992,
        wide: 1200
    },
    
    // Theme colors
    COLORS: {
        neonPink: '#ff0080',
        neonBlue: '#00ffff',
        neonPurple: '#8000ff',
        neonGreen: '#00ff80',
        neonOrange: '#ff8000',
        neonYellow: '#ffff00'
    },
    
    // Local storage keys
    STORAGE_KEYS: {
        cart: 'neonRetroCart',
        preferences: 'neonRetroPrefs',
        visitCount: 'neonRetroVisits'
    }
};

// Utility functions
const Utils = {
    // Debounce function for performance
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle function for scroll events
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Format currency
    formatCurrency(amount, currency = CONFIG.CURRENCY) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        }).format(amount);
    },
    
    // Generate unique ID
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },
    
    // Check if device is mobile
    isMobile() {
        return window.innerWidth < CONFIG.BREAKPOINTS.tablet;
    },
    
    // Check if device is touch-enabled
    isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    },
    
    // Smooth scroll to element
    scrollToElement(selector, offset = 0) {
        const element = document.querySelector(selector);
        if (element) {
            const top = element.offsetTop - offset;
            window.scrollTo({
                top: top,
                behavior: 'smooth'
            });
        }
    },
    
    // Validate email
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },
    
    // Get random item from array
    getRandomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    },
    
    // Clamp value between min and max
    clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    },
    
    // Convert hex color to RGB
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
};

// Performance monitoring
const Performance = {
    marks: {},
    
    mark(name) {
        this.marks[name] = performance.now();
    },
    
    measure(name, startMark) {
        if (this.marks[startMark]) {
            const duration = performance.now() - this.marks[startMark];
            console.log(`⏱️ ${name}: ${duration.toFixed(2)}ms`);
            return duration;
        }
    },
    
    logPageLoad() {
        window.addEventListener('load', () => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`📊 Page load time: ${loadTime}ms`);
        });
    }
};

// Error handling
const ErrorHandler = {
    log(error, context = '') {
        console.error(`❌ Error ${context}:`, error);
        
        // In production, you might want to send errors to a logging service
        if (window.location.hostname !== 'localhost') {
            // Example: Send to error tracking service
            // this.sendToLoggingService(error, context);
        }
    },
    
    handleAsyncError(asyncFunction) {
        return async (...args) => {
            try {
                return await asyncFunction(...args);
            } catch (error) {
                this.log(error, asyncFunction.name);
                throw error;
            }
        };
    },
    
    showUserError(message) {
        // Show user-friendly error message
        if (window.NeonRetroStore && window.NeonRetroStore.showNotification) {
            window.NeonRetroStore.showNotification(message, 'error');
        } else {
            alert(message);
        }
    }
};

// Analytics (placeholder for future implementation)
const Analytics = {
    track(event, properties = {}) {
        console.log(`📈 Analytics: ${event}`, properties);
        
        // Example: Google Analytics 4
        // if (typeof gtag !== 'undefined') {
        //     gtag('event', event, properties);
        // }
    },
    
    trackPageView(page) {
        this.track('page_view', { page });
    },
    
    trackPurchase(items, total) {
        this.track('purchase', { 
            items: items.length, 
            value: total,
            currency: CONFIG.CURRENCY 
        });
    },
    
    trackAddToCart(productId, productName) {
        this.track('add_to_cart', { 
            item_id: productId,
            item_name: productName 
        });
    }
};

// Initialize performance monitoring
Performance.logPageLoad();

// Global error handler
window.addEventListener('error', (event) => {
    ErrorHandler.log(event.error, 'Global error');
});

window.addEventListener('unhandledrejection', (event) => {
    ErrorHandler.log(event.reason, 'Unhandled promise rejection');
});

// Export configuration and utilities
window.CONFIG = CONFIG;
window.Utils = Utils;
window.Performance = Performance;
window.ErrorHandler = ErrorHandler;
window.Analytics = Analytics;
