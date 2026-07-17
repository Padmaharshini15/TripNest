// =========================================================================
// TripNest Front-end Application Core - Integrated with Spring Boot Backend
// =========================================================================

// --- Backend API Base URL ---
const API_BASE = window.location.hostname === 'localhost'
  ? 'http://localhost:8080'
  : 'https://tripnest-backend.onrender.com';

// --- Image URL Resolver Utility ---
const resolveImageUrl = (url) => {
  const imageMap = {
    // Ooty
    'ooty.jpg': 'https://images.unsplash.com/photo-1638886540342-240980f60d25?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFuZHNjYXBlJTIwb290eXxlbnwwfHwwfHx8MA%3D%3D',
    'ooty1': 'https://images.unsplash.com/photo-1589136777351-fdc9c9cab193?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bGFuZHNjYXBlJTIwb290eXxlbnwwfHwwfHx8MA%3D%3D',
    'ooty2': 'https://media.istockphoto.com/id/537064629/photo/tea-plantations-around-the-emerald-lake-in-ooty.webp?a=1&b=1&s=612x612&w=0&k=20&c=E5yKr6mXwi14CtvU0iMmESgJLbZagJbfwz-dqABsE24=',
    
    // Kodaikanal
    'kodaikanal.jpg': 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800',
    'kodaikanal1': 'https://images.unsplash.com/photo-1593692716621-1e228b0a9224?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8a29kYWlrYW5hbHxlbnwwfHwwfHx8MA%3D%3D',
    'kodaikanal2': 'https://images.unsplash.com/photo-1665481485534-859f078704fc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGtvZGFpa2FuYWx8ZW58MHx8MHx8fDA%3D',
    
    // Munnar
    'munnar.jpg':'https://plus.unsplash.com/premium_photo-1697730314165-2cd71dc3a6a4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bXVubmFyJTIwcGxhbnRhdGlvbnMlMjBsYW5kc2NhcGUlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D',
    'munnar1': 'https://media.istockphoto.com/id/166149429/photo/tea-plantations-in-munnar-kerala-india.webp?a=1&b=1&s=612x612&w=0&k=20&c=5ea0lAeO7440UQseaLfgOkwBFuknCh2E47-l7wThs_I=',
    'munnar2': 'https://images.unsplash.com/photo-1714489896584-233675ee2f62?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG11bm5hciUyMHBsYW50YXRpb25zJTIwbGFuZHNjYXBlJTIwaW1hZ2VzJTIwd2l0aCUyMHJlc29ydHxlbnwwfHwwfHx8MA%3D%3D',
    
    // Goa
    'goa.jpg': 'https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&q=80&w=800',
    'goa1': 'https://images.unsplash.com/photo-1652820330085-82a0c2b88d78?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYSUyMGJlYWNoJTIwcmVzb3J0fGVufDB8fDB8fHww',
    'goa2': 'https://media.istockphoto.com/id/469852152/photo/arambol-beach-goa.webp?a=1&b=1&s=612x612&w=0&k=20&c=OuHqSu0Mb4Vnvr1qyiMBYIb1RIr1hHfnmPZ6JN_KQrM=',
    
    // Taj Mahal
    'tajmahal.jpg': 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=800',
    'taj1': 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=400',
    'taj2': 'https://images.unsplash.com/photo-1548013146-72479768bada?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8VGFqJTIwTWFoYWx8ZW58MHx8MHx8fDA%3D',
    
    // Alleppey
    'alleppey.jpg': 'https://images.unsplash.com/photo-1593693401060-9fc28cf9e368?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YWxsZXBleSUyMGJhY2t3YXRlcnN8ZW58MHx8MHx8fDA%3D',
    'alleppey1': 'https://images.unsplash.com/photo-1663647690423-aebc47739cde?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGFsbGVwZXklMjBiYWNrd2F0ZXJzfGVufDB8fDB8fHww',
    'alleppey2': 'https://media.istockphoto.com/id/2218997265/photo/veg-and-rice-on-banana-leaf-kerala-backwaters-india.webp?a=1&b=1&s=612x612&w=0&k=20&c=kz6wNQu7wZUpF2y856ssmC3Ftd1jrx2FpHkVcBIsi_U=',
    
    // Mysore Palace
    'mysorepalace.jpg': 'https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&q=80&w=800',
    'mysore1': 'https://plus.unsplash.com/premium_photo-1697729434815-40ab4970ebc1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bXlzb3JlJTIwcGFsYWNlJTIwbGFuZHNjYXBlJTIwaW1hZ2VzfGVufDB8fDB8fHww',
    'mysore2': 'https://images.unsplash.com/photo-1600112356915-089abb8fc71a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bXlzb3JlJTIwcGFsYWNlfGVufDB8fDB8fHww'
  };
  return imageMap[url] || url;
};

// --- Gallery Image URL Resolver Utility ---
const resolveGalleryUrls = (imageUrl) => {
  const mapping = {
    'ooty.jpg': ['ooty1', 'ooty2'],
    'kodaikanal.jpg': ['kodaikanal1', 'kodaikanal2'],
    'munnar.jpg': ['munnar1', 'munnar2'],
    'goa.jpg': ['goa1', 'goa2'],
    'tajmahal.jpg': ['taj1', 'taj2'],
    'alleppey.jpg': ['alleppey1', 'alleppey2'],
    'mysorepalace.jpg': ['mysore1', 'mysore2']
  };
  const keys = mapping[imageUrl] || [];
  return keys.map(k => resolveImageUrl(k));
};

// --- Currency Formatting Utility ---
const formatPrice = (price) => {
  const num = parseFloat(price);
  if (isNaN(num)) return price;
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0
  }).format(num);
};

// --- Session Store Mockup ---
const sessionStore = {
  getCurrentUser: () => JSON.parse(localStorage.getItem('tn_current_user')),
  setCurrentUser: (user) => localStorage.setItem('tn_current_user', JSON.stringify(user)),
  clear: () => localStorage.removeItem('tn_current_user')
};

// --- Authorization Headers Generator ---
const getAuthHeaders = () => {
  const user = sessionStore.getCurrentUser();
  if (user && user.token) {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.token}`
    };
  }
  return {
    'Content-Type': 'application/json'
  };
};

// --- Toast Alerts Engine ---
window.toast = {
  show: (message, type = 'info') => {
    const container = document.getElementById('toast-container');
    if (!container) return;
    
    const toastEl = document.createElement('div');
    toastEl.className = `toast-alert toast-${type}`;
    
    let iconClass = 'fa-solid fa-circle-info';
    if (type === 'success') iconClass = 'fa-solid fa-circle-check';
    if (type === 'error') iconClass = 'fa-solid fa-triangle-exclamation';
    
    toastEl.innerHTML = `
      <i class="${iconClass}"></i>
      <span class="toast-message">${message}</span>
    `;
    
    container.appendChild(toastEl);
    
    setTimeout(() => {
      toastEl.style.animation = 'slideOutToast 0.3s forwards';
      setTimeout(() => toastEl.remove(), 300);
    }, 4000);
  }
};

// --- Dynamic CSS Injection for Toast Slide Out ---
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @keyframes slideOutToast {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(120%); opacity: 0; }
  }
`;
document.head.appendChild(styleSheet);


// --- Client Route Manager ---
class Router {
  constructor() {
    this.currentView = 'landing';
    this.history = [];
  }
  
  navigate(viewName, params = {}) {
    const user = sessionStore.getCurrentUser();
    
    if (viewName === 'history' && user && user.role === 'ROLE_ADMIN') {
      this.navigate('admin-bookings');
      return;
    }
    
    // Auth guards mapping
    const userRestricted = ['dashboard', 'booking', 'success', 'history', 'profile', 'wishlist'];
    const adminRestricted = ['admin-dashboard', 'admin-spots', 'admin-bookings'];
    
    if (userRestricted.includes(viewName) && !user) {
      window.toast.show('Access Denied. Please login as standard user first.', 'error');
      this.navigate('login');
      return;
    }
    
    if (adminRestricted.includes(viewName) && (!user || user.role !== 'ROLE_ADMIN')) {
      window.toast.show('Administrative credentials required.', 'error');
      this.navigate('admin-login');
      return;
    }
    
    this.history.push({ view: this.currentView, params: this.params });
    this.currentView = viewName;
    this.params = params;
    
    this.updateDOM();
  }
  
  updateDOM() {
    // Hide all views first
    document.querySelectorAll('.app-view').forEach(view => {
      view.style.display = 'none';
    });
    
    // Show active view
    const activeEl = document.getElementById(`view-${this.currentView}`);
    if (activeEl) {
      activeEl.style.display = 'block';
    }
    
    // Header/Footer visibility overrides
    const hideHeaderFooter = ['login', 'register', 'admin-login', 'admin-dashboard', 'admin-spots', 'admin-bookings'];
    const mainHeader = document.getElementById('main-header');
    const mainFooter = document.getElementById('main-footer');
    
    if (hideHeaderFooter.includes(this.currentView)) {
      if (mainHeader) mainHeader.style.display = 'none';
      if (mainFooter) mainFooter.style.display = 'none';
    } else {
      if (mainHeader) mainHeader.style.display = 'block';
      if (mainFooter) mainFooter.style.display = 'block';
    }
    
    // Update navbar active link selection
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
    });
    
    // Apply active class to navbar items matching the route
    if (this.currentView === 'landing') {
      document.querySelector('.nav-link[onclick*="landing"]')?.classList.add('active');
    } else if (this.currentView === 'listing') {
      document.querySelector('.nav-link[onclick*="listing"]')?.classList.add('active');
    } else if (this.currentView === 'dashboard') {
      document.querySelector('.nav-link[onclick*="dashboard"]')?.classList.add('active');
    } else if (this.currentView === 'wishlist') {
      document.querySelector('.nav-link[onclick*="wishlist"]')?.classList.add('active');
    } else if (this.currentView === 'history') {
      document.querySelector('.nav-link[onclick*="history"]')?.classList.add('active');
    }
    
    // Trigger lifecycle loads for views
    this.triggerViewLifecycle();
    this.updateHeaderAuthenticationState();
  }
  
  updateHeaderAuthenticationState() {
    const user = sessionStore.getCurrentUser();
    const userElements = document.querySelectorAll('.user-only');
    const authActions = document.getElementById('header-auth-actions');
    
    if (user && user.role === 'ROLE_USER') {
      userElements.forEach(el => el.style.display = 'block');
      if (authActions) {
        authActions.innerHTML = `
          <button class="btn btn-outline btn-sm" onclick="appRouter.navigate('profile')"><i class="fa-regular fa-circle-user"></i> My Profile</button>
          <button class="btn btn-ghost btn-sm" onclick="logoutUser()"><i class="fa-solid fa-arrow-right-from-bracket"></i> Sign Out</button>
        `;
      }
    } else if (user && user.role === 'ROLE_ADMIN') {
      userElements.forEach(el => el.style.display = 'none');
      if (authActions) {
        authActions.innerHTML = `
          <button class="btn btn-outline btn-sm" onclick="appRouter.navigate('admin-dashboard')"><i class="fa-solid fa-chart-line"></i> Admin Console</button>
          <button class="btn btn-ghost btn-sm" onclick="logoutUser()"><i class="fa-solid fa-arrow-right-from-bracket"></i> Sign Out</button>
        `;
      }
    } else {
      userElements.forEach(el => el.style.display = 'none');
      if (authActions) {
        authActions.innerHTML = `
          <button class="btn btn-ghost btn-sm" onclick="appRouter.navigate('login')">Sign In</button>
          <button class="btn btn-primary btn-sm" onclick="appRouter.navigate('register')">Register</button>
        `;
      }
    }
  }
  
  triggerViewLifecycle() {
    if (this.currentView === 'landing') loadLandingData();
    if (this.currentView === 'dashboard') loadDashboardData();
    if (this.currentView === 'listing') loadListingData();
    if (this.currentView === 'details') loadDetailsData(this.params.spotId);
    if (this.currentView === 'booking') loadBookingStepWizard(this.params.spotId);
    if (this.currentView === 'success') loadSuccessData(this.params.bookingId);
    if (this.currentView === 'history') loadHistoryTickets();
    if (this.currentView === 'profile') loadProfileSettings();
    if (this.currentView === 'wishlist') loadWishlistGrid();
    if (this.currentView === 'admin-dashboard') loadAdminDashboardData();
    if (this.currentView === 'admin-spots') loadAdminSpotsGrid();
    if (this.currentView === 'admin-bookings') loadAdminBookingsQueue();
    if (this.currentView === 'info') loadInfoPage(this.params.page);
    
    // Auto-scroll to top on page navigation
    if (this.currentView !== 'landing' || this.params?.scrollTo !== 'featured') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}

