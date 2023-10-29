'use strict';

import { URL_MOVIE, IMAGE_BASE_URL, ID__FILM } from './api.js';

// Этот экспорт нужен чтобы получить название фильма в URL при клике на кнопку 'посмотреть'
import { getMovieDetails } from './banner.js';

const modalEl = document.querySelector('.modal');

async function openModal() {
  const movieResp = await fetch(URL_MOVIE);
  const movieData = await movieResp.json();

  modalEl.classList.add('modal--show');
  document.body.classList.add('stop-scrolling');

  modalEl.innerHTML = `
    <div class="modal__card">
      <img class="modal__movie-backdrop" src="${IMAGE_BASE_URL}w500${movieData.poster_path}" alt="Poster">
      <div class="modal__desc">
        <div class="modal__title">
          <div class="modal__movie-title"><span class="modal__span">Название -</span> ${movieData.title}</div>
          <div class="modal__movie-release-year"><span class="modal__span">Дата релиза -</span> ${movieData.release_date}</div>
        </div>
        <ul class="modal__movie-info">
          ${movieData.runtime ? `<li class="modal__movie-runtime"><span class="modal__span">Время -</span> ${movieData.runtime} минут</li>` : ''}
          <li class="modal__movie-average"><span class="modal__span">Рейтинг фильма -</span> ${(movieData.vote_average).toFixed(1)}</li>
          <li class="modal__movie-overview"><span class="modal__span">Описание -</span> ${movieData.overview}</li>
        </ul>
      </div>
      <button type="button" class="modal__button-close">Закрыть</button>
    </div>
  `;
  const btnClose = document.querySelector(".modal__button-close");
  btnClose.addEventListener("click", () => closeModal());
};



export function showModal() {
  const btnDetails = document.querySelector('.banner__button-desc');
  if (btnDetails){  // иф
  btnDetails.addEventListener('click', openModal);
}
}
showModal();


/**
 * Обработчик клика на кнопку воспроизведения.
 * Получает данные о фильме, формирует URL с параметрами и открывает новое окно.
 */
async function showTrailerOnClick() {
  const playButton = document.querySelector('.banner__button-play');
  const movieId = `${ID__FILM}`;
  if (playButton) {// иф
  playButton.addEventListener('click', async () => {
    try {
      // Получение данных о фильме
      const movieDetails = await getMovieDetails(movieId);
      const movieTitle = movieDetails.title;

      // Формирование URL с параметрами id и title
      const url = new URL('./movie.html', window.location.href);
      url.searchParams.set('id', movieId);
      url.searchParams.set('title', movieTitle);

      // Открытие нового окна с URL
      // window.open(url.toString(), '_blank');
      window.location.href = url.toString();
    } catch (error) {
      console.error('Ошибка при получении данных о фильме:', error);
    }
  });
}
}

showTrailerOnClick();


// Закрыть модалку по клику на кнопку
export function closeModal() {
  modalEl.classList.remove('modal--show');
  document.body.classList.remove('stop-scrolling');
}

// Закрыть модалку по клику в любом месте
window.addEventListener('click', (e) => {
  if (e.target === modalEl) {
    closeModal();
  }
});

// Закрыть модалку через Esc
window.addEventListener('keydown', (e) => {
  if (e.keyCode === 27) {
    closeModal();
  }
});
