// Data Zone Ghana - Complete JavaScript Application
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

/* =========================
   FIREBASE CONFIGURATION
   ========================= */
const firebaseConfig = {
  apiKey: "AIzaSyABIZdC4eoS7Jo_35f7tGvFuRJ-Jqw4aEU",
  authDomain: "data-zone-ghana.firebaseapp.com",
  projectId: "data-zone-ghana",
  storageBucket: "data-zone-ghana.firebasestorage.app",
  messagingSenderId: "646703313086",
  appId: "1:646703313086:web:bc60a2b200176d540a2eef",
  measurementId: "G-CZM5SHSS0Z"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

/* =========================
   GOOGLE FORM CONFIGURATION
   ========================= */
const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfMy0tJxTDmLjp2_uBe4Krgkg98Vv9urYEy1aovxBCPjABhwg/formResponse";
const FORM_FIELDS = {
  name: "entry.2005620554",
  email: "entry.1045781291",
  phone: "entry.1065046570",
  transaction: "entry.1745455373",
  bundle: "entry.1166974658"
};

/* =========================
   PRODUCTS DATA
   ========================= */
const PRODUCTS = {
  mtn: {
    name: "MTN Non-Expiry",
    color: "mtn",
    badge: "No Expiry",
    bundles: [
      { size: "1 GB", price: 5.0, duration: "No Expiry" },
      { size: "2 GB", price: 10.0, duration: "No Expiry" },
      { size: "3 GB", price: 14.0, duration: "No Expiry" },
      { size: "4 GB", price: 19.5, duration: "No Expiry" },
      { size: "5 GB", price: 25.0, duration: "No Expiry" },
      { size: "6 GB", price: 29.5, duration: "No Expiry" },
      { size: "8 GB", price: 38.0, duration: "No Expiry" },
      { size: "10 GB", price: 45.0, duration: "No Expiry" },
      { size: "15 GB", price: 65.0, duration: "No Expiry" },
      { size: "20 GB", price: 85.0, duration: "No Expiry" },
      { size: "25 GB", price: 110.0, duration: "No Expiry" },
      { size: "30 GB", price: 126.0, duration: "No Expiry" },
      { size: "40 GB", price: 165.0, duration: "No Expiry" },
      { size: "50 GB", price: 208.0, duration: "No Expiry" }
    ]
  },
  telecel: {
    name: "Telecel Non-Expiry",
    color: "telecel",
    badge: "No Expiry",
    bundles: [
      { size: "5 GB", price: 21.0, duration: "No Expiry" },
      { size: "8 GB", price: 36.5, duration: "No Expiry" },
      { size: "10 GB", price: 45.0, duration: "No Expiry" },
      { size: "12 GB", price: 46.0, duration: "No Expiry" },
      { size: "15 GB", price: 65.0, duration: "No Expiry" },
      { size: "20 GB", price: 74.0, duration: "No Expiry" },
      { size: "25 GB", price: 92.0, duration: "No Expiry" },
      { size: "30 GB", price: 110.0, duration: "No Expiry" },
      { size: "35 GB", price: 128.0, duration: "No Expiry" },
      { size: "40 GB", price: 145.0, duration: "No Expiry" },
      { size: "45 GB", price: 162.0, duration: "No Expiry" },
      { size: "50 GB", price: 180.0, duration: "No Expiry" },
      { size: "100 GB", price: 355.0, duration: "No Expiry" }
    ]
  },
  airteltigo: {
    name: "AirtelTigo Premium",
    color: "airteltigo",
    badge: "30 Days",
    bundles: [
      { size: "1 GB", price: 4.5, duration: "30 days" },
      { size: "2 GB", price: 9.0, duration: "30 days" },
      { size: "3 GB", price: 14.0, duration: "30 days" },
      { size: "4 GB", price: 17.5, duration: "30 days" },
      { size: "5 GB", price: 21.0, duration: "30 days" },
      { size: "6 GB", price: 25.0, duration: "30 days" },
      { size: "8 GB", price: 33.0, duration: "30 days" },
      { size: "10 GB", price: 41.0, duration: "30 days" },
      { size: "12 GB", price: 48.0, duration: "30 days" },
      { size: "15 GB", price: 60.0, duration: "30 days" },
      { size: "25 GB", price: 100.0, duration: "30 days" },
      { size: "30 GB", price: 120.0, duration: "30 days" },
      { size: "40 GB", price: 158.0, duration: "30 days" },
      { size: "50 GB", price: 198.0, duration: "30 days" }
    ]
  }
};

/* =========================
   APPLICATION STATE
   ========================= */
let currentUser = null;
let currentNetwork = "mtn";
let currentOrder = null;
let ordersHistory = [];

/* =========================
   LOCAL STORAGE KEYS
   ========================= */
const STORAGE_KEYS = {
  ORDERS: 'data_zone_orders_v2',
  WHATSAPP_DISMISSED: 'data_zone_whatsapp_dismissed',
  USER_PREFERENCES: 'data_zone_user_prefs'
};

/* =========================
   DOM ELEMENTS
   ========================= */
const DOM = {
  // Auth Elements
  authModal: document.getElementById('auth-modal'),
  authTabs: document.querySelectorAll('.auth-tab'),
  loginForm: document.getElementById('login-form'),
  signupForm: document.getElementById('signup-form'),
  loginEmail: document.getElementById('login-email'),
  loginPassword: document.getElementById('login-password'),
  signupName: document.getElementById('signup-name'),
  signupEmail: document.getElementById('signup-email'),
  signupPassword: document.getElementById('signup-password'),
  emailLoginBtn: document.getElementById('emailLoginBtn'),
  emailSignUpBtn: document.getElementById('emailSignUpBtn'),
  googleSignInBtn: document.getElementById('googleSignInBtn'),
  
  // Main Elements
  mainContent: document.getElementById('main-content'),
  userName: document.getElementById('user-name'),
  timeGreeting: document.getElementById('time-greeting'),
  logoutBtn: document.getElementById('logoutBtn'),
  ordersBtn: document.getElementById('ordersBtn'),
  helpBtn: document.getElementById('helpBtn'),
  profileBtn: document.getElementById('profileBtn'),
  
  // Network Tabs
  tabButtons: document.querySelectorAll('.tab-btn'),
  
  // Products
  productsContainer: document.getElementById('products-container'),
  
  // Order History
  orderHistorySection: document.getElementById('order-history-section'),
  ordersContainer: document.getElementById('orders-container'),
  clearHistoryBtn: document.getElementById('clearHistoryBtn'),
  exportHistoryBtn: document.getElementById('exportHistoryBtn'),
  
  // FAQ
  faqQuestions: document.querySelectorAll('.faq-question'),
  
  // WhatsApp Widget
  whatsappToggle: document.getElementById('whatsapp-toggle'),
  whatsappPanel: document.getElementById('whatsapp-panel'),
  closeWhatsapp: document.getElementById('close-whatsapp'),
  dismissPreview: document.getElementById('dismiss-preview'),
  dontShowAgain: document.getElementById('dont-show-again'),
  chatOptions: document.querySelectorAll('.chat-option'),
  chatMessage: document.getElementById('chat-message'),
  sendWhatsapp: document.getElementById('send-whatsapp'),
  
  // Help Modal
  helpModal: document.getElementById('help-modal'),
  closeHelp: document.getElementById('close-help'),
  openHelpModal: document.getElementById('open-help-modal'),
  
  // Purchase Modal
  purchaseModal: document.getElementById('purchase-modal'),
  closePurchase: document.getElementById('close-purchase'),
  cancelPurchase: document.getElementById('cancel-purchase'),
  purchaseForm: document.getElementById('purchase-form'),
  recipientPhone: document.getElementById('recipient-phone'),
  transactionId: document.getElementById('transaction-id'),
  phoneError: document.getElementById('phone-error'),
  
  // Summary Elements
  summaryProduct: document.getElementById('summary-product'),
  summarySize: document.getElementById('summary-size'),
  summaryPrice: document.getElementById('summary-price'),
  summaryTotal: document.getElementById('summary-total'),
  
  // Navigation
  scrollToBundles: document.getElementById('scrollToBundles'),
  scrollToPayment: document.getElementById('scrollToPayment'),
  scrollToPaymentFooter: document.getElementById('scroll-to-payment-footer'),
  footerLinks: document.querySelectorAll('.footer-link'),
  
  // Current Year
  currentYear: document.getElementById('current-year')
};

/* =========================
   UTILITY FUNCTIONS
   ========================= */
function showToast(message, type = 'success', duration = 4000) {
  const container = document.getElementById('toast-container');
  
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'assertive');
  toast.setAttribute('aria-atomic', 'true');
  
  const icon = type === 'error' ? 'fas fa-exclamation-circle' : 'fas fa-check-circle';
  
  toast.innerHTML = `
    <div class="toast-icon">
      <i class="${icon}"></i>
    </div>
    <div class="toast-content">
      <p>${message}</p>
    </div>
    <button class="toast-close" aria-label="Close notification">
      <i class="fas fa-times"></i>
    </button>
  `;
  
  container.appendChild(toast);
  
  // Remove toast after duration
  const removeToast = () => {
    toast.style.animation = 'slideInRight 0.3s ease reverse';
    setTimeout(() => toast.remove(), 300);
  };
  
  setTimeout(removeToast, duration);
  
  // Close button event
  toast.querySelector('.toast-close').addEventListener('click', removeToast);
  
  // For screen readers
  setTimeout(() => {
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('role', 'status');
    liveRegion.className = 'sr-only';
    liveRegion.textContent = message;
    document.body.appendChild(liveRegion);
    setTimeout(() => liveRegion.remove(), 100);
  }, 100);
}