window.appRouter = new Router();


// =========================================================================
// AUTHENTICATION LOGIC FLOWS
// =========================================================================

window.executeRegister = async (e) => {
  e.preventDefault();
  const name = document.getElementById('register-name').value;
  const email = document.getElementById('register-email').value;
  const phone = document.getElementById('register-phone').value;
  const password = document.getElementById('register-password').value;
  const confirmPassword = document.getElementById('register-confirm-password').value;
  
  // Clean validation errors
  document.querySelectorAll('.invalid-feedback').forEach(el => el.style.display = 'none');
  
  let valid = true;
  if (name.length < 3) {
    document.getElementById('reg-name-err').style.display = 'block';
    valid = false;
  }
  if (!email.includes('@')) {
    document.getElementById('reg-email-err').style.display = 'block';
    valid = false;
  }
  if (phone.length < 8) {
    document.getElementById('reg-phone-err').style.display = 'block';
    valid = false;
  }
  if (password.length < 6) {
    document.getElementById('reg-pass-err').style.display = 'block';
    valid = false;
  }
  if (password !== confirmPassword) {
    document.getElementById('reg-confpass-err').style.display = 'block';
    valid = false;
  }
  
  if (!valid) return;
  
  try {
    const response = await fetch(`${API_BASE}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, password })
    });
    
    if (response.ok) {
      window.toast.show('Registration successful! Please login.', 'success');
      window.appRouter.navigate('login');
    } else {
      const err = await response.json().catch(() => ({ message: 'Email Address already in use!' }));
      window.toast.show(err.message || 'Registration failed', 'error');
    }
  } catch (err) {
    window.toast.show('Failed to connect to backend server.', 'error');
  }
};

window.executeLogin = async (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  
  try {
    const response = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    if (response.ok) {
      const data = await response.json();
      sessionStore.setCurrentUser({
        name: data.name,
        email: data.email,
        role: data.role,
        token: data.token
      });
      window.toast.show(`Welcome back, ${data.name}!`, 'success');
      
      if (data.role === 'ROLE_ADMIN') {
        window.appRouter.navigate('admin-dashboard');
      } else {
        window.appRouter.navigate('dashboard');
      }
    } else {
      const err = await response.json().catch(() => ({ message: 'Invalid credentials' }));
      window.toast.show(err.message || 'Invalid login credentials.', 'error');
    }
  } catch (err) {
    window.toast.show('Failed to connect to backend server.', 'error');
  }
};

window.executeAdminLogin = async (e) => {
  e.preventDefault();
  const email = document.getElementById('admin-login-email').value;
  const password = document.getElementById('admin-login-password').value;
  
  try {
    const response = await fetch(`${API_BASE}/api/auth/admin-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    if (response.ok) {
      const data = await response.json();
      sessionStore.setCurrentUser({
        name: data.name,
        email: data.email,
        role: data.role,
        token: data.token
      });
      window.toast.show('Admin console authorized successfully.', 'success');
      window.appRouter.navigate('admin-dashboard');
    } else {
      const err = await response.json().catch(() => ({ message: 'Unauthorized access to administrative logs' }));
      window.toast.show(err.message || 'Invalid admin credentials.', 'error');
    }
  } catch (err) {
    window.toast.show('Failed to connect to backend server.', 'error');
  }
};

window.logoutUser = () => {
  sessionStore.clear();
  window.toast.show('Logged out successfully.', 'info');
  window.appRouter.navigate('landing');
};

window.logoutAdmin = () => {
  window.appRouter.navigate('landing');
};

window.goBackToExploration = () => {
  const user = sessionStore.getCurrentUser();
  if (!user) {
    window.appRouter.navigate('landing');
  } else if (user.role === 'ROLE_ADMIN') {
    window.appRouter.navigate('admin-spots');
  } else {
    window.appRouter.navigate('listing');
  }
};

window.togglePasswordVisibility = (fieldId) => {
  const field = document.getElementById(fieldId);
  if (!field) return;
  field.type = field.type === 'password' ? 'text' : 'password';
};

window.triggerForgotPassword = () => {
  window.toast.show('A verification password reset link has been dispatched to your email address.', 'info');
};


// =========================================================================
// DATA BINDING & GENERATION MODULES
// =========================================================================

// Shared helper: render destination cards
const createSpotCardHTML = (spot, user, wishlist = []) => {
  const isWishlisted = user && wishlist.some(item => item.spotId === spot.id);
  const resolvedImg = resolveImageUrl(spot.imageUrl);
  const localFallback = `/assets/images/${spot.imageUrl}`;
  
  return `
    <div class="dest-card">
      <div class="dest-image-wrapper">
        <img src="${resolvedImg}" alt="${spot.title}" onerror="this.onerror=null; this.src='${localFallback}';">
        <span class="dest-badge-category">${spot.category}</span>
        <button class="wishlist-btn-toggle ${isWishlisted ? 'active' : ''}" onclick="toggleWishlistItem(event, ${spot.id})">
          <i class="${isWishlisted ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
        </button>
      </div>
      <div class="dest-content">
        <div class="dest-meta">
          <span class="dest-location"><i class="fa-solid fa-location-dot"></i> ${spot.location}</span>
          <span class="rating-container"><i class="fa-solid fa-star"></i> ${spot.rating || '5.0'} <span class="rating-value">(${spot.totalReviews || 0})</span></span>
        </div>
        <h3 class="dest-title">${spot.title}</h3>
        <p class="dest-description">${spot.description}</p>
        <div class="dest-footer">
          <div class="dest-price-container">
            <span class="dest-price-label">Price per guest</span>
            <span class="dest-price-val">₹${formatPrice(spot.price)}</span>
          </div>
          <span class="dest-duration"><i class="fa-regular fa-clock"></i> ${spot.duration}</span>
        </div>
        <button class="btn btn-primary btn-sm" style="width: 100%; margin-top: 1.25rem;" onclick="appRouter.navigate('details', { spotId: ${spot.id} })">
          Explore Details <i class="fa-solid fa-angle-right"></i>
        </button>
      </div>
    </div>
  `;
};

// Wishlist trigger helper
window.toggleWishlistItem = async (e, spotId) => {
  e.stopPropagation();
  const user = sessionStore.getCurrentUser();
  if (!user) {
    window.toast.show('Please log in to save favorites.', 'error');
    window.appRouter.navigate('login');
    return;
  }
  
  try {
    const res = await fetch(`${API_BASE}/api/wishlist`, {
      headers: getAuthHeaders()
    });
    const wishlist = res.ok ? await res.json() : [];
    const isWishlisted = wishlist.some(item => item.spotId === spotId);
    
    let response;
    if (isWishlisted) {
      response = await fetch(`${API_BASE}/api/wishlist/${spotId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (response.ok) {
        window.toast.show('Destination removed from wishlist.', 'info');
      }
    } else {
      response = await fetch(`${API_BASE}/api/wishlist/${spotId}`, {
        method: 'POST',
        headers: getAuthHeaders()
      });
      if (response.ok) {
        window.toast.show('Added to your favorite wishlist board!', 'success');
      }
    }
    
    window.appRouter.triggerViewLifecycle();
  } catch (err) {
    console.error('Error toggling wishlist item:', err);
    window.toast.show('Failed to update wishlist.', 'error');
  }
};

// 1. Landing View Loader
const loadLandingData = async () => {
  try {
    const response = await fetch(`${API_BASE}/api/spots/public`);
    const spots = await response.json();
    
    const user = sessionStore.getCurrentUser();
    let wishlist = [];
    if (user) {
      const wishRes = await fetch(`${API_BASE}/api/wishlist`, {
        headers: getAuthHeaders()
      });
      if (wishRes.ok) wishlist = await wishRes.json();
    }
    
    const grid = document.getElementById('landing-featured-grid');
    if (grid) {
      grid.innerHTML = spots.slice(0, 3).map(s => createSpotCardHTML(s, user, wishlist)).join('');
    }
    
    // Smooth scroll to featured packages if requested
    if (window.appRouter.params?.scrollTo === 'featured') {
      setTimeout(() => {
        document.getElementById('landing-featured-grid')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }
  } catch (err) {
    console.error('Failed to load landing data:', err);
  }
};

window.executeLandingSearch = () => {
  const query = document.getElementById('landing-search-input').value.toLowerCase();
  window.appRouter.navigate('listing');
  setTimeout(() => {
    const searchInput = document.getElementById('listing-search-input');
    if (searchInput) {
      searchInput.value = query;
      executeListingFilter();
    }
  }, 100);
};

// 2. User Dashboard View Loader
const loadDashboardData = async () => {
  const user = sessionStore.getCurrentUser();
  if (!user) return;
  
  const welcomeText = document.getElementById('dashboard-welcome-name');
  if (welcomeText) welcomeText.innerText = `Hello, ${user.name}!`;
  
  const welcomeDesc = welcomeText?.nextElementSibling;
  if (welcomeDesc && welcomeDesc.tagName === 'P') {
    if (user.role === 'ROLE_ADMIN') {
      welcomeDesc.innerText = 'Manage destinations, monitor bookings, and oversee the TripNest platform efficiently.';
    } else {
      welcomeDesc.innerText = 'Ready to customize another travel escape? Browse category channels and find the perfect package.';
    }
  }
  
  try {
    const bookingsRes = await fetch(`${API_BASE}/api/bookings/my`, {
      headers: getAuthHeaders()
    });
    const bookings = bookingsRes.ok ? await bookingsRes.json() : [];
    
    const wishRes = await fetch(`${API_BASE}/api/wishlist`, {
      headers: getAuthHeaders()
    });
    const wishlist = wishRes.ok ? await wishRes.json() : [];
    
    document.getElementById('dash-stat-bookings').innerText = bookings.length;
    document.getElementById('dash-stat-wishlist').innerText = wishlist.length;
    document.getElementById('dash-stat-reviews').innerText = bookings.filter(b => b.status === 'COMPLETED' || b.status === 'APPROVED').length;
  } catch (err) {
    console.error(err);
  }
  
  await renderDashboardRecommended();
};

const renderDashboardRecommended = async () => {
  try {
    const response = await fetch(`${API_BASE}/api/spots/public`);
    const spots = await response.json();
    
    const user = sessionStore.getCurrentUser();
    let wishlist = [];
    if (user) {
      const wishRes = await fetch(`${API_BASE}/api/wishlist`, {
        headers: getAuthHeaders()
      });
      if (wishRes.ok) wishlist = await wishRes.json();
    }
    
    const grid = document.getElementById('dash-recommended-grid');
    if (grid) {
      grid.innerHTML = spots.slice(0, 6).map(s => createSpotCardHTML(s, user, wishlist)).join('');
    }
  } catch (err) {
    console.error(err);
  }
};

const normalizeCategory = (category) => {
  if (!category) return '';
  const val = category.trim().toLowerCase();
  
  if (val === 'mountain' || val === 'hill station' || val === 'hillstation') {
    return 'hill station';
  }
  if (val === 'historic' || val === 'historical') {
    return 'historical';
  }
  if (val === 'adventure' || val === 'nature') {
    return 'nature';
  }
  return val;
};

const categoriesMatch = (selected, spotCategory) => {
  if (!selected || !spotCategory) return false;
  
  const selNorm = selected.trim().toLowerCase();
  if (selNorm === 'all') return true;
  
  const spotNorm = spotCategory.trim().toLowerCase();
  
  if (selNorm === spotNorm) return true;
  
  const cleanSel = selNorm.replace(/\s+/g, '');
  const cleanSpot = spotNorm.replace(/\s+/g, '');
  if (cleanSel === cleanSpot) return true;
  
  const selGroup = normalizeCategory(selected);
  const spotGroup = normalizeCategory(spotCategory);
  if (selGroup === spotGroup) return true;
  
  return false;
};

window.filterDashboardByCategory = (btn) => {
  document.querySelectorAll('.category-chip').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  executeDashboardFilter();
};

window.executeDashboardFilter = async () => {
  const searchVal = document.getElementById('dash-search-input').value.toLowerCase();
  const categoryVal = document.querySelector('.category-chip.active').getAttribute('data-category');
  
  try {
    const response = await fetch(`${API_BASE}/api/spots/public`);
    const spots = await response.json();
    
    const user = sessionStore.getCurrentUser();
    let wishlist = [];
    if (user) {
      const wishRes = await fetch(`${API_BASE}/api/wishlist`, {
        headers: getAuthHeaders()
      });
      if (wishRes.ok) wishlist = await wishRes.json();
    }
    
    const filtered = spots.filter(s => {
      const matchesSearch = s.title.toLowerCase().includes(searchVal) || s.location.toLowerCase().includes(searchVal);
      const matchesCategory = categoriesMatch(categoryVal, s.category);
      return matchesSearch && matchesCategory;
    });
    
    const grid = document.getElementById('dash-recommended-grid');
    if (grid) {
      if (filtered.length === 0) {
        grid.innerHTML = `<div style="grid-column: 1/-1; padding: 4rem; text-align: center; color: var(--text-light); font-weight: 500;">
          <i class="fa-solid fa-map-location-dot" style="font-size: 3rem; margin-bottom: 1rem; color: var(--text-muted);"></i>
          <p>No matching luxury retreats found. Try adjusting filters.</p>
        </div>`;
      } else {
        grid.innerHTML = filtered.map(s => createSpotCardHTML(s, user, wishlist)).join('');
      }
    }
  } catch (err) {
    console.error(err);
  }
};

// 3. Destination Listing View Loader
const loadListingData = () => {
  const params = window.appRouter.params || {};
  if (params.reset) {
    const searchInput = document.getElementById('listing-search-input');
    const catFilter = document.getElementById('listing-category-filter');
    if (searchInput) searchInput.value = '';
    if (catFilter) catFilter.value = 'ALL';
  }
  if (params.sort) {
    const sortFilter = document.getElementById('listing-sort-filter');
    if (sortFilter) sortFilter.value = params.sort;
  }
  executeListingFilter();
};

window.executeListingFilter = async () => {
  const query = document.getElementById('listing-search-input').value.toLowerCase();
  const cat = document.getElementById('listing-category-filter').value;
  const sort = document.getElementById('listing-sort-filter').value;
  
  try {
    const response = await fetch(`${API_BASE}/api/spots/public`);
    let spots = await response.json();
    
    const user = sessionStore.getCurrentUser();
    let wishlist = [];
    if (user) {
      const wishRes = await fetch(`${API_BASE}/api/wishlist`, {
        headers: getAuthHeaders()
      });
      if (wishRes.ok) wishlist = await wishRes.json();
    }
    
    // Filtering logic
    spots = spots.filter(s => {
      const searchMatch = s.title.toLowerCase().includes(query) || s.location.toLowerCase().includes(query) || s.description.toLowerCase().includes(query);
      const categoryMatch = categoriesMatch(cat, s.category);
      return searchMatch && categoryMatch;
    });
    
    // Sorting logic
    if (sort === 'price-low') spots.sort((a, b) => a.price - b.price);
    if (sort === 'price-high') spots.sort((a, b) => b.price - a.price);
    if (sort === 'rating') spots.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    
    const grid = document.getElementById('listing-results-grid');
    if (grid) {
      if (spots.length === 0) {
        grid.innerHTML = `<div style="grid-column: 1/-1; padding: 4rem; text-align: center; color: var(--text-light); font-weight: 500;">
          <i class="fa-solid fa-compass" style="font-size: 3rem; margin-bottom: 1rem; color: var(--text-muted);"></i>
          <p>No destinations match your criteria.</p>
        </div>`;
      } else {
        grid.innerHTML = spots.map(s => createSpotCardHTML(s, user, wishlist)).join('');
      }
    }
  } catch (err) {
    console.error(err);
  }
};

// 4. Details View Loader
const loadDetailsData = async (spotId) => {
  try {
    const response = await fetch(`${API_BASE}/api/spots/public/${spotId}`);
    if (!response.ok) throw new Error('Spot not found');
    const spot = await response.json();
    
    const container = document.getElementById('details-content-container');
    if (!container) return;
    
    const user = sessionStore.getCurrentUser();
    
    // Retrieve spot reviews from backend
    const reviewsRes = await fetch(`${API_BASE}/api/reviews/${spot.id}`);
    const reviews = reviewsRes.ok ? await reviewsRes.json() : [];
    
    const reviewsHTML = reviews.map(r => `
      <div class="review-item-card">
        <div class="review-item-header">
          <span class="review-item-user">${r.userName || 'Anonymous'}</span>
          <span class="rating-container"><i class="fa-solid fa-star"></i> ${r.rating}.0</span>
        </div>
        <p style="color: var(--text-light); font-size: 0.9rem; line-height: 1.5;">"${r.comment}"</p>
      </div>
    `).join('');
    
    // Split facilities list
    const facilitiesHTML = (spot.facilities || "").split(',').map(f => `
      <div class="facility-item-box"><i class="fa-solid fa-circle-check"></i> <span>${f.trim()}</span></div>
    `).join('');
    
    const resolvedImg = resolveImageUrl(spot.imageUrl);
    const galleryImgs = resolveGalleryUrls(spot.imageUrl);
    const localFallback = `/assets/images/${spot.imageUrl}`;
    
    container.innerHTML = `
      <div class="details-info-section">
        <!-- Image Gallery -->
        <div class="gallery-layout">
          <div class="gallery-main-img">
            <img src="${resolvedImg}" alt="${spot.title}" onerror="this.onerror=null; this.src='${localFallback}';">
          </div>
          <div class="gallery-side-imgs">
            <div class="gallery-side-img-item"><img src="${galleryImgs[0]}" alt="Detail 1"></div>
            <div class="gallery-side-img-item"><img src="${galleryImgs[1]}" alt="Detail 2"></div>
          </div>
        </div>
        
        <div class="details-title-row">
          <div>
            <h1 class="details-title-val">${spot.title}</h1>
            <span class="details-location-text"><i class="fa-solid fa-location-dot"></i> ${spot.location}</span>
          </div>
        </div>
        
        <div class="details-chips-row">
          <div class="details-chip-item"><i class="fa-regular fa-folder"></i> <span>${spot.category}</span></div>
          <div class="details-chip-item"><i class="fa-regular fa-clock"></i> <span>${spot.duration}</span></div>
          <div class="details-chip-item"><i class="fa-regular fa-star"></i> <span>${spot.rating || '5.0'} (${spot.totalReviews || 0} Reviews)</span></div>
        </div>
        
        <!-- Weather Module -->
        <div class="weather-widget-box">
          <div class="weather-details">
            <h4>Current Local Climate</h4>
            <h3>${spot.weather || 'Sunny, 24°C'}</h3>
          </div>
          <i class="fa-solid fa-cloud-sun-rain" style="font-size: 3rem;"></i>
        </div>
        
        <div class="details-desc-box">
          <h3>About the Expedition</h3>
          <p>${spot.description}</p>
        </div>
        
        <div class="facilities-container">
          <h3>Premium Facilities</h3>
          <div class="facilities-grid-layout">
            ${facilitiesHTML}
          </div>
        </div>
        
        <!-- Review Module -->
        <div class="reviews-section-box">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem;">
            <h3>Guest Testimonials (${reviews.length})</h3>
            <button class="btn btn-outline btn-sm" onclick="openAddReviewModal(${spot.id})"><i class="fa-solid fa-pen"></i> Write Review</button>
          </div>
          <div class="reviews-stack">
            ${reviewsHTML.length ? reviewsHTML : '<p style="color: var(--text-light); font-style: italic;">No verified guest reviews written yet.</p>'}
          </div>
        </div>
      </div>
      
      <!-- Sticky Checkout widget -->
      <div>
        <div class="sticky-booking-widget">
          <div class="booking-widget-price-row">
            <span class="booking-widget-label">Package price</span>
            <span class="booking-widget-val">₹${formatPrice(spot.price)}</span>
          </div>
          <ul class="booking-detail-summary-list">
            <li><span>Guided Itinerary</span> <span>Included</span></li>
            <li><span>Shuttle service</span> <span>Complementary</span></li>
            <li><span>Cancellation Guarantee</span> <span>Standard</span></li>
          </ul>
          ${user && user.role === 'ROLE_ADMIN'
            ? `<button class="btn btn-secondary" style="width: 100%; padding: 1rem;" onclick="appRouter.navigate('admin-spots')">
            <i class="fa-solid fa-gear"></i> Manage Spot
          </button>`
            : `<button class="btn btn-secondary" style="width: 100%; padding: 1rem;" onclick="appRouter.navigate('booking', { spotId: ${spot.id} })">
            Book Package Now
          </button>`}
        </div>
      </div>
    `;
  } catch (err) {
    console.error(err);
  }
};

window.openAddReviewModal = (spotId) => {
  const comment = prompt('Write your review comment:');
  if (!comment) return;
  const ratingStr = prompt('Rate this destination from 1 to 5:');
  const rating = parseInt(ratingStr);
  if (isNaN(rating) || rating < 1 || rating > 5) {
    window.toast.show('Invalid rating. Enter between 1 and 5.', 'error');
    return;
  }
  executeAddReview(spotId, rating, comment);
};

const executeAddReview = async (spotId, rating, comment) => {
  const user = sessionStore.getCurrentUser();
  if (!user) {
    window.toast.show('Please login first to submit reviews.', 'error');
    window.appRouter.navigate('login');
    return;
  }
  
  try {
    const res = await fetch(`${API_BASE}/api/reviews`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ spotId, rating, comment })
    });
    if (res.ok) {
      window.toast.show('Review submitted successfully!', 'success');
      loadDetailsData(spotId);
    } else {
      window.toast.show('Failed to submit review.', 'error');
    }
  } catch (err) {
    console.error(err);
  }
};


// =========================================================================
// 4-STEP BOOKING WIZARD CONTROL ENGINE
// =========================================================================
let currentBookingState = {
  spotId: null,
  step: 1,
  travelDate: '',
  travelers: 1,
  unitPrice: 0,
  taxRate: 0.12, // 12% luxury VAT
  getTotal: function() {
    const base = this.unitPrice * this.travelers;
    return base + (base * this.taxRate);
  }
};

const loadBookingStepWizard = async (spotId) => {
  try {
    const response = await fetch(`${API_BASE}/api/spots/public/${spotId}`);
    if (!response.ok) throw new Error('Spot not found');
    const spot = await response.json();
    
    currentBookingState.spotId = spot.id;
    currentBookingState.step = 1;
    currentBookingState.unitPrice = spot.price;
    currentBookingState.travelers = 1;
    currentBookingState.travelDate = '';
    
    renderBookingStep();
  } catch (err) {
    console.error(err);
  }
};

const renderBookingStep = async () => {
  const progressNode = document.getElementById('wizard-progress-bar');
  const nextBtn = document.getElementById('wizard-next-btn');
  const backBtn = document.getElementById('wizard-back-btn');
  
  // Set progress lines
  if (progressNode) {
    progressNode.style.width = `${(currentBookingState.step - 1) * 33.3}%`;
  }
  
  // Step indicator color loops
  for (let i = 1; i <= 4; i++) {
    const node = document.getElementById(`node-step-${i}`);
    if (node) {
      node.classList.remove('active', 'completed');
      if (i < currentBookingState.step) node.classList.add('completed');
      if (i === currentBookingState.step) node.classList.add('active');
    }
  }
  
  // Controls validation toggling
  if (currentBookingState.step === 1) {
    if (backBtn) backBtn.style.display = 'none';
  } else {
    if (backBtn) backBtn.style.display = 'inline-flex';
  }
  
  if (currentBookingState.step === 4) {
    if (nextBtn) nextBtn.innerHTML = `Confirm & Reserve <i class="fa-solid fa-check"></i>`;
  } else {
    if (nextBtn) nextBtn.innerHTML = `Continue <i class="fa-solid fa-chevron-right"></i>`;
  }
  
  const contentPanel = document.getElementById('wizard-step-content');
  if (!contentPanel) return;
  
  try {
    const spotRes = await fetch(`${API_BASE}/api/spots/public/${currentBookingState.spotId}`);
    const spot = await spotRes.json();
    
    if (currentBookingState.step === 1) {
      contentPanel.innerHTML = `
        <h3 style="margin-bottom: 1rem;"><i class="fa-regular fa-calendar-days" style="color: var(--primary);"></i> Choose Travel Departure Date</h3>
        <p style="color: var(--text-light); margin-bottom: 2rem;">Select when you would like to begin your curated journey. Departs daily.</p>
        <div class="form-group" style="max-width: 400px; margin: 0 auto;">
          <label class="form-label">Departure Date</label>
          <input type="date" id="wizard-input-date" class="form-input" style="padding-left: 1rem;" value="${currentBookingState.travelDate}">
        </div>
      `;
    }
    
    else if (currentBookingState.step === 2) {
      contentPanel.innerHTML = `
        <h3 style="margin-bottom: 1rem;"><i class="fa-solid fa-people-group" style="color: var(--primary);"></i> Number of Travelers</h3>
        <p style="color: var(--text-light); margin-bottom: 2rem;">Configure guest size. Max 10 per guide cluster group.</p>
        <div class="form-group" style="max-width: 400px; margin: 0 auto; text-align: center;">
          <label class="form-label" style="display: block; margin-bottom: 1rem;">Total Travelers</label>
          <div style="display: flex; align-items: center; justify-content: center; gap: 1.5rem;">
            <button class="btn btn-outline" style="width: 50px; height: 50px; border-radius: 50%; padding: 0;" onclick="adjustWizardTravelers(-1)"><i class="fa-solid fa-minus"></i></button>
            <span style="font-size: 2rem; font-weight: 800; min-width: 40px;" id="wizard-val-travelers">${currentBookingState.travelers}</span>
            <button class="btn btn-outline" style="width: 50px; height: 50px; border-radius: 50%; padding: 0;" onclick="adjustWizardTravelers(1)"><i class="fa-solid fa-plus"></i></button>
          </div>
        </div>
      `;
    }
    
    else if (currentBookingState.step === 3) {
      const subtotal = currentBookingState.unitPrice * currentBookingState.travelers;
      const tax = subtotal * currentBookingState.taxRate;
      const total = subtotal + tax;
      
      contentPanel.innerHTML = `
        <h3 style="margin-bottom: 1.5rem;"><i class="fa-solid fa-receipt" style="color: var(--primary);"></i> Dynamic Price Calculation</h3>
        <div class="booking-invoice-summary-box" style="margin-bottom: 0;">
          <div class="booking-invoice-row">
            <span>Destination Package</span>
            <strong>${spot.title}</strong>
          </div>
          <div class="booking-invoice-row">
            <span>Departure Date</span>
            <strong>${currentBookingState.travelDate}</strong>
          </div>
          <div class="booking-invoice-row">
            <span>Travelers size</span>
            <strong>${currentBookingState.travelers} Guests</strong>
          </div>
          <div class="booking-invoice-row">
            <span>Package Unit Price</span>
            <strong>₹${formatPrice(currentBookingState.unitPrice)}</strong>
          </div>
          <hr style="border: none; border-top: 1px solid #E2E8F0; margin: 1rem 0;">
          <div class="booking-invoice-row">
            <span>Base Fee Subtotal</span>
            <span>₹${formatPrice(subtotal.toFixed(2))}</span>
          </div>
          <div class="booking-invoice-row">
            <span>Luxury Service Tax (12%)</span>
            <span>₹${formatPrice(tax.toFixed(2))}</span>
          </div>
          <div class="booking-invoice-row">
            <span>Estimated Total Price</span>
            <strong>₹${formatPrice(total.toFixed(2))}</strong>
          </div>
        </div>
      `;
    }
    
    else if (currentBookingState.step === 4) {
      contentPanel.innerHTML = `
        <div style="text-align: center;">
          <i class="fa-solid fa-shield-halved" style="font-size: 3.5rem; color: var(--secondary); margin-bottom: 1.5rem;"></i>
          <h3>Secure Checkout Confirmation</h3>
          <p style="color: var(--text-light); margin-bottom: 2rem; max-width: 500px; margin-left: auto; margin-right: auto;">
            By confirming this booking, you agree to reserve your departure slots. No immediate charge will be debited. Final payments processed on site.
          </p>
          <div style="font-size: 1.25rem; font-weight: 700; color: var(--primary);">
            Reservation Total: $${currentBookingState.getTotal().toFixed(2)}
          </div>
        </div>
      `;
    }
  } catch (err) {
    console.error(err);
  }
};

window.adjustWizardTravelers = (amount) => {
  const newVal = currentBookingState.travelers + amount;
  if (newVal >= 1 && newVal <= 10) {
    currentBookingState.travelers = newVal;
    const txt = document.getElementById('wizard-val-travelers');
    if (txt) txt.innerText = newVal;
  }
};

window.wizardNextStep = () => {
  if (currentBookingState.step === 1) {
    const inputDate = document.getElementById('wizard-input-date').value;
    if (!inputDate) {
      window.toast.show('Please select a valid departure date first.', 'error');
      return;
    }
    
    const dateChoice = new Date(inputDate);
    const today = new Date();
    today.setHours(0,0,0,0);
    
    if (dateChoice < today) {
      window.toast.show('Departure dates must be set in the future.', 'error');
      return;
    }
    
    currentBookingState.travelDate = inputDate;
  }
  
  if (currentBookingState.step === 4) {
    executeFinalBookingConfirm();
    return;
  }
  
  currentBookingState.step += 1;
  renderBookingStep();
};

window.wizardPrevStep = () => {
  if (currentBookingState.step > 1) {
    currentBookingState.step -= 1;
    renderBookingStep();
  }
};

const executeFinalBookingConfirm = async () => {
  try {
    const response = await fetch(`${API_BASE}/api/bookings`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        spotId: currentBookingState.spotId,
        travelDate: currentBookingState.travelDate,
        travelers: currentBookingState.travelers
      })
    });
    
    if (response.ok) {
      const booking = await response.json();
      window.toast.show('Reservation generated successfully!', 'success');
      window.appRouter.navigate('success', { bookingId: booking.bookingId });
    } else {
      const err = await response.json().catch(() => ({ message: 'Booking reservation failed' }));
      window.toast.show(err.message || 'Booking reservation failed', 'error');
    }
  } catch (err) {
    console.error(err);
    window.toast.show('Failed to save reservation on server.', 'error');
  }
};


// =========================================================================
// BOOKING SUCCESS & HISTORY
// =========================================================================

const loadSuccessData = async (bookingId) => {
  try {
    const bookingsRes = await fetch(`${API_BASE}/api/bookings/my`, {
      headers: getAuthHeaders()
    });
    const bookings = bookingsRes.ok ? await bookingsRes.json() : [];
    const booking = bookings.find(b => b.bookingId === bookingId);
    if (!booking) return;
    
    const spotRes = await fetch(`${API_BASE}/api/spots/public/${booking.spotId}`);
    const spot = await spotRes.json();
    
    const container = document.getElementById('success-invoice-box');
    if (container) {
      container.innerHTML = `
        <div class="booking-invoice-row">
          <span>Receipt Booking Code</span>
          <strong>${booking.bookingId}</strong>
        </div>
        <div class="booking-invoice-row">
          <span>Travel Destination</span>
          <strong>${spot.title}</strong>
        </div>
        <div class="booking-invoice-row">
          <span>Departure Schedule</span>
          <strong>${booking.travelDate}</strong>
        </div>
        <div class="booking-invoice-row">
          <span>Assigned Travelers</span>
          <strong>${booking.travelers} Guests</strong>
        </div>
        <div class="booking-invoice-row">
          <span>Final Total Price</span>
          <strong>₹${formatPrice(booking.totalPrice.toFixed(2))}</strong>
        </div>
      `;
    }
  } catch (err) {
    console.error(err);
  }
};

window.printReceipt = () => {
  window.print();
};

const loadHistoryTickets = async () => {
  const container = document.getElementById('history-tickets-stack');
  if (!container) return;
  
  try {
    const bookingsRes = await fetch(`${API_BASE}/api/bookings/my`, {
      headers: getAuthHeaders()
    });
    const bookings = bookingsRes.ok ? await bookingsRes.json() : [];
    
    if (bookings.length === 0) {
      container.innerHTML = `
        <div style="padding: 4rem; text-align: center; color: var(--text-light); background: white; border-radius: var(--radius-lg); box-shadow: var(--shadow-sm);">
          <i class="fa-solid fa-ticket-airline" style="font-size: 3rem; margin-bottom: 1rem; color: var(--text-muted);"></i>
          <p>No active boarding tickets booked. Click below to begin exploring.</p>
          <button class="btn btn-primary btn-sm" style="margin-top: 1.5rem;" onclick="appRouter.navigate('listing')">Find a Destination</button>
        </div>
      `;
      return;
    }
    
    bookings.sort((a,b) => new Date(b.travelDate) - new Date(a.travelDate));
    
    const ticketsHTML = [];
    for (const b of bookings) {
      const spotRes = await fetch(`${API_BASE}/api/spots/public/${b.spotId}`);
      if (!spotRes.ok) continue;
      const spot = await spotRes.json();
      
      let badgeClass = 'badge-pending';
      if (b.status === 'APPROVED') badgeClass = 'badge-approved';
      if (b.status === 'CANCELLED') badgeClass = 'badge-cancelled';
      if (b.status === 'COMPLETED') badgeClass = 'badge-completed';
      
      const isCancellable = b.status === 'PENDING' || b.status === 'APPROVED';
      const resolvedImg = resolveImageUrl(spot.imageUrl);
      const localFallback = `/assets/images/${spot.imageUrl}`;
      
      ticketsHTML.push(`
        <div class="travel-ticket-card">
          <div class="ticket-main-section">
            <img class="ticket-spot-thumbnail" src="${resolvedImg}" alt="${spot.title}" onerror="this.onerror=null; this.src='${localFallback}';">
            <div class="ticket-spot-details">
              <div>
                <span class="badge ${badgeClass}">${b.status}</span>
                <h3 style="margin-top: 0.5rem; font-size: 1.25rem;">${spot.title}</h3>
                <p style="color: var(--text-light); font-size: 0.85rem;"><i class="fa-solid fa-location-dot"></i> ${spot.location}</p>
              </div>
              
              <div class="ticket-info-grid">
                <div class="ticket-meta-box">
                  <span class="ticket-meta-label">Travel Date</span>
                  <span class="ticket-meta-val">${b.travelDate}</span>
                </div>
                <div class="ticket-meta-box">
                  <span class="ticket-meta-label">Travelers</span>
                  <span class="ticket-meta-val">${b.travelers} Guests</span>
                </div>
                <div class="ticket-meta-box">
                  <span class="ticket-meta-label">Invoice Code</span>
                  <span class="ticket-meta-val">${b.bookingId}</span>
                </div>
              </div>
            </div>
            <div class="ticket-divider-line"></div>
          </div>
          
          <div class="ticket-side-section">
            <div>
              <span class="ticket-meta-label">Reservation total</span>
              <div class="ticket-price-total">₹${formatPrice(b.totalPrice.toFixed(0))}</div>
            </div>
            
            <div class="barcode-visual-placeholder"></div>
            
            <div style="width: 100%; display: flex; flex-direction: column; gap: 0.5rem;">
              ${isCancellable ? `<button class="btn btn-outline btn-sm btn-danger" onclick="cancelUserBooking(event, ${b.id})" style="width: 100%; padding: 0.4rem;">Cancel Reservation</button>` : ''}
              <button class="btn btn-ghost btn-sm" onclick="appRouter.navigate('details', { spotId: ${spot.id} })" style="width: 100%; font-size: 0.8rem; padding: 0.4rem;">View Details</button>
            </div>
          </div>
        </div>
      `);
    }
    container.innerHTML = ticketsHTML.join('');
  } catch (err) {
    console.error(err);
  }
};

window.cancelUserBooking = async (e, id) => {
  e.stopPropagation();
  if (!confirm('Are you sure you want to cancel this departure reservation?')) return;
  
  try {
    const res = await fetch(`${API_BASE}/api/bookings/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (res.ok) {
      window.toast.show('Departure booking cancelled.', 'info');
      loadHistoryTickets();
    } else {
      window.toast.show('Failed to cancel booking.', 'error');
    }
  } catch (err) {
    console.error(err);
  }
};


// =========================================================================
// WISHLIST VIEW BINDINGS
// =========================================================================

const loadWishlistGrid = async () => {
  const user = sessionStore.getCurrentUser();
  const grid = document.getElementById('wishlist-results-grid');
  if (!grid) return;
  
  try {
    const wishRes = await fetch(`${API_BASE}/api/wishlist`, {
      headers: getAuthHeaders()
    });
    const wishlist = wishRes.ok ? await wishRes.json() : [];
    
    if (wishlist.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1/-1; padding: 4rem; text-align: center; color: var(--text-light); background: white; border-radius: var(--radius-lg); box-shadow: var(--shadow-sm);">
          <i class="fa-regular fa-heart" style="font-size: 3rem; margin-bottom: 1rem; color: var(--text-muted);"></i>
          <p>Your wishlist is currently empty. Explore destinations and click the heart icon to save.</p>
          <button class="btn btn-primary btn-sm" style="margin-top: 1.5rem;" onclick="appRouter.navigate('listing')">Find a Retreat</button>
        </div>
      `;
      return;
    }
    
    const wishlistedSpots = [];
    for (const item of wishlist) {
      const spotRes = await fetch(`${API_BASE}/api/spots/public/${item.spotId}`);
      if (spotRes.ok) {
        const spot = await spotRes.json();
        wishlistedSpots.push(spot);
      }
    }
    
    grid.innerHTML = wishlistedSpots.map(s => createSpotCardHTML(s, user, wishlist)).join('');
  } catch (err) {
    console.error(err);
  }
};


// =========================================================================
// USER PROFILE SETTINGS MODULE
// =========================================================================

const loadProfileSettings = async () => {
  const user = sessionStore.getCurrentUser();
  if (!user) return;
  
  try {
    const res = await fetch(`${API_BASE}/api/users/profile`, {
      headers: getAuthHeaders()
    });
    if (res.ok) {
      const profile = await res.json();
      document.getElementById('profile-avatar').innerText = profile.name.charAt(0).toUpperCase();
      document.getElementById('profile-card-name').innerText = profile.name;
      
      document.getElementById('profile-input-name').value = profile.name;
      document.getElementById('profile-input-email').value = profile.email;
      document.getElementById('profile-input-phone').value = profile.phone;
    }
  } catch (err) {
    console.error(err);
  }
  
  switchProfileTab('info');
};

window.switchProfileTab = (tab) => {
  const infoBtn = document.getElementById('profile-tab-info');
  const passBtn = document.getElementById('profile-tab-password');
  const infoForm = document.getElementById('profile-info-form');
  const passForm = document.getElementById('profile-password-form');
  
  if (tab === 'info') {
    infoBtn.classList.add('active');
    passBtn.classList.remove('active');
    infoForm.style.display = 'block';
    passForm.style.display = 'none';
  } else {
    infoBtn.classList.remove('active');
    passBtn.classList.add('active');
    infoForm.style.display = 'none';
    passForm.style.display = 'block';
  }
};

window.executeProfileUpdate = async (e) => {
  e.preventDefault();
  const name = document.getElementById('profile-input-name').value;
  const phone = document.getElementById('profile-input-phone').value;
  
  try {
    const res = await fetch(`${API_BASE}/api/users/profile`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ name, phone })
    });
    
    if (res.ok) {
      const updated = await res.json();
      const user = sessionStore.getCurrentUser();
      user.name = updated.name;
      user.phone = updated.phone;
      sessionStore.setCurrentUser(user);
      
      document.getElementById('profile-card-name').innerText = updated.name;
      document.getElementById('profile-avatar').innerText = updated.name.charAt(0).toUpperCase();
      
      window.toast.show('Profile information successfully updated.', 'success');
    } else {
      window.toast.show('Failed to update profile.', 'error');
    }
  } catch (err) {
    console.error(err);
  }
};

window.executePasswordChange = async (e) => {
  e.preventDefault();
  const oldPassword = document.getElementById('profile-password-current').value;
  const newPassword = document.getElementById('profile-password-new').value;
  const conf = document.getElementById('profile-password-confirm').value;
  
  if (newPassword.length < 6) {
    window.toast.show('New password must be at least 6 characters.', 'error');
    return;
  }
  
  if (newPassword !== conf) {
    window.toast.show('Passwords confirm field mismatch.', 'error');
    return;
  }
  
  try {
    const res = await fetch(`${API_BASE}/api/users/change-password`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ oldPassword, newPassword })
    });
    
    if (res.ok) {
      document.getElementById('profile-password-form').reset();
      window.toast.show('Security password updated successfully.', 'success');
    } else {
      const err = await res.json().catch(() => ({ message: 'Password update failed' }));
      window.toast.show(err.message || 'Current password verify check failed.', 'error');
    }
  } catch (err) {
    console.error(err);
  }
};


// =========================================================================
// ADMINISTRATIVE DASHBOARD CONTROLLERS
// =========================================================================

const loadAdminDashboardData = async () => {
  try {
    const statsRes = await fetch(`${API_BASE}/api/admin/dashboard`, {
      headers: getAuthHeaders()
    });
    if (!statsRes.ok) throw new Error('Unauthorized');
    const stats = await statsRes.json();
    
    document.getElementById('adm-metric-users').innerText = stats.totalUsers || 0;
    document.getElementById('adm-metric-bookings').innerText = stats.totalBookings || 0;
    document.getElementById('adm-metric-revenue').innerText = `₹${formatPrice(stats.totalRevenue || 0)}`;
    document.getElementById('adm-metric-spots').innerText = stats.totalSpots || 0;
    
    const bookingsRes = await fetch(`${API_BASE}/api/bookings/admin/all`, {
      headers: getAuthHeaders()
    });
    const bookings = bookingsRes.ok ? await bookingsRes.json() : [];
    
    const bookingsTbody = document.getElementById('admin-latest-bookings-tbody');
    if (bookingsTbody) {
      const bookingsSlice = bookings.slice(-5).reverse();
      bookingsTbody.innerHTML = bookingsSlice.map(b => {
        let badgeClass = 'badge-pending';
        if (b.status === 'APPROVED') badgeClass = 'badge-approved';
        if (b.status === 'CANCELLED') badgeClass = 'badge-cancelled';
        if (b.status === 'COMPLETED') badgeClass = 'badge-completed';
        
        return `
          <tr>
            <td><strong>${b.bookingId}</strong></td>
            <td>Guest</td>
            <td>${b.spotTitle || 'Package'}</td>
            <td>${b.travelDate}</td>
            <td><span class="badge ${badgeClass}">${b.status}</span></td>
          </tr>
        `;
      }).join('');
    }
    
    // Fetch and populate Recent Users
    const usersRes = await fetch(`${API_BASE}/api/admin/dashboard/users`, {
      headers: getAuthHeaders()
    });
    const users = usersRes.ok ? await usersRes.json() : [];
    
    const usersTbody = document.getElementById('admin-recent-users-tbody');
    if (usersTbody) {
      const usersSlice = users.slice(0, 5);
      usersTbody.innerHTML = usersSlice.map(u => `
        <tr>
          <td><strong>${u.name}</strong></td>
          <td>${u.email}</td>
        </tr>
      `).join('');
    }
    
    setTimeout(() => {
      document.querySelectorAll('.bar-chart-pillar').forEach(p => {
        const h = p.style.height || p.getAttribute('style')?.match(/height:\s*([^;]+)/)?.[1];
        if (h) {
          p.style.height = '0';
          p.offsetHeight;
          p.style.height = h;
        }
      });
    }, 100);
  } catch (err) {
    console.error(err);
  }
};

// 14. Manage Spots CRUD Methods
const loadAdminSpotsGrid = async () => {
  try {
    const res = await fetch(`${API_BASE}/api/admin/spots/all`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Unauthorized');
    const spots = await res.json();
    
    const tbody = document.getElementById('admin-spots-tbody');
    if (!tbody) return;
    
    tbody.innerHTML = spots.map(s => {
      const resolvedImg = resolveImageUrl(s.imageUrl);
      const localFallback = `/assets/images/${s.imageUrl}`;
      return `
        <tr>
          <td><img src="${resolvedImg}" onerror="this.onerror=null; this.src='${localFallback}';" style="width: 50px; height: 50px; border-radius: var(--radius-sm); object-fit: cover;"></td>
          <td style="font-weight:600;">${s.title}</td>
          <td><i class="fa-solid fa-location-dot" style="color:var(--text-light); margin-right:0.25rem;"></i> ${s.location}</td>
          <td><span class="badge badge-completed">${s.category}</span></td>
          <td><strong>₹${formatPrice(s.price)}</strong></td>
          <td style="color:var(--text-light); font-size:0.85rem;">${s.duration}</td>
          <td>
            <div style="display: flex; gap: 0.5rem;">
              <button class="btn btn-ghost btn-sm" onclick="openEditSpotModal(${s.id})" style="padding:0.4rem; color:var(--primary);"><i class="fa-solid fa-pencil"></i></button>
              <button class="btn btn-ghost btn-sm" onclick="deleteSpotCrud(${s.id})" style="padding:0.4rem; color:#EF4444;"><i class="fa-solid fa-trash-can"></i></button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  } catch (err) {
    console.error(err);
  }
};

window.openCreateSpotModal = () => {
  document.getElementById('modal-spot-title').innerText = 'Add New Tourist Spot';
  document.getElementById('spot-crud-form').reset();
  document.getElementById('spot-id-field').value = '';
  document.getElementById('crud-spot-modal').classList.add('open');
};

window.openEditSpotModal = async (id) => {
  try {
    const res = await fetch(`${API_BASE}/api/spots/public/${id}`);
    const spot = await res.json();
    
    document.getElementById('modal-spot-title').innerText = 'Edit Tourist Spot Details';
    document.getElementById('spot-id-field').value = spot.id;
    document.getElementById('spot-title-field').value = spot.title;
    document.getElementById('spot-location-field').value = spot.location;
    document.getElementById('spot-category-field').value = spot.category;
    document.getElementById('spot-price-field').value = spot.price;
    document.getElementById('spot-duration-field').value = spot.duration;
    document.getElementById('spot-image-field').value = spot.imageUrl;
    document.getElementById('spot-weather-field').value = spot.weather;
    document.getElementById('spot-facilities-field').value = spot.facilities;
    document.getElementById('spot-description-field').value = spot.description;
    
    document.getElementById('crud-spot-modal').classList.add('open');
  } catch (err) {
    console.error(err);
  }
};

window.closeSpotModal = () => {
  document.getElementById('crud-spot-modal').classList.remove('open');
};

window.saveSpotCrud = async () => {
  const form = document.getElementById('spot-crud-form');
  if (!form.reportValidity()) return;
  
  const idVal = document.getElementById('spot-id-field').value;
  const title = document.getElementById('spot-title-field').value;
  const location = document.getElementById('spot-location-field').value;
  const category = document.getElementById('spot-category-field').value;
  const price = parseFloat(document.getElementById('spot-price-field').value);
  const duration = document.getElementById('spot-duration-field').value;
  const imageUrl = document.getElementById('spot-image-field').value;
  const weather = document.getElementById('spot-weather-field').value;
  const facilities = document.getElementById('spot-facilities-field').value;
  const description = document.getElementById('spot-description-field').value;
  
  const payload = {
    title,
    location,
    category,
    price,
    duration,
    imageUrl,
    weather,
    facilities,
    description
  };
  
  try {
    let res;
    if (idVal) {
      res = await fetch(`${API_BASE}/api/admin/spots/${idVal}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload)
      });
      if (res.ok) window.toast.show('Tourist spot parameters updated.', 'success');
    } else {
      res = await fetch(`${API_BASE}/api/admin/spots`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload)
      });
      if (res.ok) window.toast.show('New destination registered successfully.', 'success');
    }
    
    closeSpotModal();
    loadAdminSpotsGrid();
  } catch (err) {
    console.error(err);
    window.toast.show('Failed to save spot details.', 'error');
  }
};

window.deleteSpotCrud = async (id) => {
  if (!confirm('Are you sure you want to deprecate this tourist spot node?')) return;
  
  try {
    const res = await fetch(`${API_BASE}/api/admin/spots/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (res.ok) {
      window.toast.show('Destination status deactivated.', 'info');
      loadAdminSpotsGrid();
    }
  } catch (err) {
    console.error(err);
  }
};

// 15. Manage Bookings status controls
const loadAdminBookingsQueue = () => {
  filterAdminBookings();
};

window.filterAdminBookings = async () => {
  const filterVal = document.getElementById('admin-booking-status-filter').value;
  
  try {
    const res = await fetch(`${API_BASE}/api/bookings/admin/all`, {
      headers: getAuthHeaders()
    });
    let bookings = await res.json();
    
    if (filterVal !== 'ALL') {
      bookings = bookings.filter(b => b.status === filterVal);
    }
    
    bookings.sort((a,b) => b.id - a.id);
    
    const tbody = document.getElementById('admin-bookings-queue-tbody');
    if (!tbody) return;
    
    tbody.innerHTML = bookings.map(b => {
      let badgeClass = 'badge-pending';
      if (b.status === 'APPROVED') badgeClass = 'badge-approved';
      if (b.status === 'CANCELLED') badgeClass = 'badge-cancelled';
      if (b.status === 'COMPLETED') badgeClass = 'badge-completed';
      
      const isActionable = b.status === 'PENDING';
      
      return `
        <tr>
          <td><strong>${b.bookingId}</strong></td>
          <td>
            <div style="font-weight:600;">Guest</div>
          </td>
          <td style="font-weight:500;">${b.spotTitle || 'Package'}</td>
          <td style="font-size:0.9rem;">${b.travelDate}</td>
          <td><strong>₹${formatPrice(b.totalPrice.toFixed(0))}</strong></td>
          <td><span class="badge ${badgeClass}">${b.status}</span></td>
          <td>
            <div style="display: flex; gap: 0.5rem;">
              ${isActionable ? `
                <button class="btn btn-outline btn-sm" onclick="updateBookingStatus(${b.id}, 'APPROVED')" style="padding:0.4rem; border-color:#10B981; color:#10B981;"><i class="fa-solid fa-check"></i> Approve</button>
                <button class="btn btn-outline btn-sm btn-danger" onclick="updateBookingStatus(${b.id}, 'CANCELLED')" style="padding:0.4rem;"><i class="fa-solid fa-xmark"></i> Cancel</button>
              ` : `
                ${b.status === 'APPROVED' ? `
                  <button class="btn btn-outline btn-sm" onclick="updateBookingStatus(${b.id}, 'COMPLETED')" style="padding:0.4rem; border-color:#3B82F6; color:#3B82F6;"><i class="fa-solid fa-flag-checkered"></i> Complete</button>
                ` : '<span style="color:var(--text-muted); font-size:0.85rem; font-style:italic;">Archived</span>'}
              `}
            </div>
          </td>
        </tr>
      `;
    }).join('');
  } catch (err) {
    console.error(err);
  }
};

window.updateBookingStatus = async (id, newStatus) => {
  try {
    const res = await fetch(`${API_BASE}/api/bookings/admin/${id}/status?status=${newStatus}`, {
      method: 'PUT',
      headers: getAuthHeaders()
    });
    if (res.ok) {
      window.toast.show(`Booking status marked as ${newStatus}.`, 'success');
      filterAdminBookings();
    }
  } catch (err) {
    console.error(err);
  }
};


// Generic Info Page Loader
const loadInfoPage = (pageKey) => {
  const tagEl = document.getElementById('info-page-tag');
  const titleEl = document.getElementById('info-page-title');
  const subtitleEl = document.getElementById('info-page-subtitle');
  const contentEl = document.getElementById('info-page-content');
  
  if (!tagEl || !titleEl || !subtitleEl || !contentEl) return;
  
  const pages = {
    safety: {
      tag: 'Travel Guide',
      title: 'Safety Protocols',
      subtitle: 'Your health, safety, and comfort are our top priorities.',
      content: `
        <div style="display: flex; flex-direction: column; gap: 2rem; text-align: left;">
          <div>
            <h3 style="font-size: 1.3rem; margin-bottom: 0.5rem; color: var(--primary);"><i class="fa-solid fa-shield-halved"></i> Verified Accommodations</h3>
            <p style="color: var(--text-light); line-height: 1.6;">All our retreats, hotels, and homestays undergo strict sanitation and safety audits before they are listed on TripNest. We verify fire safety, hygiene standards, and emergency preparedness.</p>
          </div>
          <div>
            <h3 style="font-size: 1.3rem; margin-bottom: 0.5rem; color: var(--primary);"><i class="fa-solid fa-headset"></i> 24/7 Concierge Support</h3>
            <p style="color: var(--text-light); line-height: 1.6;">Travel with peace of mind. Our local support team and customer care representatives are available around the clock to assist you with medical emergencies, transportation issues, or booking changes.</p>
          </div>
          <div>
            <h3 style="font-size: 1.3rem; margin-bottom: 0.5rem; color: var(--primary);"><i class="fa-solid fa-user-shield"></i> Certified Local Guides</h3>
            <p style="color: var(--text-light); line-height: 1.6;">Every guided activity or curated tour is led by a verified local guide certified in first aid and safety protocols. They know the terrain perfectly and prioritize guest safety under all circumstances.</p>
          </div>
          <div>
            <h3 style="font-size: 1.3rem; margin-bottom: 0.5rem; color: var(--primary);"><i class="fa-solid fa-bell"></i> Real-time Travel Advisories</h3>
            <p style="color: var(--text-light); line-height: 1.6;">Stay informed. Receive instant alerts on your dashboard or email regarding weather conditions, local events, or travel constraints at your destination.</p>
          </div>
        </div>
      `
    },
    concierge: {
      tag: 'Travel Guide',
      title: 'Airport Concierge',
      subtitle: 'Premium airport transit assistance for a stress-free journey.',
      content: `
        <div style="display: flex; flex-direction: column; gap: 2rem; text-align: left;">
          <div>
            <h3 style="font-size: 1.3rem; margin-bottom: 0.5rem; color: var(--primary);"><i class="fa-solid fa-plane-arrival"></i> Fast-Track Terminal Assistance</h3>
            <p style="color: var(--text-light); line-height: 1.6;">Skip the long check-in and security lines. Our dedicated airport representative will meet you at the terminal and fast-track your airport checkpoints.</p>
          </div>
          <div>
            <h3 style="font-size: 1.3rem; margin-bottom: 0.5rem; color: var(--primary);"><i class="fa-solid fa-couch"></i> Luxury Lounge Access</h3>
            <p style="color: var(--text-light); line-height: 1.6;">Wait in comfort. Benefit from complimentary access to premium airport lounges with unlimited refreshments, Wi-Fi, and relaxing spa sessions before your flight departs.</p>
          </div>
          <div>
            <h3 style="font-size: 1.3rem; margin-bottom: 0.5rem; color: var(--primary);"><i class="fa-solid fa-suitcase-rolling"></i> Baggage & Porter Service</h3>
            <p style="color: var(--text-light); line-height: 1.6;">Leave the heavy lifting to us. Our baggage assistants will manage your check-in luggage and handle arrivals collection while you relax.</p>
          </div>
          <div>
            <h3 style="font-size: 1.3rem; margin-bottom: 0.5rem; color: var(--primary);"><i class="fa-solid fa-car-side"></i> Chauffeured Retreat Transfers</h3>
            <p style="color: var(--text-light); line-height: 1.6;">A luxury air-conditioned sedan or SUV will be waiting for you outside the arrival gate to provide a smooth, private transfer straight to your retreat hotel.</p>
          </div>
        </div>
      `
    },
    insurance: {
      tag: 'Travel Guide',
      title: 'Trip Insurance',
      subtitle: 'Complete protection plans for unexpected travel changes.',
      content: `
        <div style="display: flex; flex-direction: column; gap: 2rem; text-align: left;">
          <div>
            <h3 style="font-size: 1.3rem; margin-bottom: 0.5rem; color: var(--primary);"><i class="fa-solid fa-calendar-xmark"></i> Booking Cancellation Protection</h3>
            <p style="color: var(--text-light); line-height: 1.6;">Receive up to 100% reimbursement on booking deposits and travel tickets if you need to cancel your trip due to medical, professional, or personal emergencies.</p>
          </div>
          <div>
            <h3 style="font-size: 1.3rem; margin-bottom: 0.5rem; color: var(--primary);"><i class="fa-solid fa-briefcase-medical"></i> International Medical Coverage</h3>
            <p style="color: var(--text-light); line-height: 1.6;">Our insurance plans cover hospital stays, doctors' fees, and emergency ambulance services during your trip, ensuring high-quality care without financial worry.</p>
          </div>
          <div>
            <h3 style="font-size: 1.3rem; margin-bottom: 0.5rem; color: var(--primary);"><i class="fa-solid fa-suitcase"></i> Baggage Loss & Theft Coverage</h3>
            <p style="color: var(--text-light); line-height: 1.6;">Get compensated quickly for lost, stolen, or delayed luggage. We also cover essential expenses if your luggage is delayed by more than 12 hours.</p>
          </div>
          <div>
            <h3 style="font-size: 1.3rem; margin-bottom: 0.5rem; color: var(--primary);"><i class="fa-solid fa-clock-rotate-left"></i> Delay & Missed Connection Assist</h3>
            <p style="color: var(--text-light); line-height: 1.6;">Receive hotel vouchers, meal coupons, and alternative travel booking coverage if your flights are delayed or you miss connection points due to carrier issues.</p>
          </div>
        </div>
      `
    },
    agency: {
      tag: 'Enterprise Partner',
      title: 'Agency Partnership',
      subtitle: 'Partner with TripNest to scale your boutique agency.',
      content: `
        <div style="display: flex; flex-direction: column; gap: 2rem; text-align: left;">
          <div>
            <h3 style="font-size: 1.3rem; margin-bottom: 0.5rem; color: var(--primary);"><i class="fa-solid fa-hotel"></i> Global Premium Inventory</h3>
            <p style="color: var(--text-light); line-height: 1.6;">Gain instant access to our handpicked inventory of luxury villas, heritage properties, and boutique resorts with exclusive partner rates and inventory guarantees.</p>
          </div>
          <div>
            <h3 style="font-size: 1.3rem; margin-bottom: 0.5rem; color: var(--primary);"><i class="fa-solid fa-percent"></i> Industry-Leading Commissions</h3>
            <p style="color: var(--text-light); line-height: 1.6;">Enjoy competitive commissions starting from 12% on all completed bookings, plus quarterly performance bonuses and VIP host points.</p>
          </div>
          <div>
            <h3 style="font-size: 1.3rem; margin-bottom: 0.5rem; color: var(--primary);"><i class="fa-solid fa-code"></i> Advanced Integration APIs</h3>
            <p style="color: var(--text-light); line-height: 1.6;">Integrate our booking engine seamlessly into your website using modern, lightweight REST API tokens or embeddable glassmorphic widgets.</p>
          </div>
          <div>
            <h3 style="font-size: 1.3rem; margin-bottom: 0.5rem; color: var(--primary);"><i class="fa-solid fa-user-tie"></i> Dedicated Account Managers</h3>
            <p style="color: var(--text-light); line-height: 1.6;">Every agency partner is assigned a dedicated travel professional to manage custom group bookings, resolve conflicts, and handle special VIP requests.</p>
          </div>
        </div>
      `
    },
    corporate: {
      tag: 'Enterprise Service',
      title: 'Corporate Travel',
      subtitle: 'Streamlined travel management for high-performing teams.',
      content: `
        <div style="display: flex; flex-direction: column; gap: 2rem; text-align: left;">
          <div>
            <h3 style="font-size: 1.3rem; margin-bottom: 0.5rem; color: var(--primary);"><i class="fa-solid fa-file-invoice"></i> Centralized Billing & Invoicing</h3>
            <p style="color: var(--text-light); line-height: 1.6;">Simplify your accounting. Access all team travel expenses, booking receipts, and transport invoices in a unified monthly corporate account statement.</p>
          </div>
          <div>
            <h3 style="font-size: 1.3rem; margin-bottom: 0.5rem; color: var(--primary);"><i class="fa-solid fa-tags"></i> Corporate Volume Discounts</h3>
            <p style="color: var(--text-light); line-height: 1.6;">Save up to 15% on standard rates at partner hotels and transfer services. Take advantage of negotiated corporate rates with no minimum booking threshold.</p>
          </div>
          <div>
            <h3 style="font-size: 1.3rem; margin-bottom: 0.5rem; color: var(--primary);"><i class="fa-solid fa-chart-line"></i> Team Travel Analytics</h3>
            <p style="color: var(--text-light); line-height: 1.6;">Track team expenditures, view destination preferences, and generate detailed corporate spend reports using our analytics dashboard.</p>
          </div>
          <div>
            <h3 style="font-size: 1.3rem; margin-bottom: 0.5rem; color: var(--primary);"><i class="fa-solid fa-people-group"></i> Offsites & Team Retreats</h3>
            <p style="color: var(--text-light); line-height: 1.6;">Plan perfect team-building workshops, corporate offsites, and business meetups with dedicated custom meeting rooms, catering, and team activities.</p>
          </div>
        </div>
      `
    },
    privacy: {
      tag: 'Legal Policy',
      title: 'Privacy Policy',
      subtitle: 'Commitment to protecting your personal data.',
      content: `
        <div style="display: flex; flex-direction: column; gap: 1.5rem; text-align: left; color: var(--text-light); line-height: 1.6;">
          <p>At TripNest, we respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy details how we collect, use, store, and process your travel data.</p>
          <div>
            <h4 style="font-weight: 700; color: var(--text-dark); margin-bottom: 0.25rem;">1. Information We Collect</h4>
            <p>We collect registration details (name, email, phone number) and transactional details associated with your retreat bookings. We do not store full credit card details on our servers.</p>
          </div>
          <div>
            <h4 style="font-weight: 700; color: var(--text-dark); margin-bottom: 0.25rem;">2. How We Use Data</h4>
            <p>Your information is used strictly to process bookings, handle airport transfers, manage your wishlist, and send confirmation details or real-time travel updates.</p>
          </div>
          <div>
            <h4 style="font-weight: 700; color: var(--text-dark); margin-bottom: 0.25rem;">3. Data Sharing Restrictions</h4>
            <p>We share booking details only with verified hotel operators, concierge hosts, and transfer drivers associated with your reservation. We never sell your personal information to third-party advertisers.</p>
          </div>
          <div>
            <h4 style="font-weight: 700; color: var(--text-dark); margin-bottom: 0.25rem;">4. Your Rights & Data Deletion</h4>
            <p>You have full control over your data. You may export your booking history or request permanent account deletion by contacting support at privacy@tripnest.com.</p>
          </div>
        </div>
      `
    },
    terms: {
      tag: 'Legal Policy',
      title: 'Terms of Service',
      subtitle: 'User agreement and platform guidelines.',
      content: `
        <div style="display: flex; flex-direction: column; gap: 1.5rem; text-align: left; color: var(--text-light); line-height: 1.6;">
          <p>By registering an account and using the TripNest platform, you agree to comply with and be bound by the following terms and guidelines.</p>
          <div>
            <h4 style="font-weight: 700; color: var(--text-dark); margin-bottom: 0.25rem;">1. Account Registration</h4>
            <p>Users must register with genuine email addresses and contact phone numbers. Administrative and customer accounts are subject to authorization checks.</p>
          </div>
          <div>
            <h4 style="font-weight: 700; color: var(--text-dark); margin-bottom: 0.25rem;">2. Booking & Cancellation Policies</h4>
            <p>All bookings made via TripNest are pending approval until validated by our team or the specific operator. Cancellations and refunds are subject to retreat operator terms.</p>
          </div>
          <div>
            <h4 style="font-weight: 700; color: var(--text-dark); margin-bottom: 0.25rem;">3. User Conduct & Abuse Prevention</h4>
            <p>Any attempt to scan for vulnerabilities, run unauthorized SQL operations, or exploit the platform security parameters will lead to immediate account termination and legal action.</p>
          </div>
          <div>
            <h4 style="font-weight: 700; color: var(--text-dark); margin-bottom: 0.25rem;">4. Limitation of Liability</h4>
            <p>TripNest serves as a luxury travel coordinator. While we audit all listings, we are not liable for property disruptions or carriage delays caused by third-party vendors.</p>
          </div>
        </div>
      `
    }
  };
  
  const page = pages[pageKey] || pages['safety'];
  
  tagEl.innerText = page.tag;
  titleEl.innerText = page.title;
  subtitleEl.innerText = page.subtitle;
  contentEl.innerHTML = page.content;
};


// --- App Init Bootstrapper ---
document.addEventListener('DOMContentLoaded', () => {
  // Set default view on load
  window.appRouter.updateDOM();
});
