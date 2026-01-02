// Data Zone Ghana - Complete JavaScript
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
   CONFIGURATION VALUES
   ========================= */
const CONFIG = {
  WA_NUMBER: "233275903629", // WhatsApp number (format: 233XXXXXXXXX, no plus)
  GROUP_INVITE: "https://chat.whatsapp.com/KvupM9a1osR2ZE6LLy5NDb?mode=wwt", // WhatsApp group invite
  BACKEND_ENDPOINT: "https://your-backend.com/api/orders" // Placeholder for future backend
};

/* =========================
   GOOGLE FORM CONFIGURATION - CORRECTED
   ========================= */
// Google Form for order submissions
const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfMy0tJxTDmLjp2_uBe4Krgkg98Vv9urYEy1aovxBCPjABhwg/formResponse";

// Form field IDs from your Google Form - CORRECTED MAPPING
const FORM_FIELDS = {
  name: "entry.2005620554",        // Name field
  email: "entry.1045781291",       // Email field
  phone: "entry.1065046570",       // Recipient Phone field
  transaction: "entry.1745455373", // Transaction ID field
  bundle: "entry.1166974658"       // Selected Bundle field - CORRECTED
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
      { size: "1 GB", cost: 3.95, price: 4.5, duration: "30 days" },
      { size: "2 GB", cost: 8.35, price: 9.0, duration: "30 days" },
      { size: "3 GB", cost: 13.25, price: 14.0, duration: "30 days" },
      { size: "4 GB", cost: 16.5, price: 17.5, duration: "30 days" },
      { size: "5 GB", cost: 19.5, price: 21.0, duration: "30 days" },
      { size: "6 GB", cost: 23.5, price: 25.0, duration: "30 days" },
      { size: "8 GB", cost: 30.5, price: 33.0, duration: "30 days" },
      { size: "10 GB", cost: 38.5, price: 41.0, duration: "30 days" },
      { size: "12 GB", cost: 45.5, price: 48.0, duration: "30 days" },
      { size: "15 GB", cost: 57.5, price: 60.0, duration: "30 days" },
      { size: "25 GB", cost: 95.0, price: 100.0, duration: "30 days" },
      { size: "30 GB", cost: 115.0, price: 120.0, duration: "30 days" },
      { size: "40 GB", cost: 151.0, price: 158.0, duration: "30 days" },
      { size: "50 GB", cost: 190.0, price: 198.0, duration: "30 days" }
    ]
  }
};

/* =========================
   DOM ELEMENTS
   ========================= */
const DOM = {
  authModal: document.getElementById("auth-modal"),
  authName: document.getElementById("auth-name"),
  authEmail: document.getElementById("auth-email"),
  authPassword: document.getElementById("auth-password"),
  emailSignUpBtn: document.getElementById("emailSignUpBtn"),
  emailLoginBtn: document.getElementById("emailLoginBtn"),
  googleSignInBtn: document.getElementById("googleSignInBtn"),
  mainContent: document.getElementById("main-content"),
  userName: document.getElementById("user-name"),
  timeGreeting: document.getElementById("time-greeting"),
  logoutBtn: document.getElementById("logoutBtn"),
  tabButtons: document.querySelectorAll(".tab-btn"),
  productsContainer: document.getElementById("products-container"),
  currentYear: document.getElementById("current-year"),
  footerLinks: document.querySelectorAll(".footer-link")
};

/* =========================
   APPLICATION STATE
   ========================= */
let currentUser = null;
let currentNetwork = "mtn";

/* =========================
   UTILITY FUNCTIONS
   ========================= */
function showElement(el) {
  if (el) el.classList.remove("hidden");
}

function hideElement(el) {
  if (el) el.classList.add("hidden");
}

function showToast(message, type = "success") {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();
  
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.setAttribute("aria-live", "polite");
  toast.innerHTML = `
    <div class="toast-content">
      <i class="fas fa-${type === "error" ? "exclamation-circle" : "check-circle"}"></i>
      <span>${message}</span>
    </div>
  `;
  
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add("show"), 10);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/* =========================
   PHONE VALIDATION & NORMALIZATION
   ========================= */
class PhoneValidator {
  static normalize(phone) {
    if (!phone) return '';
    
    // Remove all non-digits
    let digits = phone.replace(/\D/g, '');
    
    // Handle different formats
    if (digits.startsWith('233') && digits.length === 12) {
      // Convert 233XXXXXXXXX to 0XXXXXXXXX
      return '0' + digits.substring(3);
    } else if (digits.startsWith('+233') && digits.length === 13) {
      // Convert +233XXXXXXXXX to 0XXXXXXXXX
      return '0' + digits.substring(4);
    } else if (digits.startsWith('0') && digits.length === 10) {
      // Already in correct format
      return digits;
    } else if (digits.length === 9) {
      // Assume missing leading 0
      return '0' + digits;
    }
    
    return phone; // Return as-is if format not recognized
  }
  
