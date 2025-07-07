// Main JavaScript File - Core functionality and initialization

// Global variables
let products = [];
let cart = [];
let currentFilter = 'all';
let currentPage = 1;
let productsPerPage = 9;
let filteredProducts = [];

// DOM elements
const productsGrid = document.getElementById('products-grid');
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const closeCartBtn = document.getElementById('close-cart');
const filterBtns = document.querySelectorAll('.filter-btn');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('💻 RETROTECH STORE - Initializing Windows XP Experience...');
    
    initializeNavigation();
    loadProducts();
    initializeCart();
    initializeFilters();
    initializeAnimations();
    initializeScrollEffects();
    
    console.log('✨ RETROTECH STORE - Ready to experience early 2000s nostalgia!');
});

// Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    // Mobile menu toggle functionality
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
        
        // Close mobile menu when clicking on a nav link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    mobileMenuToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                }
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Smooth scroll to section
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
    
    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Load products from JSON
async function loadProducts() {
    try {
        showLoading();
        
        const response = await fetch('./data/products.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        products = await response.json();
        console.log(`📦 Loaded ${products.length} products`);
        
        hideLoading();
        displayProducts(products, 1);
        
    } catch (error) {
        console.error('❌ Error loading products:', error);
        hideLoading();
        showError('Failed to load products. Using demo data...');
        
        // Fallback to demo data if JSON fails to load
        products = getDemoProducts();
        displayProducts(products, 1);
    }
}

// Demo products fallback
function getDemoProducts() {
    return [
        {
            id: 1,
            name: "Windows XP Hoodie",
            category: "clothing",
            price: 79.99,
            image: "💻",
            description: "Premium cotton hoodie featuring the iconic Windows XP Bliss wallpaper design.",
            featured: true
        },
        {
            id: 2,
            name: "Y2K Millennium Bug T-Shirt",
            category: "clothing",
            price: 29.99,
            image: "�",
            description: "Vintage-style tee commemorating the Y2K millennium bug.",
            featured: false
        },
        {
            id: 3,
            name: "Internet Explorer Cap",
            category: "accessories",
            price: 39.99,
            image: "🧢",
            description: "Embroidered baseball cap with the classic Internet Explorer logo.",
            featured: true
        },
        {
            id: 4,
            name: "LAN Party Jacket",
            category: "clothing",
            price: 149.99,
            image: "🧥",
            description: "Retro gaming jacket with ethernet cable patterns and Windows XP-era patches.",
            featured: true
        },
        {
            id: 5,
            name: "Floppy Disk Coaster Set",
            category: "accessories",
            price: 24.99,
            image: "�",
            description: "Set of 4 authentic 3.5\" floppy disk coasters.",
            featured: false
        },
        {
            id: 6,
            name: "Start Menu Mousepad",
            category: "tech",
            price: 19.99,
            image: "🖱️",
            description: "Extra-large mousepad featuring the iconic Windows XP Start Menu design.",
            featured: false
        }
    ];
}

// Display products in grid with pagination
function displayProducts(productsToShow, page = 1) {
    if (!productsGrid) return;
    
    // Store filtered products for pagination
    filteredProducts = productsToShow;
    currentPage = page;
    
    // Calculate pagination
    const totalProducts = productsToShow.length;
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const currentProducts = productsToShow.slice(startIndex, endIndex);
    
    productsGrid.innerHTML = '';
    
    if (productsToShow.length === 0) {
        productsGrid.innerHTML = `
            <div class="no-products">
                <p>No products found for this category.</p>
                <p>Try selecting a different filter.</p>
            </div>
        `;
        updatePaginationControls(0, 0);
        return;
    }
    
    // Create products grid
    currentProducts.forEach((product, index) => {
        const productCard = createProductCard(product, index);
        productsGrid.appendChild(productCard);
    });
    
    // Update pagination controls
    updatePaginationControls(page, totalPages);
    
    // Trigger stagger animation
    setTimeout(() => {
        const cards = productsGrid.querySelectorAll('.product-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 100);
}

// Update pagination controls
function updatePaginationControls(currentPage, totalPages) {
    let paginationContainer = document.querySelector('.pagination-container');
    
    // Create pagination container if it doesn't exist
    if (!paginationContainer) {
        paginationContainer = document.createElement('div');
        paginationContainer.className = 'pagination-container';
        const productsWindow = document.querySelector('.products-window .xp-window-content');
        productsWindow.appendChild(paginationContainer);
    }
    
    // Clear existing pagination
    paginationContainer.innerHTML = '';
    
    if (totalPages <= 1) {
        return; // Don't show pagination if only one page
    }
    
    // Create pagination info
    const paginationInfo = document.createElement('div');
    paginationInfo.className = 'pagination-info';
    paginationInfo.innerHTML = `
        <span>Showing ${((currentPage - 1) * productsPerPage) + 1}-${Math.min(currentPage * productsPerPage, filteredProducts.length)} of ${filteredProducts.length} products</span>
    `;
    
    // Create pagination buttons
    const paginationButtons = document.createElement('div');
    paginationButtons.className = 'pagination-buttons';
    
    // Previous button
    const prevButton = document.createElement('button');
    prevButton.className = `xp-button pagination-btn ${currentPage === 1 ? 'disabled' : ''}`;
    prevButton.innerHTML = '← Previous';
    prevButton.disabled = currentPage === 1;
    prevButton.onclick = () => {
        if (currentPage > 1) {
            displayProducts(filteredProducts, currentPage - 1);
            scrollToProductsSection();
        }
    };
    paginationButtons.appendChild(prevButton);
    
    // Page numbers
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);
    
    if (startPage > 1) {
        const firstPageBtn = createPageButton(1, currentPage);
        paginationButtons.appendChild(firstPageBtn);
        
        if (startPage > 2) {
            const ellipsis = document.createElement('span');
            ellipsis.className = 'pagination-ellipsis';
            ellipsis.textContent = '...';
            paginationButtons.appendChild(ellipsis);
        }
    }
    
    for (let i = startPage; i <= endPage; i++) {
        const pageBtn = createPageButton(i, currentPage);
        paginationButtons.appendChild(pageBtn);
    }
    
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            const ellipsis = document.createElement('span');
            ellipsis.className = 'pagination-ellipsis';
            ellipsis.textContent = '...';
            paginationButtons.appendChild(ellipsis);
        }
        
        const lastPageBtn = createPageButton(totalPages, currentPage);
        paginationButtons.appendChild(lastPageBtn);
    }
    
    // Next button
    const nextButton = document.createElement('button');
    nextButton.className = `xp-button pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`;
    nextButton.innerHTML = 'Next →';
    nextButton.disabled = currentPage === totalPages;
    nextButton.onclick = () => {
        if (currentPage < totalPages) {
            displayProducts(filteredProducts, currentPage + 1);
            scrollToProductsSection();
        }
    };
    paginationButtons.appendChild(nextButton);
    
    // Append to container
    paginationContainer.appendChild(paginationInfo);
    paginationContainer.appendChild(paginationButtons);
}

// Create page button
function createPageButton(pageNumber, currentPage) {
    const button = document.createElement('button');
    button.className = `xp-button pagination-btn page-number ${pageNumber === currentPage ? 'active' : ''}`;
    button.textContent = pageNumber;
    button.onclick = () => {
        displayProducts(filteredProducts, pageNumber);
        scrollToProductsSection();
    };
    return button;
}

// Create product card element
function createProductCard(product, index) {
    const card = document.createElement('div');
    card.className = 'product-card hover-lift';
    card.style.animationDelay = `${index * 0.1}s`;
    
    // Map Spanish properties to English for compatibility
    const productName = product.nombre || product.name || 'Product';
    const productCategory = product.categoria || product.category || 'general';
    const productPrice = product.precio || product.price || 0;
    const productImage = product.imagen || product.image || '';
    const productDescription = product.descripcion || product.description || 'No description available';
    const productStock = product.stock || 0;
    
    // Use emoji as fallback image if no image URL provided
    const displayImage = productImage && productImage.startsWith('http') 
        ? `<img src="${productImage}" alt="${productName}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
           <div style="display:none; width:100%; height:100%; align-items:center; justify-content:center; font-size:4rem;">${getProductEmoji(productCategory)}</div>`
        : `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; font-size:4rem;">${productImage || getProductEmoji(productCategory)}</div>`;
    
    // Stock indicator
    const stockStatus = productStock > 0 ? `In Stock (${productStock})` : 'Out of Stock';
    const stockClass = productStock > 0 ? 'in-stock' : 'out-of-stock';
    
    card.innerHTML = `
        <div class="product-image">
            ${displayImage}
        </div>
        <div class="product-info">
            <div class="product-category">${productCategory}</div>
            <h3 class="product-name">${productName}</h3>
            <p class="product-description">${productDescription}</p>
            <div class="product-stock ${stockClass}">
                <small>${stockStatus}</small>
            </div>
            <div class="product-footer">
                <span class="product-price">$${productPrice.toFixed(2)}</span>
                <button class="add-to-cart" onclick="addToCart(${product.id})" ${productStock === 0 ? 'disabled' : ''}>
                    ${productStock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Get emoji for product category
function getProductEmoji(category) {
    const emojis = {
        clothing: '👕',
        accessories: '🕶️',
        tech: '📱',
        vinyl: '💿',
        sticker: '🏷️',
        default: '⭐'
    };
    return emojis[category] || emojis.default;
}

// Filter functionality
function initializeFilters() {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filter = this.getAttribute('data-filter');
            currentFilter = filter;
            
            // Filter and display products (reset to page 1)
            const filteredProducts = filter === 'all' 
                ? products 
                : products.filter(product => {
                    const productCategory = product.categoria || product.category;
                    return productCategory === filter;
                });
            
            // Add loading effect
            productsGrid.style.opacity = '0.5';
            
            setTimeout(() => {
                displayProducts(filteredProducts, 1); // Reset to page 1
                productsGrid.style.opacity = '1';
            }, 300);
        });
    });
}

// Utility functions
function showLoading() {
    if (productsGrid) {
        productsGrid.innerHTML = `
            <div class="loading-container" style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
                <div class="loading-spinner"></div>
                <p style="color: var(--xp-blue); margin-top: 1rem; text-align: center;">Loading products...</p>
            </div>
        `;
    }
}

function hideLoading() {
    const loadingContainer = document.querySelector('.loading-container');
    if (loadingContainer) {
        loadingContainer.remove();
    }
}

function showError(message) {
    console.error('🚨 Error:', message);
    
    // You could implement a toast notification here
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-notification';
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--bg-secondary);
        border: 2px solid var(--neon-pink);
        color: var(--text-primary);
        padding: 1rem;
        border-radius: var(--border-radius);
        z-index: 3000;
        box-shadow: var(--glow-pink);
    `;
    errorDiv.textContent = message;
    
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Scroll to products section
function scrollToProducts() {
    const productsSection = document.getElementById('products');
    if (productsSection) {
        productsSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Scroll to products section
function scrollToProductsSection() {
    const productsSection = document.getElementById('products');
    if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Initialize scroll effects
function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate on scroll
    const animatedElements = document.querySelectorAll('.slide-up-on-scroll');
    animatedElements.forEach(el => observer.observe(el));
}

// Initialize animations
function initializeAnimations() {
    // Add parallax effect to hero elements
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        heroVisual.classList.add('parallax-element');
    }
    
    // Add glow pulse to neon elements
    const neonElements = document.querySelectorAll('.neon-text');
    neonElements.forEach(el => {
        el.classList.add('glow-pulse');
    });
    
    // Initialize typewriter effect for hero subtitle
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        heroSubtitle.classList.add('typewriter');
    }
}

// Contact form handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name') || this.querySelector('input[type="text"]').value;
            const email = formData.get('email') || this.querySelector('input[type="email"]').value;
            const message = formData.get('message') || this.querySelector('textarea').value;
            
            // Simulate form submission
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'SENDING...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Message sent! We\'ll get back to you in the 80s style! 🌟');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
});

