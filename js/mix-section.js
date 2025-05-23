export default function createSectionMix() {
  const mixForms = document.querySelectorAll('.mix__list-form');
  for (const mixForm of mixForms) {
    mixForm.addEventListener('submit', (e) => {
      e.preventDefault(e);
    });
  }

  const checkboxInputs = document.querySelectorAll('.checkbox__input');
  const btnCheckboxInputs = document.getElementById('id-mix-list-form-btn-11');
  btnCheckboxInputs.addEventListener('click', () => {
    for (const checkboxInput of checkboxInputs) {
      checkboxInput.checked = false;
    }

    checkboxInputs[checkboxInputs.length - 1].checked = true;
  });

  const checkboxBtnInputs = document.querySelectorAll('.checkbox-btn__input');
  const btnCheckboxBtnInputs = document.getElementById('id-mix-list-form-btn-12');
  btnCheckboxBtnInputs.addEventListener('click', () => {
    for (const checkboxBtnInput of checkboxBtnInputs) {
      checkboxBtnInput.checked = false;
    }

    checkboxBtnInputs[checkboxBtnInputs.length - 1].checked = true;
  });

  const radioInputs = document.querySelectorAll('.radio__input');
  const btnRadioInputs = document.getElementById('id-mix-list-form-btn-21');
  btnRadioInputs.addEventListener('click', () => {
    radioInputs[radioInputs.length - 1].checked = true;
  });

  const radioBtnInputs = document.querySelectorAll('.radio-btn__input');
  const btnRadioBtnInputs = document.getElementById('id-mix-list-form-btn-22');
  btnRadioBtnInputs.addEventListener('click', () => {
    radioBtnInputs[radioBtnInputs.length - 1].checked = true;
  });
}