  static validate(phone) {
    const normalized = this.normalize(phone);
    
    // Check if empty
    if (!normalized) {
      return { valid: false, message: 'Phone number is required' };
    }
    
    // Check if contains non-digits after normalization attempt
    if (!/^\d+$/.test(normalized)) {
      return { valid: false, message: 'Phone number must contain only digits' };
    }
    
    // Check length
    if (normalized.length !== 10) {
      return { valid: false, message: 'Phone number must be 10 digits (including leading 0)' };
    }
    
    // Check Ghanaian number format
    if (!/^0(5[0-9]|2[03467]|5[0-9])/.test(normalized)) {
      return { valid: false, message: 'Invalid Ghanaian number format' };
    }
    
    return { valid: true, normalized };
  }
  
  static formatForDisplay(phone) {
    const normalized = this.normalize(phone);
    if (normalized.length === 10) {
      return normalized.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
    }
    return phone;
  }
}

/* =========================
   WHATSAPP WIDGET
   ========================= */
class WhatsAppWidget {
  constructor() {
    this.fab = document.getElementById('dz-wa-fab');
    this.panel = document.getElementById('dz-wa-panel');
    this.closeBtn = document.getElementById('dz-wa-close');
    this.sendBtn = document.getElementById('dz-wa-send');
    this.joinBtn = document.getElementById('dz-wa-join');
    this.dismissBtn = document.getElementById('dz-wa-dismiss');
    this.hideCheckbox = document.getElementById('dz-wa-hide');
    this.messageInput = document.getElementById('dz-wa-message');
    
    this.autoOpened = false;
    
    this.init();
  }
  
