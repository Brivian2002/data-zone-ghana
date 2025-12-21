/**
 * Data Zone Ghana - Enhanced Mobile Data Store
 * High-class JavaScript implementation with Google Form integration
 */

// Product data structure - organized for easy updates
const PRODUCTS = {
    mtn: {
        name: "MTN Non-Expiry",
        color: "mtn",
        badge: "No Expiry",
        bundles: [
            { size: "1 GB", price: 5.00, duration: "No Expiry" },
            { size: "2 GB", price: 10.00, duration: "No Expiry" },
            { size: "3 GB", price: 14.00, duration: "No Expiry" },
            { size: "4 GB", price: 19.50, duration: "No Expiry" },
            { size: "5 GB", price: 25.00, duration: "No Expiry" },
            { size: "6 GB", price: 29.50, duration: "No Expiry" },
            { size: "8 GB", price: 38.00, duration: "No Expiry" },
            { size: "10 GB", price: 45.00, duration: "No Expiry" },
            { size: "15 GB", price: 65.00, duration: "No Expiry" },
            { size: "20 GB", price: 85.00, duration: "No Expiry" },
            { size: "25 GB", price: 110.00, duration: "No Expiry" },
            { size: "30 GB", price: 126.00, duration: "No Expiry" },
            { size: "40 GB", price: 165.00, duration: "No Expiry" },
            { size: "50 GB", price: 208.00, duration: "No Expiry" }
        ]
    },
    airteltigo: {
        name: "AirtelTigo Premium",
        color: "airteltigo",
        badge: "30 Days",
        bundles: [
            { size: "1 GB", cost: 3.95, price: 4.50, duration: "30 days" },
            { size: "2 GB", cost: 8.35, price: 9.00, duration: "30 days" },
            { size: "3 GB", cost: 13.25, price: 14.00, duration: "30 days" },
            { size: "4 GB", cost: 16.50, price: 17.50, duration: "30 days" },
            { size: "5 GB", cost: 19.50, price: 21.00, duration: "30 days" },
            { size: "6 GB", cost: 23.50, price: 25.00, duration: "30 days" },
            { size: "8 GB", cost: 30.50, price: 33.00, duration: "30 days" },
            { size: "10 GB", cost: 38.50, price: 41.00, duration: "30 days" },
            { size: "12 GB", cost: 45.50, price: 48.00, duration: "30 days" },
            { size: "15 GB", cost: 57.50, price: 60.00, duration: "30 days" },
            { size: "25 GB", cost: 95.00, price: 100.00, duration: "30 days" },
            { size: "30 GB", cost: 115.00, price: 120.00, duration: "30 days" },
            { size: "40 GB", cost: 151.00, price: 158.00, duration: "30 days" },
            { size: "50 GB", cost: 190.00, price: 198.00, duration: "30 days" }
        ]
    },
    telecel: {
        name: "Telecel Non-Expiry",
        color: "telecel",
        badge: "No Expiry",
        bundles: [
            { size: "5 GB", price: 21.00, duration: "No Expiry" },
            { size: "8 GB", price: 36.50, duration: "No Expiry" },
            { size: "10 GB", price: 45.00, duration: "No Expiry" },
            { size: "12 GB", price: 46.00, duration: "No Expiry" },
            { size: "15 GB", price: 65.00, duration: "No Expiry" },
            { size: "20 GB", price: 74.00, duration: "No Expiry" },
            { size: "25 GB", price: 92.00, duration: "No Expiry" },
            { size: "30 GB", price: 110.00, duration: "No Expiry" },
            { size: "35 GB", price: 128.00, duration: "No Expiry" },
            { size: "40 GB", price: 145.00, duration: "No Expiry" },
            { size: "45 GB", price: 162.00, duration: "No Expiry" },
            { size: "50 GB", price: 180.00, duration: "No Expiry" },
            { size: "100 GB", price: 355.00, duration: "No Expiry" }
        ]
    }
};

// Google Form URL
const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfMy0tJxTDmLjp2_uBe4Krgkg98Vv9urYEy1aovxBCPjABhwg/viewform";

// Application state
const AppState = {
    currentUser: null,
    currentNetwork: "mtn",
    selectedBundle: null
};

// DOM Elements cache
const DOM = {
    signinModal: document.getElementById("signin-modal"),
    mainContent: document.getElementById("main-content"),
    signinForm: document.getElementById("signin-form"),
    productsContainer: document.getElementById("products-container"),
    userName: document.getElementById("user-name"),
    timeGreeting: document.getElementById("time-greeting"),
    logoutBtn: document.getElementById("logout-btn"),
    tabButtons: document.querySelectorAll(".tab-btn"),
    currentYear: document.getElementById("current-year")
};

/**
 * Initialize the application
 */
