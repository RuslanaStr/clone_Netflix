'use strict';


// SWAGGER API
const API_KEY_KINOPOISK = '4d50104c-a87b-4ffd-883e-e4511dea4c8b';

// Картинка для баннера
const IMAGE_BANNER = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/1044280/images?type=POSTER';

// Использовал для вытаскивания названия фильма по id для баннера
const API_URL_MOVIE_DETAILS = "https://kinopoiskapiunofficial.tech/api/v2.2/films/";
const MOVIE_ID = 1044280;


export { API_KEY_KINOPOISK, IMAGE_BANNER, API_URL_MOVIE_DETAILS, MOVIE_ID };
// banner.js

// ===========================================================================================

// TMBD API
// genre-list.js, search.js, modal.js, movie.js
const API_KEY_TMDB = '1b573b3ec7c63fed45643a781f334f2e';
const ID__FILM = 447365;
const URL_MOVIE = `https://api.themoviedb.org/3/movie/${ID__FILM}?api_key=${API_KEY_TMDB}&language=ru`;
const URL_TRAILERS = `https://api.themoviedb.org/3/movie/${ID__FILM}/videos?api_key=${API_KEY_TMDB}&language=uk`;
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';

export { API_KEY_TMDB, URL_MOVIE, URL_TRAILERS, IMAGE_BASE_URL, ID__FILM };