function showElement(el) {
  if (el) {
    el.classList.remove('hidden');
    el.style.display = '';
  }
}

function hideElement(el) {
  if (el) el.classList.add('hidden');
}

function formatPhoneNumber(phone) {
  if (!phone) return '';
  
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Format: 0XXXXXXXXX
  if (cleaned.length === 10 && cleaned.startsWith('0')) {
    return cleaned;
  }
  
  // Format: 233XXXXXXXXX
  if (cleaned.length === 12 && cleaned.startsWith('233')) {
    return '0' + cleaned.slice(3);
  }
  
  // Format: +233XXXXXXXXX
  if (cleaned.length === 13 && cleaned.startsWith('233')) {
    return '0' + cleaned.slice(3);
  }
  
  return cleaned;
}

function validatePhoneNumber(phone) {
  const patterns = [
    /^0[0-9]{9}$/,           // 0XXXXXXXXX
    /^233[0-9]{9}$/,         // 233XXXXXXXXX
    /^\+233[0-9]{9}$/        // +233XXXXXXXXX
  ];
  
  return patterns.some(pattern => pattern.test(phone.trim()));
}

function normalizePhone(phone) {
  const formatted = formatPhoneNumber(phone);
  return formatted.startsWith('0') ? formatted : '';
}

function loadOrdersHistory() {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
    if (saved) {
      ordersHistory = JSON.parse(saved);
      renderOrdersHistory();
    }
  } catch (error) {
    console.error('Error loading orders history:', error);
    ordersHistory = [];
  }
}