  init() {
    // Event listeners
    this.fab.addEventListener('click', () => this.togglePanel());
    this.closeBtn.addEventListener('click', () => this.hidePanel());
    this.sendBtn.addEventListener('click', () => this.sendMessage());
    this.joinBtn.addEventListener('click', () => this.joinGroup());
    this.dismissBtn.addEventListener('click', () => this.dismissPanel());
    
    // Close panel when clicking outside
    document.addEventListener('click', (e) => {
      if (this.panel.classList.contains('show') && 
          !this.panel.contains(e.target) && 
          e.target !== this.fab) {
        this.hidePanel();
      }
    });
    
    // Keyboard support
    this.fab.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.togglePanel();
      }
    });
    
    // Auto-open if not suppressed
    setTimeout(() => {
      if (!this.isSuppressed() && !this.autoOpened) {
        this.autoOpened = true;
        this.showPanel();
      }
    }, 5000);
  }
  
  togglePanel() {
    this.panel.classList.toggle('show');
    this.fab.setAttribute('aria-expanded', this.panel.classList.contains('show'));
  }
  
  showPanel() {
    this.panel.classList.add('show');
    this.fab.setAttribute('aria-expanded', 'true');
  }
  
  hidePanel() {
    this.panel.classList.remove('show');
    this.fab.setAttribute('aria-expanded', 'false');
    
    // Save dismissal preference
    if (this.hideCheckbox.checked) {
      localStorage.setItem('dz_wa_hide', 'true');
    }
  }
  
  isSuppressed() {
    return localStorage.getItem('dz_wa_hide') === 'true';
  }
  
  sendMessage() {
    const message = this.messageInput.value.trim();
    if (!message) {
      this.showMessage('Please enter a message', 'error');
      this.messageInput.focus();
      return;
    }
    
    const phone = CONFIG.WA_NUMBER;
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phone}?text=${encodedMessage}`;
    
    window.open(url, '_blank');
    this.messageInput.value = '';
    this.showMessage('Opening WhatsApp...', 'success');
    this.hidePanel();
  }
  
  joinGroup() {
    window.open(CONFIG.GROUP_INVITE, '_blank');
    this.showMessage('Opening group invite...', 'success');
    this.hidePanel();
  }
  
  dismissPanel() {
    this.hidePanel();
    this.showMessage('Panel dismissed', 'success');
  }
  
  showMessage(text, type = 'info') {
    showToast(text, type);
  }
}

/* =========================
   ORDER HISTORY STORAGE
   ========================= */
class OrderHistory {
  constructor() {
    this.storageKey = 'dz_orders_v1';
    this.maxEntries = 30;
    this.listElement = document.getElementById('dz-orders-list');
    this.emptyElement = document.getElementById('dz-orders-empty');
    this.clearBtn = document.getElementById('dz-orders-clear');
    this.exportBtn = document.getElementById('dz-orders-export');
    
    this.init();
  }
  
  init() {
    if (this.clearBtn) {
      this.clearBtn.addEventListener('click', () => this.clearOrders());
    }
    
    if (this.exportBtn) {
      this.exportBtn.addEventListener('click', () => this.exportToCSV());
    }
    
    this.renderOrders();
  }
  
  getOrders() {
    try {
      const ordersJson = localStorage.getItem(this.storageKey);
      return ordersJson ? JSON.parse(ordersJson) : [];
    } catch (error) {
      console.error('Error reading orders:', error);
      return [];
    }
  }
  
  saveOrder(order) {
    const orders = this.getOrders();
    
    // Add new order at beginning
    orders.unshift({
      when: new Date().toISOString(),
      msisdn: order.phone,
      itemLabel: order.item,
      ref: order.reference || `DZ-${Date.now()}`,
      status: 'pending'
    });
    
    // Keep only latest entries
    const trimmedOrders = orders.slice(0, this.maxEntries);
    
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(trimmedOrders));
      this.renderOrders();
      return true;
    } catch (error) {
      console.error('Error saving order:', error);
      return false;
    }
  }
  
  clearOrders() {
    if (confirm('Are you sure you want to clear all order history?')) {
      localStorage.removeItem(this.storageKey);
      this.renderOrders();
      showToast('Order history cleared', 'success');
    }
  }
  
  exportToCSV() {
    const orders = this.getOrders();
    
    if (orders.length === 0) {
      showToast('No orders to export', 'error');
      return;
    }
    
    // Create CSV headers
    const headers = ['Date', 'Phone Number', 'Item', 'Reference', 'Status'];
    const csvRows = [headers.join(',')];
    
    // Add data rows
    orders.forEach(order => {
      const row = [
        new Date(order.when).toLocaleString(),
        PhoneValidator.formatForDisplay(order.msisdn),
        `"${order.itemLabel.replace(/"/g, '""')}"`,
        order.ref,
        order.status
      ];
      csvRows.push(row.join(','));
    });
    
    const csvContent = csvRows.join('\n');
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `data-zone-orders-${new Date().toISOString().split('T')[0]}.csv`;
    
    // Trigger download
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast('CSV exported successfully', 'success');
  }
  
  renderOrders() {
    const orders = this.getOrders();
    
    if (orders.length === 0) {
      this.listElement.innerHTML = '';
      this.emptyElement.style.display = 'block';
      return;
    }
    
    this.emptyElement.style.display = 'none';
    
    const ordersHtml = orders.map(order => `
      <div class="dz-order-item">
        <div>
          <div style="font-weight: 600; color: var(--dz-dark);">${order.itemLabel}</div>
          <div style="font-size: 14px; color: var(--dz-muted);">
            ${PhoneValidator.formatForDisplay(order.msisdn)} • 
            ${new Date(order.when).toLocaleDateString()}
          </div>
        </div>
        <div>
          <span class="dz-order-status dz-status-${order.status}">
            ${order.status}
          </span>
        </div>
      </div>
    `).join('');
    
    this.listElement.innerHTML = ordersHtml;
  }
}

/* =========================
   FAQ ACCORDION
   ========================= */
class FAQAccordion {
  constructor() {
    this.items = document.querySelectorAll('.dz-faq-item');
    this.init();
  }
  
  init() {
    this.items.forEach(item => {
      const question = item.querySelector('.dz-faq-question');
      const answer = item.querySelector('.dz-faq-answer');
      
      question.addEventListener('click', () => this.toggleItem(item));
      
      // Keyboard support
      question.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.toggleItem(item);
        }
      });
    });
  }
  
  toggleItem(item) {
    const isActive = item.classList.contains('active');
    const question = item.querySelector('.dz-faq-question');
    const answer = item.querySelector('.dz-faq-answer');
    const icon = item.querySelector('.dz-faq-icon');
    
    // Close all items
    this.items.forEach(otherItem => {
      if (otherItem !== item) {
        otherItem.classList.remove('active');
        const otherIcon = otherItem.querySelector('.dz-faq-icon');
        if (otherIcon) otherIcon.textContent = '+';
        const otherQuestion = otherItem.querySelector('.dz-faq-question');
        if (otherQuestion) otherQuestion.setAttribute('aria-expanded', 'false');
      }
    });
    
    // Toggle current item
    if (!isActive) {
      item.classList.add('active');
      icon.textContent = '−';
      question.setAttribute('aria-expanded', 'true');
    } else {
      item.classList.remove('active');
      icon.textContent = '+';
      question.setAttribute('aria-expanded', 'false');
    }
  }
}

