
import './pages/index.css';
import {initialCards} from './scripts/cards.js'

const cardTemplate = document.querySelector('#card-template').content; 
const cardList = document.querySelector('.places__list');  

function addCard(arrayElement, removeCard, likeFunction) {
    const userCard = cardTemplate.querySelector('.places__item').cloneNode(true);
    userCard.querySelector('.card__image').src = arrayElement.link;
    userCard.querySelector('.card__image').alt = arrayElement.name;
    userCard.querySelector('.card__title').textContent = arrayElement.name;
    userCard.querySelector('.card__delete-button').addEventListener('click', () => {removeCard(userCard)});
    userCard.addEventListener('click', likeFunction)
    return userCard;
}    

function removeElement(item) {
    item.remove();
}

initialCards.forEach(element => {
    const cardElement = addCard(element, removeElement, likeCard);
    cardList.append(cardElement);
});

const editPopup = document.querySelector('.popup_type_edit'); 
const addPopup = document.querySelector('.popup_type_new-card'); 
const cardPopup = document.querySelector('.popup_type_image'); 

const closeKay = "Escape"

let profileTitle = document.querySelector('.profile__title');
let profilJob = document.querySelector('.profile__description');

let newCardTitle = document.querySelector('.popup__input_type_card-name');
let newCardLink = document.querySelector('.popup__input_type_url');

const formElement = document.forms.editProfile;
const formPlace = document.forms.newPlace;
const nameInput = formElement.querySelector('.popup__input_type_name')
const jobInput = formElement.querySelector('.popup__input_type_description')
const editButton = document.querySelector('.profile__edit-button')
const addButton = document.querySelector('.profile__add-button')


function keyListen (evt) {
    if (evt.key === closeKay){
        document.querySelector('.popup_is-opened').classList.remove("popup_is-opened");
        document.removeEventListener('keydown', keyListen);
    }
}

function openPopup (item) {
    item.classList.add("popup_is-opened");
    document.addEventListener('keydown', keyListen);
    item.addEventListener('click', closePopup);
}


function closePopup(evt){
    let activePopup = document.querySelector('.popup_is-opened')
    if (evt.target.classList.contains('popup__close') || evt.target === evt.currentTarget){
        activePopup.classList.remove("popup_is-opened");
        document.removeEventListener('keydown', keyListen);
    }
    
}

editButton.addEventListener('click', function (evt) {
    openPopup(editPopup);
})

addButton.addEventListener('click', function (evt) {
    openPopup(addPopup);
})

cardList.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('card__image')) {
        let popupImg = document.querySelector('.popup__image');
        let popupText = document.querySelector('.popup__caption');
        popupImg.setAttribute('src', evt.target.getAttribute('src'));
        popupImg.setAttribute('alt', evt.target.getAttribute('alt'));
        popupText.textContent = evt.target.getAttribute('alt');
        openPopup(cardPopup);
    }
})


function likeCard (evt){
    if (evt.target.classList.contains('card__like-button')){
        evt.target.classList.toggle('card__like-button_is-active')
    }
}

// editButton.addEventListener('click', function (evt) {
//     let currentPopup
//     if (evt.target.classList.contains('profile__edit-button')) {
//         currentPopup = editPopup;  
//     }
//     else if (evt.target.classList.contains('profile__add-button')){
//         currentPopup = addPopup;
//     }
//     else if (evt.target.classList.contains('card__image')){
//         
//         currentPopup = cardPopup;
//     }
//     currentPopup.classList.add("popup_is-opened");
//     currentPopup.addEventListener('click', closePopup);
// })





// page.addEventListener('click', function (evt) {
//     if (evt.target.classList.contains('popup__close')) {
//         closePopup(editPopup); 
//         closePopup(addPopup);
//         closePopup(cardPopup);
//     }
// })
// page.addEventListener('click', function (evt){
//     let currentPopup = evt.target.closest('popup');
//     console.log(currentPopup)
//     //classList.add("popup_is-opened");


// })


// page.addEventListener('click', function (evt) {
//     if (!evt.target.classList.contains('popup__content')) {
   
//     }
// })

// 

// function closePopup(evt){
//     if (evt.target.classList.contains('popup__close') || evt.target === evt.currentTarget) {
//         evt.target.closest('.popup').classList.remove("popup_is-opened");
//     } 
//     page.removeEventListener('keydown', keyListen);
// }



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
    const newEl = addCard(elementCard, removeElement);
    cardList.prepend(newEl);
    formPlace.reset();
    addPopup.classList.remove("popup_is-opened")
    
    
}



formElement.addEventListener('submit', handleFormSubmit);
formPlace.addEventListener('submit', newCard);