function saveOrder(order) {
  // Add timestamp if not present
  if (!order.timestamp) {
    order.timestamp = new Date().toISOString();
    order.status = 'pending';
  }
  
  // Add to beginning of array
  ordersHistory.unshift(order);
  
  // Keep only last 30 orders
  if (ordersHistory.length > 30) {
    ordersHistory = ordersHistory.slice(0, 30);
  }
  
  // Save to localStorage
  try {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(ordersHistory));
    renderOrdersHistory();
    showToast('Order saved to history', 'success');
  } catch (error) {
    console.error('Error saving order:', error);
  }
}

function clearOrdersHistory() {
  if (confirm('Are you sure you want to clear all order history? This action cannot be undone.')) {
    ordersHistory = [];
    localStorage.removeItem(STORAGE_KEYS.ORDERS);
    renderOrdersHistory();
    showToast('Order history cleared', 'success');
  }
}

function exportOrdersToCSV() {
  if (ordersHistory.length === 0) {
    showToast('No orders to export', 'error');
    return;
  }
  
  const headers = ['Date', 'Time', 'Network', 'Bundle', 'Phone', 'Price', 'Status'];
  const rows = ordersHistory.map(order => {
    const date = new Date(order.timestamp);
    return [
      date.toLocaleDateString(),
      date.toLocaleTimeString(),
      order.network,
      order.size,
      order.phone || 'N/A',
      `GH₵${order.price}`,
      order.status || 'pending'
    ];
  });
  
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `data-zone-orders-${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  
  showToast('Orders exported to CSV', 'success');
}

function renderOrdersHistory() {
  if (!DOM.ordersContainer) return;
  
  if (ordersHistory.length === 0) {
    DOM.ordersContainer.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-shopping-bag"></i>
        <h3>No Orders Yet</h3>
        <p>Your order history will appear here after you make purchases.</p>
      </div>
    `;
    return;
  }
  
  DOM.ordersContainer.innerHTML = `
    <div class="order-list">
      ${ordersHistory.map((order, index) => `
        <div class="order-item" data-index="${index}">
          <div class="order-info">
            <h4>${order.network} - ${order.size}</h4>
            <div class="order-meta">
              <span>${new Date(order.timestamp).toLocaleDateString()}</span>
              <span>${new Date(order.timestamp).toLocaleTimeString()}</span>
              <span>${order.phone || 'N/A'}</span>
            </div>
          </div>
          <div class="order-details">
            <div class="order-price">GH₵${order.price}</div>
            <div class="order-status ${order.status === 'sent' ? 'status-sent' : 'status-pending'}">
              ${order.status || 'pending'}
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function setupFAQAccordion() {
  DOM.faqQuestions?.forEach(question => {
    question.addEventListener('click', () => {
      const item = question.closest('.faq-item');
      const isActive = item.classList.contains('active');
      
      // Close all other items
      document.querySelectorAll('.faq-item').forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        }
      });
      
      // Toggle current item
      item.classList.toggle('active', !isActive);
      question.setAttribute('aria-expanded', (!isActive).toString());
    });
    
    // Keyboard support
    question.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        question.click();
      }
    });
  });
}

