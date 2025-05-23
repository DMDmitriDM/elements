import { creatDropDown, getValueDropDown } from "../libr/dropdown/dropdown.js";
import {
  creatDropDown as creatDropDownCheck,
  setDropDown as setDropDownCheck,
  getDropDown as getDropDownCheck
} from '../libr/dropdown-check/dropdown-check.js';
import { creatDropUp, getValueDropUp } from "../libr/dropup/dropup.js";

export default function createSectionElementsDropdown() {
  // dropdown head
    const dropdownBox_1 = document.querySelector('#id-drop__list-item-1 .drop__list-item-box');
    creatDropDown(dropdownBox_1, 1, ['Заяц', 'Собака', 'Волк', 'Лиса'], 'Животные', onChange_1);

    const spanOnChange_1 = document.querySelector('#id-drop__list-item-1 .drop__list-item-change');
    spanOnChange_1.textContent = 'On Change:';

    function onChange_1(value) {
      spanOnChange_1.textContent = 'On Change: ' + value;
    }

    const spanValue_1 = document.querySelector('#id-drop__list-item-1 .drop__list-item-value');
    spanValue_1.textContent = 'Значение: ' + getValueDropDown(1);

    const btnUpdate_1 = document.querySelector('#id-drop__list-item-1 .drop__list-item-btn');
    btnUpdate_1.addEventListener('click', () => {
      spanValue_1.textContent = 'Значение: ' + getValueDropDown(1);
    });

    // dropdown
    const dropdownBox_2 = document.querySelector('#id-drop__list-item-2 .drop__list-item-box');
    creatDropDown(dropdownBox_2, 2, ['Жираф', 'Крокодил', 'Бегемот', 'Страус'], null, onChange_2);

    const spanOnChange_2 = document.querySelector('#id-drop__list-item-2 .drop__list-item-change');
    spanOnChange_2.textContent = 'On Change:';

    function onChange_2(value) {
      spanOnChange_2.textContent = 'On Change: ' + value;
    }

    const spanValue_2 = document.querySelector('#id-drop__list-item-2 .drop__list-item-value');
    spanValue_2.textContent = 'Значение: ' + getValueDropDown(2);

    const btnUpdate_2 = document.querySelector('#id-drop__list-item-2 .drop__list-item-btn');
    btnUpdate_2.addEventListener('click', () => {
      spanValue_2.textContent = 'Значение: ' + getValueDropDown(2);
    });

    // dropdown check
    const dropdownBox_3 = document.querySelector('#id-drop__list-item-3 .drop__list-item-box');
    creatDropDownCheck(dropdownBox_3, 3, 'Контакт', ['Телефон', 'Email', 'VK', 'Другое'],  onChange_3);
    setDropDownCheck(3, 0);

    const spanOnChange_3 = document.querySelector('#id-drop__list-item-3 .drop__list-item-change');
    spanOnChange_3.textContent = 'On Change:';

    function onChange_3(value) {
      spanOnChange_3.textContent = 'On Change: ' + value;
    }

    const spanValue_3 = document.querySelector('#id-drop__list-item-3 .drop__list-item-value');
    spanValue_3.textContent = 'Значение: ' + getDropDownCheck(3);

    const btnUpdate_3 = document.querySelector('#id-drop__list-item-3 .drop__list-item-btn');
    btnUpdate_3.addEventListener('click', () => {
      spanValue_3.textContent = 'Значение: ' + getDropDownCheck(3);
    });

    // dropup
    const dropdownBox_4 = document.querySelector('#id-drop__list-item-4 .drop__list-item-box');
    creatDropUp(dropdownBox_4, 4, ['Жираф', 'Крокодил', 'Бегемот', 'Страус'], null, onChange_4);

    const spanOnChange_4 = document.querySelector('#id-drop__list-item-4 .drop__list-item-change');
    spanOnChange_4.textContent = 'On Change:';

    function onChange_4(value) {
      spanOnChange_4.textContent = 'On Change: ' + value;
    }

    const spanValue_4 = document.querySelector('#id-drop__list-item-4 .drop__list-item-value');
    spanValue_4.textContent = 'Значение: ' + getValueDropUp(4);

    const btnUpdate_4 = document.querySelector('#id-drop__list-item-4 .drop__list-item-btn');
    btnUpdate_4.addEventListener('click', () => {
      spanValue_4.textContent = 'Значение: ' + getValueDropUp(4);
    });
}
