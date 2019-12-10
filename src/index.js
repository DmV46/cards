import "./style.css";
import placesList from '../js/placeList.js';
import PopupNewCard from '../js/classes/popupNewCard.js';
import PopupUserProfile from '../js/classes/popupUserProfile.js';
import PopupAvatar from '../js/classes/popupAvatar.js';
import api from '../js/api.js';

const btnOpenAddCard = document.querySelector('.user-info__button');
const btnOpenEditProfile = document.querySelector('.user-info__edit');
const btnAvatar = document.querySelector('.user-info__photo_button');

// const placesList = new PlacesList(document.querySelector('.places-list'), []);

api.getUserProfile()
  .then((profile) => {
    document.querySelector('.user-info__name').textContent = profile.name;
    document.querySelector('.user-info__job').textContent = profile.about;
    document.querySelector('.user-info__photo').style.backgroundImage = `url(${profile.avatar})`;
  })
  .catch((err) => { throw new Error(err); });

api.getInitialCards()
  .then((cards) => {
    // console.log(cards);
    cards.forEach((card) => placesList.addCard(card));
  })
  .catch((err) => { throw new Error(err); });

btnOpenAddCard.addEventListener('click', () => {
  const popupNewCard = new PopupNewCard();
  popupNewCard.open();
});

btnOpenEditProfile.addEventListener('click', () => {
  const popupEdit = new PopupUserProfile();
  popupEdit.open();

  const formEditProfile = document.forms.edit;
  formEditProfile.elements.user.value = document.querySelector('.user-info__name').textContent;
  formEditProfile.elements.about.value = document.querySelector('.user-info__job').textContent;
});

btnAvatar.addEventListener('click', () => {
  const popupAvatar = new PopupAvatar();
  popupAvatar.open();
});

// export default { placesList };
