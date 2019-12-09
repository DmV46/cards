import PlaceCard from './placeCard.js';

export default class PlacesList {
  constructor(container, cards) {
    this.container = container;
    this.cards = cards;
  }

  addCard(cardData) {
    const card = new PlaceCard(cardData);
    this.container.appendChild(card.createCard());
  }
}