// Error handling for missing images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Replace with placeholder if image fails to load
            this.style.display = 'none';
            const placeholder = document.createElement('div');
            placeholder.style.cssText = `
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 4rem;
                background: var(--gradient-sunset);
            `;
            placeholder.textContent = '🌆';
            this.parentNode.appendChild(placeholder);
        });
    });
});

// Handle window resize for pagination
function handleWindowResize() {
    // Recalculate pagination if needed
    if (filteredProducts.length > 0) {
        const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
        if (currentPage > totalPages) {
            currentPage = totalPages;
            displayProducts(filteredProducts, currentPage);
        }
    }
}

// Add resize listener
window.addEventListener('resize', debounce(handleWindowResize, 250));

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Enhanced Window Management System
class WindowManager {
    constructor() {
        this.minimizedWindows = new Map();
        this.closedWindows = new Map();
        this.taskbarContainer = document.getElementById('taskbar-windows');
        this.startButton = document.querySelector('.start-button');
        this.initializeWindowControls();
        this.initializeStartButton();
    }

    initializeStartButton() {
        if (this.startButton) {
            this.startButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleStartButtonClick();
            });
        }
    }

    handleStartButtonClick() {
        const closedCount = this.closedWindows.size;
        const minimizedCount = this.minimizedWindows.size;
        
        if (closedCount > 0 || minimizedCount > 0) {
            // Show confirmation dialog
            let message = 'Start Menu\n\n';
            if (closedCount > 0) {
                message += `${closedCount} closed window(s) available to reopen\n`;
            }
            if (minimizedCount > 0) {
                message += `${minimizedCount} minimized window(s) available to restore\n`;
            }
            message += '\nWould you like to restore all windows?';
            
            const shouldRestore = confirm(message);
            
            if (shouldRestore) {
                this.restoreAllWindows();
            }
        } else {
            alert('Start Menu\n\nAll windows are currently open and active.\nNo windows need to be restored.');
        }
    }

    restoreAllWindows() {
        let delay = 0;
        const animationDelay = 200; // 200ms between each window animation
        
        // Remove start button pulse if it exists
        this.startButton?.classList.remove('start-button-pulse');
        
        // Restore all closed windows first
        const closedWindowIds = Array.from(this.closedWindows.keys());
        closedWindowIds.forEach((windowId, index) => {
            setTimeout(() => {
                this.reopenWindow(windowId, true); // true for collection animation
            }, delay);
            delay += animationDelay;
        });
        
        // Then restore all minimized windows
        const minimizedWindowIds = Array.from(this.minimizedWindows.keys());
        minimizedWindowIds.forEach((windowId, index) => {
            setTimeout(() => {
                this.restoreWindow(windowId);
            }, delay);
            delay += animationDelay;
        });
        
        console.log(`Restoring ${closedWindowIds.length + minimizedWindowIds.length} windows from Start menu`);
    }

    highlightStartButton() {
        if (this.startButton) {
            // Add highlight animation
            this.startButton.classList.add('start-button-highlight');
            
            // Remove highlight class after animation
            setTimeout(() => {
                this.startButton.classList.remove('start-button-highlight');
                
                // Add pulse effect if there are closed windows
                if (this.closedWindows.size > 0) {
                    this.startButton.classList.add('start-button-pulse');
                }
            }, 1500);
        }
    }

    updateStartButtonState() {
        if (this.startButton) {
            if (this.closedWindows.size > 0 || this.minimizedWindows.size > 0) {
                this.startButton.classList.add('start-button-pulse');
                this.startButton.title = `Click to restore ${this.closedWindows.size + this.minimizedWindows.size} window(s)`;
            } else {
                this.startButton.classList.remove('start-button-pulse');
                this.startButton.title = 'Start';
            }
        }
    }

    closeWindow(windowElement) {
        if (!windowElement) return;

        // Special handling for cart modal
        if (windowElement.closest('#cart-modal')) {
            document.getElementById('cart-modal').classList.add('hidden');
            return;
        }

        // Get window info before closing
        const titlebar = windowElement.querySelector('.xp-titlebar-text');
        const windowTitle = titlebar ? titlebar.textContent.trim() : 'Window';
        const windowIcon = titlebar ? titlebar.querySelector('.xp-icon')?.textContent || '📄' : '📄';
        const windowId = this.generateWindowId(windowElement);

        // Disable interactions during animation
        windowElement.classList.add('window-state-transition');

        // Add close animation
        windowElement.classList.add('closing');

        // Highlight start button immediately when window starts closing
        this.highlightStartButton();

        // After animation completes, hide window completely
        setTimeout(() => {
            windowElement.classList.add('closed');
            windowElement.classList.remove('closing', 'window-state-transition');
            
            // Store window data for potential reopening
            this.closedWindows.set(windowId, {
                title: windowTitle,
                icon: windowIcon,
                element: windowElement,
                section: windowElement.closest('section')?.id || 'unknown'
            });

            // Update start button state
            this.updateStartButtonState();

            console.log(`Window "${windowTitle}" closed and stored for reopening`);
        }, 600);
    }

    reopenWindow(windowId, useCollectionAnimation = false) {
        const windowData = this.closedWindows.get(windowId);
        if (!windowData) return;

        const { element, title } = windowData;
        
        // Remove from closed windows storage
        this.closedWindows.delete(windowId);
        
        // Disable interactions during animation
        element.classList.add('window-state-transition');
        
        // Show and animate window
        element.classList.remove('closed');
        
        if (useCollectionAnimation) {
            element.classList.add('window-collection');
            
            setTimeout(() => {
                element.classList.remove('window-collection', 'window-state-transition');
                this.updateStartButtonState();
            }, 800);
        } else {
            element.classList.add('opening');
            
            setTimeout(() => {
                element.classList.remove('opening', 'window-state-transition');
                this.updateStartButtonState();
            }, 600);
        }

        console.log(`Window "${title}" reopened`);
    }

    minimizeWindow(windowElement) {
        if (!windowElement) return;

        // Get window info
        const titlebar = windowElement.querySelector('.xp-titlebar-text');
        const windowTitle = titlebar ? titlebar.textContent.trim() : 'Window';
        const windowIcon = titlebar ? titlebar.querySelector('.xp-icon')?.textContent || '📄' : '📄';
        
        // Generate unique ID for this window
        const windowId = this.generateWindowId(windowElement);

        // Disable interactions during animation
        windowElement.classList.add('window-state-transition');

        // Add minimize animation
        windowElement.classList.add('minimizing');

        // After animation completes, hide window and add to taskbar
        setTimeout(() => {
            windowElement.classList.add('minimized');
            windowElement.classList.remove('minimizing', 'window-state-transition');
            this.addToTaskbar(windowId, windowTitle, windowIcon, windowElement);
            this.updateStartButtonState();
        }, 500);
    }

    restoreWindow(windowId) {
        const windowData = this.minimizedWindows.get(windowId);
        if (!windowData) return;

        const { element } = windowData;
        
        // Remove from taskbar
        this.removeFromTaskbar(windowId);
        
        // Disable interactions during animation
        element.classList.add('window-state-transition');
        
        // Show and animate window
        element.classList.remove('minimized');
        element.classList.add('restoring');
        
        // Remove animation class after completion
        setTimeout(() => {
            element.classList.remove('restoring', 'window-state-transition');
            this.updateStartButtonState();
        }, 500);
    }

    maximizeWindow(windowElement) {
        if (!windowElement) return;
        
        // Toggle maximize state
        if (windowElement.classList.contains('maximized')) {
            windowElement.classList.remove('maximized');
            console.log('Window restored to normal size');
        } else {
            windowElement.classList.add('maximized');
            console.log('Window maximized');
        }
    }

    addToTaskbar(windowId, title, icon, windowElement) {
        // Store window data
        this.minimizedWindows.set(windowId, {
            title,
            icon,
            element: windowElement
        });

        // Create taskbar button
        const taskbarBtn = document.createElement('button');
        taskbarBtn.className = 'taskbar-window-btn';
        taskbarBtn.innerHTML = `<span>${icon}</span><span>${title}</span>`;
        taskbarBtn.setAttribute('data-window-id', windowId);
        taskbarBtn.title = `Click to restore: ${title}`;
        
        // Add click handler to restore window
        taskbarBtn.addEventListener('click', () => {
            this.restoreWindow(windowId);
        });

        // Add to taskbar
        this.taskbarContainer.appendChild(taskbarBtn);
        
        console.log(`Window "${title}" minimized to taskbar`);
    }

    removeFromTaskbar(windowId) {
        // Remove from storage
        this.minimizedWindows.delete(windowId);
        
        // Remove taskbar button
        const taskbarBtn = this.taskbarContainer.querySelector(`[data-window-id="${windowId}"]`);
        if (taskbarBtn) {
            taskbarBtn.remove();
        }
    }

    generateWindowId(windowElement) {
        // Generate a unique ID based on the window's content and timestamp
        const titlebar = windowElement.querySelector('.xp-titlebar-text');
        const title = titlebar ? titlebar.textContent.trim() : 'window';
        const section = windowElement.closest('section')?.id || 'unknown';
        return `window-${section}-${title.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}-${Date.now()}`;
    }

    // Utility method to get all window states
    getWindowStates() {
        return {
            minimized: Array.from(this.minimizedWindows.keys()),
            closed: Array.from(this.closedWindows.keys()),
            open: Array.from(document.querySelectorAll('.xp-window:not(.minimized):not(.closed)')).map(el => {
                const titlebar = el.querySelector('.xp-titlebar-text');
                return titlebar ? titlebar.textContent.trim() : 'Unknown Window';
            })
        };
    }

    initializeWindowControls() {
        // Add event listeners to all minimize buttons
        document.querySelectorAll('.xp-control.minimize').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const window = btn.closest('.xp-window');
                this.minimizeWindow(window);
            });
        });

        // Add event listeners to all maximize buttons
        document.querySelectorAll('.xp-control.maximize').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const window = btn.closest('.xp-window');
                this.maximizeWindow(window);
            });
        });

        // Add event listeners to all close buttons
        document.querySelectorAll('.xp-control.close').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const window = btn.closest('.xp-window');
                this.closeWindow(window);
            });
        });
    }
}

// Initialize window manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize window management
    window.windowManager = new WindowManager();
    
    // Debug: Add window state logging
    window.addEventListener('keydown', function(e) {
        // Press Ctrl+Alt+W to log window states (for debugging)
        if (e.ctrlKey && e.altKey && e.key === 'w') {
            console.log('Current window states:', window.windowManager.getWindowStates());
        }
        
        // Press Ctrl+Alt+R to restore all windows (for debugging)
        if (e.ctrlKey && e.altKey && e.key === 'r') {
            window.windowManager.restoreAllWindows();
        }
    });
});
