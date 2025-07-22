/* eslint-disable prettier/prettier */
import { updateCommentsData } from './comments.js';
import { renderComments } from './renderComments.js';
import { getComments } from './api.js';
import { addComment } from './eventOnComments.js';

export const fetchAndRender = () => {
    const commentsContainer = document.querySelector('.comments');
    commentsContainer.innerHTML = `
            <div class="loader-text">Загружаем комментарии...</div>
    `;
    return getComments()
        .then((response) => {
            console.log('Ответ от API:', response.comments); // Проверка
            updateCommentsData(response.comments || []);
            renderComments();
            addComment();
        })
        .catch((error) => {
            console.error(error);
        });
};
