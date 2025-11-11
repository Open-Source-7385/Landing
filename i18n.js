// i18n.js
// Carga textos desde locales/es.json o locales/en.json y los aplica al DOM

function loadLocale(lang) {
  fetch(`locales/${lang}.json`)
    .then(res => res.json())
    .then(data => applyTranslations(data));
}

function applyTranslations(dict) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const value = key.split('.').reduce((obj, k) => obj && obj[k], dict);
    if (value) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = value;
      } else {
        el.textContent = value;
      }
    }
  });
}

// Inicializa idioma por defecto

function setActiveLangBtn(lang) {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.textContent.trim().toLowerCase() === lang) btn.classList.add('active');
  });
}

function initI18n() {
  let lang = localStorage.getItem('lang') || navigator.language.slice(0,2);
  if (!['es','en'].includes(lang)) lang = 'es';
  setActiveLangBtn(lang);
  loadLocale(lang);
}


window.changeLang = function(lang) {
  localStorage.setItem('lang', lang);
  setActiveLangBtn(lang);
  loadLocale(lang);
};

document.addEventListener('DOMContentLoaded', initI18n);
