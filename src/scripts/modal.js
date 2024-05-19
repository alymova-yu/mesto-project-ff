import {closeKay} from '../index.js'

function openPopup (item, closeFunction) {
    item.classList.add("popup_is-opened");
    document.addEventListener('keydown', listenKey);
    item.addEventListener('click', closeFunction);
}

function closeRules (evt) {
    const activePopup = document.querySelector('.popup_is-opened')
    if (evt.target.classList.contains('popup__close') || evt.target === evt.currentTarget){
        closePopup(activePopup)
    }
}

function closePopup(item){
    item.classList.remove("popup_is-opened");
    document.removeEventListener('keydown', listenKey); 
    item.removeEventListener('click', closeRules);
}

function listenKey (evt) {
    if (evt.key === closeKay){
        closePopup(document.querySelector('.popup_is-opened'))
    }
}

function popupAnimation (popup) {
    popup.classList.add('popup_is-animated')
}

export {openPopup, popupAnimation, closePopup, closeRules}