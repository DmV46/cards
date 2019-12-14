function getResponseData(response) {
  if (response.ok) {
    return response.json();
  }

  return Promise.reject(new Error(`Ошибка: ${response.status}`));
}

export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  async patchInfoUser(name, about) {
    const response = await fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name,
        about,
      }),
    });

    return getResponseData(response);
  }

  async getUserProfile() {
    const response = await fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    });

    return getResponseData(response);
  }

  async getInitialCards() {
    const response = await fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
    });

    return getResponseData(response);
  }

  async postNewCard(name, link) {
    const response = await fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name,
        link,
      }),
    });

    return getResponseData(response);
  }

  async deleteCard(targetIdCard) {
    const response = await fetch(`${this.baseUrl}/cards/${targetIdCard}`, {
      method: 'DELETE',
      headers: this.headers,
    });

    return getResponseData(response);
  }

  async like(targetIdCard) {
    const response = await fetch(`${this.baseUrl}/cards/like/${targetIdCard}`, {
      method: 'PUT',
      headers: this.headers,
    });

    return getResponseData(response);
  }

  async dislike(targetIdCard) {
    const response = await fetch(`${this.baseUrl}/cards/like/${targetIdCard}`, {
      method: 'DELETE',
      headers: this.headers,
    });

    return getResponseData(response);
  }

  async patchAvatar(link) {
    const response = await fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({ avatar: link }),
    });

    return getResponseData(response);
  }
}
