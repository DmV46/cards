import { handlerValidateForm } from '../helpers.js';

export default class Popup {
  constructor() {
    this.popup = null;
    this.validation = null;
    this.close = this.close.bind(this);
  }

  render() {
    this.popup = this.createPopup();
    document.querySelector('.root').appendChild(this.popup);
  }

  open() {
    this.render();
    this.popup.classList.add('popup_is-opened');
    this.addListener();
  }

  close() {
    this.removeListener();
    this.popup.classList.remove('popup_is-opened');
    this.popup.remove();
  }

  addListener() {
    this.popup.querySelector('.popup__close').addEventListener('click', this.close);
    if (this.popup.id !== 'placeCard__image') {
      this.popup.querySelector('.popup__form').addEventListener('submit', this.handlerSubmit);
      this.popup.querySelector('.popup__form').addEventListener('input', (e) => {
        handlerValidateForm(e, this.popup.querySelectorAll('input'), this.popup.querySelector('.popup__button'));
      });
    }
  }

  removeListener() {
    this.popup.querySelector('.popup__close').removeEventListener('click', this.close);
  }
}
