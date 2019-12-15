import Popup from './popup.js';
import { createPopup } from '../helpers.js';
import closeImg from '../../images/close.svg';

export default class PopupImage extends Popup {
  constructor(link) {
    super();
    this.link = link;
    const id = 'placeCard__image';
    const innerHTML = `
    <div class="popup__container-image">
      <img class="popup__placeCard-image" src="${this.link}" alt="Picture">
      <img src="${closeImg}" alt="close" class="popup__close">
    </div>
    `;
    this.createPopup = () => createPopup(id, innerHTML);
  }
}
