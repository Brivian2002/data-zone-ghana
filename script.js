// script.js (module) - Data Zone Ghana
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
   CONFIG
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

// Your Apps Script endpoint
const APPS_SCRIPT_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbyYUseoGNyY5_lRJw81SPp02IZne6dqx8mYOARHgouPsC6DmmInyB7ZabMpIZWNcmMY/exec";

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
   DOM CACHE
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
  currentYear: document.getElementById("current-year")
};

/* =========================
   STATE
   ========================= */
let currentUser = null;
let currentNetwork = "mtn";

/* =========================
   HELPERS
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
  toast.className = `toast toast-${type === "error" ? "error" : "success"}`;
  toast.innerHTML = `<div class="toast-content"><i class="fas fa-${
    type === "error" ? "exclamation-circle" : "check-circle"
  }"></i><span>${message}</span></div>`;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add("show"), 10);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function normalizeGhanaPhone(phone) {
  if (!phone) return phone;
  let p = phone.trim();
  p = p.replace(/[\s\-()]/g, "");
  if (/^0[0-9]{9}$/.test(p)) {
    return "+233" + p.slice(1);
  }
  if (/^233[0-9]{9}$/.test(p)) return "+" + p;
  if (/^\+233[0-9]{9}$/.test(p)) return p;
  return p;
}

/* =========================
   AUTH FUNCTIONS
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
    const userCred = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(userCred.user, { displayName: name }).catch(() => {});
    showToast("Account created — welcome!");
  } catch (err) {
    console.error("signup error", err);
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
    showToast("Login successful");
  } catch (err) {
    console.error("login error", err);
    showToast(err.message || "Login failed", "error");
  }
}

async function loginWithGoogle() {
  try {
    await signInWithPopup(auth, provider);
  } catch (err) {
    console.error("google signin error", err);
    showToast(err.message || "Google sign-in failed", "error");
  }
}

function signOutUser() {
  signOut(auth)
    .then(() => {
      showToast("Signed out");
    })
    .catch((err) => {
      console.error("signout error", err);
      showToast("Sign out failed", "error");
    });
}

/* Auth state listener */
onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser = {
      uid: user.uid,
      name:
        user.displayName || (user.email ? user.email.split("@")[0] : "User"),
      email: user.email || ""
    };
    window.currentUser = currentUser;
    
    if (DOM.userName) DOM.userName.textContent = currentUser.name;
    showElement(DOM.mainContent);
    hideElement(DOM.authModal);
    document.body.style.overflow = "auto";
    showToast(`Welcome ${currentUser.name}`);
  } else {
    currentUser = null;
    window.currentUser = null;
    
    if (DOM.authName) DOM.authName.value = "";
    if (DOM.authEmail) DOM.authEmail.value = "";
    if (DOM.authPassword) DOM.authPassword.value = "";
    hideElement(DOM.mainContent);
    showElement(DOM.authModal);
    document.body.style.overflow = "hidden";
  }
});

// Attach auth button listeners
if (DOM.emailSignUpBtn)
  DOM.emailSignUpBtn.addEventListener("click", signUpWithEmail);
if (DOM.emailLoginBtn)
  DOM.emailLoginBtn.addEventListener("click", loginWithEmail);
if (DOM.googleSignInBtn)
  DOM.googleSignInBtn.addEventListener("click", loginWithGoogle);
if (DOM.logoutBtn) DOM.logoutBtn.addEventListener("click", signOutUser);

/* =========================
   UI: GREETING AND YEAR
   ========================= */
function updateGreeting() {
  const hour = new Date().getHours();
  let greeting = "Good Afternoon!";
  if (hour < 12) greeting = "Good Morning!";
  else if (hour >= 18) greeting = "Good Evening!";
  if (DOM.timeGreeting) DOM.timeGreeting.textContent = greeting;
  setTimeout(updateGreeting, 60000);
}
if (DOM.currentYear) DOM.currentYear.textContent = new Date().getFullYear();

/* =========================
   PRODUCTS: RENDER & HANDLERS
   ========================= */
