'use strict';

console.log('[BOOT] 1. Script loaded');

let currentLang = 'en';
let currentPage = 'home';

function navigate(page) {
  currentPage = page;
  renderPage(page);
}

function renderPage(page) {
  console.log('[BOOT] renderPage called with:', page);
  const container = document.getElementById('pageContainer');
  if (!container) {
    console.error('[BOOT] pageContainer not found!');
    return;
  }
  container.innerHTML = '<div style="padding:20px; color:#0f0;">Page: ' + page + '</div>';
}

console.log('[BOOT] 2. Functions defined');

console.log('[BOOT] 3. About to set DOMContentLoaded');

document.addEventListener('DOMContentLoaded', () => {
  console.log('[BOOT] 4. DOMContentLoaded fired!');
  renderPage('home');
});

console.log('[BOOT] 5. Script completed');

