// первая заглавная
function firstCharUp(str) {
  return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
}

// trim dash and space
export function trimDashSpace(str) {
  return str.replace(/^[-\s]+/, '').replace(/[-\s]+$/, '');
}

// one space
export function oneSpaceBetween(str) {
  return str
  .split(' ')
  .filter(line => line.length > 0)
  .join(' ');
}

// one dash
export function oneDashBetween(str) {
  return str
  .split('-')
  .filter(line => line.length > 0)
  .join('-');
}

export function correctNameTown(str) {
  str = trimDashSpace(str);

  if (str.includes('-')) {
    str = str.replace(/\s/g, '-');
    str = oneDashBetween(str);
    str = str.split('-')
    .map(line => firstCharUp(line))
    .join('-');
    str = str.replace(/На/g, 'на');
    str = str.replace(/^на-/, '').replace(/-на$/, '');
  } else if (str.includes(' ')) {
    str = oneSpaceBetween(str);
    str = str.split(' ')
    .map(line => firstCharUp(line))
    .join(' ');
    str = str.replace(/На/g, 'на');
    str = str.replace(/^на\s/, '').replace(/\sна$/, '');
    str = str.replace(/\sна\s/g, '-на-');
  } else {
    str = firstCharUp(str);
  }

  for (const nameTown of arrNameTown) {
    if (nameTown === str) {
      str = str.replace(/\s/, '-');
      break;
    }
  }

  return str;
}

const arrNameTown = [
  'Гаврилов Ям',
  'Горн Алтайск',
  'Гусь Хрустальный',
  'Железногорск Илимский',
  'Йошкар Ола',
  'Каменск Уральский',
  'Каменск Шахтинский',
  'Катав Ивановск',
  'Кирово Чепецк',
  'Лосино Петровский',
  'Переславль Залесский',
  'Петровск Забайкальский',
  'Петропавловск Камчатский',
  'Приморско Ахтарск',
  'Санкт Петербург',
];

export function correctNameFaculty(str) {
  str = trimDashSpace(str);

  if (str.includes('-')) {
    str = str.replace(/\s/g, '-');
    str = oneDashBetween(str);
    str = str.split('-')
    .map(line => firstCharUp(line))
    .join('-');
  } else if (str.includes(' ')) {
    str = oneSpaceBetween(str);
    str = str.split(' ')
    .map(line => firstCharUp(line))
    .join(' ');
  } else {
    str = firstCharUp(str);
  }

  return str;
}
