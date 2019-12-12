import Popup from './popup.js';
import { createPopup } from '../helpers.js';

export default class PopupImage extends Popup {
  constructor(link) {
    super();
    this.link = link;
    const id = 'placeCard__image';
    const innerHTML = `
    <div class="popup__container-image">
      <img class="popup__placeCard-image" src="${this.link}" alt="Picture">
      <img src="../../images/close.svg" alt="close" class="popup__close popup__close_editProfile">
    </div>
    `;
    this.createPopup = () => createPopup(id, innerHTML);
  }
}