function setupWhatsAppWidget() {
  // Check if user has dismissed the preview
  const dismissed = localStorage.getItem(STORAGE_KEYS.WHATSAPP_DISMISSED);
  
  // Toggle panel
  DOM.whatsappToggle?.addEventListener('click', () => {
    DOM.whatsappPanel.classList.toggle('hidden');
    DOM.whatsappToggle.setAttribute('aria-expanded', 
      !DOM.whatsappPanel.classList.contains('hidden')
    );
  });
  
  // Close panel
  DOM.closeWhatsapp?.addEventListener('click', () => {
    DOM.whatsappPanel.classList.add('hidden');
    DOM.whatsappToggle.setAttribute('aria-expanded', 'false');
  });
  
  // Dismiss preview
  DOM.dismissPreview?.addEventListener('click', () => {
    const dontShow = DOM.dontShowAgain?.checked;
    if (dontShow) {
      localStorage.setItem(STORAGE_KEYS.WHATSAPP_DISMISSED, 'true');
    }
    DOM.whatsappPanel.classList.add('hidden');
  });
  
  // Chat options
  DOM.chatOptions?.forEach(option => {
    option.addEventListener('click', () => {
      DOM.chatOptions.forEach(opt => opt.classList.remove('active'));
      option.classList.add('active');
    });
  });
  
  // Send WhatsApp message
  DOM.sendWhatsapp?.addEventListener('click', () => {
    const type = document.querySelector('.chat-option.active').dataset.type;
    const message = DOM.chatMessage?.value.trim() || 'Hello, I need help with data bundles';
    const phone = '233275903629'; // Your WhatsApp number
    
    let url;
    if (type === 'personal') {
      url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    } else {
      url = 'https://chat.whatsapp.com/KvupM9a1osR2ZE6LLy5NDb';
    }
    
    window.open(url, '_blank');
    DOM.whatsappPanel.classList.add('hidden');
    DOM.whatsappToggle.setAttribute('aria-expanded', 'false');
    
    showToast('Opening WhatsApp...', 'success');
  });
  
  // Auto-open panel on first visit (if not dismissed)
  if (!dismissed && window.innerWidth > 768) {
    setTimeout(() => {
      DOM.whatsappPanel.classList.remove('hidden');
      DOM.whatsappToggle.setAttribute('aria-expanded', 'true');
    }, 3000);
  }
}

