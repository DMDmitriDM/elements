/**
 * Accordion v1.14.4
 * by barmalei
 * Published under MIT License
 */

/**
 * class Accordion
 */
export default class Accordion {
  _idAccordion;
  _accordionClass;
  _panelClass;
  _trigerClass;
  // _duration = 600;
  _duration;
  // _closeOpen = true;
  _closeOpen;

  /**
   * constructor Accordion
   * @param { Number } idAccordion
   * @param { Object } option
   * @param { String } option.accordionClass
   * @param { String } option.panelClass
   * @param { String } option.trigerClass
   * @param { Number } option.duration
   * @param { Boolean } option.closeOpen
   */
  constructor(idAccordion, option) {
    this._idAccordion = idAccordion;
    this._accordionClass = option.accordionClass;
    this._panelClass = option.panelClass;
    this._trigerClass = option.trigerClass;
    this._duration = option.hasOwnProperty('duration') ? option.duration : 600;
    this._closeOpen = option.hasOwnProperty('closeOpen') ? option.closeOpen : true;

    const accordion = document.querySelector(`.${this._accordionClass}`);
    accordion.setAttribute('id', `id-ac-${this._idAccordion}`);

    const panels = document.querySelectorAll(`#id-ac-${this._idAccordion} .${this._panelClass}`);
    for (const [index, panel] of panels.entries()) {
      panel.setAttribute('id', `id-ac-${this._idAccordion}-panel-${index + 1}`);

      panel.lastElementChild.setAttribute('id', `id-ac-${this._idAccordion}-content-${index + 1}`);
      panel.lastElementChild.setAttribute('role', 'region');
      panel.lastElementChild.setAttribute('aria-labelledby', `id-ac-${this._idAccordion}-triger-${index + 1}`);

      panel.lastElementChild.style.transitionDuration =  this._duration + 'ms';
      panel.lastElementChild.style.height = 0;
    }

    const trigers = document.querySelectorAll(`#id-ac-${this._idAccordion} .${this._trigerClass}`);
    for (const [index, triger] of trigers.entries()) {
      triger.setAttribute('id', `id-ac-${this._idAccordion}-triger-${index + 1}`);
      triger.setAttribute('data-target', `id-ac-${this._idAccordion}-panel-${index + 1}`);

      triger.setAttribute('aria-controls', `id-ac-${this._idAccordion}-content-${index + 1}`);
      triger.setAttribute('aria-expanded', 'false');
      // triger.setAttribute('aria-label', 'Развернуть');
    }

    // ---

    for (const triger of trigers) {
      triger.addEventListener('click', (e) => {
        const trigerTarget = e.target;
        const panelTarget = document.getElementById(trigerTarget.dataset.target);

        // Если щёлкаем по открытой панели То её просто закрываем
        if (panelTarget.classList.contains('accordion__panel--open')) {
          panelTarget.classList.remove('accordion__panel--open');

          trigerTarget.setAttribute('aria-expanded', 'false');
          // trigerTarget.setAttribute('aria-label', 'Развернуть');

          this.setHeightZero(panelTarget.lastElementChild);
        // Щёлкаем по закрытой
        } else {
          // Сначала закроем открытую
          if (this._closeOpen) {
            for (const panel of panels) {
              if (panel.classList.contains('accordion__panel--open')) {
                panel.classList.remove('accordion__panel--open');

                const triger = document.querySelector(`#${panel.getAttribute('id')} .${this._trigerClass}`);
                triger.setAttribute('aria-expanded', 'false');
                // triger.setAttribute('aria-label', 'Развернуть');

                this.setHeightZero(panel.lastElementChild);
                break;
              }
            }
          }
          // И потом откроем по которой щёлкнули
          panelTarget.classList.add('accordion__panel--open');

          trigerTarget.setAttribute('aria-expanded', 'true');
          // trigerTarget.setAttribute('aria-label', 'Cвернуть');

          this.setHeightAuto(panelTarget.lastElementChild);
        }
      });
    }
  }
  // end createAccordion

  /**
 * setHeightZero
 * @param { HTMLElement } element
 */
  setHeightZero(element) {
    element.style.height = element.clientHeight + 'px';

    setTimeout(() => {
      element.style.height = 0;
    }, 10);
  }

  /**
   * setHeightAuto
   * @param { HTMLElement } element
   */
  setHeightAuto(element) {
    element.style.height = element.scrollHeight + 'px';

    function transitionendAuto() {
      if (element.style.height !== '0px') {
        element.style.height = 'auto';
      };
      element.removeEventListener('transitionend', transitionendAuto);
    }
    element.addEventListener('transitionend', transitionendAuto);
  }
}
