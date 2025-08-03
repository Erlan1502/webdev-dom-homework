/* eslint-disable prettier/prettier */
import { updateCommentsData } from './comments.js';
import { renderComments } from './renderComments.js';
import { getComments } from './api.js';
import { addComment } from './eventOnComments.js';
import { updateToken } from './api.js';
import { renderRegistration } from './renderRegistration.js';

const handleLogout = () => {
    updateToken('');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    renderRegistration();
};

export const fetchAndRender = () => {
    const app = document.getElementById('app');
    const loadingHtml = `
        <div class="container">
            <ul class="comments">
                <div class="loader-text">Загружаем комментарии...</div>
            </ul>
        </div>
    `;
    app.innerHTML = loadingHtml;
    return getComments()
        .then((response) => {
            console.log('Ответ от API:', response.comments);
            updateCommentsData(response.comments || []);
            renderComments();
        })
        .catch((error) => {
            if (error.message.includes('401')) {
                handleLogout();
            }
            console.error(error);
        });
};