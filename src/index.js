import './pages/index.css';
import {initialCards} from './scripts/cards.js';
import {createCard, removeElement, likeCard} from './scripts/card.js';
import {openPopup, closePopup, setPopupAnimation} from './scripts/modal.js'


const cardList = document.querySelector('.places__list');  
const editPopup = document.querySelector('.popup_type_edit'); 
const addPopup = document.querySelector('.popup_type_new-card');  
const profileForm = document.forms.editProfile;
const newPlaceForm = document.forms.newPlace;
const nameInput = profileForm.querySelector('.popup__input_type_name')
const jobInput = profileForm.querySelector('.popup__input_type_description')
const editButton = document.querySelector('.profile__edit-button')
const addButton = document.querySelector('.profile__add-button')
const popups = document.querySelectorAll('.popup')
const profileTitle = document.querySelector('.profile__title');
const profilJob = document.querySelector('.profile__description');
const newCardTitle = document.querySelector('.popup__input_type_card-name');
const newCardLink = document.querySelector('.popup__input_type_url');


function handleProfileFormSubmit(evt) {
    evt.preventDefault(); 
    profileTitle.textContent = nameInput.value
    profilJob.textContent = jobInput.value
    closePopup(editPopup);
}

function addNewCard(evt) {
    evt.preventDefault(); 
    const elementCard = {name: newCardTitle.value, link: newCardLink.value}
    const newEl = createCard(elementCard, removeElement, likeCard);
    cardList.prepend(newEl);
    newPlaceForm.reset();
    closePopup(addPopup);
}

initialCards.forEach(element => {
    const cardElement = createCard(element, removeElement, likeCard);
    cardList.append(cardElement);
});

popups.forEach(setPopupAnimation)

editButton.addEventListener('click', function () {
    nameInput.value = profileTitle.textContent
    jobInput.value = profilJob.textContent 
    openPopup(editPopup);
})

addButton.addEventListener('click', function () {
    openPopup(addPopup);
})

profileForm.addEventListener('submit', handleProfileFormSubmit);
newPlaceForm.addEventListener('submit', addNewCard);
