// Shopping Cart Functionality

// Cart state management
let cartState = {
    items: [],
    total: 0,
    isOpen: false
};

// Initialize cart functionality
function initializeCart() {
    // Load cart from localStorage
    loadCartFromStorage();
    
    // Set up event listeners
    setupCartEventListeners();
    
    // Update cart display
    updateCartDisplay();
    
    console.log('🛒 Cart system initialized');
}

// Set up cart event listeners
function setupCartEventListeners() {
    // Cart button click
    if (cartBtn) {
        cartBtn.addEventListener('click', toggleCart);
    }
    
    // Close cart button
    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', closeCart);
    }
    
    // Close cart when clicking outside
    if (cartModal) {
        cartModal.addEventListener('click', function(e) {
            if (e.target === cartModal) {
                closeCart();
            }
        });
    }
    
    // Checkout button
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', handleCheckout);
    }
    
    // Listen for escape key to close cart
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && cartState.isOpen) {
            closeCart();
        }
    });
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        console.error('❌ Product not found:', productId);
        return;
    }
    
    // Map Spanish properties to English for cart compatibility
    const productName = product.nombre || product.name || 'Product';
    const productPrice = product.precio || product.price || 0;
    const productImage = product.imagen || product.image || '';
    const productCategory = product.categoria || product.category || 'general';
    const productStock = product.stock || 0;
    
    // Check stock availability
    if (productStock === 0) {
        showNotification(`Sorry, ${productName} is out of stock! ❌`);
        return;
    }
    
    // Check if item already exists in cart
    const existingItem = cartState.items.find(item => item.id === productId);
    
    if (existingItem) {
        // Check if we can add more (don't exceed stock)
        if (existingItem.quantity >= productStock) {
            showNotification(`Maximum stock reached for ${productName}! 📦`);
            return;
        }
        existingItem.quantity += 1;
        showNotification(`Added another ${productName} to cart! 🎉`);
    } else {
        cartState.items.push({
            id: product.id,
            name: productName,
            price: productPrice,
            image: productImage,
            category: productCategory,
            quantity: 1
        });
        showNotification(`${productName} added to cart! 🛒`);
    }
    
    // Update cart display and save to storage
    updateCartDisplay();
    saveCartToStorage();
    
    // Add animation to cart button
    animateCartButton();
    
    console.log('✅ Added to cart:', productName);
}

// Remove item from cart
function removeFromCart(productId) {
    const itemIndex = cartState.items.findIndex(item => item.id === productId);
    
    if (itemIndex > -1) {
        const removedItem = cartState.items[itemIndex];
        cartState.items.splice(itemIndex, 1);
        
        updateCartDisplay();
        saveCartToStorage();
        
        showNotification(`${removedItem.name} removed from cart`, 'warning');
        console.log('🗑️ Removed from cart:', removedItem.name);
    }
}

// Update quantity of item in cart
function updateQuantity(productId, newQuantity) {
    const item = cartState.items.find(item => item.id === productId);
    
    if (!item) return;
    
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    item.quantity = newQuantity;
    updateCartDisplay();
    saveCartToStorage();
    
    console.log('📝 Updated quantity:', item.name, 'x', newQuantity);
}

// Calculate cart total
function calculateCartTotal() {
    return cartState.items.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);
}

