/* eslint-disable prettier/prettier */
import { updateCommentsData } from './comments.js';
import { renderComments } from './renderComments.js';

export const fetchAndRender = () => {
    return fetch('https://wedev-api.sky.pro/api/v1/gleb-fokin/comments')
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
            console.log(data.comments);
            updateCommentsData(data.comments || []);
            renderComments();
        });
};
