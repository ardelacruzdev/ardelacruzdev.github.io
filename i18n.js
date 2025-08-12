// i18n.js - Sistema de traducción bilingüe
let currentLang = 'es';
// Cargar traducciones
async function loadTranslations() {
    const response = await fetch('translations.json');
    return await response.json();
}

// Aplicar traducción a un elemento
function translateElement(el, key, translations) {
    if (key && translations[currentLang][key]) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = translations[currentLang][key];
        } else {
            el.innerHTML = translations[currentLang][key];
        }
    }
}

// Cambiar idioma
async function setLanguage(lang) {
    if (lang !== 'es' && lang !== 'en') return;

    currentLang = lang;
    const translations = await loadTranslations();

    // Traducir todos los elementos con data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        translateElement(el, key, translations);
    });

    // Guardar en localStorage
    localStorage.setItem('lang', lang);

    // Actualizar botón
    document.getElementById('lang-toggle').textContent = lang === 'es' ? 'EN' : 'ES';
}

// Inicializar
document.addEventListener('DOMContentLoaded', async () => {
    const toggle = document.getElementById('lang-toggle');

    // Detectar idioma guardado
    const savedLang = localStorage.getItem('lang');
    if (savedLang) {
        currentLang = savedLang;
    }

    await setLanguage(currentLang);

    // Evento del botón
    toggle.addEventListener('click', async () => {
        const newLang = currentLang === 'es' ? 'en' : 'es';
        await setLanguage(newLang);
    });
});