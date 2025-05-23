import createInputKey from '../libr/inputkey/inputkey.js';
import createDropdownInput from '../libr/dropdown-input/dropdown-input.js';
import { correctNameTown, correctNameFaculty } from '../libr/utils/utils.js';
import { validateForm } from '../libr/utils/validation.js';

export default function createSectionElementsInput() {
  // input drop 1
  // ------------
  const form_1 = document.getElementById('id-form-1');
  const inputBox_1 = document.getElementById('id-form-box-input-1');
  const input_1 = document.getElementById('id-form-input-1');
  const btnUpdate_1 = document.getElementById('id-form-btn-1');

  form_1.addEventListener('submit', (e) => {
    e.preventDefault();
  });

  const format1 = /^[А-Яа-яЁё\s-]+$/;
  createInputKey(input_1, format1);

  const arrTown = ['Москва', 'Орёл', 'Саратов', 'Санкт-Петербург', 'Сергиев Посад'];
  createDropdownInput(inputBox_1, input_1, 1, arrTown);

  const spanValue_5 = document.querySelector('#id-inputs__list-item-1 .inputs__list-item-value');
  spanValue_5.textContent = input_1.value;

  const spanValueCorrect_5 = document.querySelector('#id-inputs__list-item-1 .inputs__list-item-value-correct');
  spanValueCorrect_5.textContent = '';


  btnUpdate_1.addEventListener('click', () => {
    spanValue_5.textContent = input_1.value;

    spanValueCorrect_5.textContent = correctNameTown(input_1.value);
  });

  const spanOnChange_5 = document.querySelector('#id-inputs__list-item-1 .inputs__list-item-change');
  spanOnChange_5.textContent = input_1.value;

  input_1.addEventListener('input', () => {
    spanOnChange_5.textContent = input_1.value;
  });

  // input drop 2
  // ------------
  const form_2 = document.getElementById('id-form-2');
  const inputBox_2 = document.getElementById('id-form-box-input-2');
  const input_2 = document.getElementById('id-form-input-2');
  const btnUpdate_2 = document.getElementById('id-form-btn-2');

  form_2.addEventListener('submit', (e) => {
    e.preventDefault();
  });

  const format2 = /^[А-Яа-яЁё\s-]+$/;
  createInputKey(input_2, format2);

  const arrFaculty = [
    'Глобальных процессов',
    'Механико-Математический',
    'Химический',
    'Экономический',
  ];
  createDropdownInput(inputBox_2, input_2, 2, arrFaculty);

  const spanValue_6 = document.querySelector('#id-inputs__list-item-2 .inputs__list-item-value');
  spanValue_6.textContent = input_2.value;

  const spanValueCorrect_6 = document.querySelector('#id-inputs__list-item-2 .inputs__list-item-value-correct');
  spanValueCorrect_6.textContent = input_2.value;

  btnUpdate_2.addEventListener('click', () => {
    spanValue_6.textContent = input_2.value;

    spanValueCorrect_6.textContent = correctNameFaculty(input_2.value);
  });

  const spanOnChange_6 = document.querySelector('#id-inputs__list-item-2 .inputs__list-item-change');
  spanOnChange_6.textContent = input_2.value;

  input_2.addEventListener('input', () => {
    spanOnChange_6.textContent = input_2.value;
  });

  // input authentication
  // --------------------
  const formLogin = document.getElementById('id-form-login');
  const inputLogin = document.getElementById('id-login-input');
  const inputPassword = document.getElementById('id-password-input');
  const formLoginBtnEye = document.getElementById('id-btn-eye');
  const formLoginBtn = document.getElementById('id-form-login-btn');

  formLogin.addEventListener('submit', (e) => {
    e.preventDefault();
  });

  // ------------ Работа инпутов ------------ //
  const formatLogin = /^[-0-9A-Za-z_@.]+$/;
  createInputKey(inputLogin, formatLogin);

  const formatPassword = /^[A-Za-z!0-9@#$&]+$/;
  createInputKey(inputPassword, formatPassword);

  const objError = {
    login: false,
    password: false,
  };

  const arrInputs = document.querySelectorAll('#id-form-login-box-inputs .form-login__input');
  for (const input of arrInputs) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.code === 'Enter') {
        e.preventDefault();
      }
    });

    input.addEventListener('blur', (e) => {
      if (input === inputPassword && e.relatedTarget === formLoginBtnEye) {
        e.preventDefault();
        return;
      }

      const valid = validateForm[input.name](input.value);

      if (valid !== '') {
        input.classList.add('form-login__input--error');

        const spanError = document.getElementById(input.dataset.error);
        spanError.classList.add('form-login__span-error--active');
        spanError.textContent = valid;

        objError[input.name] = false;
      } else {
        objError[input.name] = true;
      }

      changeFormBtn();
    });

    input.addEventListener('input', () => {
      input.classList.remove('form-login__input--error');

      const spanError = document.getElementById(input.dataset.error);
      spanError.textContent = '';
      spanError.classList.remove('form-login__span-error--active');

      const spanSuccess = document.getElementById(input.dataset.success);

      const valid = validateForm[input.name](input.value);

      if (valid !== '') {
        input.classList.remove('form-login__input--success');
        spanSuccess.classList.remove('form-login__span-success--active');

        objError[input.name] = false;
      } else {
        input.classList.add('form-login__input--success');
        spanSuccess.classList.add('form-login__span-success--active');

        objError[input.name] = true;
      }

      changeFormBtn();
    });
  }

  function changeFormBtn() {
    for (const key in objError) {
      if (!objError[key]) {
        formLoginBtn.setAttribute('disabled', '');

        return;
      }
    }

    formLoginBtn.removeAttribute('disabled');
  }

  // ------ Пароль показать - скрыть -------- //
  formLoginBtnEye.addEventListener('click', () => {
    inputPassword.focus();

    // глаз закрыт - пароль открыт
    if (formLoginBtnEye.classList.contains('form-login__btn-eye--show')) {
      formLoginBtnEye.classList.remove('form-login__btn-eye--show');
      formLoginBtnEye.setAttribute('aria-label', 'Показать пароль');
      inputPassword.type = 'password';
    // глаз открыт - пароль скрыт
    } else {
      formLoginBtnEye.classList.add('form-login__btn-eye--show');
      formLoginBtnEye.setAttribute('aria-label', 'Скрыть пароль');
      inputPassword.type = 'text';
    }
  });

  formLoginBtn.addEventListener('click', () => {
    for (const input of arrInputs) {
      input.value = '';
      input.classList.remove('form-login__input--success');
      const spanSuccess = document.getElementById(input.dataset.success);
      spanSuccess.classList.remove('form-login__span-success--active');

      formLoginBtnEye.classList.remove('form-login__btn-eye--show');
      formLoginBtnEye.setAttribute('aria-label', 'Показать пароль');
      inputPassword.type = 'password';
    }

  });

  // input subscription
  // --------------------
  const formSubs = document.getElementById('id-form-subs');
  const formSubsBtn = document.getElementById('id-form-subs-btn');

  formSubs.addEventListener('submit', (e) => {
    e.preventDefault();
  });

  // ------------ Работа инпутов ------------ //

  const arrSubsInputs = document.querySelectorAll('#id-form-subs-box-inputs .form-subs__input');
  for (const input of arrSubsInputs) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.code === 'Enter') {
        e.preventDefault();
      }
    });

    input.addEventListener('input', () => {
      input.classList.remove('form-subs__input--error');
    });
  }

  formSubsBtn.addEventListener('click', () => {
    let error = false;

    for (const input of arrSubsInputs) {
      // const inputValue = input.value;
      const inputValue = input.value.trim();
      if (input.name === 'subs-surname' && inputValue === '') {
        break;
      }

      const valid = validateForm[input.name](inputValue);
      if (valid !== '') {
        input.classList.add('form-subs__input--error');
        const spanError = document.getElementById(input.dataset.error);
        spanError.textContent = valid;

        error = true;
      }
    }

    if (!error) {
      formSubs.reset();
    }
  });
}
