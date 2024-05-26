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
        console.log(`Ошибка: ${res.status}`);
    }
}

function getProfileInfo () {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
    .then((res) => {
        return checkFetchResult(res)
      })
    .catch((err) => {
        console.log(err);
      });  
}

function getCards () {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
    .then((res) => {
        return checkFetchResult(res)
      })
    .catch((err) => {
        console.log(err);
      });  
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
    .catch((err) => {
        console.log(err);
      });   
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
    .catch((err) => {
        console.log(err);
      });   
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
    .catch((err) => {
        console.log(err);
      });
}

function deleteCard (idCard) {
    fetch(`${config.baseUrl}/cards/${idCard}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .catch((err) => {
        console.log(err);
    });

}

function putLikeCard (idCard) {
    return fetch(`${config.baseUrl}/cards/likes/${idCard}`, {
        method: 'PUT',
        headers: config.headers
    })
    .then((res) => {
        return checkFetchResult(res)
    })
    .catch((err) => {
        console.log(err);
    });

}

function deleteLikeCard (idCard) {
    return fetch(`${config.baseUrl}/cards/likes/${idCard}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then((res) => {
        return checkFetchResult(res)
    })
    .catch((err) => {
        console.log(err);
    });

}

export {getProfileInfo,
    getCards, 
    updateProfileInfo, 
    updateProfileAvatar, 
    postNewCard, 
    deleteCard, 
    putLikeCard, 
    deleteLikeCard}