// Update cart display
function updateCartDisplay() {
    // Update cart count
    const totalItems = cartState.items.reduce((total, item) => total + item.quantity, 0);
    if (cartCount) {
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
    
    // Update cart total
    cartState.total = calculateCartTotal();
    if (cartTotal) {
        cartTotal.textContent = cartState.total.toFixed(2);
    }
    
    // Update cart items display
    updateCartItemsDisplay();
    
    // Update checkout button state
    updateCheckoutButton();
}

// Update cart items display
function updateCartItemsDisplay() {
    if (!cartItems) return;
    
    if (cartState.items.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <div style="text-align: center; padding: 2rem; color: var(--text-secondary);">
                    <div style="font-size: 4rem; margin-bottom: 1rem;">🛒</div>
                    <h3>Your cart is empty</h3>
                    <p>Add some retro computing merchandise to get started!</p>
                    <button class="btn" onclick="closeCart(); scrollToProducts();" style="margin-top: 1rem;">
                        SHOP NOW
                    </button>
                </div>
            </div>
        `;
        return;
    }
    
    cartItems.innerHTML = cartState.items.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <div class="cart-item-image">
                ${item.image && item.image.startsWith('http') 
                    ? `<img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;">` 
                    : `<div style="width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; font-size: 2rem; background: var(--gradient-sunset); border-radius: 8px;">${item.image || getProductEmoji(item.category)}</div>`
                }
            </div>
            <div class="cart-item-details">
                <h4 class="cart-item-name">${item.name}</h4>
                <p class="cart-item-category">${item.category}</p>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
            </div>
            <div class="cart-item-controls">
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})" title="Remove item">
                    🗑️
                </button>
            </div>
            <div class="cart-item-total">
                $${(item.price * item.quantity).toFixed(2)}
            </div>
        </div>
    `).join('');
}

// Update checkout button state
function updateCheckoutButton() {
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (!checkoutBtn) return;
    
    if (cartState.items.length === 0) {
        checkoutBtn.disabled = true;
        checkoutBtn.textContent = 'CART IS EMPTY';
        checkoutBtn.style.opacity = '0.5';
    } else {
        checkoutBtn.disabled = false;
        checkoutBtn.textContent = 'CHECKOUT';
        checkoutBtn.style.opacity = '1';
    }
}

// Toggle cart modal
function toggleCart() {
    if (cartState.isOpen) {
        closeCart();
    } else {
        openCart();
    }
}

// Open cart modal
function openCart() {
    if (cartModal) {
        cartModal.classList.remove('hidden');
        cartState.isOpen = true;
        document.body.style.overflow = 'hidden';
        
        // Add animation
        cartModal.style.opacity = '0';
        cartModal.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            cartModal.style.opacity = '1';
            cartModal.style.transform = 'scale(1)';
        }, 10);
        
        console.log('🛒 Cart opened');
    }
}

// Close cart modal
function closeCart() {
    if (cartModal) {
        cartModal.style.opacity = '0';
        cartModal.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            cartModal.classList.add('hidden');
            cartState.isOpen = false;
            document.body.style.overflow = 'auto';
        }, 300);
        
        console.log('🛒 Cart closed');
    }
}

// Handle checkout process
function handleCheckout() {
    if (cartState.items.length === 0) {
        showNotification('Your cart is empty!', 'warning');
        return;
    }
    
    // Simulate checkout process
    const checkoutBtn = document.querySelector('.checkout-btn');
    const originalText = checkoutBtn.textContent;
    
    checkoutBtn.textContent = 'PROCESSING...';
    checkoutBtn.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        // Calculate final total
        const finalTotal = cartState.total;
        const itemCount = cartState.items.reduce((total, item) => total + item.quantity, 0);
        
        // Show success message
        showCheckoutSuccess(finalTotal, itemCount);
        
        // Clear cart
        clearCart();
        
        // Reset button
        checkoutBtn.textContent = originalText;
        checkoutBtn.disabled = false;
        
        // Close cart
        setTimeout(() => {
            closeCart();
        }, 2000);
        
    }, 3000);
    
    console.log('💳 Processing checkout...');
}

// Show checkout success message
function showCheckoutSuccess(total, itemCount) {
    const successHTML = `
        <div class="checkout-success" style="text-align: center; padding: 2rem; color: var(--neon-green);">
            <div style="font-size: 4rem; margin-bottom: 1rem;">✅</div>
            <h3 style="color: var(--neon-green); text-shadow: 0 0 10px var(--neon-green);">ORDER CONFIRMED!</h3>
            <p>Thank you for your radical purchase!</p>
            <div style="margin: 1rem 0; padding: 1rem; background: var(--bg-primary); border-radius: 8px; border: 1px solid var(--neon-green);">
                <p><strong>Items:</strong> ${itemCount}</p>
                <p><strong>Total:</strong> $${total.toFixed(2)}</p>
                <p><strong>Order ID:</strong> #80S${Date.now().toString().slice(-6)}</p>
            </div>
            <p style="font-size: 0.9rem; color: var(--text-secondary);">Your retro merchandise will be delivered in 3-5 business days!</p>
        </div>
    `;
    
    if (cartItems) {
        cartItems.innerHTML = successHTML;
    }
    
    // Show notification
    showNotification('Order placed successfully! 🎉', 'success');
}

// Clear cart
function clearCart() {
    cartState.items = [];
    cartState.total = 0;
    updateCartDisplay();
    saveCartToStorage();
    console.log('🧹 Cart cleared');
}

// Animate cart button when item is added
function animateCartButton() {
    if (cartBtn) {
        cartBtn.classList.add('shake');
        setTimeout(() => {
            cartBtn.classList.remove('shake');
        }, 500);
    }
}

// Show notification
function showNotification(message, type = 'success') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Set styles based on type
    const colors = {
        success: 'var(--neon-green)',
        warning: 'var(--neon-orange)',
        error: 'var(--neon-pink)',
        info: 'var(--neon-blue)'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--bg-secondary);
        border: 2px solid ${colors[type] || colors.success};
        color: var(--text-primary);
        padding: 1rem 1.5rem;
        border-radius: var(--border-radius);
        z-index: 4000;
        box-shadow: 0 0 20px ${colors[type] || colors.success};
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-family: var(--font-primary);
        font-weight: 600;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// Save cart to localStorage
function saveCartToStorage() {
    try {
        localStorage.setItem('neonRetroCart', JSON.stringify(cartState));
    } catch (error) {
        console.warn('⚠️ Could not save cart to localStorage:', error);
    }
}

// Load cart from localStorage
function loadCartFromStorage() {
    try {
        const savedCart = localStorage.getItem('neonRetroCart');
        if (savedCart) {
            const parsedCart = JSON.parse(savedCart);
            cartState.items = parsedCart.items || [];
            cartState.total = parsedCart.total || 0;
            console.log('📦 Cart loaded from storage');
        }
    } catch (error) {
        console.warn('⚠️ Could not load cart from localStorage:', error);
        cartState = { items: [], total: 0, isOpen: false };
    }
}

// Get cart summary for display
function getCartSummary() {
    const itemCount = cartState.items.reduce((total, item) => total + item.quantity, 0);
    return {
        itemCount,
        total: cartState.total,
        items: cartState.items
    };
}

// Export cart functions
window.cartFunctions = {
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart,
    openCart,
    closeCart,
    getCartSummary
};
