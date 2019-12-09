/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/prefer-default-export
export function createPopup(id, innerHTML) {
  const newPopup = document.createElement('div');
  newPopup.classList.add('popup');
  newPopup.id = id;
  newPopup.innerHTML = innerHTML;
  return newPopup;
}

/* ////////////////////
/// Validation FORM ///
//////////////////// */

const validationErrors = {
  EMPTY: 'Это обязательное поле',
  LENGTH: 'Должно быть от 2 до 30 символов',
  NOT_LINK: 'Должна быть ссылка',
};

function checkValidField(fieldInputs) {
  let isValid = 1;
  fieldInputs.forEach((input) => {
    isValid *= input.validity.valid;
  });
  return isValid;
}

function validateValue(value) {
  const inputText = value;

  if (inputText.validity.valid) {
    inputText.nextElementSibling.textContent = '';
  }

  if (inputText.validity.valueMissing) {
    inputText.nextElementSibling.textContent = validationErrors.EMPTY;
  }

  if (inputText.validity.tooLong || inputText.validity.tooShort) {
    inputText.nextElementSibling.textContent = validationErrors.LENGTH;
  }

  if (inputText.validity.typeMismatch) {
    inputText.nextElementSibling.textContent = validationErrors.NOT_LINK;
  }
}

function validateButton(isValid, button) {
  if (isValid) {
    button.removeAttribute('disabled');
    button.classList.add('popup__button_active');
  } else {
    button.setAttribute('disabled', true);
    button.classList.remove('popup__button_active');
  }
}

export function handlerValidateForm(event, fieldInputs, button) {
  validateButton(checkValidField(fieldInputs), button);
  validateValue(event.target);
}

export function renderLoadingData(isLoading, submitForm) {
  if (isLoading) {
    submitForm.style.fontSize = '15px';
    submitForm.textContent = 'Loading...';
  } else {
    submitForm.style.fontSize = '30px';
    submitForm.textContent = '+';
  }
}
