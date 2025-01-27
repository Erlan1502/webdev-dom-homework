/* eslint-disable prettier/prettier */
import { renderComments } from './renderComments';
import { commentsData } from './comments';
import { escapeHTML } from './escapeHTML';
const commentInput = document.querySelector('.add-form-text');
const addButton = document.querySelector('.add-form-button');
const nameInput = document.querySelector('.add-form-name');
export const addLike = () => {
    document.querySelectorAll('.like-button').forEach((button) => {
        button.addEventListener('click', (event) => {
            event.stopPropagation();
            const index = button.dataset.index;
            const targetComment = commentsData[index];

            if (targetComment.isLiked) {
                targetComment.likes--;
            } else {
                targetComment.likes++;
            }
            targetComment.isLiked = !targetComment.isLiked;
            renderComments();
        });
    });
};
export const addAnswer = () => {
    document.querySelectorAll('.comment').forEach((commentElement) => {
        commentElement.addEventListener('click', () => {
            const index = commentElement.dataset.index;
            const targetComment = commentsData[index];
            commentInput.value = `${targetComment.name}
        \n> ${targetComment.text}\n`;
        });
    });
};
export const addComment = () => {
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
};
