import Popup from './popup.js';
import api from '../api.js';
import { createPopup } from '../helpers.js';

export default class PopupAvatar extends Popup {
  constructor() {
    super();
    const id = 'avatar';
    // type="url"
    const innerHTML = `
      <div class="popup__content">
        <img src="../images/close.svg" alt="" class="popup__close popup__close_addCard" >
        <h3 class="popup__title">Обновить аватар</h3>
        <form class="popup__form" name="avatar">
            <input  name="linkAvatar" class="popup__input" placeholder="Ссылка на картинку" required>
            <p class="popup__input_invalide"></p>
            <button type="submit" class="button popup__button popup__button_size-text_S" disabled="true">Сохранить</button>
            </form>
      </div>`;

    this.createPopup = () => createPopup(id, innerHTML);
    this.handlerSubmit = this.handlerSubmit.bind(this);
  }

  handlerSubmit(e) {
    e.preventDefault();
    const form = this.popup.querySelector('.popup__form');
    this.renderLoading(true, this.popup.querySelector('.button'));
    api.patchAvatar(form.elements.linkAvatar.value)
      .then((result) => {
        document.querySelector('.user-info__photo').style.backgroundImage = `url(${result.avatar})`;
        this.close();
      })
      .catch((err) => { throw new Error(err); })
      .finally(this.renderLoading(false, this.popup.querySelector('.button')));
  }
}
