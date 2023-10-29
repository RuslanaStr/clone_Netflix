'use strict';


// ====================== HEADER ==============================
// Добавляет темный фон для шапки при прокрутке
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY >= 100) {
    nav.classList.add('header__black');
  } else {
    nav.classList.remove('header__black');
  }
});

// ====================== HEADER ==============================