'use strict';


const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  if (window.scrollY >= 100) {
    header.classList.add('header__black');
  } else {
    header.classList.remove('header__black');
  }
});