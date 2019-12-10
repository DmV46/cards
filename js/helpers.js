/* ////////////////////
/// Validation FORM ///
//////////////////// */

const validationErrors = {
  EMPTY: 'Это обязательное поле',
  LENGTH: 'Должно быть от 2 до 30 символов',
  NOT_LINK: 'Должна быть ссылка',
};

const RegExpUrl="^((https?|ftp)\:\/\/)?((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|(www\.)?[a-z\d_-]{2,}(\.[a-z\d-_]{2,})+)(\:([0-9]{1,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5]))?([\/a-z\d]*#?)*$";

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
  
  // if (inputText.validity.typeMismatch) {
  //   inputText.nextElementSibling.textContent = validationErrors.NOT_LINK;
  // }
  if (inputText.hasAttribute('url')) {
    // if(!RegExpUrl.test(inputText.value)){
      alert('ok test');
      // inputText.validity.valid = false;
      // inputText.nextElementSibling.textContent = validationErrors.NOT_LINK;
    // }

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

/* ////////////////////
/// Create POPUP ///
//////////////////// */

export function createPopup(id, innerHTML) {
  const newPopup = document.createElement('div');
  newPopup.classList.add('popup');
  newPopup.id = id;
  newPopup.innerHTML = innerHTML;
  return newPopup;
}