/* =========================
   AUTHENTICATION FUNCTIONS
   ========================= */
async function signUpWithEmail() {
  const name = DOM.signupName?.value.trim();
  const email = DOM.signupEmail?.value.trim();
  const password = DOM.signupPassword?.value;
  
  if (!name || !email || !password) {
    showToast('Please fill in all fields', 'error');
    return;
  }
  
  if (password.length < 6) {
    showToast('Password must be at least 6 characters', 'error');
    return;
  }
  
  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCred.user, { displayName: name });
    showToast('🎉 Account created successfully! Welcome!', 'success');
  } catch (error) {
    console.error('Signup error:', error);
    let message = 'Sign up failed';
    if (error.code === 'auth/email-already-in-use') {
      message = 'Email already in use. Please sign in instead.';
    } else if (error.code === 'auth/invalid-email') {
      message = 'Invalid email address';
    } else if (error.code === 'auth/weak-password') {
      message = 'Password is too weak';
    }
    showToast(message, 'error');
  }
}

async function loginWithEmail() {
  const email = DOM.loginEmail?.value.trim();
  const password = DOM.loginPassword?.value;
  
  if (!email || !password) {
    showToast('Please enter email and password', 'error');
    return;
  }
  
  try {
    await signInWithEmailAndPassword(auth, email, password);
    showToast('✅ Login successful! Welcome back!', 'success');
  } catch (error) {
    console.error('Login error:', error);
    let message = 'Login failed';
    if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
      message = 'Invalid email or password';
    } else if (error.code === 'auth/too-many-requests') {
      message = 'Too many attempts. Please try again later.';
    }
    showToast(message, 'error');
  }
}

async function loginWithGoogle() {
  try {
    await signInWithPopup(auth, provider);
    showToast('👋 Welcome! Google sign-in successful', 'success');
  } catch (error) {
    console.error('Google sign-in error:', error);
    showToast('Google sign-in failed. Please try again.', 'error');
  }
}

function signOutUser() {
  signOut(auth)
    .then(() => {
      showToast('👋 Signed out successfully. See you soon!', 'success');
    })
    .catch(error => {
      console.error('Signout error:', error);
      showToast('Sign out failed', 'error');
    });
}

// Auth state listener
onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser = {
      uid: user.uid,
      name: user.displayName || user.email?.split('@')[0] || 'Customer',
      email: user.email || '',
      photoURL: user.photoURL
    };
    
    if (DOM.userName) DOM.userName.textContent = currentUser.name;
    showElement(DOM.mainContent);
    hideElement(DOM.authModal);
    document.body.style.overflow = 'auto';
    
    // Load user's order history
    loadOrdersHistory();
    
  } else {
    currentUser = null;
    // Reset form fields
    if (DOM.loginEmail) DOM.loginEmail.value = '';
    if (DOM.loginPassword) DOM.loginPassword.value = '';
    if (DOM.signupName) DOM.signupName.value = '';
    if (DOM.signupEmail) DOM.signupEmail.value = '';
    if (DOM.signupPassword) DOM.signupPassword.value = '';
    
    hideElement(DOM.mainContent);
    showElement(DOM.authModal);
    document.body.style.overflow = 'hidden';
    
    // Switch to login tab
    switchAuthTab('login');
  }
});

/* =========================
   PRODUCT FUNCTIONS
   ========================= */