function init() {
    console.log("Data Zone Ghana - Initializing application");
    
    // Set current year in footer
    DOM.currentYear.textContent = new Date().getFullYear();
    
    // Check for existing user session
    checkUserSession();
    
    // Initialize event listeners
    setupEventListeners();
    
    // Set time-based greeting
    updateTimeGreeting();
    
    // Load initial products
    renderProducts("mtn");
    
    // Apply animations
    applyAnimations();
}

/**
 * Check for existing user session in localStorage
 */
function checkUserSession() {
    const userData = localStorage.getItem("dataZoneUser");
    
    if (userData) {
        try {
            AppState.currentUser = JSON.parse(userData);
            showMainInterface();
            console.log("User session restored:", AppState.currentUser.fullName);
        } catch (error) {
            console.error("Error parsing user data:", error);
            showSignInModal();
        }
    } else {
        showSignInModal();
    }
}

/**
 * Show the sign-in modal
 */
function showSignInModal() {
    DOM.signinModal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
}

/**
 * Show the main application interface
 */
function showMainInterface() {
    DOM.signinModal.classList.add("hidden");
    DOM.mainContent.classList.remove("hidden");
    document.body.style.overflow = "auto";
    
    // Update user greeting
    if (AppState.currentUser) {
        DOM.userName.textContent = AppState.currentUser.fullName;
    }
}

/**
 * Set up all event listeners
 */
function setupEventListeners() {
    // Sign-in form submission
    DOM.signinForm.addEventListener("submit", handleSignIn);
    
    // Logout button
    DOM.logoutBtn.addEventListener("click", handleLogout);
    
    // Network tab switching
    DOM.tabButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const network = e.currentTarget.dataset.network;
            switchNetwork(network);
        });
    });
    
    // Prevent form submission on Enter key in sign-in modal
    document.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && e.target.tagName !== "TEXTAREA" && e.target.tagName !== "INPUT") {
            e.preventDefault();
        }
    });
}

/**
 * Handle sign-in form submission
 */
function handleSignIn(e) {
    e.preventDefault();
    
    const fullName = document.getElementById("full-name").value.trim();
    const phoneNumber = document.getElementById("phone-number").value.trim();
    const password = document.getElementById("password").value;
    
    // Validate inputs
    if (!validateSignInInputs(fullName, phoneNumber, password)) {
        return;
    }
    
    // Create user object
    AppState.currentUser = {
        fullName,
        phoneNumber,
        signInDate: new Date().toISOString(),
        lastAccess: new Date().toISOString()
    };
    
    // Save to localStorage
    localStorage.setItem("dataZoneUser", JSON.stringify(AppState.currentUser));
    
    // Show main interface
    showMainInterface();
    
    // Reset form
    DOM.signinForm.reset();
    
    // Show welcome message
    showToast(`Welcome to Data Zone Ghana, ${fullName}!`);
}

/**
 * Validate sign-in inputs
 */
function validateSignInInputs(fullName, phoneNumber, password) {
    if (!fullName || fullName.length < 2) {
        showToast("Please enter your full name");
        return false;
    }
    
    if (!phoneNumber || !/^0\d{9}$/.test(phoneNumber)) {
        showToast("Please enter a valid Ghanaian phone number (10 digits starting with 0)");
        return false;
    }
    
    if (!password || password.length < 6) {
        showToast("Password must be at least 6 characters");
        return false;
    }
    
    return true;
}

/**
 * Handle user logout
 */
function handleLogout() {
    if (confirm("Are you sure you want to log out?")) {
        localStorage.removeItem("dataZoneUser");
        AppState.currentUser = null;
        showSignInModal();
        DOM.mainContent.classList.add("hidden");
        showToast("You have been logged out successfully");
    }
}

/**
 * Switch between network tabs
 */
