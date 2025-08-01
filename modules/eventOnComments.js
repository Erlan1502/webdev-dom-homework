/* eslint-disable prettier/prettier */
import { renderComments } from './renderComments.js';
import { commentsData } from './comments.js';
import { escapeHTML } from './escapeHTML.js';
import { fetchAndRender } from './fetchAndRender.js';
import { postComments } from './api.js';

function delay(interval = 300) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, interval);
    });
}
export const addLike = () => {
    document.querySelectorAll('.like-button').forEach((button) => {
        button.classList.add('-loading-like');
        delay(2000).then(() => {
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
    });
};
export const addAnswer = () => {
    const commentInput = document.querySelector('.add-form-text');
    document.querySelectorAll('.comment').forEach((commentElement) => {
        commentElement.addEventListener('click', () => {
            const index = commentElement.dataset.index;
            const targetComment = commentsData[index];
            commentInput.value = `${targetComment.author.name}\n> ${targetComment.text}\n`;
        });
    });
};
export const addComment = () => {
    const commentInput = document.querySelector('.add-form-text');
    const addButton = document.querySelector('.add-form-button');
    const nameInput = document.querySelector('.add-form-name');
    const token = localStorage.getItem('authToken');
    addButton.addEventListener('click', () => {
        const name = escapeHTML(nameInput.value.trim());
        const comment = escapeHTML(commentInput.value.trim());
        if (!token) {
            alert('Вы не авторизованы. Зарегистрируйтесь или войдите.');
            return;
        }
        if (name === '' || comment === '') {
            alert('Пожалуйста, заполните все поля формы.');
            return;
        }
        if (name.length < 3 || comment.length < 3) {
            alert(
                'Длина имени и комментария должны быть не менее 3-х символов.',
            );
            return;
        }
        const currentDate = new Date();
        const dateString = currentDate;

        const loader = document.createElement('div');
        loader.className = 'loader';
        loader.innerHTML = `
            <div class="loader">Добавление комментария... подождите</div>
        `;

        const formContainer = document.querySelector('.container');

        document.querySelector('.add-form').style.display = 'none';
        formContainer.appendChild(loader);

        const postComment = (retryCount = 0) => {
            postComments({
                name,
                text: comment,
                date: dateString,
                // ЗАБЫЛ УБРАТЬ forceError: true,
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else if (response.status === 500 && retryCount > 0) {
                        console.log(
                            `Ошибка 500. Осталось попыток: ${retryCount}`,
                        );
                        return delay(100).then(() =>
                            postComment(retryCount - 1),
                        );
                    } else if (!token) {
                        alert(
                            'Вы не авторизованы, зарегистрируйтесь или войдите в аккаунт для добавления комментария',
                        );
                    } else {
                        throw new Error(
                            'Ошибка при добавлении комментария, попробуйте позже!!!',
                        );
                    }
                })
                .then(() => {
                    nameInput.value = '';
                    commentInput.value = '';
                })
                .then(() => fetchAndRender())
                .catch((error) => {
                    if (error.message === 'Failed to fetch') {
                        alert(
                            'Проверьте интернет-соединение. Попробуйте позже...',
                        );
                    } else {
                        alert(error.message);
                    }
                })
                .finally(() => {
                    loader.remove();
                    document.querySelector('.add-form').style.display = 'block';
                });
        };
        postComment();
    });
};