function switchNetwork(network) {
  currentNetwork = network;
  DOM.tabButtons.forEach((btn) =>
    btn.classList.toggle("active", btn.dataset.network === network)
  );
  renderProducts(network);
}
DOM.tabButtons.forEach((btn) =>
  btn.addEventListener("click", () => switchNetwork(btn.dataset.network))
);

function renderProducts(network) {
  const networkData = PRODUCTS[network];
  if (!networkData || !DOM.productsContainer) return;
  DOM.productsContainer.innerHTML = "";
  networkData.bundles.forEach((bundle) => {
    DOM.productsContainer.appendChild(createProductCard(bundle, networkData));
  });
  
  setTimeout(() => {
    DOM.productsContainer.querySelectorAll(".product-card").forEach((c, i) => {
      c.style.animationDelay = `${i * 0.06}s`;
      c.classList.add("animate-up");
    });
  }, 60);
}

function createProductCard(bundle, networkData) {
  const card = document.createElement("div");
  card.className = "product-card";
  const salePrice =
    bundle.price !== undefined
      ? bundle.price
      : bundle.price || bundle.cost || 0;
  const cost = bundle.cost || null;
  const headerClass =
    networkData.color === "airteltigo" ? "airteltigo" : networkData.color;

  card.innerHTML = `
    <div class="product-header ${headerClass}">
      <div class="product-network">${networkData.name.split(" ")[0]}</div>
      <div class="product-badge">${networkData.badge}</div>
    </div>
    <div class="product-body">
      <div class="product-size">${bundle.size}</div>
      <div class="product-price">GH₵ ${salePrice.toFixed(2)}</div>
      <div class="product-details">
        ${
          cost
            ? `<div class="product-detail"><span class="product-detail-label">Cost Price:</span><span class="product-detail-value">GH₵ ${cost.toFixed(
                2
              )}</span></div>`
            : ""
        }
        <div class="product-detail"><span class="product-detail-label">${
          cost ? "Your Price:" : "Price:"
        }</span><span class="product-detail-value">GH₵ ${salePrice.toFixed(
    2
  )}</span></div>
        <div class="product-detail"><span class="product-detail-label">Validity:</span><span class="product-detail-value">${
          bundle.duration
        }</span></div>
      </div>
    </div>
    <div class="product-footer">
      <button class="btn-confirm" data-size="${
        bundle.size
      }" data-price="${salePrice}" data-network="${networkData.name}">
        <i class="fas fa-check-circle"></i> Buy - GH₵ ${salePrice.toFixed(2)}
      </button>
    </div>
  `;

  const buyBtn = card.querySelector(".btn-confirm");
  buyBtn.addEventListener("click", () => {
    openPurchaseModal({
      network: networkData.name,
      size: bundle.size,
      price: salePrice
    });
  });

  return card;
}

/* =========================
   PURCHASE MODAL
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
      <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="purchase-title" style="max-width:420px;">
        <div class="modal-header">
          <div class="modal-logo"><i class="fas fa-receipt"></i><h2 id="purchase-title">Confirm Purchase</h2></div>
          <p class="modal-subtitle">Confirm bundle and provide recipient phone number</p>
        </div>
        <form id="purchase-form" style="padding:20px;">
          <div class="form-group">
            <label>Buyer (Name)</label>
            <input id="modal-buyer-name" type="text" readonly />
          </div>
          <div class="form-group">
            <label>Buyer Email</label>
            <input id="modal-buyer-email" type="email" readonly />
          </div>
          <div class="form-group">
            <label for="modal-phone">Recipient Phone</label>
            <input id="modal-phone" type="tel" placeholder="e.g. 024xxxxxxx or +233xxxxxxxxx" required />
          </div>
          <div class="form-group">
            <label>Bundle</label>
            <input id="modal-bundle" type="text" readonly />
          </div>
          <div style="display:flex;gap:12px;margin-top:12px;">
            <button id="modal-confirm-btn" type="button" class="btn-primary btn-full">Confirm & Save</button>
            <button id="modal-cancel-btn" type="button" class="btn-outline btn-full">Cancel</button>
          </div>
        </form>
      </div>
    `;
    document.body.appendChild(modal);

    document
      .getElementById("modal-cancel-btn")
      .addEventListener("click", () => closePurchaseModal());
    document
      .getElementById("modal-confirm-btn")
      .addEventListener("click", async (e) => {
        e.preventDefault();
        await handlePurchaseConfirm();
      });
  }

  document.getElementById("modal-buyer-name").value = currentUser?.name || "";
  document.getElementById("modal-buyer-email").value = currentUser?.email || "";
  document.getElementById("modal-phone").value = "";
  document.getElementById(
    "modal-bundle"
  ).value = `${network} — ${size} — GH₵ ${Number(price).toFixed(2)}`;

  showElement(modal);
  document.body.style.overflow = "hidden";
}

function closePurchaseModal() {
  const modal = document.getElementById("purchase-modal");
  if (modal) modal.classList.add("hidden");
  document.body.style.overflow = "auto";
}

/* =========================
   HANDLE PURCHASE CONFIRM
   ========================= */
