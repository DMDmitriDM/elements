
// проверка на соответствие
function testChar(testStr, format) {
  return format.test(testStr);
}

// ---

export default function createInputKey(input, format) {
  let oldValueInput;
  let oldselectionStart;

  input.addEventListener('input', () => {
    if (input.value !== '' && !testChar(input.value, format)) {
      input.value = oldValueInput;

      input.selectionStart = oldselectionStart;
      input.selectionEnd = oldselectionStart;
    }
  });

  // ---

  input.addEventListener('keydown', () => {
    oldselectionStart = input.selectionStart;
    oldValueInput = input.value;
  });


  input.addEventListener('cut', () => {
    oldselectionStart = input.selectionStart;
    oldValueInput = input.value;
  });

  input.addEventListener('paste', () => {
    oldselectionStart = input.selectionStart;
    oldValueInput = input.value;
  });
}
