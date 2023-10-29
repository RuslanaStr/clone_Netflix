// ! Добавление видеоплеера на страницу с фильмом

// Получаем значение параметра "title" из URL
const urlParam = new URLSearchParams(window.location.search);
const encodedTitle = urlParam.get('title');
const decodedTitle = decodeURIComponent(encodedTitle);

// Создаем элемент <div> и устанавливаем атрибут "data-title" с декодированным названием фильма
const divElement = document.createElement('div');
divElement.setAttribute('id', 'kinoplayertop');
divElement.setAttribute('data-title', decodedTitle);

// Добавляем созданный элемент в нужное место в DOM-дереве
const containerElement = document.getElementById('section-additional-videos');
containerElement.append(divElement);

// ! Добавление видеоплеера на страницу с фильмом