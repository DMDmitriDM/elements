
export function creatDropUp(parent, id, arrItems, toggle = null, fun = null) {
  // ---------------- загрузка dropup ---------------- //
  // ------------------------------------------------- //
  const dropup = `<div class="dropup" id="dropup-${id}">
  <div class="dropup__toggle"></div>
  <div class="dropup__menu">
  </div>
  </div>`;

  parent.innerHTML = dropup;

  const dropupContainer = document.querySelector(`#dropup-${id}`);
  const dropupToggle = document.querySelector(`#dropup-${id} .dropup__toggle`);
  const dropupMenu = document.querySelector(`#dropup-${id} .dropup__menu`);

  dropupToggle.setAttribute('tabindex', '0');
  dropupToggle.setAttribute('role', 'combobox');
  dropupToggle.setAttribute('aria-expanded', 'false');
  dropupToggle.setAttribute('aria-controls', `dropup-menu-${id}`);

  dropupMenu.setAttribute('id', `dropup-menu-${id}`);
  dropupMenu.setAttribute('role', 'listbox')

  // заполняем все из списка
  arrItems.reverse();
  for (const item of arrItems) {
    const dropupItem = document.createElement('div');
    dropupItem.classList.add('dropup__item');

    dropupItem.setAttribute('tabindex', '0');
    dropupItem.setAttribute('role', 'option');

    dropupItem.textContent = item;
    dropupMenu.append(dropupItem);
  }

  if (toggle === null) {
    dropupToggle.textContent = arrItems[arrItems.length - 1];
    dropupToggle.setAttribute('data-idtoggle', `${arrItems.length - 1}`);
    dropupMenu.children[arrItems.length - 1].style.display = 'none';
  } else {
    dropupToggle.textContent = toggle;
    dropupToggle.setAttribute('data-idtoggle', '-1');
  }

  // ---------------- работа dropup ------------------ //
  // ------------------------------------------------- //

  function closeMenu() {
    dropupContainer.classList.remove('dropup--open');
    dropupMenu.classList.remove('dropup__menu--open');

    dropupToggle.setAttribute('aria-expanded', 'false');

    document.documentElement.removeEventListener('click', closeClick);
  }

  function openMenu() {
    dropupContainer.classList.add('dropup--open');
    dropupMenu.classList.add('dropup__menu--open');

    dropupToggle.setAttribute('aria-expanded', 'true');

    document.documentElement.addEventListener('click', closeClick);
  }

  function openOrCloseMenu() {
    // открыто
    if (dropupContainer.classList.contains('dropup--open')) {
      closeMenu();
      // закрыто
    } else {
      openMenu();
    }
  }

  // закрытие меню при клике не на элементах контейнера
  function closeClick(e) {
    if (
      e.target !== dropupToggle &&
      e.target !== dropupMenu &&
      e.target.parentElement !== dropupMenu
    ) {
      closeMenu();
    }
  }

  // --- //

  // Ecp на контейнере
  dropupContainer.addEventListener('keydown', (event) => {
    if ((event.key === 'Escape' || event.code === 'Escape') &&
      dropupMenu.classList.contains('dropup__menu--open')) {
        // переводим фокус на шапку
        dropupToggle.focus();
        closeMenu();
    }
  });

  // события на шапке
  dropupToggle.addEventListener('click', () => {
    openOrCloseMenu();
  });

  dropupToggle.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.code === 'Enter') {
      openOrCloseMenu();
    } else if ((event.key === 'Tab' || event.code === 'Tab') &&
    dropupMenu.classList.contains('dropup__menu--open')) {
      // оставляем фокус на шапке
      event.preventDefault();
      closeMenu();
    } else if ((event.key === 'ArrowUp' || event.code === 'ArrowUp') &&
    dropupMenu.classList.contains('dropup__menu--open')) {
      event.preventDefault();

      for (let i = items.length - 1; i >= 0; --i) {
        if (items[i].style.display !== 'none') {
          items[i].focus();
          break;
        }
      }
    }
  });

  // события на элементах меню
  const items = document.querySelectorAll(`#dropup-${id} .dropup__item`);
  for (const [i, item] of items.entries()) {
    item.addEventListener('click', () => {
      // переводим фокус на шапку
      setTimeout(() => {
        dropupToggle.focus();
      }, 50);

      closeMenu();

      const idToggle = dropupToggle.getAttribute('data-idtoggle');
      item.style.display = 'none';
      // когда в шапке название не из списка а тоглл то idToggle = -1
      if (idToggle !== '-1') {
        items[Number(idToggle)].style.display = 'block';
      }
      // ---
      dropupToggle.textContent = item.textContent;
      dropupToggle.setAttribute('data-idtoggle', `${i}`);

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
        // переводим фокус на шапку
        event.preventDefault();
        dropupToggle.focus();
        closeMenu();
      } else if (event.key === 'ArrowDown' || event.code === 'ArrowDown') {
        event.preventDefault();

        for (let currentFocus = i + 1; currentFocus <= items.length; currentFocus++) {
          if (currentFocus === items.length) {
            // переводим фокус на шапку
            dropupToggle.focus();
            closeMenu();
            break;
          }

          if (items[currentFocus].style.display !== 'none') {
            items[currentFocus].focus();
            break;
          }
        }
      } else if (event.key === 'ArrowUp' || event.code === 'ArrowUp') {
        event.preventDefault();

        for (let currentFocus = i - 1; currentFocus >= 0; currentFocus--) {
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

export function getValueDropUp(id) {
  const dropupToggle = document.querySelector(`#dropup-${id} .dropup__toggle`);
  return dropupToggle.textContent;
}

// --- //

export function setValueDropUp(id, name) {
  const dropupToggle = document.querySelector(`#dropup-${id} .dropup__toggle`);
  const items = document.querySelectorAll(`#dropup-${id} .dropup__item`);

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
      dropupToggle.textContent = item.textContent;
      dropupToggle.setAttribute('data-idtoggle', `${i}`);
    } else {
      item.style.display = 'block';
    }
  }
}
