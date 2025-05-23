export default function createDropdownInput(inputBox, input, id, arrString) {
  if (!inputBox.classList.contains('input-auto-box')) {
    inputBox.classList.add('input-auto-box');
  }

  const inputBoxBeforeStyle = getComputedStyle(inputBox, ':before');
  const inputBoxBeforeHeight = parseFloat(inputBoxBeforeStyle.height);

  const topBefore = Math.round(input.offsetHeight / 2) - Math.round(inputBoxBeforeHeight / 2) - 1;
  inputBox.style.setProperty('--top-before', `${topBefore}px`);

  // ---

  if (!input.classList.contains('input-auto-input')) {
    input.classList.add('input-auto-input');
  }

  if (!input.hasAttribute('type') || input.getAttribute('type') !== 'text') {
    input.setAttribute('type', 'text');
  }

  if (!input.hasAttribute('autocomplete') || input.getAttribute('autocomplete') !== 'off') {
    input.setAttribute('autocomplete', 'off');
  }

  input.setAttribute('role', 'combobox');
  input.setAttribute('aria-autocomplete', 'list');

  input.setAttribute('aria-owns', `id-input-auto-menu-${id}`);
  // input.setAttribute('aria-controls', `id-input-auto-menu-${id}`);
  input.setAttribute('aria-expanded', 'false');

  // ---

  const inputMenu = document.createElement('div');
  inputMenu.classList.add('input-auto-menu');
  inputMenu.setAttribute('id', `id-input-auto-menu-${id}`);
  inputMenu.setAttribute('role', 'listbox')

  inputMenu.style.top = input.offsetHeight + 'px';
  inputBox.append(inputMenu);

  for (const str of arrString) {
    const itemMenu = document.createElement('div');
    itemMenu.classList.add('input-auto-menu-item');
    itemMenu.setAttribute('tabindex', '0');
    itemMenu.setAttribute('role', 'option');

    itemMenu.textContent = str;
    inputMenu.append(itemMenu);
  }

  const items = document.querySelectorAll(`#id-input-auto-menu-${id} .input-auto-menu-item`);

  // ----------------------------------------- //

  const ariaLive = document.createElement('div');
  ariaLive.classList.add('visually-hidden-auto');
  ariaLive.setAttribute('role', 'status');
  ariaLive.setAttribute('aria-live', 'polite');
  ariaLive.textContent = '';

  inputBox.append(ariaLive);

  // ----------------------------------------- //

  function openDropdown() {
    inputMenu.classList.add('input-auto-menu--open');
    inputBox.classList.add('input-auto-box--open');

    // обновляем aria
    input.setAttribute('aria-expanded', 'true');

    document.documentElement.addEventListener('click', closeClick);
  }

  function closeDropdown() {
    inputMenu.classList.remove('input-auto-menu--open');
    inputBox.classList.remove('input-auto-box--open');

    // обновляем aria
    input.setAttribute('aria-expanded', 'false');
    ariaLive.textContent = '';

    document.documentElement.removeEventListener('click', closeClick);
  }

  function openOrCloseMenu() {
    // Открываем
    if (!inputMenu.classList.contains('input-auto-menu--open')) {
      renderMenu(input.value);
    // Закрываем
    }  else {
      closeDropdown();
    }
  }

  // закрытие меню при клике не на элементах
  function closeClick(e) {
    if (
      e.target !== input &&
      e.target !== inputMenu &&
      e.target.parentElement !== inputMenu
    ) {
      closeDropdown();
    }
  }

  // input
  // ----------------------------------------- //
  // ----------------------------------------- //

  function createMessageAriaLive(count) {
    let strMessage = 0;
    switch (count) {
      case 1:
        strMessage = `${count} вариант найдено`;
        break;
      case 2:
      case 3:
      case 4:
        strMessage = `${count} варианта найдено`;
        break;
      default:
        `${count} вариантов найдено`;
    }

    return strMessage;
  }

  function renderMenu(inputValue, inputEvent = false) {
    let count = items.length;

    for (const item of items) {
      // не содержит или при событии input значение ''
      if (
        !item.textContent.toLowerCase().includes(inputValue.trim().toLowerCase()) ||
        (inputEvent && inputValue === '')
      ) {
        item.classList.remove('input-auto-menu-item--open');
        count--;
      // содержит
      } else {
        item.classList.add('input-auto-menu-item--open');
      }
    }

    // обновляем ariaLive
    ariaLive.textContent = createMessageAriaLive(count);

    // Открываем
    if (count && !inputMenu.classList.contains('input-auto-menu--open')) {
      openDropdown();
    // Закрываем
    } else if (!count && inputMenu.classList.contains('input-auto-menu--open')) {
      closeDropdown();
    }
  }

  // ----------------------------------------- //

  let idInputTimeout = null;

  input.addEventListener('input', (e) => {
    if (e.isTrusted) {
      clearTimeout(idInputTimeout);

      idInputTimeout = setTimeout(() => {
        renderMenu(input.value, true);
      }, 200);
    }
  });

  input.addEventListener('mousedown', (e) => {
    if (
      (document.activeElement === input) &&
      (e.which === 1 || inputMenu.classList.contains('input-auto-menu--open'))
    ){
      openOrCloseMenu();
    }
  });

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.code === 'Enter') {
      event.preventDefault();

      openOrCloseMenu();
    } else if ((event.key === 'Escape' || event.code === 'Escape') &&
    inputMenu.classList.contains('input-auto-menu--open')) {
      closeDropdown();
    } else if ((event.key === 'Tab' || event.code === 'Tab') &&
    inputMenu.classList.contains('input-auto-menu--open')) {
      // оставляем фокус на шапке
      event.preventDefault();

      closeDropdown();
    } else if ((event.key === 'ArrowDown' || event.code === 'ArrowDown') &&
    inputMenu.classList.contains('input-auto-menu--open')) {
      event.preventDefault();

      for (const item of items) {
        if (item.classList.contains('input-auto-menu-item--open')) {
          item.focus();
          break;
        }
      }
    }
  });

  // items
  // ----------------------------------------- //
  // ----------------------------------------- //

  for (const item of items) {
    item.addEventListener('click', () => {
      // переводим фокус на шапку
      setTimeout(() => {
        input.focus();
      }, 50);
      input.value = item.textContent;

      closeDropdown();

      input.dispatchEvent(new Event('input', { bubbles: true }));
    });

    item.addEventListener('mouseover', (e) => {
      e.target.focus();
    });
  }

  for (const [i, item] of items.entries()) {
    item.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.code === 'Enter') {
        item.dispatchEvent(new Event('click', { bubbles: true }));
      } else if (event.key === 'Tab' || event.code === 'Tab') {
        event.preventDefault();

        // переводим фокус на шапку
        input.focus();
        closeDropdown();
      } else if (event.key === 'Escape' || event.code === 'Escape') {
        // переводим фокус на шапку
        input.focus();
        closeDropdown();
      } else if (event.key === 'ArrowDown' || event.code === 'ArrowDown') {
        event.preventDefault();

        for (let currentFocus = i + 1; currentFocus < items.length; currentFocus++) {
          if (items[currentFocus].classList.contains('input-auto-menu-item--open')) {
            items[currentFocus].focus();
            break;
          }
        }

      } else if (event.key === 'ArrowUp' || event.code === 'ArrowUp') {
        event.preventDefault();

        for (let currentFocus = i - 1; currentFocus >= -1; currentFocus--) {
          if (currentFocus === -1) {
            // переводим фокус на шапку
            input.focus();
            closeDropdown();
            break;
          }

          if (items[currentFocus].classList.contains('input-auto-menu-item--open')) {
            items[currentFocus].focus();
            break;
          }
        }
      }
    });
  }
  // end function createDropdownInput
}
