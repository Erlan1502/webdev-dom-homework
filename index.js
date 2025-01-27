import { renderComments } from './modules/renderComments.js';
import { escapeHTML } from './modules/escapeHTML.js';
import { commentsData } from './modules/comments.js';
renderComments();
const addButton = document.querySelector('.add-form-button');
const nameInput = document.querySelector('.add-form-name');
const commentInput = document.querySelector('.add-form-text');
// const comments = document.querySelector(".comments");
addButton.addEventListener('click', () => {
    const name = escapeHTML(nameInput.value.trim());
    const comment = escapeHTML(commentInput.value.trim());

    if (name === '' || comment === '') {
        alert('Пожалуйста, заполните все поля формы.');
        return;
    }

    const currentDate = new Date();
    const dateString = currentDate.toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    });

    commentsData.push({
        name,
        date: dateString,
        text: comment,
        likes: 0,
        isLiked: false,
    });

    nameInput.value = '';
    commentInput.value = '';
    renderComments();
});

//modules were added in another fork
