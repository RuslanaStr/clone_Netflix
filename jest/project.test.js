/**
 * @jest-environment jsdom
 */

require = require('esm')(module);
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { JSDOM } from 'jsdom';
import { TextEncoder } from 'fast-text-encoding';
import fetch from 'jest-fetch-mock';

const dom = new JSDOM('<!doctype html><html><body></body></html>', {
  url: 'http://localhost',
  encoding: 'utf-8',
});
global.TextEncoder = TextEncoder;
global.fetch = fetch;


import { API_KEY_KINOPOISK, IMAGE_BANNER, API_URL_MOVIE_DETAILS, MOVIE_ID, API_KEY_TMDB } from './api.js';
import { showMovieBanner } from './banner.js';
import { handleScroll } from './header-film.js';
import { getGenre, getMoviesByGenre, getPopularMovies, showMoviesByGenre, showMoviesByGenres, createMovieElement } from './genre-list-try.js';
import { saveMovie } from './like.js';
import { removeMovie, displaySavedMovies } from './favorites.js';



jest.mock('./banner.js', () => {
  return {
    ...jest.requireActual('./banner.js'),
      getMovieDetails: jest.fn().mockResolvedValue({
      backdrop_path: '/path/to/image.jpg',
      title: 'Movie Title',
    }),
  };
});

describe('Banner Module', () => {
  test('API Key should be correct', () => {
    expect(API_KEY_KINOPOISK).toBe('4d50104c-a87b-4ffd-883e-e4511dea4c8b');
  });

  test('Banner image URL should be correct', () => {
    expect(IMAGE_BANNER).toBe('https://kinopoiskapiunofficial.tech/api/v2.2/films/1044280/images?type=POSTER');
  });

  test('API URL for movie details should be correct', () => {
    expect(API_URL_MOVIE_DETAILS).toBe('https://kinopoiskapiunofficial.tech/api/v2.2/films/');
  });

  test('Movie ID should be correct', () => {
    expect(MOVIE_ID).toBe(1044280);
  });
});

describe('ShowMovieBanner', () => {
    beforeEach(() => {
      document.body.innerHTML = `
        <div class="banner"></div>
        <h1 class="banner__title"></h1>
      `;
    });
  
    test('should display banner and movie title', async () => {
      const mockMovieDetails = {
        backdrop_path: '/path/to/image.jpg',
        title: 'Movie Title',
      };
  
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockMovieDetails)
      });
  
      await showMovieBanner('123');
  
      const bannerImageElement = document.querySelector('.banner');
      const bannerTitleElement = document.querySelector('.banner__title');
  
      expect(bannerImageElement.innerHTML).toContain(`<img src="https://image.tmdb.org/t/p/w1280${mockMovieDetails.backdrop_path}" alt="" class="banner__img">`);
      expect(bannerTitleElement.textContent).toBe(mockMovieDetails.title);
    });
});


describe('Header Film Module', () => {
  let originalScrollY;
  let header;

  beforeEach(() => {
    originalScrollY = window.scrollY;
    document.body.innerHTML = '<div class="header"></div>';
    header = document.querySelector('.header');
    handleScroll();
  });

  afterEach(() => {
    window.scrollTo(0, originalScrollY);
  });

  test('should remove header__black class when scrolling below 100 pixels', () => {
    window.scrollTo(0, 50);
    window.dispatchEvent(new Event('scroll'));
    expect(header.classList.contains('header__black')).toBe(false);
  });
});

