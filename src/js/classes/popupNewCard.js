import Popup from './popup.js';
import api from '../api.js';
import placesList from '../placeList.js';
import { createPopup, renderLoadingData } from '../helpers.js';
import closeImg from '../../images/close.svg';

export default class PopupNewCard extends Popup {
  constructor() {
    super();
    const id = 'add-card';
    const innerHTML = `
      <div class="popup__content">
        <img src="${closeImg}" alt="close" class="popup__close" >
        <h3 class="popup__title">Новое место</h3>
        <form class="popup__form" name="new">
          <input type="text" name="titleCard" class="popup__input " placeholder="Название" required minlength="2" maxlength="30">
          <p class="popup__input_invalide"></p>
          <input type="url" name="linkCard" class="popup__input" placeholder="Ссылка на картинку" required>
          <p class="popup__input_invalide"></p>
          <button type="submit" class="button popup__button" disabled="true">+</button>
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
      .postNewCard(form.elements.titleCard.value, form.elements.linkCard.value)
      .then(card => {
        placesList.addCard(card);
        this.close();
      })
      .catch(err => {
        throw new Error(err);
      })
      .finally(renderLoadingData(false, this.popup.querySelector('.button')));
  }
}
