function validEmail(value) {
  if (value.length === 0) {
    return 'Вы не ввели email!';
  }

  if (/^[-0-9A-Za-z_.]+@[-0-9A-Za-z]+\.[a-z]{2,6}$/i.test(value)) {
    return '';
  } else {
    return 'Не валидный email!';
  }
}

function validPassword(value) {
  if (value.length === 0) {
    return 'Вы не ввели пароль!';
  }

  if (value.length < 6) {
    return 'Не менее 6 символов!';
  }

  if (!/^[A-Za-z!0-9@#$&]{6,}$/.test(value)) {
    return 'Не валидный пароль!';
  }

  if (!/[!@#$&]{1,}/.test(value)) {
    return 'Нет спецсимвола !@#$&';
  }

  if (!/[A-Za-z]{1,}/.test(value)) {
    return 'Нет буквы алфавита';
  }

  if (!/[0-9]{1,}/.test(value)) {
    return 'Нет цифры 0-9';
  }

  return '';
}

function validName(value) {
  if (value.length === 0) {
    return 'Вы не ввели Имя!';
  }

  if (value.length > 50) {
    return 'Не более 50 символов!';
  }

  if (/(^[А-Яа-яЁёA-Za-z]{2,}$)|(^[А-Яа-яЁёA-Za-z]{2,}(\s+[А-Яа-яЁёA-Za-z]{2,}){1,2}$)/.test(value)) {
    return '';
  } else {
    return 'Ошибка в формате!';
  }
}

function validSurName(value) {
  if (value.length === 0) {
    return 'Вы не ввели Фамилию!';
  }

  if (value.length > 50) {
    return 'Не более 50 символов!';
  }

  if (/(^[А-Яа-яЁёA-Za-z]{2,}$)|(^[А-Яа-яЁёA-Za-z]{1,2}'[А-Яа-яЁёA-Za-z]{2,}$)|(^[А-Яа-яЁёA-Za-z]{2,}-[А-Яа-яЁёA-Za-z]{2,}$)/.test(value)) {
    return '';
  } else {
    return 'Ошибка в формате!';
  }
}

export const validateForm = {
  ['login']: validEmail,
  ['subs-email']: validEmail,
  ['password']: validPassword,
  ['subs-name']: validName,
  ['subs-surname']: validSurName,
};
