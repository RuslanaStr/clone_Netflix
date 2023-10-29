'use strict';

import { API_KEY_TMDB } from './api.js';

async function getGenre(genreId) {
  const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY_TMDB}&language=ru`;
  const response = await fetch(url);
  const data = await response.json();

  if (response.ok) {
    const genre = data.genres.find(genre => genre.id === genreId);
    return genre;
  } else {
    throw new Error(data.status_message);
  }
}

async function getMoviesByGenre(genreId) {
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY_TMDB}&with_genres=${genreId}&language=ru`;
  const response = await fetch(url);
  const data = await response.json();

  if (response.ok) {
    return data.results;
  } else {
    throw new Error(data.status_message);
  }
}

async function getPopularMovies() {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY_TMDB}&language=ru`;
  const response = await fetch(url);
  const data = await response.json();

  if (response.ok) {
    return data.results;
  } else {
    throw new Error(data.status_message);
  }
}

function showMoviesByGenre(genre) {
    const genreSections = document.querySelectorAll('.genre__section');

    genreSections.forEach(section => {
      if (section.classList.contains('genre__title')) {
        const moviesSection = section.nextElementSibling;
        const shouldDisplay = section.textContent === genre || genre === 'all';
        section.style.display = shouldDisplay ? 'block' : 'none';
        moviesSection.style.display = shouldDisplay ? 'block' : 'none';
      } else {
        const genreTitle = section.previousElementSibling;
        genreTitle.style.display = section.classList.contains(genre) || genre === 'all' ? 'block' : 'none';
        section.style.display = section.classList.contains(genre) || genre === 'all' ? 'block' : 'none';
      }
    });
}
  
async function showMoviesByGenres(genreIds) {
  const movieElement = document.querySelector('.genre__container');
  const genreContainer = document.createElement('div');
  genreContainer.classList.add('genres__movies');

  const popularMoviesElement = document.createElement('div');
  popularMoviesElement.classList.add('genre__section', 'popular', 'slider__section');
  const popularMoviesTitle = document.createElement('h2');
  popularMoviesTitle.classList.add('genre__title');
  popularMoviesTitle.textContent = 'Популярные фильмы';
  genreContainer.appendChild(popularMoviesTitle);

  const popularMovies = await getPopularMovies();
  for (const movie of popularMovies) {
    const movieElement = createMovieElement(movie);
    popularMoviesElement.appendChild(movieElement);
  }

  genreContainer.appendChild(popularMoviesElement);

  for (const genreId of genreIds) {
    const genreElement = document.createElement('div');
    const genre = await getGenre(genreId);

    genreElement.classList.add('genre__section', genre.id, 'slider__section');

    const genreTitle = document.createElement('h2');
    genreTitle.classList.add('genre__title');
    genreTitle.textContent = genre.name;

    genreContainer.appendChild(genreTitle);

    const movies = await getMoviesByGenre(genreId);
    for (const movie of movies) {
      const movieElement = createMovieElement(movie);
      genreElement.appendChild(movieElement);
    }

    genreContainer.appendChild(genreElement);
  }

  movieElement.innerHTML = '';
  movieElement.appendChild(genreContainer);

  const sliderElements = document.querySelectorAll('.slider__section');
  for (const sliderElement of sliderElements) {
    $(sliderElement).slick({
      slidesToShow: 6,
      slidesToScroll: 6,
      autoplay: false,
      autoplaySpeed: 3000,
      prevArrow: '<button type="button" class="slick-prev">Previous</button>',
      nextArrow: '<button type="button" class="slick-next">Next</button>',
      responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        }
    ]
    });
  }
}

function createMovieElement(movie) {
  const sliderFilm = document.createElement('div');
  sliderFilm.classList.add('slider__film');

  const linkElement = document.createElement('a');
  // linkElement.setAttribute('target', '_blank');
  linkElement.classList.add('slider__poster-genre');

  const imageElement = document.createElement('img');
  imageElement.classList.add('slider__poster');
  imageElement.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

  linkElement.appendChild(imageElement);
  sliderFilm.appendChild(linkElement);

  linkElement.addEventListener('click', () => {
    window.location.href = `movie.html?id=${movie.id}&title=${encodeURIComponent(movie.title)}`;
  });

  return sliderFilm;
}

document.addEventListener('DOMContentLoaded', () => {
  const selectGenre = document.getElementById('films__genre');
  selectGenre.addEventListener('change', function() {
    const selectedGenre = this.value;
    showMoviesByGenre(selectedGenre);
  });
    
  showMoviesByGenre('all');
});
  
const genreIds = [28, 12, 35, 18, 14];
showMoviesByGenres(genreIds)
  .catch(error => console.error(error));