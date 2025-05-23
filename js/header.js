export default function createSectionHeader() {
  function addScrollbarPadding() {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
  }

  function removeScrollbarPadding() {
      document.body.style.paddingRight = '';
  }

  const blindBody = document.querySelector('.body-blind');
  const btnBurgerOpen = document.querySelector('.burger__open-btn');
  const btnBurgerClose = document.querySelector('.burger__close-btn');
  const boxBurger = document.querySelector('.burger__box');
  const linksBurger = document.querySelectorAll('.burger__nav .nav__link');

  // Закрыть function
  function closeBurger() {
    boxBurger.classList.remove('burger__box--active');
    btnBurgerOpen.classList.remove('burger__open-btn--visibility');

    removeScrollbarPadding();
    document.body.classList.remove('stop-scroll');
    blindBody.classList.remove('body-blind--active');
    blindBody.removeEventListener('click', closeBurger);
  }

  // Открыть click
  btnBurgerOpen.addEventListener('click', () => {
    addScrollbarPadding();
    document.body.classList.add('stop-scroll');
    blindBody.classList.add('body-blind--active');
    blindBody.addEventListener('click', closeBurger);

    boxBurger.classList.add('burger__box--active');
    btnBurgerOpen.classList.add('burger__open-btn--visibility');
  });

  // Закрыть click
  btnBurgerClose.addEventListener('click', () => {
    closeBurger();
  });

  // Закрыть click
  for (const linkBurger of linksBurger) {
    linkBurger.addEventListener('click', () => {
      closeBurger();
    });
  }
}
