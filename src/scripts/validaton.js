
function showInputError(formElement, inputElement, errorMessage, {inputErrorClass='', errorClass=''}) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
    
};
  
function hideInputError(formElement, inputElement, {inputErrorClass='', errorClass=''}) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
};
  
function checkInputValidity (formElement, inputElement) {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
        
    };
    
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, validationSet);
    } else {
        hideInputError(formElement, inputElement, validationSet);
    }
};

function setEventListeners(formElement, {inputSelector='', submitButtonSelector=''}) {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement, validationSet)
        });
    })
};

function enableValidation({formSelector=''}){
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('sumit', (evt) => {
        evt.preventDefault();
      });
      setEventListeners(formElement, validationSet)
    })
};


function hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}; 

function toggleButtonState (inputList, buttonElement, {inactiveButtonClass=''}) {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(inactiveButtonClass);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(inactiveButtonClass);
    }
}; 

function clearValidation(formElement, {submitButtonSelector='', inputSelector='', inputErrorClass='', errorClass=''}){
    const buttonElement = formElement.querySelector(submitButtonSelector);
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    inputList.forEach((element) => {
        element.classList.remove(inputErrorClass);
        const errorElement = formElement.querySelector(`.${element.id}-error`);
        errorElement.classList.remove(errorClass);
        errorElement.textContent = '';
    }) 
    toggleButtonState(inputList, buttonElement, validationSet)
}

const validationSet = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
}

export {enableValidation, clearValidation, validationSet}