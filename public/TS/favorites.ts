// Интерфейс для объекта фильма
interface Movie {
  id: string;
  title: string;
  posterUrl: string;
}

// Функция для удаления фильма из localStorage
function removeMovie(movieId: string): void {
  // Получаем сохраненные фильмы из localStorage
  const savedMovies: Movie[] = JSON.parse(localStorage.getItem('savedMovies')!) || [];

  // Фильтруем фильмы и оставляем только те, у которых id не совпадает с переданным movieId
  const updatedMovies: Movie[] = savedMovies.filter(movie => movie.id !== movieId);

  // Сохраняем обновленный массив в localStorage
  localStorage.setItem('savedMovies', JSON.stringify(updatedMovies));

  // Обновляем отображение сохраненных фильмов
  displaySavedMovies();
}

// Функция для отображения сохраненных фильмов на странице
function displaySavedMovies(): void {
  // Получаем сохраненные фильмы из localStorage
  const savedMovies: Movie[] = JSON.parse(localStorage.getItem('savedMovies')!) || [];

  // Контейнер, в котором будут показаны фильмы
  const savedMoviesContainer = document.getElementById('saved__movies-container') as HTMLDivElement;

  // Очищаем контейнер перед показом фильмов
  savedMoviesContainer.innerHTML = '';

  // Проходимся по каждому сохраненному фильму
  savedMovies.forEach(movie => {
    // Создаем элементы для отображения фильма
    const movieElement = document.createElement('div') as HTMLDivElement;
    movieElement.classList.add('movie');

    const posterElement = document.createElement('div') as HTMLDivElement;
    posterElement.classList.add('movie__poster');
    posterElement.innerHTML = `
      <img src="${movie.posterUrl}" alt="Movie Poster" class="favorite">`;
    // Переходим на страницу фильма при клике
    posterElement.onclick = () => {
      // window.open(`movie.html?id=${movie.id}&title=${encodeURIComponent(movie.title)}`, '_blank');
      window.location.href = `movie.html?id=${movie.id}&title=${encodeURIComponent(movie.title)}`;
    };

    // Создаем кнопку для удаления фильма
    const removeButton = document.createElement('button') as HTMLButtonElement;
    removeButton.classList.add('remove__button');
    removeButton.textContent = 'Удалить';
    removeButton.addEventListener('click', () => {
      removeMovie(movie.id);
    });

    // Добавляем элементы фильма в контейнер
    // movieElement.appendChild(titleElement);
    movieElement.appendChild(posterElement);
    movieElement.appendChild(removeButton);
    savedMoviesContainer.appendChild(movieElement);
  });
}

// Вызываем функцию отображения сохраненных фильмов при загрузке страницы
window.addEventListener('DOMContentLoaded', displaySavedMovies);