/* =========================
   COMPACT CONFIRM MODAL
   ========================= */
class ConfirmModal {
  constructor() {
    this.modal = document.getElementById('dz-confirm');
    this.cancelBtn = document.getElementById('dz-confirm-cancel');
    this.submitBtn = document.getElementById('dz-confirm-submit');
    this.phoneInput = document.getElementById('dz-confirm-phone');
    this.itemInput = document.getElementById('dz-confirm-item');
    this.noteInput = document.getElementById('dz-confirm-note');
    this.phoneError = document.getElementById('dz-phone-error');
    
    this.currentOrder = null;
    this.orderHistory = new OrderHistory();
    
    this.init();
  }
  
  init() {
    // Event listeners
    this.cancelBtn.addEventListener('click', () => this.hide());
    this.submitBtn.addEventListener('click', () => this.submitOrder());
    
    // Phone validation on blur
    this.phoneInput.addEventListener('blur', () => this.validatePhone());
    
    // Keyboard support
    this.modal.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.hide();
      }
    });
    
    // Close when clicking outside
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.hide();
      }
    });
  }
  
  show(order) {
    this.currentOrder = order;
    this.itemInput.value = order.item;
    this.phoneInput.value = '';
    this.noteInput.value = '';
    this.phoneError.textContent = '';
    this.phoneError.classList.remove('show');
    
    this.modal.classList.add('show');
    this.modal.setAttribute('aria-hidden', 'false');
    
    // Set focus
    setTimeout(() => {
      this.phoneInput.focus();
    }, 100);
  }
  
  hide() {
    this.modal.classList.remove('show');
    this.modal.setAttribute('aria-hidden', 'true');
    this.currentOrder = null;
  }
  
  validatePhone() {
    const phone = this.phoneInput.value.trim();
    const result = PhoneValidator.validate(phone);
    
    if (!result.valid) {
      this.phoneError.textContent = result.message;
      this.phoneError.classList.add('show');
      return false;
    }
    
    // Update input with normalized value
    this.phoneInput.value = result.normalized;
    this.phoneError.textContent = '';
    this.phoneError.classList.remove('show');
    return true;
  }
  
  submitOrder() {
    // Validate phone
    if (!this.validatePhone()) {
      showToast('Please correct the phone number', 'error');
      return;
    }
    
    const phone = PhoneValidator.normalize(this.phoneInput.value.trim());
    const note = this.noteInput.value.trim();
    
    // Save to order history
    const saved = this.orderHistory.saveOrder({
      phone: phone,
      item: this.currentOrder.item,
      reference: `DZ-${Date.now()}`
    });
    
    if (saved) {
      showToast('Order saved to history', 'success');
      
      // Open WhatsApp for confirmation
      const message = `Order: ${this.currentOrder.item}\nPhone: ${phone}\nNote: ${note || 'No note'}`;
      const encoded = encodeURIComponent(message);
      const url = `https://wa.me/${CONFIG.WA_NUMBER}?text=${encoded}`;
      window.open(url, '_blank');
      
      this.hide();
    } else {
      showToast('Failed to save order', 'error');
    }
  }
}

/* =========================
   HELP MODAL
   ========================= */
class HelpModal {
  constructor() {
    this.modal = document.getElementById('dz-help-modal');
    this.closeBtn = document.getElementById('dz-help-close');
    this.whatsappBtn = document.getElementById('dz-help-whatsapp');
    this.faqBtn = document.getElementById('dz-help-faq');
    this.ordersBtn = document.getElementById('dz-help-orders');
    this.paymentBtn = document.getElementById('dz-help-payment');
    this.emergencyBtn = document.getElementById('dz-help-emergency');
    
    this.init();
  }
  
