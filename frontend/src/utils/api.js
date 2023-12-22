class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  _checkResponse(res){
    return res.ok ? res.json() : Promise.reject(`Ошибка checkResponse: ${res.status}`)};

  getUserInfo(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: { "Authorization": `Bearer ${token}` },
    })
      .then(this._checkResponse);
  }

  getInitialCards(token) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then(this._checkResponse);
  }

  editProfileInfo(dataUser, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        name: dataUser.username,
        about: dataUser.job,
      })
    })
      .then(this._checkResponse);
  }

  editAvatar(dataUser, token) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        avatar: dataUser.avatar,
      })
    })
      .then(this._checkResponse);
  }

  addNewCard(dataCard, token) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        name: dataCard.name,
        link: dataCard.link,
      }),
    })
      .then(this._checkResponse);
  }

  addLike(cardId, token) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(this._checkResponse);
  }

  deleteLike(cardId, token) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(this._checkResponse)
  }

  deleteCard(cardId, token) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(this._checkResponse)
  }
}

const api = new Api({
  baseUrl: 'https://api.marshennikova.nomoredomainsmonster.ru',
});

export default api;