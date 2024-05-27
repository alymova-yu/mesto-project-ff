const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-13',
    headers: {
      authorization: 'bba36d42-d80f-49ca-ae96-738b7761565d',
      'Content-Type': 'application/json'
    }
};

function checkFetchResult (res) {
    if (res.ok) {
        return res.json();
    } 
    else {
        Promise.reject(`Ошибка: ${res.status}`)
    }
}

function getProfileInfo () {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
    .then((res) => {
        return checkFetchResult(res)
      })
}

function getCards () {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
    .then((res) => {
        return checkFetchResult(res)
      }) 
}

function updateProfileInfo (name, job) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: job
        })
    })
    .then((res) => {
        return checkFetchResult(res)
      })  
}

function updateProfileAvatar (imageAvatar) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar : imageAvatar
        })
    })
    .then((res) => {
        return checkFetchResult(res)
      }) 
}

function postNewCard (name, link) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name : name,
            link : link
        })
    })
    .then((res) => {
        return checkFetchResult(res)
    })
}

function deleteCard (idCard) {
    return fetch(`${config.baseUrl}/cards/${idCard}`, {
        method: 'DELETE',
        headers: config.headers
    })
}

function putLikeCard (idCard) {
    return fetch(`${config.baseUrl}/cards/likes/${idCard}`, {
        method: 'PUT',
        headers: config.headers
    })
    .then((res) => {
        return checkFetchResult(res)
    })
}

function deleteLikeCard (idCard) {
    return fetch(`${config.baseUrl}/cards/likes/${idCard}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then((res) => {
        return checkFetchResult(res)
    })
}

export {getProfileInfo,
    getCards, 
    updateProfileInfo, 
    updateProfileAvatar, 
    postNewCard, 
    deleteCard, 
    putLikeCard, 
    deleteLikeCard}