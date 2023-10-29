"use strict";
// Функция для сохранения фильма в localStorage
function saveMovie(movie) {
    // Получаем сохраненные фильмы из localStorage или создаем пустой массив
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];
    // Проверяем, не сохранен ли фильм уже
    const isSaved = savedMovies.some((savedMovie) => savedMovie.id === movie.id);
    if (!isSaved) {
        // Добавляем фильм в массив сохраненных фильмов
        savedMovies.push(movie);
        // Сохраняем обновленный массив в localStorage
        localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
        // Изменяем стиль кнопки сердца
        const favoriteButton = document.getElementById('favorite__button');
        if (favoriteButton) {
            favoriteButton.classList.add('active');
        }
    }
    else {
        // Удаляем фильм из массива сохраненных фильмов
        const updatedMovies = savedMovies.filter((savedMovie) => savedMovie.id !== movie.id);
        localStorage.setItem('savedMovies', JSON.stringify(updatedMovies));
        // Изменяем стиль кнопки сердца
        const favoriteButton = document.getElementById('favorite__button');
        if (favoriteButton) {
            favoriteButton.classList.remove('active');
        }
    }
}
// Обработчик события клика на значок сердца
const favoriteButton = document.getElementById('favorite__button');
if (favoriteButton) {
    favoriteButton.addEventListener('click', () => {
        // Получаем информацию о фильме
        const movieTitleElement = document.getElementById('movie__title');
        const moviePoster = document.getElementById('poster__id');
        if (movieTitleElement && moviePoster) {
            const movie = {
                id: movieId || '',
                title: movieTitleElement.textContent || '',
                posterUrl: moviePoster.getAttribute('name') || '',
            };
            // Сохраняем или удаляем фильм
            saveMovie(movie);
        }
    });
}
// Получаем идентификатор фильма из параметров URL
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id') || '';
