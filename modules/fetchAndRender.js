/* eslint-disable prettier/prettier */
import { updateCommentsData } from './comments.js';
import { renderComments } from './renderComments.js';

export const fetchAndRender = () => {
    const commentsContainer = document.querySelector('.comments');
    commentsContainer.innerHTML = `
            <div class="loader-text">Загружаем комментарии...</div>
    `;
    const token = localStorage.getItem('token');
    return fetch('https://wedev-api.sky.pro/api/v2/Erlan/comments', {
        headers: { Authorizaton: `Bearer: ${token}` },
    })
        .then((response) => {
            if (response.status === 500) {
                throw new Error('Сервер сломан, попробуйте позже.');
            }
            if (response.status === 400) {
                throw new Error('Запрос данных некорректен.');
            }
            return response.json();
        })
        .then((data) => {
            updateCommentsData(data.comments || []);
            renderComments();
        })
        .catch((error) => {
            console.error(error);
        });
};
