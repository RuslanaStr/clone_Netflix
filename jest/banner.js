'use strict';

import { ID__FILM, URL_MOVIE } from './api.js';

const bannerImageElement = document.querySelector('.banner');
const bannerTitleElement = document.querySelector('.banner__title');
const movieId = `${ID__FILM}`;

/**
 * Выполняет GET-запрос к API TMDb для получения данных о фильме.
 * @returns {Promise<Object>} Объект с данными о фильме.
 */
export async function getMovieDetails() {
  const url = `${URL_MOVIE}`;
  const resp = await fetch(url);
  const respData = await resp.json();
  return respData;
}

/**
 * Отображает баннер и название фильма.
 * @param {string} movieId - Идентификатор фильма.
 * @returns {Promise<void>}
 */
export async function showMovieBanner(movieId) {
  const bannerImageElement = document.querySelector('.banner');//добавлена выборка
  const bannerTitleElement = document.querySelector('.banner__title');

  // Получаем данные о фильме
  const movieDetails = await getMovieDetails(movieId);

  // Проверяем, есть ли изображение баннера у фильма
  if (movieDetails.backdrop_path) {
    const imageUrl = `https://image.tmdb.org/t/p/w1280${movieDetails.backdrop_path}`;
    const bannerElement = document.createElement('div');
    bannerElement.innerHTML = `
      <img src="${imageUrl}" alt="" class="banner__img">
    `;
    if (bannerImageElement && bannerElement) {    //выборка
    bannerImageElement.prepend(bannerElement);
  
  }
}
  // Устанавливаем название фильма в элемент баннера
  if (bannerTitleElement) {    //выборка
  bannerTitleElement.textContent = movieDetails.title;
}
}
// Вызываем функцию showMovieBanner с переданным идентификатором фильма
showMovieBanner(movieId);


// // Функция для выполнения GET-запроса к API TMDb для получения данных о фильме
// async function getMovieDetails() {
//   const url = `${URL_MOVIE}`;
//   const resp = await fetch(url);
//   const respData = await resp.json();
//   return respData;
// }

// // Функция для отображения баннера и названия фильма
// export async function showMovieBanner(movieId) {
//   const movieDetails = await getMovieDetails(movieId);

//   if (movieDetails.backdrop_path) {
//     const imageUrl = `https://image.tmdb.org/t/p/w1280${movieDetails.backdrop_path}`;
//     const bannerElement = document.createElement('div');
//     bannerElement.innerHTML = `
//       <img src="${imageUrl}" alt="" class="banner__img">
//     `;
//     bannerImageElement.prepend(bannerElement);
//   }

//   bannerTitleElement.textContent = movieDetails.title;
// }

// showMovieBanner(movieId);