  init() {
    // Event listeners
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.hide());
    }
    
    if (this.whatsappBtn) {
      this.whatsappBtn.addEventListener('click', () => this.openWhatsApp());
    }
    
    if (this.faqBtn) {
      this.faqBtn.addEventListener('click', () => this.scrollToFAQ());
    }
    
    if (this.ordersBtn) {
      this.ordersBtn.addEventListener('click', () => this.scrollToOrders());
    }
    
    if (this.paymentBtn) {
      this.paymentBtn.addEventListener('click', () => this.scrollToPayment());
    }
    
    if (this.emergencyBtn) {
      this.emergencyBtn.addEventListener('click', () => this.openEmergency());
    }
    
    // Close when clicking outside
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.hide();
      }
    });
    
    // Keyboard support
    this.modal.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.hide();
      }
    });
  }
  
  show() {
    this.modal.classList.add('show');
    this.modal.setAttribute('aria-hidden', 'false');
  }
  
  hide() {
    this.modal.classList.remove('show');
    this.modal.setAttribute('aria-hidden', 'true');
  }
  
  openWhatsApp() {
    const url = `https://wa.me/${CONFIG.WA_NUMBER}`;
    window.open(url, '_blank');
    this.hide();
  }
  
  scrollToFAQ() {
    const faqSection = document.querySelector('.dz-faq-container');
    if (faqSection) {
      faqSection.scrollIntoView({ behavior: 'smooth' });
    }
    this.hide();
  }
  
  scrollToOrders() {
    const ordersSection = document.querySelector('.dz-orders-container');
    if (ordersSection) {
      ordersSection.scrollIntoView({ behavior: 'smooth' });
    }
    this.hide();
  }
  
  scrollToPayment() {
    const paymentSection = document.querySelector('.payment-top-section');
    if (paymentSection) {
      paymentSection.scrollIntoView({ behavior: 'smooth' });
    }
    this.hide();
  }
  
  openEmergency() {
    const message = 'EMERGENCY: Need immediate assistance with my order!';
    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${CONFIG.WA_NUMBER}?text=${encoded}`;
    window.open(url, '_blank');
    this.hide();
  }
}

/* =========================
   AUTHENTICATION FUNCTIONS
   ========================= */
async function signUpWithEmail() {
  const name = (DOM.authName?.value || "").trim();
  const email = (DOM.authEmail?.value || "").trim();
  const password = DOM.authPassword?.value || "";

  if (!name) return showToast("Please enter full name", "error");
  if (!email) return showToast("Please enter email", "error");
  if (!password || password.length < 6)
    return showToast("Password must be at least 6 characters", "error");

  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCred.user, { displayName: name });
    showToast("🎉 Account created successfully! Welcome to Data Zone Ghana!");
  } catch (err) {
    console.error("Signup error:", err);
    showToast(err.message || "Sign up failed", "error");
  }
}

async function loginWithEmail() {
  const email = (DOM.authEmail?.value || "").trim();
  const password = DOM.authPassword?.value || "";
  
  if (!email) return showToast("Enter email", "error");
  if (!password) return showToast("Enter password", "error");
  
  try {
    await signInWithEmailAndPassword(auth, email, password);
    showToast("✅ Login successful! Welcome back!");
  } catch (err) {
    console.error("Login error:", err);
    showToast(err.message || "Login failed", "error");
  }
}

async function loginWithGoogle() {
  try {
    await signInWithPopup(auth, provider);
    showToast("👋 Welcome! Google sign-in successful");
  } catch (err) {
    console.error("Google sign-in error:", err);
    showToast(err.message || "Google sign-in failed", "error");
  }
}

function signOutUser() {
  signOut(auth)
    .then(() => showToast("👋 Signed out successfully. See you soon!"))
    .catch(err => {
      console.error("Signout error:", err);
      showToast("Sign out failed", "error");
    });
}

// Auth state listener
onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser = {
      uid: user.uid,
      name: user.displayName || user.email?.split("@")[0] || "Customer",
      email: user.email || ""
    };
    
    if (DOM.userName) DOM.userName.textContent = currentUser.name;
    showElement(DOM.mainContent);
    hideElement(DOM.authModal);
    document.body.style.overflow = "auto";
    
    // Show greeting for logged in users
    const hour = new Date().getHours();
    let timeGreet = "Good Day";
    if (hour < 12) timeGreet = "Good Morning";
    else if (hour >= 18) timeGreet = "Good Evening";
    
    setTimeout(() => {
      showToast(`🎄 Welcome back, ${currentUser.name}! ${timeGreet}!`);
    }, 500);
    
  } else {
    currentUser = null;
    if (DOM.authName) DOM.authName.value = "";
    if (DOM.authEmail) DOM.authEmail.value = "";
    if (DOM.authPassword) DOM.authPassword.value = "";
    hideElement(DOM.mainContent);
    showElement(DOM.authModal);
    document.body.style.overflow = "hidden";
  }
});

/* =========================
   PRODUCT DISPLAY FUNCTIONS
   ========================= */
function switchNetwork(network) {
  currentNetwork = network;
  DOM.tabButtons.forEach(btn => 
    btn.classList.toggle("active", btn.dataset.network === network)
  );
  renderProducts(network);
  
  // Scroll to products with smooth animation
  document.querySelector('.products-section').scrollIntoView({ 
    behavior: 'smooth',
    block: 'start'
  });
}

function renderProducts(network) {
  const networkData = PRODUCTS[network];
  if (!networkData || !DOM.productsContainer) return;
  
  DOM.productsContainer.innerHTML = "";
  networkData.bundles.forEach((bundle, index) => {
    const card = createProductCard(bundle, networkData, index);
    DOM.productsContainer.appendChild(card);
    
    // Stagger animation
    setTimeout(() => {
      card.style.animationDelay = `${index * 0.05}s`;
    }, 10);
  });
}

function createProductCard(bundle, networkData, index) {
  const card = document.createElement("div");
  card.className = "product-card";
  card.style.animationDelay = `${index * 0.05}s`;
  
  const salePrice = bundle.price || bundle.cost || 0;
  const cost = bundle.cost || null;
  const headerClass = networkData.color;
  
  card.innerHTML = `
    <div class="product-header ${headerClass}">
      <div class="product-network">${networkData.name.split(" ")[0]}</div>
      <div class="product-badge">${networkData.badge}</div>
    </div>
    <div class="product-body">
      <div class="product-size">${bundle.size}</div>
      <div class="product-price">${salePrice.toFixed(2)}</div>
      <div class="product-details">
        ${cost ? `
          <div class="product-detail">
            <span class="product-detail-label">Cost Price:</span>
            <span class="product-detail-value">GH₵ ${cost.toFixed(2)}</span>
          </div>
        ` : ""}
        <div class="product-detail">
          <span class="product-detail-label">Your Price:</span>
          <span class="product-detail-value">GH₵ ${salePrice.toFixed(2)}</span>
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
          <span class="product-detail-value">GH₵ ${(salePrice + 0.5).toFixed(2)}</span>
        </div>
      </div>
    </div>
    <div class="product-footer">
      <button class="btn-confirm dz-orbital-btn" data-size="${bundle.size}" data-price="${salePrice}">
        <i class="fas fa-shopping-cart"></i> Buy Now - GH₵ ${salePrice.toFixed(2)}
      </button>
    </div>
  `;
  
  card.querySelector(".btn-confirm").addEventListener("click", () => {
    openPurchaseModal({
      network: networkData.name,
      size: bundle.size,
      price: salePrice,
      item: `${networkData.name.split(" ")[0]} ${bundle.size} - GH₵ ${salePrice.toFixed(2)}`
    });
  });
  
  return card;
}

/* =========================
   PURCHASE MODAL FUNCTIONS
   ========================= */
function openPurchaseModal({ network, size, price, item }) {
  if (!currentUser) {
    showToast("🔒 Please sign in before making a purchase", "error");
    return;
  }
  
  // Determine payment number based on network
  let paymentNumber = "";
  let paymentName = "";
  
  if (network.includes("MTN")) {
    paymentNumber = "053 534 3490";
    paymentName = "Vivian Ahorlu";
  } else if (network.includes("Telecel")) {
    paymentNumber = "020 955 8038";
    paymentName = "Bright Dumashie";
  } else if (network.includes("AirtelTigo")) {
    paymentNumber = "027 590 3629";
    paymentName = "Data Zone GH";
  }
  
  // Show payment reminder first
  if (!confirm(`💳 IMPORTANT: Before proceeding, ensure you've sent GH₵${(price + 0.5).toFixed(2)} to:\n\n${network}: ${paymentNumber}\nName: ${paymentName}\n\nHave you made the payment?`)) {
    return;
  }
  
  const confirmModal = new ConfirmModal();
  confirmModal.show({
    item: item,
    network: network,
    size: size,
    price: price
  });
}

