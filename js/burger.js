'use strict';

document.addEventListener('DOMContentLoaded', () => {
	document.getElementById('burger').addEventListener('click', () => {
		document.querySelector('.header').classList.toggle('open');
	});
});