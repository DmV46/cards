import PopupImage from './popupImage.js';
import api from '../api.js';

const ownerID = '2d19ce65a75713945705606d';
const confirmDelete = 'Вы действительно хотите удалить эту карточку?';

export default class PlaceCard {
  constructor(cardData) {
    this.name = cardData.name;
    this.link = cardData.link;
    this.likes = cardData.likes;
    this.id = cardData._id;
    this.owner = cardData.owner;
    this.like = this.like.bind(this);
    this.remove = this.remove.bind(this);
    this.openImage = this.openImage.bind(this);
  }

  createCard() {
    const placeCard = document.createElement('div');
    placeCard.classList.add('place-card');
    placeCard.id = this.id;
    placeCard.innerHTML = `
            <div class="place-card__image"></div>
            <div class="place-card__description">
                <h3 class="place-card__name"></h3>
                <div class="place-card__container">
                    <button class="place-card__like-icon"></button>
                    <p class="place-card__count-like">0</p>
                </div>
            </div>`;

    if (this.owner._id === ownerID) {
      placeCard.querySelector('.place-card__image').innerHTML = '<button class="place-card__delete-icon"></button>';
      placeCard.querySelector('.place-card__delete-icon').addEventListener('click', this.remove);
    }

    this.likes.forEach((item) => {
      if (item._id === ownerID) {
        placeCard.querySelector('.place-card__like-icon')
          .classList.add('place-card__like-icon_liked');
      }
    });

    placeCard.querySelector('.place-card__name').textContent = this.name;
    placeCard.querySelector('.place-card__image').style.backgroundImage = `url(${this.link})`;
    placeCard.querySelector('.place-card__count-like').textContent = this.likes.length;

    placeCard.querySelector('.place-card__like-icon').addEventListener('click', this.like);
    placeCard.querySelector('.place-card__image').addEventListener('click', this.openImage);

    return placeCard;
  }

  like(e) {
    if (e.target.classList.contains('place-card__like-icon_liked')) {
      api.dislike(this.id)
        .then((result) => {
          e.target.nextElementSibling.textContent = result.likes.length;
          e.target.classList.remove('place-card__like-icon_liked');
        })
        .catch((err) => { throw new Error(err); });
    } else {
      api.like(this.id)
        .then((result) => {
          e.target.nextElementSibling.textContent = result.likes.length;
          e.target.classList.add('place-card__like-icon_liked');
        })
        .catch((err) => { throw new Error(err); });
    }
  }

  remove(e) {
    const result = window.confirm(confirmDelete);
    if (result) {
      const targetCard = e.target.closest('.place-card');
      /*
            Если бы контекст метода remove был привязан к классу, здесь можно
            было бы обращаться к свойствам класса через this и сделать удаление без
            использования event, например так:
            this.card.parentNode.removeChild(this.card);
            */

      // вот здесь так и не вкурил что он меня ревью хотел, пробовал пробовал не получилось

      // он имел ввиду - привяжи контекст remove и сделай удаление карточки через this.card,
      // без отслеживания e.target
      api.deleteCard(targetCard.id)
        .then(() => {
          targetCard.querySelector('.place-card__like-icon').removeEventListener('click', this.like);
          targetCard.querySelector('.place-card__image').removeEventListener('click', this.openImage);
          targetCard.querySelector('.place-card__delete-icon').removeEventListener('click', this.remove);
          targetCard.remove();
        })
        .catch((err) => { throw new Error(err); });
    }
  }

  openImage(e) {
    if (e.target.classList.contains('place-card__image')) {
      const popupImage = new PopupImage(this.link);
      popupImage.open();
    }
  }
}
