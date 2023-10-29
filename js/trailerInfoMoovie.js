"use strict";

import { API_KEY_TMDB } from './api.js';

// Функция для получения трейлеров и открытия трейлера, соответствующего выбранному фильму
async function loadAndOpenTrailer(movieId) {
  try {
    const movieTrailersResp = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY_TMDB}&language=uk`);
    const movieTrailersData = await movieTrailersResp.json();

    const trailers = movieTrailersData.results.filter(video => video.type === 'Trailer');
      
    if (trailers.length > 0) {
      const trailerKey = trailers[0].key; // Первый трейлер
      const url = `trailers.html?key=${trailerKey}`;
      // window.open(url, '_blank');
      window.location.href = url;
    }
  } catch (error) {
    console.error('Ошибка при получении трейлеров:', error);
  }
}

// Функция для обработки клика на кнопку воспроизведения трейлера
function openTrailerInInfoAboutMovie(movieId) {
  const playTrailer = document.getElementById('additional-video-trailer');
  playTrailer.addEventListener('click', () => {
    loadAndOpenTrailer(movieId);
  });
}

// Получение идентификатора фильма из параметров URL
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

// Обработка клика на кнопку воспроизведения трейлера
openTrailerInInfoAboutMovie(movieId);

function getUrlParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

const trailerKeyParam = getUrlParameter('key');

if (trailerKeyParam) {
  const trailerContainer = document.getElementById('trailer__container');
  const iframe = document.createElement('iframe');
  iframe.setAttribute('src', `https://www.youtube.com/embed/${trailerKeyParam}`);
  iframe.setAttribute('frameborder', '0');
  iframe.setAttribute('allowfullscreen', '1');
  trailerContainer.append(iframe);
} else {
  playTrailerClick(movieId);
}

// Функция для обработки клика на кнопку
function playTrailerClick(movieId) {
  const playTrailer = document.getElementById('additional-video-trailer');
  playTrailer.addEventListener('click', () => loadAndOpenTrailer(movieId));
}


