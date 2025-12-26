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
   GOOGLE FORM CONFIGURATION
   ========================= */
// Google Form for order submissions
const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfMy0tJxTDmLjp2_uBe4Krgkg98Vv9urYEy1aovxBCPjABhwg/formResponse
";

// Form field IDs from your Google Form
const FORM_FIELDS = {
  name: "entry.933286285",        // Name field
  email: "entry.311447064",       // Email field
  phone: "entry.1442342955",      // Recipient Phone field
  transaction: "entry.1423713792", // Transaction ID field
  bundle: "entry.1395532210"      // Selected Bundle field
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

function normalizePhone(phone) {
  if (!phone) return "";
  let cleaned = phone.trim().replace(/[\s\-()]/g, "");
  
  if (/^0[0-9]{9}$/.test(cleaned)) return "+233" + cleaned.slice(1);
  if (/^233[0-9]{9}$/.test(cleaned)) return "+" + cleaned;
  if (/^\+233[0-9]{9}$/.test(cleaned)) return cleaned;
  return cleaned;
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
    
    // Show Christmas greeting for logged in users
    const hour = new Date().getHours();
    let timeGreet = "Good Day";
    if (hour < 12) timeGreet = "Good Morning";
    else if (hour >= 18) timeGreet = "Good Evening";
    
    setTimeout(() => {
      showToast(`🎄 Merry Christmas, ${currentUser.name}! ${timeGreet}! 🎅`);
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
      <button class="btn-confirm" data-size="${bundle.size}" data-price="${salePrice}">
        <i class="fas fa-shopping-cart"></i> Buy Now - GH₵ ${salePrice.toFixed(2)}
      </button>
    </div>
  `;
  
  card.querySelector(".btn-confirm").addEventListener("click", () => {
    openPurchaseModal({
      network: networkData.name,
      size: bundle.size,
      price: salePrice
    });
  });
  
  return card;
}

/* =========================
   PURCHASE MODAL FUNCTIONS
   ========================= */
function openPurchaseModal({ network, size, price }) {
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
    // AirtelTigo payment instructions
    paymentNumber = "027 890 1234";
    paymentName = "Data Zone GH";
  }
  
  // Show payment reminder first
  if (!confirm(`💳 IMPORTANT: Before proceeding, ensure you've sent GH₵${(price + 0.5).toFixed(2)} to:\n\n${network}: ${paymentNumber}\nName: ${paymentName}\n\nHave you made the payment?`)) {
    return;
  }
  
  let modal = document.getElementById("purchase-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "purchase-modal";
    modal.className = "modal";
    modal.innerHTML = `
      <div class="modal-content" style="max-width:450px;">
        <div class="modal-header">
          <div class="modal-logo"><i class="fas fa-receipt"></i><h2>Confirm Purchase</h2></div>
          <p class="modal-subtitle">Enter recipient phone number & transaction ID</p>
        </div>
        <form id="purchase-form" style="padding:24px;">
          <div class="form-group">
            <label><i class="fas fa-user"></i> Your Name</label>
            <input id="modal-buyer-name" type="text" readonly value="${currentUser.name}">
          </div>
          <div class="form-group">
            <label><i class="fas fa-envelope"></i> Your Email</label>
            <input id="modal-buyer-email" type="email" readonly value="${currentUser.email}">
          </div>
          <div class="form-group">
            <label><i class="fas fa-phone"></i> Recipient Phone *</label>
            <input id="modal-phone" type="tel" placeholder="024XXXXXXX or +233XXXXXXXXX" required>
            <small style="display:block; margin-top:6px; color:#94a3b8;">Phone number to receive data</small>
          </div>
          <div class="form-group">
            <label><i class="fas fa-receipt"></i> Transaction ID *</label>
            <input id="modal-transaction" type="text" placeholder="MM Transaction ID from payment" required>
            <small style="display:block; margin-top:6px; color:#94a3b8;">Your Mobile Money transaction ID</small>
          </div>
          <div class="form-group">
            <label><i class="fas fa-box"></i> Selected Bundle</label>
            <input id="modal-bundle" type="text" readonly value="${network} — ${size} — GH₵ ${price.toFixed(2)}">
          </div>
          <div class="payment-reminder">
            <i class="fas fa-info-circle"></i>
            <small>Payment made to: ${paymentNumber} (${paymentName})</small>
          </div>
          <div style="display:flex;gap:12px;margin-top:24px;">
            <button id="modal-confirm-btn" type="button" class="btn-primary btn-full">
              <i class="fas fa-paper-plane"></i> Submit Order
            </button>
            <button id="modal-cancel-btn" type="button" class="btn-outline btn-full">Cancel</button>
          </div>
        </form>
      </div>
    `;
    document.body.appendChild(modal);
    
    document.getElementById("modal-cancel-btn").addEventListener("click", closePurchaseModal);
    document.getElementById("modal-confirm-btn").addEventListener("click", submitPurchaseToGoogleForm);
  }
  
  // Update payment reminder in modal
  const paymentReminder = modal.querySelector('.payment-reminder small');
  if (paymentReminder) {
    paymentReminder.textContent = `Payment made to: ${paymentNumber} (${paymentName})`;
  }
  
  document.getElementById("modal-phone").value = "";
  document.getElementById("modal-transaction").value = "";
  showElement(modal);
  document.body.style.overflow = "hidden";
}

function closePurchaseModal() {
  const modal = document.getElementById("purchase-modal");
  if (modal) hideElement(modal);
  document.body.style.overflow = "auto";
}

/* =========================
   GOOGLE FORM SUBMISSION - FIXED VERSION
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
  
  const phone = normalizePhone(phoneRaw);
  const bundleValue = bundleInput.value;
  
  // Create a confirmation message
  const confirmBtn = document.getElementById("modal-confirm-btn");
  const originalText = confirmBtn.innerHTML;
  confirmBtn.disabled = true;
  confirmBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting Order...';
  
  try {
    // Prepare form data for Google Form submission
    const formData = new URLSearchParams();
    formData.append(FORM_FIELDS.name, currentUser.name);
    formData.append(FORM_FIELDS.email, currentUser.email);
    formData.append(FORM_FIELDS.phone, phone);
    formData.append(FORM_FIELDS.transaction, transactionRaw);
    formData.append(FORM_FIELDS.bundle, bundleValue);
    
    // Submit to Google Form using fetch with no-cors mode
    // This will submit the data without showing the Google Form to the user
    await fetch(GOOGLE_FORM_URL, {
      method: 'POST',
      mode: 'no-cors', // Important: Prevents CORS errors and doesn't require response
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString()
    });
    
    // Show success message
    showToast("🎉 Order submitted successfully! We'll process it within 30 minutes.", "success");
    
    // Clear form fields
    phoneInput.value = "";
    transactionInput.value = "";
    
    // Close modal after delay
    setTimeout(() => {
      closePurchaseModal();
    }, 1500);
    
  } catch (error) {
    console.error('Form submission error:', error);
    
    // Fallback: Create hidden form and submit it
    const hiddenForm = document.createElement('form');
    hiddenForm.method = 'POST';
    hiddenForm.action = GOOGLE_FORM_URL;
    hiddenForm.target = '_blank'; // Open in background tab
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
    
    // Close modal after delay
    setTimeout(() => {
      closePurchaseModal();
    }, 1500);
    
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
  
  // Log initialization
  console.log("🚀 Data Zone Ghana initialized successfully!");
  console.log("📱 MTN, Telecel & AirtelTigo bundles ready for orders!");
  console.log("🎄 Merry Christmas from Data Zone Ghana!");
  console.log("✅ Google Form integration configured for background submission");
  console.log("⚠️ Note: If submission fails, it will fallback to opening form in background tab");
}

// Start application when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Export for module usage
export { auth, currentUser };
