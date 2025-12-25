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
// Google Form for order submissions (REPLACE WITH YOUR OWN FORM)
const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSc4Y7Hc5J8QZ8oYQ7Xz9jK7L6T5rJ9vMpNqo0bVt7uRvXyQZw/formResponse";

// Form field IDs (REPLACE WITH YOUR FORM FIELD IDs)
const FORM_FIELDS = {
  name: "entry.123456789",      // Replace with your form's name field ID
  email: "entry.987654321",     // Replace with your form's email field ID
  phone: "entry.555555555",     // Replace with your form's phone field ID
  bundle: "entry.111111111",    // Replace with your form's bundle field ID
  price: "entry.999999999",     // Replace with your form's price field ID
  timestamp: "entry.888888888"  // Replace with your form's timestamp field ID
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
  }, 3500);
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
    showToast("Account created successfully!");
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
    showToast("Login successful!");
  } catch (err) {
    console.error("Login error:", err);
    showToast(err.message || "Login failed", "error");
  }
}

async function loginWithGoogle() {
  try {
    await signInWithPopup(auth, provider);
  } catch (err) {
    console.error("Google sign-in error:", err);
    showToast(err.message || "Google sign-in failed", "error");
  }
}

function signOutUser() {
  signOut(auth)
    .then(() => showToast("Signed out successfully"))
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
    showToast(`Welcome ${currentUser.name}!`);
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
}

function renderProducts(network) {
  const networkData = PRODUCTS[network];
  if (!networkData || !DOM.productsContainer) return;
  
  DOM.productsContainer.innerHTML = "";
  networkData.bundles.forEach((bundle, index) => {
    DOM.productsContainer.appendChild(createProductCard(bundle, networkData, index));
  });
}

