/* eslint-disable prettier/prettier */
import { renderComments } from './renderComments.js';
import { commentsData, updateCommentsData } from './comments.js';
import { escapeHTML } from './escapeHTML.js';
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
            commentInput.value = `${targetComment.author.name}\n> ${targetComment.text}\n`;
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
        const dateString = currentDate;
        //Убрано по причине дальнейшей не надобности, всё происходит в рендере
        fetch('https://wedev-api.sky.pro/api/v1/gleb-fokin/comments', {
            method: 'POST',
            body: JSON.stringify({
                name,
                date: dateString,
                text: comment,
                likes: 0,
                isLiked: false,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                fetch('https://wedev-api.sky.pro/api/v1/gleb-fokin/comments')
                    .then((response) => response.json())
                    .then((updatedData) => {
                        updateCommentsData(updatedData.comments || []);
                        renderComments();
                    });
            });

        nameInput.value = '';
        commentInput.value = '';
        renderComments();
    });
};
