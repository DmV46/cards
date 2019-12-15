import Popup from './popup.js';
import api from '../api.js';
import { createPopup, renderLoadingData } from '../helpers.js';
import closeImg from '../../images/close.svg';

export default class PopupAvatar extends Popup {
  constructor() {
    super();
    const id = 'avatar';
    const innerHTML = `
      <div class="popup__content">
        <img src="${closeImg}" alt="close" class="popup__close" >
        <h3 class="popup__title">Обновить аватар</h3>
        <form class="popup__form" name="avatar">
          <input type="url" name="linkAvatar" class="popup__input" placeholder="Ссылка на картинку" required>
          <p class="popup__input_invalide"></p>
          <button type="submit" class="button popup__button popup__button_size-text_S" disabled="true">Сохранить</button>
          </form>
      </div>`;

    this.createPopup = () => createPopup(id, innerHTML);
    this.handlerSubmit = this.handlerSubmit.bind(this);
  }

  handlerSubmit(event) {
    event.preventDefault();
    const form = this.popup.querySelector('.popup__form');
    renderLoadingData(true, this.popup.querySelector('.button'));
    api
      .patchAvatar(form.elements.linkAvatar.value)
      .then(result => {
        document.querySelector('.user-info__photo').style.backgroundImage = `url(${result.avatar})`;
        this.close();
      })
      .catch(err => {
        throw new Error(err);
      })
      .finally(renderLoadingData(false, this.popup.querySelector('.button')));
  }
}
