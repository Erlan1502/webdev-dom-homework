import { updateCommentsData } from './comments.js';
import { renderComments } from './renderComments.js';

export const fetchAndRender = () => {
    return fetch('https://wedev-api.sky.pro/api/v1/gleb-fokin/comments')
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            updateCommentsData(data.comments || []);
            renderComments();
        })
        .catch((error) => console.error('Ошибка загрузки данных:', error));
};