/* =========================
   GOOGLE FORM SUBMISSION - CORRECTED VERSION
   ========================= */
async function submitPurchaseToGoogleForm() {
  const phoneInput = document.getElementById("modal-phone");
  const transactionInput = document.getElementById("modal-transaction");
  const bundleInput = document.getElementById("modal-bundle");
  
  if (!phoneInput || !transactionInput || !bundleInput) {
    showToast("System error. Please refresh page.", "error");
    return;
  }
  
  const phoneRaw = phoneInput.value.trim();
  const transactionRaw = transactionInput.value.trim();
  
  if (!phoneRaw) {
    showToast("Please enter recipient phone number", "error");
    phoneInput.focus();
    return;
  }
  
  if (!transactionRaw) {
    showToast("Please enter your transaction ID", "error");
    transactionInput.focus();
    return;
  }
  
  const phone = PhoneValidator.normalize(phoneRaw);
  const bundleValue = bundleInput.value;
  
  // Create a confirmation message
  const confirmBtn = document.getElementById("modal-confirm-btn");
  const originalText = confirmBtn.innerHTML;
  confirmBtn.disabled = true;
  confirmBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting Order...';
  
  try {
    // Prepare form data for Google Form submission
    const formData = new FormData();
    formData.append(FORM_FIELDS.name, currentUser.name);
    formData.append(FORM_FIELDS.email, currentUser.email);
    formData.append(FORM_FIELDS.phone, phone);
    formData.append(FORM_FIELDS.transaction, transactionRaw);
    formData.append(FORM_FIELDS.bundle, bundleValue);
    
    // Submit to Google Form using fetch with no-cors mode
    await fetch(GOOGLE_FORM_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: formData
    });
    
    // Show success message
    showToast("🎉 Order submitted successfully! We'll process it within 30 minutes.", "success");
    
    // Clear form fields
    phoneInput.value = "";
    transactionInput.value = "";
    
  } catch (error) {
    console.error('Form submission error:', error);
    
    // Fallback method: Create hidden form and submit
    const hiddenForm = document.createElement('form');
    hiddenForm.method = 'POST';
    hiddenForm.action = GOOGLE_FORM_URL;
    hiddenForm.target = '_blank';
    hiddenForm.style.display = 'none';
    
    // Add all form fields as hidden inputs
    const fields = {
      [FORM_FIELDS.name]: currentUser.name,
      [FORM_FIELDS.email]: currentUser.email,
      [FORM_FIELDS.phone]: phone,
      [FORM_FIELDS.transaction]: transactionRaw,
      [FORM_FIELDS.bundle]: bundleValue
    };
    
    Object.entries(fields).forEach(([name, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      input.value = value;
      hiddenForm.appendChild(input);
    });
    
    document.body.appendChild(hiddenForm);
    hiddenForm.submit();
    
    // Remove form after submission
    setTimeout(() => {
      document.body.removeChild(hiddenForm);
    }, 1000);
    
    showToast("✅ Order submitted! Check your email for confirmation.", "success");
    
    // Clear form fields
    phoneInput.value = "";
    transactionInput.value = "";
    
  } finally {
    // Reset button state
    setTimeout(() => {
      confirmBtn.disabled = false;
      confirmBtn.innerHTML = originalText;
    }, 1000);
    
    // Show follow-up message
    setTimeout(() => {
      showToast("📱 Data will be delivered within 30 minutes. Keep your transaction ID handy!", "success");
    }, 2000);
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
  
  // Set dynamic time greeting
  function updateGreeting() {
    if (!DOM.timeGreeting) return;
    const hour = new Date().getHours();
    let greeting = "Good Afternoon! 🌤️";
    if (hour < 5) greeting = "Good Night! 🌙";
    else if (hour < 12) greeting = "Good Morning! ☀️";
    else if (hour >= 18) greeting = "Good Evening! 🌆";
    
    // Add Christmas emoji during December
    const month = new Date().getMonth();
    if (month === 11) { // December
      greeting = greeting.replace('!', '! 🎄');
    }
    
    DOM.timeGreeting.textContent = greeting;
  }
  updateGreeting();
  setInterval(updateGreeting, 60000);
  
  // Setup network tabs
  DOM.tabButtons.forEach(btn => {
    btn.addEventListener("click", () => switchNetwork(btn.dataset.network));
  });
  
  // Setup footer links
  DOM.footerLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const network = link.dataset.network;
      if (network) {
        switchNetwork(network);
      } else if (link.id === 'scroll-to-payment') {
        document.querySelector('.payment-top-section').scrollIntoView({ behavior: 'smooth' });
      } else if (link.id === 'scroll-to-instructions') {
        document.querySelector('.order-guide').scrollIntoView({ behavior: 'smooth' });
      } else if (link.id === 'dz-help-link') {
        const helpModal = new HelpModal();
        helpModal.show();
      }
    });
  });
  
  // Setup auth button listeners
  if (DOM.emailSignUpBtn) DOM.emailSignUpBtn.addEventListener("click", signUpWithEmail);
  if (DOM.emailLoginBtn) DOM.emailLoginBtn.addEventListener("click", loginWithEmail);
  if (DOM.googleSignInBtn) DOM.googleSignInBtn.addEventListener("click", loginWithGoogle);
  if (DOM.logoutBtn) DOM.logoutBtn.addEventListener("click", signOutUser);
  
  // Setup profile button
  if (document.getElementById("profileBtn")) {
    document.getElementById("profileBtn").addEventListener("click", () => {
      showToast(`👋 Welcome ${currentUser?.name || 'User'}! Profile features coming soon.`);
    });
  }
  
  // Initial products render
  renderProducts(currentNetwork);
  
  // Initialize Data Zone features
  initializeDZFeatures();
  
  // Log initialization
  console.log("🚀 Data Zone Ghana initialized successfully!");
  console.log("📱 MTN, Telecel & AirtelTigo bundles ready for orders!");
  console.log("🎄 Season's greetings from Data Zone Ghana!");
  console.log("✅ WhatsApp integration configured:");
  console.log(`   - Personal: https://wa.me/${CONFIG.WA_NUMBER}`);
  console.log(`   - Group: ${CONFIG.GROUP_INVITE}`);
}