function createProductCard(bundle, networkData, index) {
  const card = document.createElement("div");
  card.className = "product-card";
  card.style.animationDelay = `${index * 0.05}s`;
  
  const salePrice = bundle.price || bundle.cost || 0;
  const cost = bundle.cost || null;
  const headerClass = networkData.color === "airteltigo" ? "airteltigo" : networkData.color;
  
  card.innerHTML = `
    <div class="product-header ${headerClass}">
      <div class="product-network">${networkData.name.split(" ")[0]}</div>
      <div class="product-badge">${networkData.badge}</div>
    </div>
    <div class="product-body">
      <div class="product-size">${bundle.size}</div>
      <div class="product-price">GH₵ ${salePrice.toFixed(2)}</div>
      <div class="product-details">
        ${cost ? `
          <div class="product-detail">
            <span class="product-detail-label">Cost Price:</span>
            <span class="product-detail-value">GH₵ ${cost.toFixed(2)}</span>
          </div>
        ` : ""}
        <div class="product-detail">
          <span class="product-detail-label">${cost ? "Your Price:" : "Price:"}</span>
          <span class="product-detail-value">GH₵ ${salePrice.toFixed(2)}</span>
        </div>
        <div class="product-detail">
          <span class="product-detail-label">Validity:</span>
          <span class="product-detail-value">${bundle.duration}</span>
        </div>
      </div>
    </div>
    <div class="product-footer">
      <button class="btn-confirm" data-size="${bundle.size}" data-price="${salePrice}">
        <i class="fas fa-check-circle"></i> Buy - GH₵ ${salePrice.toFixed(2)}
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
    showToast("Please sign in before making a purchase", "error");
    return;
  }
  
  let modal = document.getElementById("purchase-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "purchase-modal";
    modal.className = "modal";
    modal.innerHTML = `
      <div class="modal-content" style="max-width:420px;">
        <div class="modal-header">
          <div class="modal-logo"><i class="fas fa-receipt"></i><h2>Confirm Purchase</h2></div>
          <p class="modal-subtitle">Enter recipient phone number</p>
        </div>
        <form id="purchase-form" style="padding:20px;">
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
            <small style="display:block; margin-top:4px; color:#718096;">Enter the phone number to receive data</small>
          </div>
          <div class="form-group">
            <label><i class="fas fa-box"></i> Selected Bundle</label>
            <input id="modal-bundle" type="text" readonly value="${network} — ${size} — GH₵ ${price.toFixed(2)}">
          </div>
          <div style="display:flex;gap:12px;margin-top:20px;">
            <button id="modal-confirm-btn" type="button" class="btn-primary btn-full">
              <i class="fas fa-paper-plane"></i> Submit Order
            </button>
            <button id="modal-cancel-btn" type="button" class="btn-outline btn-full">Cancel</button>
          </div>
          <p style="margin-top:16px; font-size:0.9rem; color:#718096; text-align:center;">
            <i class="fas fa-info-circle"></i> After submitting, make payment to the number shown above
          </p>
        </form>
      </div>
    `;
    document.body.appendChild(modal);
    
    document.getElementById("modal-cancel-btn").addEventListener("click", closePurchaseModal);
    document.getElementById("modal-confirm-btn").addEventListener("click", submitPurchaseToGoogleForm);
  }
  
  document.getElementById("modal-phone").value = "";
  showElement(modal);
  document.body.style.overflow = "hidden";
}

function closePurchaseModal() {
  const modal = document.getElementById("purchase-modal");
  if (modal) hideElement(modal);
  document.body.style.overflow = "auto";
}

/* =========================
   GOOGLE FORM SUBMISSION
   ========================= */
function submitPurchaseToGoogleForm() {
  const phoneInput = document.getElementById("modal-phone");
  const bundleInput = document.getElementById("modal-bundle");
  
  if (!phoneInput || !bundleInput) {
    showToast("System error. Please refresh page.", "error");
    return;
  }
  
  const phoneRaw = phoneInput.value.trim();
  if (!phoneRaw) {
    showToast("Please enter recipient phone number", "error");
    phoneInput.focus();
    return;
  }
  
  const phone = normalizePhone(phoneRaw);
  const priceMatch = bundleInput.value.match(/GH₵\s*([0-9.]+)/);
  const price = priceMatch ? parseFloat(priceMatch[1]) : 0;
  const timestamp = new Date().toISOString();
  
  // Create form data
  const formData = new FormData();
  
  // Add all fields to form data (using your form field IDs)
  formData.append(FORM_FIELDS.name, currentUser.name);
  formData.append(FORM_FIELDS.email, currentUser.email);
  formData.append(FORM_FIELDS.phone, phone);
  formData.append(FORM_FIELDS.bundle, bundleInput.value);
  formData.append(FORM_FIELDS.price, `GH₵${price.toFixed(2)}`);
  formData.append(FORM_FIELDS.timestamp, timestamp);
  
  // Create and submit form
  const form = document.createElement("form");
  form.method = "POST";
  form.action = GOOGLE_FORM_URL;
  form.target = "_blank";
  form.style.display = "none";
  
  // Add all form data as hidden inputs
  for (const [key, value] of formData.entries()) {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = key;
    input.value = value;
    form.appendChild(input);
  }
  
  // Create a confirmation message
  const confirmBtn = document.getElementById("modal-confirm-btn");
  const originalText = confirmBtn.innerHTML;
  confirmBtn.disabled = true;
  confirmBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
  
  // Submit form
  document.body.appendChild(form);
  form.submit();
  
  // Show success message
  setTimeout(() => {
    showToast("Order submitted! Check your email for confirmation.", "success");
    closePurchaseModal();
    
    // Show payment reminder
    setTimeout(() => {
      alert("IMPORTANT: Make payment to the appropriate number shown in the Payment Instructions section. Data will be delivered within 30 minutes of payment confirmation.");
    }, 500);
    
    // Reset button
    confirmBtn.disabled = false;
    confirmBtn.innerHTML = originalText;
    
    // Remove form after submission
    setTimeout(() => form.remove(), 1000);
  }, 1000);
}

/* =========================
   INITIALIZATION
   ========================= */
function init() {
  // Set current year
  if (DOM.currentYear) {
    DOM.currentYear.textContent = new Date().getFullYear();
  }
  
  // Set time greeting
  function updateGreeting() {
    if (!DOM.timeGreeting) return;
    const hour = new Date().getHours();
    let greeting = "Good Afternoon!";
    if (hour < 12) greeting = "Good Morning!";
    else if (hour >= 18) greeting = "Good Evening!";
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
        document.querySelector('.products-section').scrollIntoView({ behavior: 'smooth' });
      } else if (link.id === 'scroll-to-payment') {
        document.querySelector('.info-section').scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
  
  // Setup auth button listeners
  if (DOM.emailSignUpBtn) DOM.emailSignUpBtn.addEventListener("click", signUpWithEmail);
  if (DOM.emailLoginBtn) DOM.emailLoginBtn.addEventListener("click", loginWithEmail);
  if (DOM.googleSignInBtn) DOM.googleSignInBtn.addEventListener("click", loginWithGoogle);
  if (DOM.logoutBtn) DOM.logoutBtn.addEventListener("click", signOutUser);
  
  // Initial products render
  renderProducts(currentNetwork);
  
  // Log initialization
  console.log("✅ Data Zone Ghana website initialized successfully!");
  console.log("📱 Ready for orders!");
  console.log("💡 Remember to create your Google Form and update FORM_FIELDS in script.js");
}

// Start application
document.addEventListener("DOMContentLoaded", init);
