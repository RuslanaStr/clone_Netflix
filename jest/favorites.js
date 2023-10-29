"use strict";
// Функция для удаления фильма из localStorage
export function removeMovie(movieId) {
    // Получаем сохраненные фильмы из localStorage
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];
    // Фильтруем фильмы и оставляем только те, у которых id не совпадает с переданным movieId
    const updatedMovies = savedMovies.filter(movie => movie.id !== movieId);
    // Сохраняем обновленный массив в localStorage
    localStorage.setItem('savedMovies', JSON.stringify(updatedMovies));
    // Обновляем отображение сохраненных фильмов
    displaySavedMovies();
}
// Функция для отображения сохраненных фильмов на странице
export function displaySavedMovies() {
    // Получаем сохраненные фильмы из localStorage
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];
    // Контейнер, в котором будут показаны фильмы
    const savedMoviesContainer = document.getElementById('saved__movies-container');
    // Очищаем контейнер перед показом фильмов
    if(savedMoviesContainer){ //if

    savedMoviesContainer.innerHTML = '';
    }
    // Проходимся по каждому сохраненному фильму
    savedMovies.forEach(movie => {
        // Создаем элементы для отображения фильма
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        const posterElement = document.createElement('div');
        posterElement.classList.add('movie__poster');
        posterElement.innerHTML = `
      <img src="${movie.posterUrl}" alt="Movie Poster" class="favorite">`;
        // Переходим на страницу фильма при клике
        posterElement.onclick = () => {
            // window.open(`movie.html?id=${movie.id}&title=${encodeURIComponent(movie.title)}`, '_blank');
            window.location.href = `movie.html?id=${movie.id}&title=${encodeURIComponent(movie.title)}`;
        };
        // Создаем кнопку для удаления фильма
        const removeButton = document.createElement('button');
        removeButton.classList.add('remove__button');
        removeButton.textContent = 'Удалить';
        removeButton.addEventListener('click', () => {
            removeMovie(movie.id);
        });
        // Добавляем элементы фильма в контейнер
        // movieElement.appendChild(titleElement);
        movieElement.appendChild(posterElement);
        movieElement.appendChild(removeButton);
        if(movieElement && savedMoviesContainer){
        savedMoviesContainer.appendChild(movieElement);
    }
    });
}
// Вызываем функцию отображения сохраненных фильмов при загрузке страницы
window.addEventListener('DOMContentLoaded', displaySavedMovies);
