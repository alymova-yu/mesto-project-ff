import {cardTemplate} from '../index.js'

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

function likeCard (evt){
    if (evt.target.classList.contains('card__like-button')){
        evt.target.classList.toggle('card__like-button_is-active')
    }
}

export {addCard, removeElement, likeCard};