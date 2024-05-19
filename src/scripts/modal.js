const escapeKey = "Escape";

function openPopup (item) {
    item.classList.add("popup_is-opened");
    document.addEventListener('keydown', handleEscape);
    item.addEventListener('click', handlePopupClose);
}

function handlePopupClose (evt) {
    if (evt.target.classList.contains('popup__close') || evt.target === evt.currentTarget){
        closePopup(evt.currentTarget)
    }
}

function closePopup(item){
    item.classList.remove("popup_is-opened");
    document.removeEventListener('keydown', handleEscape); 
    item.removeEventListener('click', handlePopupClose);
}

function handleEscape (evt) {
    if (evt.key === escapeKey){
        closePopup(document.querySelector('.popup_is-opened'))
    }
}

function setPopupAnimation (popup) {
    popup.classList.add('popup_is-animated')
}

export {openPopup, setPopupAnimation, closePopup}