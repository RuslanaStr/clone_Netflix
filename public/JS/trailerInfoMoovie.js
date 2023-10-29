var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { API_KEY_TMDB } from './api';
// Функция для получения трейлеров и открытия трейлера, соответствующего выбранному фильму
function loadAndOpenTrailer(movieId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const movieTrailersResp = yield fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY_TMDB}&language=uk`);
            const movieTrailersData = yield movieTrailersResp.json();
            const trailers = movieTrailersData.results.filter((video) => video.type === 'Trailer');
            if (trailers.length > 0) {
                const trailerKey = trailers[0].key; // Первый трейлер
                const url = `trailers.html?key=${trailerKey}`;
                // window.open(url, '_blank');
                window.location.href = url;
            }
        }
        catch (error) {
            console.error('Ошибка при получении трейлеров:', error);
        }
    });
}
// Функция для обработки клика на кнопку воспроизведения трейлера
function openTrailerInInfoAboutMovie(movieId) {
    const playTrailer = document.getElementById('additional-video-trailer');
    playTrailer === null || playTrailer === void 0 ? void 0 : playTrailer.addEventListener('click', () => {
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
    trailerContainer === null || trailerContainer === void 0 ? void 0 : trailerContainer.append(iframe);
}
else {
    playTrailerClick(movieId);
}
// Функция для обработки клика на кнопку
function playTrailerClick(movieId) {
    const playTrailer = document.getElementById('additional-video-trailer');
    playTrailer === null || playTrailer === void 0 ? void 0 : playTrailer.addEventListener('click', () => loadAndOpenTrailer(movieId));
}
