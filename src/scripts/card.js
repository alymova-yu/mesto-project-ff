import { openPopup } from "./modal.js";

const cardTemplate = document.querySelector('#card-template').content; 


function createCard(cardData, removeCard, likeFunction, openPopapImage) {
    const userCard = cardTemplate.querySelector('.places__item').cloneNode(true);
    const userCardImage = userCard.querySelector('.card__image')
    const cardLikeButton = userCard.querySelector('.card__like-button')
    userCardImage.src = cardData.link;
    userCardImage.alt = cardData.name;
    userCard.querySelector('.card__title').textContent = cardData.name;
    userCard.querySelector('.card__delete-button').addEventListener('click', () => {removeCard(userCard)});
    cardLikeButton.addEventListener('click', likeFunction)
    userCardImage.addEventListener('click', () => openPopapImage(cardData));
    return userCard;
}


function removeElement(item) {
    item.remove();
}

function likeCard (evt){
    evt.target.classList.toggle('card__like-button_is-active')
}

export {createCard, removeElement, likeCard};