function switchNetwork(network) {
  currentNetwork = network;
  
  // Update active tab
  DOM.tabButtons?.forEach(btn => {
    const isActive = btn.dataset.network === network;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-selected', isActive.toString());
  });
  
  renderProducts(network);
}

function renderProducts(network) {
  if (!DOM.productsContainer) return;
  
  const networkData = PRODUCTS[network];
  if (!networkData) return;
  
  DOM.productsContainer.innerHTML = '';
  
  networkData.bundles.forEach((bundle, index) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.style.animationDelay = `${index * 50}ms`;
    
    card.innerHTML = `
      <div class="product-header">
        <div class="product-network">${networkData.name}</div>
        <div class="product-badge">${networkData.badge}</div>
      </div>
      <div class="product-body">
        <div class="product-size">${bundle.size}</div>
        <div class="product-price">${bundle.price.toFixed(2)}</div>
        <div class="product-details">
          <div class="product-detail">
            <span class="product-detail-label">Your Price:</span>
            <span class="product-detail-value">GH₵ ${bundle.price.toFixed(2)}</span>
          </div>
          <div class="product-detail">
            <span class="product-detail-label">Validity:</span>
            <span class="product-detail-value">${bundle.duration}</span>
          </div>
          <div class="product-detail">
            <span class="product-detail-label">Service Fee:</span>
            <span class="product-detail-value">GH₵ 0.50</span>
          </div>
          <div class="product-detail">
            <span class="product-detail-label">Total:</span>
            <span class="product-detail-value">GH₵ ${(bundle.price + 0.5).toFixed(2)}</span>
          </div>
        </div>
      </div>
      <div class="product-footer">
        <button class="btn-buy" 
                data-network="${network}" 
                data-size="${bundle.size}" 
                data-price="${bundle.price}"
                aria-label="Buy ${bundle.size} ${networkData.name} bundle for GH₵${bundle.price}">
          <i class="fas fa-shopping-cart"></i> Buy Now - GH₵ ${bundle.price.toFixed(2)}
        </button>
      </div>
    `;
    
    // Add buy button event
    const buyBtn = card.querySelector('.btn-buy');
    buyBtn.addEventListener('click', () => {
      openPurchaseModal({
        network: networkData.name,
        size: bundle.size,
        price: bundle.price
      });
    });
    
    DOM.productsContainer.appendChild(card);
  });
}

/* =========================
   PURCHASE MODAL FUNCTIONS
   ========================= */
function openPurchaseModal({ network, size, price }) {
  if (!currentUser) {
    showToast('🔒 Please sign in before making a purchase', 'error');
    switchAuthTab('login');
    return;
  }
  
  currentOrder = { network, size, price };
  
  // Update summary
  if (DOM.summaryProduct) DOM.summaryProduct.textContent = network;
  if (DOM.summarySize) DOM.summarySize.textContent = size;
  if (DOM.summaryPrice) DOM.summaryPrice.textContent = `GH₵ ${price.toFixed(2)}`;
  if (DOM.summaryTotal) DOM.summaryTotal.textContent = `GH₵ ${(price + 0.5).toFixed(2)}`;
  
  // Clear form
  if (DOM.recipientPhone) DOM.recipientPhone.value = '';
  if (DOM.transactionId) DOM.transactionId.value = '';
  if (DOM.phoneError) hideElement(DOM.phoneError);
  
  // Show modal
  showElement(DOM.purchaseModal);
  document.body.style.overflow = 'hidden';
  
  // Focus first input
  setTimeout(() => {
    DOM.recipientPhone?.focus();
  }, 100);
}

function closePurchaseModal() {
  hideElement(DOM.purchaseModal);
  document.body.style.overflow = 'auto';
  currentOrder = null;
}