describe('getGenre', () => {
  test('should return genre by genreId', async () => {
    const genreId = 28;
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({
        genres: [
          { id: 28, name: 'Action' },
          { id: 12, name: 'Adventure' },
        ],
      }),
    };
    global.fetch = jest.fn().mockResolvedValue(mockResponse);

    const genre = await getGenre(genreId);
    expect(genre).toEqual({ id: 28, name: 'Action' });
    expect(global.fetch).toHaveBeenCalledWith(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY_TMDB}&language=ru`
    );
  });

  test('should throw an error if response is not OK', async () => {
    const genreId = 99;
    const mockResponse = {
      ok: false,
      json: jest.fn().mockResolvedValue({ status_message: 'Invalid genreId' }),
    };
    global.fetch = jest.fn().mockResolvedValue(mockResponse);

    await expect(getGenre(genreId)).rejects.toThrow('Invalid genreId');
    expect(global.fetch).toHaveBeenCalledWith(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY_TMDB}&language=ru`
    );
  });
});

describe('getMoviesByGenre', () => {
  test('should return movies by genreId', async () => {
    const genreId = 28;
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({
        results: [
          { id: 1, title: 'Movie 1' },
          { id: 2, title: 'Movie 2' },
        ],
      }),
    };
    global.fetch = jest.fn().mockResolvedValue(mockResponse);

    const movies = await getMoviesByGenre(genreId);
    expect(movies).toEqual([
      { id: 1, title: 'Movie 1' },
      { id: 2, title: 'Movie 2' },
    ]);
    expect(global.fetch).toHaveBeenCalledWith(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY_TMDB}&with_genres=${genreId}&language=ru`
    );
});

  test('should throw an error if response is not OK', async () => {
    const genreId = 99;
    const mockResponse = {
      ok: false,
      json: jest.fn().mockResolvedValue({ status_message: 'Invalid genreId' }),
    };
    global.fetch = jest.fn().mockResolvedValue(mockResponse);

    await expect(getMoviesByGenre(genreId)).rejects.toThrow('Invalid genreId');
    expect(global.fetch).toHaveBeenCalledWith(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY_TMDB}&with_genres=${genreId}&language=ru`
    );
  });
});

describe('getPopularMovies', () => {
  test('should return popular movies', async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({
        results: [
          { id: 1, title: 'Movie 1' },
          { id: 2, title: 'Movie 2' },
        ],
      }),
    };
    global.fetch = jest.fn().mockResolvedValue(mockResponse);

    const movies = await getPopularMovies();
    expect(movies).toEqual([
      { id: 1, title: 'Movie 1' },
      { id: 2, title: 'Movie 2' },
    ]);
    expect(global.fetch).toHaveBeenCalledWith(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY_TMDB}&language=ru`
    );
  });

  test('should throw an error if response is not OK', async () => {
    const mockResponse = {
      ok: false,
      json: jest.fn().mockResolvedValue({ status_message: 'Error' }),
    };
    global.fetch = jest.fn().mockResolvedValue(mockResponse);

    await expect(getPopularMovies()).rejects.toThrow('Error');
    expect(global.fetch).toHaveBeenCalledWith(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY_TMDB}&language=ru`
    );
  });
});

describe('showMoviesByGenres', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="genre__section genre__title" style="display: none;">
        Action
      </div>
      <div class="genre__section genre__movies" style="display: none;">
        <div class="movie movie-1">
          Movie 1
        </div>
        <div class="movie movie-2">
          Movie 2
        </div>
      </div>
    `;
  });


   test('should handle error', async () => {
    global.fetch = jest.fn().mockRejectedValueOnce(new Error('API error'));

    await expect(showMoviesByGenres([1])).rejects.toThrow('API error');

    const genreContainer = document.querySelector('.genre__container');
    if(genreContainer){
    expect(genreContainer.innerHTML).toBe('');
    }
  });
});


describe('createMovieElement', () => {
  test('should create movie element', () => {
    const movie = { id: 1, title: 'Movie 1', poster_path: 'poster1.jpg' };
    const movieElement = createMovieElement(movie);

    expect(movieElement).toMatchSnapshot();
  });
});

describe('showMoviesByGenre', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="genre__section genre__title" style="display: none;">
        Action
      </div>
      <div class="genre__section genre__movies" style="display: none;">
        <div class="movie movie-1">
          Movie 1
        </div>
        <div class="movie movie-2">
          Movie 2
        </div>
      </div>
    `;
  });


  test('should hide movies for non-matching genre', () => {
    const genre = 'Drama';
    showMoviesByGenre(genre);

    const genreTitle = document.querySelector('.genre__title');
    const genreMovies = document.querySelector('.genre__movies');
    expect(genreTitle.style.display).toBe('none');
    expect(genreMovies.style.display).toBe('none');
  });

  test('should show movies for "all" genre', () => {
    const genre = 'all';
    showMoviesByGenre(genre);

    const genreTitle = document.querySelector('.genre__title');
    const genreMovies = document.querySelector('.genre__movies');
    expect(genreTitle.style.display).toBe('block');
    expect(genreMovies.style.display).toBe('block');
  });
});


