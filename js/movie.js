'use strict';


import { API_KEY_TMDB, IMAGE_BASE_URL } from "./api.js";

async function getMovieDetails(movieId, language) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY_TMDB}&language=${language}`;
  const response = await fetch(url);
  const data = await response.json();

  if (response.ok) {
    const movie = {
      title: data.title,
      poster: data.backdrop_path,
      favoritePoster: data.poster_path,
      releaseDate: data.release_date,
      duration: data.runtime,
      rating: data.vote_average,
      overview: data.overview,
      original: data.original_title,
      budget: data.budget,
      genres: data.genres,
      country: data.production_countries,
      tagline: data.tagline,
      trailerIds: [], // Здесь должны быть идентификаторы трейлеров
    };
    return movie;
  } else {
    throw new Error(data.status_message);
  }
}

async function getMovieTrailers(movieId, language) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY_TMDB}&language=${language}`;
  const response = await fetch(url);
  const data = await response.json();

  if (response.ok) {
    const trailers = data.results.map(trailer => trailer.key);
    return trailers;
  } else {
    throw new Error(data.status_message);
  }
}

const arraySame = [];

async function displayMovieDetails(movieId, language) {
  try {
    const movie = await getMovieDetails(movieId, language);
    const trailerIds = await getMovieTrailers(movieId, language);

    // Отображение информации о фильме
    const movieTitleElement = document.getElementById('movie__title');
    const trailerName = document.getElementById("trailerName");
    const trailerNameBottom = document.getElementById("trailerNameBottom");
    const originalName = document.getElementById("original_name");
    const moviePoster = document.getElementById('poster__id');
    const releaseDateElement = document.getElementById('release__date');
    const durationElement = document.getElementById('duration');
    const ratingElement = document.getElementById('rating');
    const overviewElement = document.getElementById('overview');
    const genres = document.getElementById('genres');
    const budget = document.getElementById('budget');
    const genresList = document.getElementById('genresList');
    const country = document.getElementById('country');



    // слоган
  const slogan = document.getElementsByClassName('hook-text')[0];

  slogan.innerHTML = movie.tagline;
  if (movie.tagline === "") {
    slogan.innerHTML = movie.title;
  }

   //проходимся по всем жанрам для раздела Подробная информация
  for(let i = 0; i < movie.genres.length; i++) {
    if(i < (movie.genres.length - 1)){
    genresList.innerHTML += movie.genres[i].name + ", ";
    arraySame.push(movie.genres[i].id)
  }else {
    genresList.innerHTML += movie.genres[i].name;
    arraySame.push(movie.genres[i].id)
  }
  }

  const linkContainer = document.querySelector('.link-container');

  async function fetchMoviesData() {
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY_TMDB}&with_genres=${arraySame}&language=ru`;
  const response = await fetch(url);
  const data = await response.json();

  if (response.ok) {
    const moviesData = data.results.map(movie => {
      return {
        poster: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
        url: `movie.html?id=${movie.id}&title=${encodeURIComponent(movie.title)}`
      };
    });

    for (let i = 0; i < 12; i++) {
      const movie = moviesData[i];
      const link = document.createElement('a');
      link.classList.add('title-link');
      link.setAttribute('data-uia', 'title-link');
      link.setAttribute('href', movie.url); // свойство url
    
      const image = document.createElement('img');
      image.classList.add('title-link-img');
      image.classList.add(`poster${i}`);
      image.setAttribute('data-uia', 'title-link-img');
      image.setAttribute('loading', 'lazy');
      image.setAttribute('src', movie.poster); // свойство poster (URL постера)
    
      // Добавляем изображение внутрь ссылки
      link.appendChild(image);
    
      // Добавляем ссылку в контейнер
      linkContainer.appendChild(link);

    }
  } else {
    throw new Error(data.status_message);
  }
}

fetchMoviesData();

  
    //проходимся по всем жанрам для раздела Подробная информация
    for(let i = 0; i < movie.genres.length; i++) {
      if(i < (movie.genres.length - 1)){
      genresList.innerHTML += movie.genres[i].name + ", ";
    }else {
      genresList.innerHTML += movie.genres[i].name;
    }
    }
    //проходимся по всем странам для раздела Подробная информация
    for (let i = 0; i < movie.country.length; i ++) {
      if (i < (movie.country.length - 1)){
      country.innerHTML += movie.country[i].name + ", "
      }else {
        country.innerHTML += movie.country[i].name
      }
    }
console.log(movie)
    movieTitleElement.innerHTML = movie.title;
    trailerName.innerHTML = movie.title;
    trailerNameBottom.innerHTML = movie.title;
    originalName.innerHTML = movie.original;
    genres.innerHTML = movie.genres[0].name;
    moviePoster.style.backgroundImage = `url(${IMAGE_BASE_URL}w1280${movie.poster})`;
    //для получения постера в моем списке
    moviePoster.setAttribute("name", `${IMAGE_BASE_URL}w1280${movie.favoritePoster}`);
    moviePoster.style.backgroundPosition = "top";
    moviePoster.style.backgroundSize = "cover";

    budget.innerHTML = movie.budget;
    releaseDateElement.innerHTML = `${movie.releaseDate}`;
    durationElement.innerHTML = `${movie.duration} мин`;
    ratingElement.innerHTML = `${(movie.rating).toFixed(1)}`;
    overviewElement.innerHTML = movie.overview;
    

    // Отображение трейлеров
    const trailerContainer = document.getElementById('posterTrailer');
    // trailerContainer.style.backgroundImage = `url(${IMAGE_BASE_URL}w1280${movie.poster})`;

    if (trailerIds.length === 0) {
      // Отображение заглушки для отсутствующего трейлера
      const noTrailerMessage = document.createElement('div');
      noTrailerMessage.classList.add('no__trailers');
      noTrailerMessage.style.height = "100%";
      noTrailerMessage.style.width = "100%";
      noTrailerMessage.innerHTML = `
        <img class="no__img-trailers" src="../img/video-bg-icon.png">
      `
      // noTrailerMessage.textContent = 'Трейлер отсутствует';
      trailerContainer.appendChild(noTrailerMessage);
    } else {
      // Отображение трейлеров
      trailerContainer.style.backgroundImage = `url(${IMAGE_BASE_URL}w1280${movie.poster})`;
    }

// Сердце остается красным если фильм уже добавлен в мой список
    // Проверка, сохранен ли фильм в localStorage
  const savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];
  const isSaved = savedMovies.some(savedMovie => savedMovie.id === movieId);

  // Изменение стиля кнопки сердца
  const favoriteButton = document.getElementById('favorite__button');
  if (isSaved) {
    favoriteButton.classList.add('active');
  } else {
    favoriteButton.classList.remove('active');
  }
// Сердце остается красным если фильм уже добавлен в мой список

  } catch (error) {
    console.error('Ошибка при получении информации о фильме:', error);
  }
}



const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id', 'title');

displayMovieDetails(movieId, 'ru');


// Добавление постеров в раздел Похожее

// id жанров фильмов из API
const genreIds = [28, 12, 35, 18, 14, 16, 10751];


 // Ожидаем загрузки контента
window.addEventListener('load', () => {
  // Скрываем прелоадер
  const preloader = document.querySelector('.preloader');
  preloader.style.display = 'none';

  // Отображаем контент
  const content = document.querySelector('.main');
  content.style.display = 'block';
});
