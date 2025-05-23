export function creatDropDown(parent, id, toggle, arrCheck, fun = null) {
  // загрузка dropdown

  const dropdownInnerHTML = `<div class="dropdown-check" id="dropdown-check-${id}">
  <div class="dropdown__toggle-check">${toggle}</div>
  <div class="dropdown__menu-check"></div>
  </div>`;

  parent.innerHTML = dropdownInnerHTML;

  const dropdownContainer = document.querySelector(`#dropdown-check-${id}`);
  const dropdownToggle = document.querySelector(
    `#dropdown-check-${id} .dropdown__toggle-check`,
  );

  dropdownToggle.setAttribute('tabindex', '0');
  dropdownToggle.setAttribute('role', 'combobox');
  dropdownToggle.setAttribute('aria-expanded', 'false');
  dropdownToggle.setAttribute('aria-controls', `dropdown-check-menu-${id}`);
  dropdownToggle.setAttribute('aria-label', 'Чек');

  const dropdownMenu = document.querySelector(
    `#dropdown-check-${id} .dropdown__menu-check`,
  );

  dropdownMenu.setAttribute('id', `dropdown-check-menu-${id}`);
  dropdownMenu.setAttribute('role', 'listbox');

  for (const check of arrCheck) {
    const dropdownItem = document.createElement('div');
    dropdownItem.classList.add('dropdown__item-check');

    dropdownItem.setAttribute('tabindex', '0');
    dropdownItem.setAttribute('role', 'option');
    dropdownItem.setAttribute('aria-selected', 'true');
    dropdownItem.setAttribute('aria-checked', 'false');

    dropdownItem.textContent = check;

    dropdownMenu.append(dropdownItem);
  }

  // Работа dropdown //
  // --------------- //

  function closeMenu() {
    dropdownContainer.classList.remove('dropdown-check--open');
    dropdownMenu.classList.remove('dropdown__menu-check--open');

    dropdownToggle.setAttribute('aria-expanded', 'false');

    document.documentElement.removeEventListener('click', closeClick);
  }

  function openMenu() {
    dropdownContainer.classList.add('dropdown-check--open');
    dropdownMenu.classList.add('dropdown__menu-check--open');

    dropdownToggle.setAttribute('aria-expanded', 'true');

    document.documentElement.addEventListener('click', closeClick);
  }

  function openOrCloseMenu() {
    // открыто
    if (dropdownContainer.classList.contains('dropdown-check--open')) {
      closeMenu();
      // закрыто
    } else {
      openMenu();
    }
  }

  // закрытие меню при клике не на элементах контейнера
  function closeClick(e) {
    if (
      e.target !== dropdownToggle &&
      e.target !== dropdownMenu &&
      e.target.parentElement !== dropdownMenu
    ) {
      closeMenu();
    }
  }

  // Ecs на контейнере от всех элементов
  dropdownContainer.addEventListener('keydown', (event) => {
    if ((event.key === 'Escape' || event.code === 'Escape') &&
    dropdownMenu.classList.contains('dropdown__menu-check--open')) {
      closeMenu();
      // переводим фокус на шапку
      dropdownToggle.focus();
    }
  });

  // события на шапке
  dropdownToggle.addEventListener('click', () => {
    openOrCloseMenu();
  });

  dropdownToggle.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.code === 'Enter') {
      openOrCloseMenu();
    } else if ((event.key === 'Tab' || event.code === 'Tab') &&
    dropdownMenu.classList.contains('dropdown__menu-check--open')) {
      // оставляем фокус на шапке
      event.preventDefault();
      closeMenu();
    } else if ((event.key === 'ArrowDown' || event.code === 'ArrowDown') &&
    dropdownMenu.classList.contains('dropdown__menu-check--open')) {
      event.preventDefault();

      if (items.length !== 0) {
        items[0].focus();
      }
    }
  });

  // события на item
  const items = document.querySelectorAll(`#dropdown-check-${id} .dropdown__item-check`);
  for (const [i, item] of items.entries()) {
    item.addEventListener('click', (e) => {
      setTimeout(() => {
        dropdownToggle.focus();
      }, 50);

      closeMenu();

      if (e.target.getAttribute('aria-checked') !== 'true') {
        for (const item of items) {
          item.setAttribute('aria-checked', 'false');
          item.classList.remove('dropdown__item-check--check');
        }

        e.target.setAttribute('aria-checked', 'true');
        e.target.classList.add('dropdown__item-check--check');
      }

      if (fun) {
        fun(i);
      }
    });

    item.addEventListener('mouseover', (e) => {
      e.target.focus();
    });
  }

  for (const [i, item] of items.entries()) {
    item.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.code === 'Enter') {
        item.dispatchEvent(new Event('click'));
      } else if (event.key === 'Tab' || event.code === 'Tab') {
        event.preventDefault();

        // переводим фокус на шапку
        dropdownToggle.focus();
        closeMenu();
      } else if (event.key === 'ArrowDown' || event.code === 'ArrowDown') {
        event.preventDefault();

        const currentFocus = i + 1;
        if (currentFocus < items.length) {
          items[currentFocus].focus();
        }
      } else if (event.key === 'ArrowUp' || event.code === 'ArrowUp') {
        event.preventDefault();

        const currentFocus = i - 1;
        if (currentFocus < 0 ) {
          // переводим фокус на шапку
          dropdownToggle.focus();
          closeMenu();
        } else {
          items[currentFocus].focus();
        }
      }
    });
  }
}

// --- //

export function setDropDown(id, num) {
  const items = document.querySelectorAll(
    `#dropdown-check-${id} .dropdown__item-check`,
  );

  if (!items || items.length === 0) {
    return;
  }

  for (const [i, item] of items.entries()) {
    if (i === num) {
      item.setAttribute('aria-checked', 'true');
      item.classList.add('dropdown__item-check--check');
    } else {
      item.setAttribute('aria-checked', 'false');
      item.classList.remove('dropdown__item-check--check');
    }
  }
}

export function getDropDown(id) {
  const items = document.querySelectorAll(
    `#dropdown-check-${id} .dropdown__item-check`,
  );

  if (!items || items.length === 0) {
    return null;
  }

  for (const [i, item] of items.entries()) {
    if (item.getAttribute('aria-checked') === 'true') {
      return i;
    }
  }
}