const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => {
      return store[key];
    },
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('saveMovie', () => {
  beforeEach(() => {
    localStorage.clear(); 
  });

  test('should save a movie', () => {
    const movie = {
      id: '1',
      title: 'Test Movie',
      posterUrl: 'testposter.jpg'
    };
  
    const favoriteButton = document.createElement('button');
    favoriteButton.id = 'favorite__button';
    favoriteButton.classList.add('active');
  
    document.body.appendChild(favoriteButton);
  
    saveMovie(movie, favoriteButton);
  
    expect(localStorage.getItem('savedMovies')).toBeDefined();
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    expect(savedMovies).toContainEqual(movie);
  
    expect(favoriteButton.classList.contains('active')).toBe(true);
  });
  
  test('should remove a movie', () => {
    const movie = {
      id: '1',
      title: 'Test Movie',
      posterUrl: 'testposter.jpg'
    };

   saveMovie(movie);

    saveMovie(movie);

    expect(localStorage.getItem('savedMovies')).toBeDefined();
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    expect(savedMovies).toHaveLength(0);

    const favoriteButton = document.createElement('button');
    favoriteButton.id = 'favorite__button';
    saveMovie(movie);
    expect(favoriteButton.classList.contains('active')).toBe(false);
  });
});

describe('removeMovie', () => {
  beforeEach(() => {
    localStorage.clear(); 
  });

  test('should remove a movie from localStorage', () => {
    const savedMovies = [
      { id: '1', title: 'Movie 1', posterUrl: 'poster1.jpg' },
      { id: '2', title: 'Movie 2', posterUrl: 'poster2.jpg' },
      { id: '3', title: 'Movie 3', posterUrl: 'poster3.jpg' }
    ];
    localStorage.setItem('savedMovies', JSON.stringify(savedMovies));

    removeMovie('2');

    const updatedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    expect(updatedMovies).toHaveLength(2);
    expect(updatedMovies).toEqual([
      { id: '1', title: 'Movie 1', posterUrl: 'poster1.jpg' },
      { id: '3', title: 'Movie 3', posterUrl: 'poster3.jpg' }
    ]);
  });
});

describe('displaySavedMovies', () => {
  test('should display saved movies on the page', () => {
    const savedMovies = [
      { id: '1', title: 'Movie 1', posterUrl: 'poster1.jpg' },
      { id: '2', title: 'Movie 2', posterUrl: 'poster2.jpg' }
    ];
    localStorage.setItem('savedMovies', JSON.stringify(savedMovies));

    document.body.innerHTML = `
      <div id="saved__movies-container"></div>
    `;

    displaySavedMovies();

    const savedMoviesContainer = document.getElementById('saved__movies-container');
    if(savedMoviesContainer){
    expect(savedMoviesContainer.children).toHaveLength(2);
    expect(savedMoviesContainer.children[0].querySelector('.movie__poster img').getAttribute('src')).toBe('poster1.jpg');
    expect(savedMoviesContainer.children[1].querySelector('.movie__poster img').getAttribute('src')).toBe('poster2.jpg');
  }
  });
});














