const cardTemplate = document.querySelector('#card-template').content; 
const cardList = document.querySelector('.places__list'); 

function addCard(arrayElementNumber, removeCard) {
    const userCard = cardTemplate.querySelector('.places__item').cloneNode(true);
    userCard.querySelector('.card__image').src = initialCards[arrayElementNumber].link;
    userCard.querySelector('.card__title').textContent = initialCards[arrayElementNumber].name;
    userCard.querySelector('.card__delete-button').addEventListener('click', () => {removeCard(userCard)});
    return userCard;
}    

function removeElement(item) {
    item.remove();
}

for (i = 0; i < initialCards.length; i++) {
    const cardElement = addCard(i, removeElement);
    cardList.append(cardElement);
}
