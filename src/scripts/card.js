import {putLikeCard, deleteLikeCard} from './api.js'

const cardTemplate = document.querySelector('#card-template').content; 

function deleteLikePromise(id) {
    return new Promise(function (resolve) {
      const result = deleteLikeCard(id)
      resolve(result)
    })
}

function putLikePromise(id) {
    return new Promise(function (resolve) {
      const result = putLikeCard(id)
      resolve(result)
    })
}

function createCard(cardData, removeCard, likeFunction, openPopapImage, myId, deleteFunction) {
    const userCard = cardTemplate.querySelector('.places__item').cloneNode(true);
    const userCardImage = userCard.querySelector('.card__image')
    const cardLikeButton = userCard.querySelector('.card__like-button')
    const cardLikeNumber = userCard.querySelector('.card__like-number')
    const cardDeleteButton = userCard.querySelector('.card__delete-button')
    if (cardData.owner._id !== myId) {
        cardDeleteButton.style.display = 'none'
    }
    userCardImage.src = cardData.link;
    userCardImage.alt = cardData.name;
    userCard.id = cardData._id;
    cardLikeNumber.textContent = cardData.likes.length;

    userCard.querySelector('.card__title').textContent = cardData.name;
    cardDeleteButton.addEventListener('click', () => {
        deleteFunction(cardData._id)
        removeCard(userCard)
    });
    const arrayLikes = []
    cardData.likes.forEach((element) => {
        arrayLikes.push(element._id)
    })
    if (arrayLikes.includes(myId)){
        likeFunction(cardLikeButton)
    }
    cardLikeButton.addEventListener('click', (evt) => {
        if (cardLikeButton.classList.contains('card__like-button_is-active')) {
            likeFunction(evt.target)
            deleteLikePromise(cardData._id)
            .then((res) =>{
                cardLikeNumber.textContent = res.likes.length;
            })
            .catch(() => {
                console.log('Запрос не удался')
            })
        } else {
            likeFunction(evt.target)
            putLikePromise(cardData._id)
            .then((res) =>{
                cardLikeNumber.textContent = res.likes.length;
            })
            .catch(() => {
                console.log('Запрос не удался')
            })
        }
    });

    userCardImage.addEventListener('click', () => openPopapImage(cardData));
    return userCard;
}

function removeElement(item) {
    item.remove();
}

function likeCard (evt){
    evt.classList.toggle('card__like-button_is-active')
}

export {createCard, removeElement, likeCard};