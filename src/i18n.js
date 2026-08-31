import en from './lang/en.json';
import hi from './lang/hi.json';

const translations = { en, hi };
let currentLang = localStorage.getItem('kb-lang') || 'hi'; // Defaulting to 'hi' as it was originally Hinglish

export function setLanguage(lang) {
  if (translations[lang]) {
    currentLang = lang;
    localStorage.setItem('kb-lang', lang);
    applyTranslations();
  }
}

export function getLanguage() {
  return currentLang;
}

export function t(key) {
  return translations[currentLang][key] || key;
}

export function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[currentLang][key]) {
      el.textContent = translations[currentLang][key];
    }
  });
}

// Initial application
window.addEventListener('DOMContentLoaded', applyTranslations);
