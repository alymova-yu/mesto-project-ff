
import './pages/index.css';
import {initialCards} from './scripts/cards.js'

const cardTemplate = document.querySelector('#card-template').content; 
const cardList = document.querySelector('.places__list');  

function addCard(arrayElement, removeCard) {
    const userCard = cardTemplate.querySelector('.places__item').cloneNode(true);
    userCard.querySelector('.card__image').src = arrayElement.link;
    userCard.querySelector('.card__image').alt = arrayElement.name;
    userCard.querySelector('.card__title').textContent = arrayElement.name;
    userCard.querySelector('.card__delete-button').addEventListener('click', () => {removeCard(userCard)});
    return userCard;
}    

function removeElement(item) {
    item.remove();
}

initialCards.forEach(element => {
    const cardElement = addCard(element, removeElement);
    cardList.append(cardElement);
});


const page = document.querySelector('.page__content')
const editPopup = document.querySelector('.popup_type_edit'); 
const addPopup = document.querySelector('.popup_type_new-card'); 
const cardPopup = document.querySelector('.popup_type_image'); 

let profileTitle = document.querySelector('.profile__title');
let profilJob = document.querySelector('.profile__description');

let newCardTitle = document.querySelector('.popup__input_type_card-name');
let newCardLink = document.querySelector('.popup__input_type_url');

const formElement = document.forms.editProfile;
const formPlace = document.forms.newPlace;
const nameInput = formElement.querySelector('.popup__input_type_name')
const jobInput = formElement.querySelector('.popup__input_type_description')

page.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('profile__edit-button')) {
        editPopup.classList.add("popup_is-opened");  
    }
    else if (evt.target.classList.contains('profile__add-button')){
        addPopup.classList.add("popup_is-opened");

    }
    else if (evt.target.classList.contains('card__image')){
        let popupImg = document.querySelector('.popup__image');
        let popupText = document.querySelector('.popup__caption');
        popupImg.setAttribute('src', evt.target.getAttribute('src'));
        popupImg.setAttribute('alt', evt.target.getAttribute('alt'));
        popupText.textContent = evt.target.getAttribute('alt');
        cardPopup.classList.add("popup_is-opened");

    }
})



page.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup__close')) {
        editPopup.classList.remove("popup_is-opened");  
        addPopup.classList.remove("popup_is-opened");
        cardPopup.classList.remove("popup_is-opened");
    }
})



nameInput.value = profileTitle.textContent
jobInput.value = profilJob.textContent

function handleFormSubmit(evt) {
    evt.preventDefault(); 
    profileTitle.textContent = nameInput.value
    profilJob.textContent = jobInput.value
    editPopup.classList.remove("popup_is-opened")
}

function newCard(evt) {
    evt.preventDefault(); 
    
    const elementCard = {name: newCardTitle.value, link: newCardLink.value}
    console.log(elementCard)
    initialCards
    
    

    
}

formElement.addEventListener('submit', handleFormSubmit);
formPlace.addEventListener('submit', newCard);