// создать класс
class Api {
  //создать конструктор класса
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }
  // создать метод для возвращения json
  #getResponseData(res) {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так ${res.status}`);
  }
  // создать метод профиля класса
  getUserInfo() {
    // исполнить запрос
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this.#getResponseData);
  }
  // метод добавления первоначальных карточек
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this.#getResponseData);
  }
  // метод добавления информации о пользователе на сервер
  patchDataUser(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this.#getResponseData);
  }
  // создать метод создания карты на сервере
  postDataCards(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this.#getResponseData);
  }
  // создать метод удаления карты на сервере
  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
        method: "DELETE",
        headers: this._headers,
    }).then(this.#getResponseData);
  }
  // создать метод лайка карточки
  likeState(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: "PUT",
        headers: this._headers,
    }).then(this.#getResponseData);
  }
  // создать метод дизлайка карточки
  dislikeState(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: "DELETE",
        headers: this._headers,
    }).then(this.#getResponseData);
  }
  // создать метод изменения аватара
  changeAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify(data),
    }).then(this.#getResponseData);
  }
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-69",
  headers: {
      authorization: "e7ba1a9e-f2b7-42f1-b3b7-db01471a0a76",
      "Content-Type": "application/json",
  }
});

export default api;