function switchNetwork(network) {
    // Update active tab
    DOM.tabButtons.forEach(button => {
        button.classList.toggle("active", button.dataset.network === network);
    });
    
    // Update current network
    AppState.currentNetwork = network;
    
    // Render products for selected network
    renderProducts(network);
    
    // Scroll to products section on mobile
    if (window.innerWidth < 768) {
        document.querySelector('.products-section').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

/**
 * Render products for a specific network
 */
function renderProducts(network) {
    const networkData = PRODUCTS[network];
    if (!networkData) return;
    
    // Clear current products
    DOM.productsContainer.innerHTML = "";
    
    // Create product cards
    networkData.bundles.forEach(bundle => {
        const productCard = createProductCard(bundle, networkData);
        DOM.productsContainer.appendChild(productCard);
    });
    
    // Add animation class
    setTimeout(() => {
        const cards = DOM.productsContainer.querySelectorAll('.product-card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('animate-up');
        });
    }, 100);
}

/**
 * Create a product card element
 */
function createProductCard(bundle, networkData) {
    const card = document.createElement("div");
    card.className = "product-card";
    
    // Determine price display based on network
    let priceDisplay = "";
    let priceDetails = "";
    
    if (networkData.color === "airteltigo") {
        priceDisplay = `GH₵ ${bundle.price.toFixed(2)}`;
        priceDetails = `
            <div class="product-detail">
                <span class="product-detail-label">Cost Price:</span>
                <span class="product-detail-value">GH₵ ${bundle.cost.toFixed(2)}</span>
            </div>
            <div class="product-detail">
                <span class="product-detail-label">Your Price:</span>
                <span class="product-detail-value">GH₵ ${bundle.price.toFixed(2)}</span>
            </div>
        `;
    } else {
        priceDisplay = `GH₵ ${bundle.price.toFixed(2)}`;
        priceDetails = `
            <div class="product-detail">
                <span class="product-detail-label">Price:</span>
                <span class="product-detail-value">GH₵ ${bundle.price.toFixed(2)}</span>
            </div>
        `;
    }
    
    // Create card HTML
    card.innerHTML = `
        <div class="product-header ${networkData.color}">
            <div class="product-network">${networkData.name.split(" ")[0]}</div>
            <div class="product-badge">${networkData.badge}</div>
        </div>
        <div class="product-body">
            <div class="product-size">${bundle.size}</div>
            <div class="product-price">${priceDisplay}</div>
            <div class="product-details">
                ${priceDetails}
                <div class="product-detail">
                    <span class="product-detail-label">Validity:</span>
                    <span class="product-detail-value">${bundle.duration}</span>
                </div>
            </div>
        </div>
        <div class="product-footer">
            <a href="${GOOGLE_FORM_URL}" 
               target="_blank" 
               class="btn-confirm"
               data-network="${networkData.color}"
               data-size="${bundle.size}"
               data-price="${bundle.price}">
                <i class="fas fa-check-circle"></i>
                Confirm Payment
            </a>
        </div>
    `;
    
    // Add click event to track which bundle was selected
    const confirmButton = card.querySelector(".btn-confirm");
    confirmButton.addEventListener("click", () => {
        trackBundleSelection(bundle, networkData);
    });
    
    return card;
}

/**
 * Track bundle selection for analytics
 */
function trackBundleSelection(bundle, networkData) {
    AppState.selectedBundle = {
        ...bundle,
        network: networkData.name,
        selectionTime: new Date().toISOString()
    };
    
    console.log("Bundle selected for purchase:", AppState.selectedBundle);
    
    // In a real application, you would send this data to analytics
    // For now, we'll just log it and store in localStorage
    const purchaseHistory = JSON.parse(localStorage.getItem("dataZonePurchaseHistory") || "[]");
    purchaseHistory.push(AppState.selectedBundle);
    localStorage.setItem("dataZonePurchaseHistory", JSON.stringify(purchaseHistory));
}

/**
 * Update time-based greeting
 */
function updateTimeGreeting() {
    const hour = new Date().getHours();
    let greeting = "";
    
    if (hour < 12) {
        greeting = "Good Morning!";
    } else if (hour < 18) {
        greeting = "Good Afternoon!";
    } else {
        greeting = "Good Evening!";
    }
    
    DOM.timeGreeting.textContent = greeting;
    
    // Update every minute
    setTimeout(updateTimeGreeting, 60000);
}

/**
 * Apply animations to elements
 */
function applyAnimations() {
    // Animate sections on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate-up");
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll(".order-guide, .products-section, .info-section").forEach(section => {
        observer.observe(section);
    });
}

/**
 * Show toast notification
 */
function showToast(message, type = "success") {
    // Remove existing toast
    const existingToast = document.querySelector(".toast");
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create toast element
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas fa-${type === "success" ? "check-circle" : "exclamation-circle"}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add to DOM
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
        toast.classList.add("show");
    }, 10);
    
    // Remove toast after delay
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

/**
 * Initialize when DOM is loaded
 */
document.addEventListener("DOMContentLoaded", init);

/**
 * Add keyboard shortcuts
 */
document.addEventListener("keydown", (e) => {
    // Escape key closes modals
    if (e.key === "Escape" && !DOM.signinModal.classList.contains("hidden")) {
        // Don't allow closing sign-in modal with Escape (user must sign in)
        e.preventDefault();
    }
    
    // Ctrl/Cmd + / shows keyboard shortcuts help
    if ((e.ctrlKey || e.metaKey) && e.key === "/") {
        e.preventDefault();
        showToast("Keyboard shortcuts: Ctrl+/ - This help, Esc - Close modals", "success");
    }
});

/**
 * Add service worker registration for PWA capabilities
 */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // In a real application, you would register a service worker here
        console.log('Service Worker capability detected');
    });
}

console.log("Data Zone Ghana - Application loaded successfully");