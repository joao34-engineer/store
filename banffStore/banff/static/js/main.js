/**
 * Main JavaScript file for Banff Store
 * Follows clean code principles with modular functions and clear naming
 */

// Import configuration if available
let CONFIG;
try {
    CONFIG = BANFF_CONFIG || {};
} catch (e) {
    // Fallback configuration if config.js is not loaded
    CONFIG = {
        ANIMATION: { CART_SUCCESS_DURATION: 2000 },
        CSS_CLASSES: { SUCCESS_BUTTON: 'bg-green-500', CART_ICON: 'fa-cart-plus', CHECK_ICON: 'fa-check' },
        SELECTORS: { MOBILE_MENU_TOGGLE: '.mobile-menu-toggle', MOBILE_MENU: '.mobile-menu' }
    };
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('Banff Store loaded successfully!');
    initializeAllComponents();
});

/**
 * Initialize all components when the page loads
 */
function initializeAllComponents() {
    initializeMobileMenu();
    initializeSmoothScrolling();
    initializeCartAnimation();
}

/**
 * Initialize mobile menu toggle functionality
 */
function initializeMobileMenu() {
    const mobileMenuToggle = document.querySelector(CONFIG.SELECTORS?.MOBILE_MENU_TOGGLE);
    const mobileMenu = document.querySelector(CONFIG.SELECTORS?.MOBILE_MENU);
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', handleMobileMenuToggle);
    }
}

/**
 * Handle mobile menu toggle click
 */
function handleMobileMenuToggle() {
    const mobileMenu = document.querySelector(CONFIG.SELECTORS?.MOBILE_MENU);
    if (mobileMenu) {
        mobileMenu.classList.toggle('active');
    }
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initializeSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(anchor => {
        anchor.addEventListener('click', handleSmoothScroll);
    });
}

/**
 * Handle smooth scroll behavior for anchor links
 * @param {Event} event - The click event
 */
function handleSmoothScroll(event) {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute('href');
    const target = document.querySelector(targetId);
    
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth'
        });
    }
}

/**
 * Initialize cart button animations
 */
function initializeCartAnimation() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        if (isCartButton(button)) {
            button.addEventListener('click', handleCartButtonClick);
        }
    });
}

/**
 * Check if a button is a cart button
 * @param {HTMLButtonElement} button - The button element to check
 * @returns {boolean} True if it's a cart button
 */
function isCartButton(button) {
    return button.innerHTML.includes(CONFIG.CSS_CLASSES?.CART_ICON || 'fa-cart-plus');
}

/**
 * Handle cart button click with animation
 * @param {Event} event - The click event
 */
function handleCartButtonClick(event) {
    const button = event.currentTarget;
    showCartSuccessAnimation(button);
}

/**
 * Show success animation for cart button
 * @param {HTMLButtonElement} button - The button to animate
 */
function showCartSuccessAnimation(button) {
    const originalContent = button.innerHTML;
    const checkIcon = `<i class="fas ${CONFIG.CSS_CLASSES?.CHECK_ICON || 'fa-check'}"></i>`;
    const successClass = CONFIG.CSS_CLASSES?.SUCCESS_BUTTON || 'bg-green-500';
    const duration = CONFIG.ANIMATION?.CART_SUCCESS_DURATION || 2000;
    
    // Change button appearance
    button.innerHTML = checkIcon;
    button.classList.add(successClass);
    
    // Reset after animation duration
    setTimeout(() => {
        button.innerHTML = originalContent;
        button.classList.remove(successClass);
    }, duration);
}
    


// Utility functions
function showNotification(message, type = 'info') {
    // Simple notification system
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}
