
export function creatDropDown(parent, id, arrItems, toggle = null, fun = null) {
  // ---------------- загрузка dropdown ---------------- //
  // ------------------------------------------------- //
  const dropdown = `<div class="dropdown" id="dropdown-${id}">
  <div class="dropdown__toggle"></div>
  <div class="dropdown__menu">
  </div>
  </div>`;

  parent.innerHTML = dropdown;

  const dropdownContainer = document.querySelector(`#dropdown-${id}`);
  const dropdownToggle = document.querySelector(`#dropdown-${id} .dropdown__toggle`);
  const dropdownMenu = document.querySelector(`#dropdown-${id} .dropdown__menu`);

  dropdownToggle.setAttribute('tabindex', '0');
  dropdownToggle.setAttribute('role', 'combobox');
  dropdownToggle.setAttribute('aria-expanded', 'false');
  dropdownToggle.setAttribute('aria-controls', `dropdown-menu-${id}`);

  dropdownMenu.setAttribute('id', `dropdown-menu-${id}`);
  dropdownMenu.setAttribute('role', 'listbox')

  // заполняем все из списка
  for (const item of arrItems) {
    const dropdownItem = document.createElement('div');
    dropdownItem.classList.add('dropdown__item');

    dropdownItem.setAttribute('tabindex', '0');
    dropdownItem.setAttribute('role', 'option');

    dropdownItem.textContent = item;
    dropdownMenu.append(dropdownItem);
  }

  if (toggle === null) {
    dropdownToggle.textContent = arrItems[0];
    dropdownToggle.setAttribute('data-idtoggle', '0');
    dropdownMenu.children[0].style.display = 'none';
  } else {
    dropdownToggle.textContent = toggle;
    dropdownToggle.setAttribute('data-idtoggle', '-1');
  }

  // ---------------- работа dropdown ---------------- //
  // ------------------------------------------------- //

  function closeMenu() {
    dropdownContainer.classList.remove('dropdown--open');
    dropdownMenu.classList.remove('dropdown__menu--open');

    dropdownToggle.setAttribute('aria-expanded', 'false');

    document.documentElement.removeEventListener('click', closeClick);
  }

  function openMenu() {
    dropdownContainer.classList.add('dropdown--open');
    dropdownMenu.classList.add('dropdown__menu--open');

    dropdownToggle.setAttribute('aria-expanded', 'true');

    document.documentElement.addEventListener('click', closeClick);
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

  function openOrCloseMenu() {
    // открыто
    if (dropdownContainer.classList.contains('dropdown--open')) {
      closeMenu();
      // закрыто
    } else {
      openMenu();
    }
  }

  // --- //

  // Ecp на контейнере
  dropdownContainer.addEventListener('keydown', (event) => {
    if ((event.key === 'Escape' || event.code === 'Escape') &&
    dropdownMenu.classList.contains('dropdown__menu--open')) {
      // переводим фокус на шапку
      dropdownToggle.focus();
      closeMenu();
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
    dropdownMenu.classList.contains('dropdown__menu--open')) {
      // оставляем фокус на шапке
      event.preventDefault();
      closeMenu();
    } else if ((event.key === 'ArrowDown' || event.code === 'ArrowDown') &&
    dropdownMenu.classList.contains('dropdown__menu--open')) {
      event.preventDefault();

      for (const item of items) {
        if (item.style.display !== 'none') {
          item.focus();
          break;
        }
      }
    }
  });

  // события на элементе меню
  const items = document.querySelectorAll(`#dropdown-${id} .dropdown__item`);
  for (const [i, item] of items.entries()) {
    item.addEventListener('click', () => {
      setTimeout(() => {
        dropdownToggle.focus();
      }, 50);

      closeMenu();

      const idToggle = dropdownToggle.getAttribute('data-idtoggle');
      item.style.display = 'none';
      // когда в шапке название не из списка а тоглл то idToggle = -1
      if (idToggle !== '-1') {
        items[Number(idToggle)].style.display = 'block';
      }
      // ---
      dropdownToggle.textContent = item.textContent;
      dropdownToggle.setAttribute('data-idtoggle', `${i}`);

      if (fun) {
        fun(item.textContent);
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

        for (let currentFocus = i + 1; currentFocus < items.length; currentFocus++) {
          if (items[currentFocus].style.display !== 'none') {
            items[currentFocus].focus();
            break;
          }
        }
      } else if (event.key === 'ArrowUp' || event.code === 'ArrowUp') {
        event.preventDefault();

        for (let currentFocus = i - 1; currentFocus >= -1; --currentFocus) {
          if (currentFocus === -1) {
            // переводим фокус на шапку
            dropdownToggle.focus();
            closeMenu();
            break;
          }

          if (items[currentFocus].style.display !== 'none') {
            items[currentFocus].focus();
            break;
          }
        }
      }
    });
  }
}

// --- //

export function getValueDropDown(id) {
  const dropdownToggle = document.querySelector(`#dropdown-${id} .dropdown__toggle`);
  return dropdownToggle.textContent;
}

// --- //

export function setValueDropDown(id, name) {
  const dropdownToggle = document.querySelector(`#dropdown-${id} .dropdown__toggle`);
  const items = document.querySelectorAll(`#dropdown-${id} .dropdown__item`);

  // проверка
  let itError = true;
  for (const item of items) {
    if (item.textContent === name) {
      itError = false;
    }
  }

  if (itError) { return; }

  for (const [i, item] of items.entries()) {
    if (item.textContent === name) {
      item.style.display = 'none';
      dropdownToggle.textContent = item.textContent;
      dropdownToggle.setAttribute('data-idtoggle', `${i}`);
    } else {
      item.style.display = 'block';
    }
  }
}
