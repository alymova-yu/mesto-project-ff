import { openPopup } from "./modal.js";

const cardTemplate = document.querySelector('#card-template').content; 
const popupImg = document.querySelector('.popup__image');
const popupText = document.querySelector('.popup__caption');
const cardPopup = document.querySelector('.popup_type_image');

function createCard(arrayElement, removeCard, likeFunction) {
    const userCard = cardTemplate.querySelector('.places__item').cloneNode(true);
    const userCardImage = userCard.querySelector('.card__image')
    const cardLikeButton = userCard.querySelector('.card__like-button')
    userCardImage.src = arrayElement.link;
    userCardImage.alt = arrayElement.name;
    userCard.querySelector('.card__title').textContent = arrayElement.name;
    userCard.querySelector('.card__delete-button').addEventListener('click', () => {removeCard(userCard)});
    cardLikeButton.addEventListener('click', likeFunction)
    userCardImage.addEventListener('click', openPopapImage)
    return userCard;
}

function openPopapImage (evt) {
    if (evt.target.classList.contains('card__image')) {
        popupImg.setAttribute('src', evt.target.getAttribute('src'));
        popupImg.setAttribute('alt', evt.target.getAttribute('alt'));
        popupText.textContent = evt.target.getAttribute('alt');
        openPopup(cardPopup);
    }
}

function removeElement(item) {
    item.remove();
}

function likeCard (evt){
    evt.target.classList.toggle('card__like-button_is-active')
}

export {createCard, removeElement, likeCard};