// Configuration constants for Banff Store
const BANFF_CONFIG = {
    // Animation durations (in milliseconds)
    ANIMATION: {
        CART_SUCCESS_DURATION: 2000,
        SMOOTH_SCROLL_BEHAVIOR: 'smooth',
        HOVER_TRANSITION_DURATION: 300
    },
    
    // CSS Classes for consistency
    CSS_CLASSES: {
        SUCCESS_BUTTON: 'bg-green-500',
        CART_ICON: 'fa-cart-plus',
        CHECK_ICON: 'fa-check',
        MOBILE_MENU_ACTIVE: 'active'
    },
    
    // Selectors for DOM elements
    SELECTORS: {
        MOBILE_MENU_TOGGLE: '.mobile-menu-toggle',
        MOBILE_MENU: '.mobile-menu',
        ANCHOR_LINKS: 'a[href^="#"]',
        CART_BUTTONS: 'button'
    },
    
    // Breakpoints for responsive design
    BREAKPOINTS: {
        MOBILE: 768,
        TABLET: 1024,
        DESKTOP: 1200
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BANFF_CONFIG;
}
