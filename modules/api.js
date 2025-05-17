/* eslint-disable prettier/prettier */
const host = 'https://wedev-api.sky.pro/api/v2/comments';

const token = localStorage.getItem('token');

export function getComments() {
    return fetch(host, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
    }).then((response) => {
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
}
export function postComments({ text }) {
    return fetch(host, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ text }),
    }).then((response) => {
        return response.json();
    });
}