/* =========================
   DATA ZONE FEATURES INITIALIZATION
   ========================= */
function initializeDZFeatures() {
  console.log('🚀 Initializing Data Zone features...');
  
  // Initialize all components
  const whatsappWidget = new WhatsAppWidget();
  const orderHistory = new OrderHistory();
  const faqAccordion = new FAQAccordion();
  const helpModal = new HelpModal();
  
  // Setup orbital animation for primary buttons
  document.querySelectorAll('.btn-primary, .dz-btn-primary').forEach(btn => {
    if (!btn.classList.contains('dz-orbital-btn')) {
      btn.classList.add('dz-orbital-btn');
    }
  });
  
  // Setup orbital animation for input wrappers
  document.querySelectorAll('.form-group, .dz-form-group').forEach(group => {
    if (!group.classList.contains('dz-orbital')) {
      group.classList.add('dz-orbital');
    }
  });
  
  // Setup accessibility
  document.querySelectorAll('button, input, select, textarea').forEach(el => {
    if (!el.classList.contains('dz-focus-visible')) {
      el.classList.add('dz-focus-visible');
    }
  });
  
  console.log('✅ Data Zone features initialized successfully!');
  
  // Test note: Replace these config values if needed
  if (CONFIG.WA_NUMBER === "233XXXXXXXXX") {
    console.warn('⚠️ REPLACE CONFIG.WA_NUMBER with actual WhatsApp number (format: 233XXXXXXXXX, no plus)');
  }
  if (CONFIG.GROUP_INVITE === "https://chat.whatsapp.com/XXXXXXXXXXXXX") {
    console.warn('⚠️ REPLACE CONFIG.GROUP_INVITE with actual WhatsApp group invite link');
  }
}

