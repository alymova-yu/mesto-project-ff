import './pages/index.css';
import {createCard, removeElement, likeCard} from './scripts/card.js';
import {openPopup, closePopup, setPopupAnimation} from './scripts/modal.js';
import {enableValidation, clearValidation, validationSet} from './scripts/validaton.js';
import {getProfileInfo, getCards, updateProfileInfo, updateProfileAvatar, postNewCard, deleteCard} from './scripts/api.js';


const cardList = document.querySelector('.places__list');  
const editPopup = document.querySelector('.popup_type_edit'); 
const addPopup = document.querySelector('.popup_type_new-card');  
const newAvatarPopup = document.querySelector('.popup_type_new-avatar'); 
const popupImg = document.querySelector('.popup__image');
const popupText = document.querySelector('.popup__caption');
const cardPopup = document.querySelector('.popup_type_image');
const profileForm = document.forms.editProfile;
const newPlaceForm = document.forms.newPlace;
const newAvatarForm = document.forms.newAvatar;
const nameInput = profileForm.querySelector('.popup__input_type_name');
const avatarInput = newAvatarForm.querySelector('.popup__input_type_avatar');
const jobInput = profileForm.querySelector('.popup__input_type_description')
const editButton = document.querySelector('.profile__edit-button')
const addButton = document.querySelector('.profile__add-button')
const popups = document.querySelectorAll('.popup')
const profileTitle = document.querySelector('.profile__title');
const profilJob = document.querySelector('.profile__description');
const profilImage = document.querySelector('.profile__image')
const newCardTitle = document.querySelector('.popup__input_type_card-name');
const newCardLink = document.querySelector('.popup__input_type_url');


function putProfileInfo (result) {
    profileTitle.textContent=result.name;
    profilJob.textContent=result.about
    profilImage.style.backgroundImage = "url(" + result.avatar + ")";
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault(); 
    const currentSubmitButton = evt.target.querySelector('.popup__button')
    currentSubmitButton.textContent = 'Сохранение...'
    
    updateProfileInfo(nameInput.value, jobInput.value)
    .then((res) => {
        putProfileInfo(res);
        closePopup(editPopup);
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        currentSubmitButton.textContent = 'Сохранить'
    });   
}

function handleImageClick (cardData) {
    popupImg.setAttribute('src', cardData.link);
    popupImg.setAttribute('alt', cardData.name);
    popupText.textContent = cardData.name;
    openPopup(cardPopup);
}


function addNewCard(evt) {
    evt.preventDefault(); 
    const currentSubmitButton = evt.target.querySelector('.popup__button')
    currentSubmitButton.textContent = 'Сохранение...'
    postNewCard(newCardTitle.value, newCardLink.value)
    .then((res) => {
        const idOwner = res.owner._id
        const newEl = createCard(res, removeElement, likeCard, handleImageClick, idOwner, deleteCard);
        cardList.prepend(newEl);
        closePopup(addPopup);
    })
    .catch((err) => {
        console.log(err);
    })  
    .finally(() => {
        currentSubmitButton.textContent = 'Сохранить'
    })
    
}


function editAvatar(evt) {
    evt.preventDefault(); 
    const currentSubmitButton = evt.target.querySelector('.popup__button')
    currentSubmitButton.textContent = 'Сохранение...'
    updateProfileAvatar(avatarInput.value)
    .then((res) => {
        putProfileInfo(res);
        closePopup(newAvatarPopup);
    })
    .catch((err) => {
        console.log(err);
    })  
    .finally(() => {
        currentSubmitButton.textContent = 'Сохранить'
    })
}

popups.forEach(setPopupAnimation)

editButton.addEventListener('click', function () {
    nameInput.value = profileTitle.textContent
    jobInput.value = profilJob.textContent;
    clearValidation(profileForm, validationSet) 
    openPopup(editPopup);
})

addButton.addEventListener('click', function () {
    clearValidation(newPlaceForm, validationSet);
    newPlaceForm.reset();
    openPopup(addPopup);
})

profilImage.addEventListener('click', () => {
    newAvatarForm.reset();
    clearValidation(newAvatarForm, validationSet)
    openPopup(newAvatarPopup);
})

enableValidation(validationSet);

Promise.all([getProfileInfo(), getCards()])
.then(res => {
    res[1].forEach(element => {
        const cardElement = createCard(element, removeElement, likeCard, handleImageClick, res[0]._id, deleteCard);
        cardList.append(cardElement);
    });
    profileForm.addEventListener('submit', handleProfileFormSubmit);
    newPlaceForm.addEventListener('submit', addNewCard);
    newAvatarForm.addEventListener('submit', editAvatar);
    putProfileInfo(res[0])
})
.catch((err) => {
    console.log(err);
})  
