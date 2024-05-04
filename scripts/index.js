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
