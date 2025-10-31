// Mobile nav toggle
const navToggleButton = document.querySelector('.nav-toggle');
const navMenu = document.getElementById('nav-menu');
if (navToggleButton && navMenu) {
  navToggleButton.addEventListener('click', () => {
    const expanded = navToggleButton.getAttribute('aria-expanded') === 'true';
    navToggleButton.setAttribute('aria-expanded', String(!expanded));
    navMenu.classList.toggle('active');
    navMenu.setAttribute('aria-expanded', String(!expanded));
  });
}

// Simple router helpers
function navigateBack() {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = 'index.html';
  }
}
window.navigateBack = navigateBack;

// Fee calculator logic (used on fees.html) - discounts by course count
function calculateFees(input) {
  const { baseFees, selectedCourseIds, studentName, email, phone } = input;
  const selected = selectedCourseIds.map((id) => baseFees.find((c) => c.id === id)).filter(Boolean);
  const subtotal = selected.reduce((sum, c) => sum + c.fee, 0);
  const count = selected.length;
  let discount = 0; // percent as decimal
  if (count === 1) discount = 0;
  else if (count === 2) discount = 0.05;
  else if (count === 3) discount = 0.10;
  else if (count > 3) discount = 0.15;
  const total = Math.max(0, subtotal - subtotal * discount);
  return { studentName, email, phone, subtotal, discountPercent: discount, total };
}
window.calculateFees = calculateFees;

// Header profile init: show username if signed in
function initHeaderProfile() {
  const profile = document.getElementById('profile');
  const nameEl = document.getElementById('profileName');
  const avatarEl = document.getElementById('avatar');
  const signInLink = document.getElementById('signInLink');
  const isSignedIn = sessionStorage.getItem('isSignedIn');
  const username = sessionStorage.getItem('username');
  if (profile && isSignedIn && username) {
    profile.style.display = 'flex';
    if (signInLink) signInLink.style.display = 'none';
    if (nameEl) nameEl.textContent = username;
    if (avatarEl) avatarEl.textContent = (username[0] || 'U').toUpperCase();
  } else {
    if (profile) profile.style.display = 'none';
    if (signInLink) signInLink.style.display = 'inline-block';
  }
}
window.initHeaderProfile = initHeaderProfile;


// Newsletter subscription handler
function handleNewsletterSubscribe() {
  const emailInput = document.getElementById('newsletterEmail');
  const messageDiv = document.getElementById('newsletterMessage');
  
  if (!emailInput || !messageDiv) return;
  
  const email = emailInput.value.trim();
  
  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    messageDiv.style.display = 'block';
    messageDiv.style.background = '#fee';
    messageDiv.style.color = '#c00';
    messageDiv.style.border = '1px solid #fcc';
    messageDiv.textContent = 'Please enter a valid email address.';
    return;
  }
  
  // Store subscription in localStorage
  const subscriptions = JSON.parse(localStorage.getItem('newsletterSubscriptions') || '[]');
  if (!subscriptions.includes(email)) {
    subscriptions.push(email);
    localStorage.setItem('newsletterSubscriptions', JSON.stringify(subscriptions));
    
    messageDiv.style.display = 'block';
    messageDiv.style.background = '#e8f5e9';
    messageDiv.style.color = '#2e7d32';
    messageDiv.style.border = '1px solid #c8e6c9';
    messageDiv.innerHTML = '✓ Successfully subscribed! You\'ll receive updates from Empowering the Nation.';
    
    // Reset form
    emailInput.value = '';
    
    // Hide message after 5 seconds
    setTimeout(() => {
      messageDiv.style.display = 'none';
    }, 5000);
  } else {
    messageDiv.style.display = 'block';
    messageDiv.style.background = '#fff3cd';
    messageDiv.style.color = '#856404';
    messageDiv.style.border = '1px solid #ffeaa7';
    messageDiv.textContent = 'This email is already subscribed to our newsletter.';
    
    setTimeout(() => {
      messageDiv.style.display = 'none';
    }, 5000);
  }
}
window.handleNewsletterSubscribe = handleNewsletterSubscribe;

// Auto init on load
document.addEventListener('DOMContentLoaded', () => {
  try { initHeaderProfile(); } catch (e) {}
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