function validatePurchaseForm() {
  const phone = DOM.recipientPhone?.value.trim();
  const transactionId = DOM.transactionId?.value.trim();
  
  // Validate phone
  if (!phone) {
    showToast('Please enter recipient phone number', 'error');
    DOM.recipientPhone?.focus();
    return false;
  }
  
  if (!validatePhoneNumber(phone)) {
    if (DOM.phoneError) {
      DOM.phoneError.textContent = 'Please enter a valid Ghana phone number (0XXXXXXXXX, +233XXXXXXXXX, or 233XXXXXXXXX)';
      showElement(DOM.phoneError);
    }
    DOM.recipientPhone?.focus();
    return false;
  }
  
  // Validate transaction ID
  if (!transactionId) {
    showToast('Please enter transaction ID', 'error');
    DOM.transactionId?.focus();
    return false;
  }
  
  if (transactionId.length < 6) {
    showToast('Transaction ID must be at least 6 characters', 'error');
    DOM.transactionId?.focus();
    return false;
  }
  
  return true;
}

async function submitPurchaseForm() {
  if (!validatePurchaseForm()) return;
  
  const phone = normalizePhone(DOM.recipientPhone.value);
  const transactionId = DOM.transactionId.value.trim();
  
  // Create order data
  const orderData = {
    ...currentOrder,
    phone,
    transactionId,
    timestamp: new Date().toISOString(),
    status: 'pending',
    userId: currentUser.uid
  };
  
  // Save to history
  saveOrder(orderData);
  
  // Submit to Google Form
  try {
    const formData = new FormData();
    formData.append(FORM_FIELDS.name, currentUser.name);
    formData.append(FORM_FIELDS.email, currentUser.email);
    formData.append(FORM_FIELDS.phone, phone);
    formData.append(FORM_FIELDS.transaction, transactionId);
    formData.append(FORM_FIELDS.bundle, `${currentOrder.network} - ${currentOrder.size} - GH₵${currentOrder.price}`);
    
    // Submit to Google Form
    await fetch(GOOGLE_FORM_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: formData
    });
    
    showToast('🎉 Order submitted successfully! We\'ll process it within 30 minutes.', 'success');
    
    // Close modal
    closePurchaseModal();
    
    // Show WhatsApp option for support
    setTimeout(() => {
      if (confirm('Would you like to contact WhatsApp support for faster processing?')) {
        DOM.whatsappPanel?.classList.remove('hidden');
      }
    }, 1000);
    
  } catch (error) {
    console.error('Form submission error:', error);
    showToast('Order submitted! You may contact WhatsApp support if you don\'t receive confirmation.', 'success');
    closePurchaseModal();
  }
}

/* =========================
   AUTH TAB MANAGEMENT
   ========================= */
function switchAuthTab(tab) {
  // Update tabs
  DOM.authTabs?.forEach(tabBtn => {
    const isActive = tabBtn.dataset.tab === tab;
    tabBtn.classList.toggle('active', isActive);
    tabBtn.setAttribute('aria-selected', isActive.toString());
  });
  
  // Show active form
  if (tab === 'login') {
    showElement(DOM.loginForm);
    hideElement(DOM.signupForm);
    DOM.loginForm?.classList.add('active');
    DOM.signupForm?.classList.remove('active');
  } else {
    hideElement(DOM.loginForm);
    showElement(DOM.signupForm);
    DOM.loginForm?.classList.remove('active');
    DOM.signupForm?.classList.add('active');
  }
}

/* =========================
   INITIALIZATION
   ========================= */
