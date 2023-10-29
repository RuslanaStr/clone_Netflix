"use strict";
window.onload = function () {
    function setupRegistrationFunctionality() {
        const emailStep2Input = document.getElementById('emailStep2');
        const startButton = document.getElementById('buttonStep2');
        const emailStep3Input = document.getElementById('emailStep3');
        const passwordInput = document.getElementById('passwordStep3');
        const buttonStep3 = document.getElementById('buttonStep3');
        const avatarImage = document.querySelector('.nav__avatar');
        const banner = document.getElementById('banner-for-reg');
        const footer = document.getElementById('footer-for-reg');
        const films = document.getElementById('films-for-reg');
        const registration = document.getElementById('registration');
        const buttonStep0 = document.querySelector('.form__btn');
        const menuLinks = document.querySelectorAll('.menu__link');
        let errorMessage = null;
        let errorDisplayed = false;
        if (buttonStep0) {
            buttonStep0.addEventListener('click', function (event) {
                event.preventDefault();
                if (emailStep2Input) {
                    emailStep2Input.focus();
                }
            });
        }
        if (startButton) {
            startButton.addEventListener('click', function (event) {
                event.preventDefault();
                if (emailStep2Input) {
                    const email = emailStep2Input.value;
                    if (isValidEmail(email)) {
                        const regDiv = document.getElementById('reg');
                        const regDiv1 = document.getElementById('reg1');
                        if (regDiv) {
                            regDiv.style.display = 'none';
                        }
                        if (regDiv1) {
                            regDiv1.style.display = 'flex';
                        }
                    }
                }
            });
        }
        if (buttonStep3) {
            buttonStep3.addEventListener('click', function (event) {
                event.preventDefault();
                if (emailStep3Input && passwordInput) {
                    const email = emailStep3Input.value;
                    const password = passwordInput.value;
                    if (isValidEmail(email) && isValidPassword(password)) {
                        sessionStorage.setItem('registrationCompleted', 'true');
                        if (avatarImage) {
                            avatarImage.src = 'img/netflix-avatar.png';
                        }
                        if (buttonStep0) {
                            buttonStep0.style.display = 'none';
                        }
                        if (registration) {
                            registration.style.display = 'none';
                        }
                        if (films) {
                            films.style.display = 'block';
                        }
                        if (banner) {
                            banner.style.display = 'block';
                        }
                        if (footer) {
                            footer.style.display = 'block';
                        }
                        const sliderElements = document.querySelectorAll('.slider__section');
                        for (const sliderElement of Array.from(sliderElements)) {
                            $(sliderElement).slick('slickSetOption', {
                                slidesToShow: 6,
                            }, true);
                        }
                        removeErrorMessage();
                        removeDisabledClass();
                    }
                    else {
                        if (!errorDisplayed) {
                            errorDisplayed = true;
                            const errorMessage = document.createElement('p');
                            errorMessage.classList.add('error-message');
                            errorMessage.textContent =
                                'Пожалуйста, введите корректный адрес электронной почты и пароль (не менее 6 символов, содержит буквы и цифры).';
                            if (buttonStep3 && errorMessage) {
                                buttonStep3.insertAdjacentElement('afterend', errorMessage);
                            }
                        }
                    }
                }
            });
        }
        const registrationCompleted = sessionStorage.getItem('registrationCompleted') === 'true';
        function toggleRegistration() {
            if (!registrationCompleted) {
                if (registration) {
                    registration.style.display = 'flex';
                    registration.style.opacity = '1';
                }
                if (films) {
                    films.style.display = 'none';
                }
                if (banner) {
                    banner.style.display = 'none';
                }
                if (footer) {
                    footer.style.display = 'none';
                }
                addDisabledClass();
            }
            else {
                if (avatarImage) {
                    avatarImage.src = 'img/netflix-avatar.png';
                }
                if (registration) {
                    registration.style.display = 'none';
                }
                if (films) {
                    films.style.display = 'block';
                }
                if (banner) {
                    banner.style.display = 'block';
                }
                if (footer) {
                    footer.style.display = 'block';
                }
                removeDisabledClass();
            }
        }
        toggleRegistration();
        function removeErrorMessage() {
            if (errorMessage) {
                errorMessage.remove();
                errorMessage = null;
                errorDisplayed = false;
            }
        }
        function addDisabledClass() {
            for (const link of Array.from(menuLinks)) {
                link.classList.add('disabled');
            }
        }
        function removeDisabledClass() {
            for (const link of Array.from(menuLinks)) {
                link.classList.remove('disabled');
            }
        }
        function isValidEmail(email) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        }
        function isValidPassword(password) {
            const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
            return regex.test(password);
        }
    }
    setupRegistrationFunctionality();
    const registrationCompleted = sessionStorage.getItem('registrationCompleted') === 'true';
    if (registrationCompleted) {
        const registrationElement = document.getElementById('registration');
        const buttonStep0 = document.querySelector('.form__btn');
        if (registrationElement) {
            registrationElement.style.display = 'none';
        }
        if (buttonStep0) {
            buttonStep0.style.display = 'none';
        }
    }
    // скрытие мигания
    const homeLink = document.getElementById('home-link');
    const registration = document.getElementById('registration');
    if (homeLink && registration) {
        homeLink.addEventListener('click', function (event) {
            event.preventDefault();
            if (registration) {
                registration.style.opacity = '0';
            }
            setTimeout(function () {
                if (homeLink) {
                    window.location.href = homeLink.href;
                }
            }, 0);
        });
    }
};
