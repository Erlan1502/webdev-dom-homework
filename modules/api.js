/* eslint-disable prettier/prettier */
const host = 'https://wedev-api.sky.pro/api/v2/gleb-fokin/comments';

let token = localStorage.getItem('authToken') || '';

export const updateToken = (newToken) => {
    token = newToken;
    localStorage.setItem('authToken', newToken);
};

const authHost = `https://wedev-api.sky.pro/api/user`;

export function getComments() {
    return fetch(host, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
    }).then((response) => {
        if (!response.ok) {
            throw new Error(`Ошибка сервера: ${response.status}`);
        }
        return response.json();
    });
}

export function deleteComments({ id }) {
    return fetch(`${host}/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
    }).then((response) => {
        return response.json();
    });
} // Пусть будет, через постман поудаляю

export function postComments({ name, text, date }) {
    return fetch(host, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, text, date }),
    }).then((response) => {
        return response;
    });
}

export function login({ login, password }) {
    return fetch(`${authHost}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password }),
    }).then((response) => {
        if (!response.ok) {
            throw new Error('Неверный логин или пароль');
        }
        return response.json();
    });
}

export function registration({ login, name, password }) {
    return fetch(`${authHost}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, name, password }),
    }).then((response) => {
        if (!response.ok) {
            return response.json().then((errorData) => {
                throw new Error(errorData.error || 'Ошибка регистрации');
            });
        }
        return response.json();
    });
}