function init() {
  // Set current year
  if (DOM.currentYear) {
    DOM.currentYear.textContent = new Date().getFullYear();
  }
  
  // Set up time greeting
  function updateGreeting() {
    if (!DOM.timeGreeting) return;
    
    const hour = new Date().getHours();
    let greeting;
    
    if (hour < 5) {
      greeting = 'Good Night! 🌙';
    } else if (hour < 12) {
      greeting = 'Good Morning! ☀️';
    } else if (hour < 18) {
      greeting = 'Good Afternoon! 🌤️';
    } else {
      greeting = 'Good Evening! 🌆';
    }
    
    DOM.timeGreeting.textContent = greeting;
  }
  
  updateGreeting();
  setInterval(updateGreeting, 60000);
  
  // Auth tab switching
  DOM.authTabs?.forEach(tab => {
    tab.addEventListener('click', () => {
      switchAuthTab(tab.dataset.tab);
    });
  });
  
  // Auth buttons
  DOM.emailLoginBtn?.addEventListener('click', loginWithEmail);
  DOM.emailSignUpBtn?.addEventListener('click', signUpWithEmail);
  DOM.googleSignInBtn?.addEventListener('click', loginWithGoogle);
  DOM.logoutBtn?.addEventListener('click', signOutUser);
  
  // Network tabs
  DOM.tabButtons?.forEach(btn => {
    btn.addEventListener('click', () => {
      switchNetwork(btn.dataset.network);
    });
  });
  
  // Order history
  DOM.ordersBtn?.addEventListener('click', () => {
    DOM.orderHistorySection?.classList.toggle('hidden');
    if (!DOM.orderHistorySection?.classList.contains('hidden')) {
      DOM.orderHistorySection.scrollIntoView({ behavior: 'smooth' });
    }
  });
  
  DOM.clearHistoryBtn?.addEventListener('click', clearOrdersHistory);
  DOM.exportHistoryBtn?.addEventListener('click', exportOrdersToCSV);
  
  // Help modal
  DOM.helpBtn?.addEventListener('click', () => {
    showElement(DOM.helpModal);
  });
  
  DOM.closeHelp?.addEventListener('click', () => {
    hideElement(DOM.helpModal);
  });
  
  DOM.openHelpModal?.addEventListener('click', () => {
    showElement(DOM.helpModal);
  });
  
  // Profile button
  DOM.profileBtn?.addEventListener('click', () => {
    showToast(`Welcome ${currentUser?.name || 'User'}! Profile features coming soon.`, 'success');
  });
  
  // Purchase modal
  DOM.closePurchase?.addEventListener('click', closePurchaseModal);
  DOM.cancelPurchase?.addEventListener('click', closePurchaseModal);
  
  DOM.purchaseForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    submitPurchaseForm();
  });
  
  // Phone validation
  DOM.recipientPhone?.addEventListener('input', (e) => {
    if (DOM.phoneError) hideElement(DOM.phoneError);
    
    // Auto-format as user types
    const value = e.target.value;
    if (value.length === 3 && value.startsWith('233')) {
      e.target.value = '+233 ';
    }
  });
  
  DOM.recipientPhone?.addEventListener('blur', (e) => {
    const phone = e.target.value.trim();
    if (phone && !validatePhoneNumber(phone)) {
      if (DOM.phoneError) {
        DOM.phoneError.textContent = 'Please enter a valid Ghana phone number';
        showElement(DOM.phoneError);
      }
    }
  });
  
  // Navigation scrolling
  DOM.scrollToBundles?.addEventListener('click', () => {
    document.querySelector('.products-section').scrollIntoView({ 
      behavior: 'smooth' 
    });
  });
  
  DOM.scrollToPayment?.addEventListener('click', () => {
    document.querySelector('.payment-section').scrollIntoView({ 
      behavior: 'smooth' 
    });
  });
  
  DOM.scrollToPaymentFooter?.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.payment-section').scrollIntoView({ 
      behavior: 'smooth' 
    });
  });
  
  // Footer links
  DOM.footerLinks?.forEach(link => {
    link.addEventListener('click', (e) => {
      const network = link.dataset.network;
      if (network) {
        e.preventDefault();
        switchNetwork(network);
        document.querySelector('.products-section').scrollIntoView({ 
          behavior: 'smooth' 
        });
      }
    });
  });
  
  // Setup components
  setupFAQAccordion();
  setupWhatsAppWidget();
  
  // Initial products render
  renderProducts(currentNetwork);
  
  // Log initialization
  console.log('🚀 Data Zone Ghana initialized successfully!');
  console.log('📱 MTN, Telecel & AirtelTigo bundles ready');
  console.log('🔐 Authentication system active');
  console.log('💬 WhatsApp widget initialized');
}

// Start application
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Export for module usage
export { auth, currentUser, showToast };
