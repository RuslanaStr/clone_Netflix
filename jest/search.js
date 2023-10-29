'use strict';

import { API_KEY_TMDB } from './api.js';

// Форма поиска в шапке
const searchIcon = document.querySelector('.search__icon');
const searchInput = document.querySelector('.search__input');

// Функция для сворачивания формы
/**
 * Сворачивает форму поиска.
 * @returns {void}
 */
function collapseForm() {
  searchIcon.classList.remove('active');
  searchInput.classList.remove('active');
  searchInput.value = ''; // Очистка поля ввода
}

// Обработчик клика на иконку поиска
/**
 * Обработчик клика на иконку поиска.
 * @param {Event} event - Событие клика.
 * @returns {void}
 */
// добавлена проверка иф
if (searchIcon && searchInput) {
  searchIcon.addEventListener('click', function() {
    if (searchIcon.classList.contains('active')) {
      collapseForm();
    } else {
      searchIcon.classList.add('active');
      searchInput.classList.add('active');
      searchInput.focus(); // Установка фокуса на поле ввода
    }
  });
}

// Обработчик клика в любом месте страницы, кроме формы поиска
/**
 * Обработчик клика в любом месте страницы, кроме формы поиска.
 * @param {Event} event - Событие клика.
 * @returns {void}
 */
document.addEventListener('click', function(event) {
  if (searchIcon && searchInput) {

  const target = event.target;
  if (
    target !== searchIcon &&
    target !== searchInput &&
    !searchIcon.contains(target) &&
    !searchInput.contains(target)
  ) {
    collapseForm();
  }
}
});

// Обработчик нажатия на клавишу Esc
/**
 * Обработчик нажатия на клавишу Esc.
 * @param {KeyboardEvent} event - Событие нажатия клавиши.
 * @returns {void}
 */
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    collapseForm();
  }
});

// Логика поиска фильмов
const genreMoviesContainer = document.querySelector('.genre__container');
const movieDetailsContainer = document.querySelector('.movie__details');
let currentMovies = [];

// добавлена проверка иф
if (searchInput) {
  searchInput.addEventListener('input', function(event) {
    const searchQuery = searchInput.value.trim();

    if (searchQuery !== '') {
      genreMoviesContainer.style.display = 'none';
      searchMovies(searchQuery);
    } else {
      genreMoviesContainer.style.display = 'block';
      clearMovieDetails();
    }
  });
}

/**
 * Выполняет поиск фильмов по заданному запросу.
 * @param {string} query - Поисковый запрос.
 * @returns {Promise<void>}
 */
export async function searchMovies(query) {
  try {
    /**
    * Функция encodeURIComponent() является встроенной функцией JavaScript, которая используется для кодирования строки в формат URL
    */
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY_TMDB}&language=ru&query=${encodeURIComponent(query)}`;
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      currentMovies = data.results;
      displayMovieResults(currentMovies);
    } else {
      throw new Error(data.status_message);
    }
  } catch (error) {
    console.error('Ошибка при выполнении поиска фильмов:', error);
  }
}

/**
 * Отображает результаты поиска фильмов.
 * @param {Array} movies - Массив фильмов для отображения.
 * @returns {void}
 */
//добавлена проверка иф
export function displayMovieResults(movies) {
  const movieDetailsContainer = document.querySelector('.movie__details');// добавлена выборка
  if (movieDetailsContainer) {
    movieDetailsContainer.innerHTML = '';


  for (const movie of movies) {
    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movie__card');

    const posterElement = document.createElement('img');
    posterElement.classList.add('search__img')
    posterElement.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    posterElement.alt = movie.title;
    movieContainer.appendChild(posterElement);

    movieContainer.addEventListener('click', function() {
      // const movieId = movie.id;
      // window.location.href = `movie.html?id=${movieId}`;

      // window.open(`movie.html?id=${movie.id}`, '_blank');
      window.location.href = `movie.html?id=${movie.id}&title=${encodeURIComponent(movie.title)}`;
    });

    movieDetailsContainer.appendChild(movieContainer);
  }
}
}
/**
 * Очищает контейнер с деталями фильма.
 * @returns {void}
 */
export function clearMovieDetails() {
  currentMovies = [];
  const movieDetailsContainer = document.querySelector('.movie__details');// добавлена выборка
  if (movieDetailsContainer) { // добавлена проверка иф
  movieDetailsContainer.innerHTML = '';
}
}