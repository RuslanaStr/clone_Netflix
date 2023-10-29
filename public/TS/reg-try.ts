window.onload = function() {
    function setupRegistrationFunctionality(): void {
      const emailStep2Input: HTMLInputElement | null = document.getElementById('emailStep2') as HTMLInputElement;
      const startButton: HTMLElement | null = document.getElementById('buttonStep2');
      const emailStep3Input: HTMLInputElement | null = document.getElementById('emailStep3') as HTMLInputElement;
      const passwordInput: HTMLInputElement | null = document.getElementById('passwordStep3') as HTMLInputElement;
      const buttonStep3: HTMLElement | null = document.getElementById('buttonStep3');
      const avatarImage: HTMLImageElement  | null = document.querySelector('.nav__avatar');
      const banner: HTMLElement | null = document.getElementById('banner-for-reg');
      const footer: HTMLElement | null = document.getElementById('footer-for-reg');
      const films: HTMLElement | null = document.getElementById('films-for-reg');
      const registration: HTMLElement | null = document.getElementById('registration');
      const buttonStep0: HTMLElement | null = document.querySelector('.form__btn');
      const menuLinks: NodeList = document.querySelectorAll('.menu__link');
  
      let errorMessage: HTMLElement | null = null;
      let errorDisplayed: boolean = false;
  
      if (buttonStep0) {
        buttonStep0.addEventListener('click', function(event) {
          event.preventDefault();
          if (emailStep2Input) {
            emailStep2Input.focus();
          }
        });
      }
  
      if (startButton) {
        startButton.addEventListener('click', function(event) {
          event.preventDefault();
          if (emailStep2Input) {
            const email: string = emailStep2Input.value;
            if (isValidEmail(email)) {
              const regDiv: HTMLElement | null = document.getElementById('reg');
              const regDiv1: HTMLElement | null = document.getElementById('reg1');
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
        buttonStep3.addEventListener('click', function(event) {
          event.preventDefault();
          if (emailStep3Input && passwordInput) {
            const email: string = emailStep3Input.value;
            const password: string = passwordInput.value;
  
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
              const sliderElements: NodeList = document.querySelectorAll('.slider__section');
              for (const sliderElement of Array.from(sliderElements)) {
                ($(sliderElement) as any).slick('slickSetOption', {
                  slidesToShow: 6,
                }, true);
              }
              removeErrorMessage();
              removeDisabledClass();
            } else {
              if (!errorDisplayed) {
                errorDisplayed = true;
                const errorMessage: HTMLElement = document.createElement('p');
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
  
      const registrationCompleted: boolean = sessionStorage.getItem('registrationCompleted') === 'true';
  
      function toggleRegistration(): void {
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
        } else {
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
  
      function removeErrorMessage(): void {
        if (errorMessage) {
          errorMessage.remove();
          errorMessage = null;
          errorDisplayed = false;
        }
      }
  
      function addDisabledClass(): void {
        for (const link of Array.from(menuLinks)) {
          (link as HTMLElement).classList.add('disabled');
        }
      }
  
      function removeDisabledClass(): void {
        for (const link of Array.from(menuLinks)) {
          (link as HTMLElement).classList.remove('disabled');
        }
      }
  
      function isValidEmail(email: string): boolean {
        const regex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
      }
  
      function isValidPassword(password: string): boolean {
        const regex: RegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        return regex.test(password);
      }
    }
  
    setupRegistrationFunctionality();
  
    const registrationCompleted: boolean = sessionStorage.getItem('registrationCompleted') === 'true';
  
    if (registrationCompleted) {
      const registrationElement: HTMLElement | null = document.getElementById('registration');
      const buttonStep0: HTMLElement | null = document.querySelector('.form__btn');
      if (registrationElement) {
        registrationElement.style.display = 'none';
      }
      if (buttonStep0) {
        buttonStep0.style.display = 'none';
      }
    }
  
    // скрытие мигания
    const homeLink: HTMLAnchorElement | null = document.getElementById('home-link') as HTMLAnchorElement;
    const registration: HTMLElement | null = document.getElementById('registration');
  
    if (homeLink && registration) {
      homeLink.addEventListener('click', function(event) {
        event.preventDefault();
        if (registration) {
          registration.style.opacity = '0';
        }
        setTimeout(function() {
          if (homeLink) {
            window.location.href = homeLink.href;
          }
        }, 0);
      });
    }
  };
  


