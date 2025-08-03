/* eslint-disable prettier/prettier */
import { commentsData } from './comments.js';
import { escapeHTML } from './escapeHTML.js';
import { addComment } from './eventOnComments.js';
import { renderLogin } from './renderLogin.js';
const formatDate = (dateString) => {
    if (!dateString) return 'Неизвестно';
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    });
};

export const renderComments = () => {
    const app = document.getElementById('app');
    const token = localStorage.getItem('authToken');
    const userName = localStorage.getItem('userName'); // Получаем имя пользователя
    console.log(token);
    
    const commentsHtml = commentsData
        .map(
            (comment, index) => `
        <li class="comment" data-index="${index}">
          <div class="comment-header">
            <div>${escapeHTML(comment.author.name)}</div>
            <div>${formatDate(comment.date)}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">${escapeHTML(comment.text)}</div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comment.likes}</span>
              <button class="like-button ${
                  comment.isLiked ? '-active-like' : ''
              }" data-index="${index}"></button>
            </div>
          </div>
        </li>`,
        )
        .join('');

    const authButtonHtml = token
        ? `<button class="auth-button logout-button">Выйти</button>`
        : `<button class="auth-button login-button">Войти</button>`;
        
    const addFormHtml = token
        ? `<div class="add-form">
                <input type="text" class="add-form-name" value="${escapeHTML(userName || '')}" readonly />
                <textarea type="textarea" class="add-form-text"
                    placeholder="Введите ваш комментарий" rows="4"></textarea>
                <div class="add-form-row">
                    <button class="add-form-button">Написать</button>
                </div>
            </div>`
        : '';
    const appHtml = `<div class="container">
            <div class="auth-section">${authButtonHtml}</div>
            <ul class="comments">${commentsHtml}</ul>
            ${addFormHtml}
        </div>`;

    app.innerHTML = appHtml;

    const authButton = document.querySelector('.auth-button');
    if (authButton) {
        authButton.addEventListener('click', () => {
            if (token) {
                localStorage.removeItem('authToken');
                localStorage.removeItem('userName'); // Чтобы не сохраняло при другом пользователе
                window.location.reload();
            } else {
                renderLogin();
            }
        });
    }

    document.querySelectorAll('.like-button').forEach((button) => {
        button.addEventListener('click', (event) => {
            event.stopPropagation();
            const index = button.dataset.index;
            const targetComment = commentsData[index];
            button.classList.add('-loading-like');

            setTimeout(() => {
                if (targetComment.isLiked) {
                    targetComment.likes--;
                } else {
                    targetComment.likes++;
                }
                targetComment.isLiked = !targetComment.isLiked;
                renderComments();
            }, 2000);
        });
    });
    const commentInput = document.querySelector('.add-form-text');
    
    if (commentInput) { 
        document.querySelectorAll('.comment').forEach((commentElement) => {
            commentElement.addEventListener('click', () => {
                const index = commentElement.dataset.index;
                const targetComment = commentsData[index];
                commentInput.value = `> ${targetComment.text}\n${targetComment.author.name}, `;
            });
        });
    }
    addComment();
};