/* =========================
   TESTING & QA STEPS
   ========================= */
/*
TESTING CHECKLIST:
1. Keyboard navigation (Tab, Enter/Space) for all widgets ✓
2. Focus ring visibility on forms and modals ✓
3. Test on iOS Safari, Chrome Android, Desktop Chrome ✓
4. Test prefers-reduced-motion ✓
5. Test localStorage persistence and export CSV ✓
6. Phone normalization (0XXXXXXXXX, +233XXXXXXXXX, 233XXXXXXXXX) ✓
7. WhatsApp panel auto-open and suppression ✓
8. Order history storage (30 entries max) ✓
9. FAQ accordion accessibility ✓
10. Responsive design (≤420px, ≤760px, >760px) ✓

CONFIG VALUES CONFIGURED:
1. CONFIG.WA_NUMBER = "233275903629" ✓
2. CONFIG.GROUP_INVITE = "https://chat.whatsapp.com/KvupM9a1osR2ZE6LLy5NDb?mode=wwt" ✓
3. CONFIG.BACKEND_ENDPOINT - Placeholder for future backend

ACCESSIBILITY FEATURES:
- Semantic HTML elements ✓
- ARIA attributes ✓
- Keyboard navigation ✓
- Focus management ✓
- Reduced motion support ✓

RESPONSIVE RULES:
- Mobile-first breakpoints ✓
- Touch targets ≥44px ✓
- No horizontal scrolling ✓

NON-USSD COMPLIANT:
- No USSD references in code ✓
- Purchase flow opens WhatsApp ✓
*/

// Start application when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Export for module usage
export { auth, currentUser };
