import './pages/index.css';
import {initialCards} from './scripts/cards.js';
import {addCard, removeElement, likeCard} from './scripts/card.js';
import {openPopup, closePopup, closeRules, popupAnimation} from './scripts/modal.js'

const cardTemplate = document.querySelector('#card-template').content; 
const cardList = document.querySelector('.places__list');  
const editPopup = document.querySelector('.popup_type_edit'); 
const addPopup = document.querySelector('.popup_type_new-card'); 
const cardPopup = document.querySelector('.popup_type_image'); 
const closeKay = "Escape"
const formElement = document.forms.editProfile;
const formPlace = document.forms.newPlace;
const nameInput = formElement.querySelector('.popup__input_type_name')
const jobInput = formElement.querySelector('.popup__input_type_description')
const editButton = document.querySelector('.profile__edit-button')
const addButton = document.querySelector('.profile__add-button')
const popups = document.querySelectorAll('.popup')
const profileTitle = document.querySelector('.profile__title');
const profilJob = document.querySelector('.profile__description');
const newCardTitle = document.querySelector('.popup__input_type_card-name');
const newCardLink = document.querySelector('.popup__input_type_url');

function handleFormSubmit(evt) {
    evt.preventDefault(); 
    profileTitle.textContent = nameInput.value
    profilJob.textContent = jobInput.value
    closePopup(editPopup);
}

function newCard(evt) {
    evt.preventDefault(); 
    const elementCard = {name: newCardTitle.value, link: newCardLink.value}
    const newEl = addCard(elementCard, removeElement);
    cardList.prepend(newEl);
    formPlace.reset();
    closePopup(addPopup);
}


initialCards.forEach(element => {
    const cardElement = addCard(element, removeElement, likeCard);
    cardList.append(cardElement);
});

popups.forEach(el => {popupAnimation(el)})

editButton.addEventListener('click', function (evt) {
    openPopup(editPopup, closeRules);
})

addButton.addEventListener('click', function (evt) {
    openPopup(addPopup, closeRules);
})

cardList.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('card__image')) {
        const popupImg = document.querySelector('.popup__image');
        const popupText = document.querySelector('.popup__caption');
        popupImg.setAttribute('src', evt.target.getAttribute('src'));
        popupImg.setAttribute('alt', evt.target.getAttribute('alt'));
        popupText.textContent = evt.target.getAttribute('alt');
        openPopup(cardPopup, closeRules);
    }
})

nameInput.value = profileTitle.textContent
jobInput.value = profilJob.textContent

formElement.addEventListener('submit', handleFormSubmit);
formPlace.addEventListener('submit', newCard);

export {cardTemplate, closeKay}