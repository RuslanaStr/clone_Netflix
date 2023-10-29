'use strict';

import { API_KEY_TMDB } from "./api.js";


// Функция для отображения текущего комментария в слайдере
function showComment(index) {
  const commentsContainer = document.getElementById('commentsContainer');
  const commentElements = commentsContainer.getElementsByClassName('comment');
// Проходимся циклом по всем комментариям
  for (let i = 0; i < commentElements.length; i++) {
    commentElements[i].style.display = 'none';
  }

  if (index >= 0 && index < commentElements.length) {
    commentElements[index].style.display = 'block';
  }
}

// Получение комментариев и инициализация слайдера
async function loadMovieComments(movieId, language) {
  try {
    const comments = await getMovieComments(movieId, language);
    const commentsContainer = document.getElementById('commentsContainer');

    for (const comment of comments) {
      const commentElement = document.createElement('div');
      commentElement.classList.add('comment');
			// <p class="comment__author">${comment.author}</p>
      commentElement.innerHTML = `
        <p class="comment__content">${comment.content}</p>
      `;
      commentsContainer.appendChild(commentElement);
    }

    showComment(0); // Отображение первого комментария
  } catch (error) {
    console.error('Ошибка при получении комментариев:', error);
  }
}

// Управление слайдером комментариев
function commentSlider() {
  const prevCommentBtn = document.getElementById('prevCommentBtn');
  const nextCommentBtn = document.getElementById('nextCommentBtn');
  const commentElements = document.getElementsByClassName('comment');
  let currentIndex = 0;

  prevCommentBtn.addEventListener('click', () => {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = commentElements.length - 1;
    }
    showComment(currentIndex);
  });

  nextCommentBtn.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex >= commentElements.length) {
      currentIndex = 0;
    }
    showComment(currentIndex);
  });
}




// Получение комментариев к фильму с использованием API TMDb
async function getMovieComments(movieId, language) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${API_KEY_TMDB}&language=${language}`;
  const response = await fetch(url);
  const data = await response.json();

  if (response.ok) {
    return data.results;
  } else {
    throw new Error(data.status_message);
  }
}

// Получение идентификатора фильма из параметров URL
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

// Загрузка комментариев и инициализация слайдера при загрузке страницы фильма
loadMovieComments(movieId, 'en').then(() => {
  commentSlider();
});