async function handlePurchaseConfirm() {
  const phoneInput = document.getElementById("modal-phone");
  const bundleInput = document.getElementById("modal-bundle");
  if (!phoneInput || !bundleInput) {
    showToast("Unexpected error (modal fields missing)", "error");
    return;
  }

  let phoneRaw = phoneInput.value.trim();
  if (!phoneRaw) {
    showToast("Please enter recipient phone number", "error");
    return;
  }

  const phone = normalizeGhanaPhone(phoneRaw);

  const payload = {
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    phone: phone,
    bundle: bundleInput.value,
    price:
      Number((bundleInput.value.match(/GH₵\s*([0-9,.]+)/) || [0, 0])[1]) || 0,
    timestamp: new Date().toISOString(),
    source: location.hostname
  };

  const confirmBtn = document.getElementById("modal-confirm-btn");
  confirmBtn.disabled = true;
  confirmBtn.textContent = "Saving...";

  try {
    const res = await fetch(APPS_SCRIPT_ENDPOINT, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const text = await res.text();
    console.log("Apps Script response raw:", res.status, text);
    let data = null;
    try {
      data = JSON.parse(text);
    } catch (e) {
      data = null;
    }

    if (res.ok && data && data.result === "success") {
      showToast(
        "Purchase recorded. Check your email for confirmation.",
        "success"
      );
      closePurchaseModal();
    } else if (res.ok && !data) {
      showToast(
        "Purchase submitted (server returned non-JSON). Check sheet/email.",
        "success"
      );
      closePurchaseModal();
    } else {
      const message =
        data && data.message ? data.message : text || `HTTP ${res.status}`;
      console.error("Server indicated error:", message);
      showToast("Failed to record purchase: " + message, "error");
    }
  } catch (err) {
    console.error("Network/script error in purchase:", err);
    const tryFallback = confirm(
      "Network issue detected. Open a fallback form to submit in a new tab?"
    );
    if (tryFallback) {
      const form = document.createElement("form");
      form.method = "POST";
      form.action = APPS_SCRIPT_ENDPOINT;
      form.target = "_blank";
      form.style.display = "none";
      for (const k in payload) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = k;
        input.value = payload[k];
        form.appendChild(input);
      }
      document.body.appendChild(form);
      form.submit();
      setTimeout(() => form.remove(), 1000);
      showToast("Fallback form opened. Please complete if needed.", "success");
      closePurchaseModal();
    } else {
      showToast("Network error. Try again later.", "error");
    }
  } finally {
    confirmBtn.disabled = false;
    confirmBtn.textContent = "Confirm & Save";
  }
}

/* =========================
   INIT
   ========================= */
function init() {
  updateGreeting();
  renderProducts(currentNetwork);
  
  try {
    localStorage.removeItem("dataZoneUser");
    localStorage.removeItem("dataZonePurchaseHistory");
  } catch (e) {}

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const authOpen =
        DOM.authModal && !DOM.authModal.classList.contains("hidden");
      if (authOpen) e.preventDefault();
    }
  });
}

document.addEventListener("DOMContentLoaded", init);

console.log("script.js loaded — Data Zone Ghana (auth + purchases)");
