import Popup from './popup.js';
import api from '../api.js';
import { createPopup, renderLoadingData } from '../helpers.js';
import closeImg from '../../images/close.svg';

export default class PopupUserProfile extends Popup {
  constructor() {
    super();
    const id = 'edit-profile';
    const innerHTML = `
      <div class="popup__content">
        <img src="${closeImg}" alt="close" class="popup__close">
        <h3 class="popup__title">Редактировать профиль</h3>
        <form class="popup__form" name="edit">
          <input type="text" name="user" class="popup__input"  placeholder="Имя" required minlength="2" maxlength="30">
          <p class="popup__input_invalide"></p>
          <input type="text" name="about" class="popup__input"  placeholder="О себе" required minlength="2" maxlength="30">
          <p class="popup__input_invalide"></p>
          <button type="submit" class="button popup__button popup__button_active">+</button>
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
      .patchInfoUser(form.elements.user.value, form.elements.about.value)
      .then(profile => {
        document.querySelector('.user-info__name').textContent = profile.name;
        document.querySelector('.user-info__job').textContent = profile.about;
        this.close();
      })
      .catch(err => {
        throw new Error(err);
      })
      .finally(renderLoadingData(false, this.popup.querySelector('.button')));
  }
}
