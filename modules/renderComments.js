/* eslint-disable prettier/prettier */
import { commentsData } from './comments.js';
import { escapeHTML } from './escapeHTML.js';
const commentInput = document.querySelector('.add-form-text');
const comments = document.querySelector('.comments');
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
    comments.innerHTML = commentsData
        .map(
            (comment, index) => `
        <li class="comment" data-index="${index}">
          <div class="comment-header">
            <div>${escapeHTML(comment.author.name)}</div>
            <div>${formatDate(comment.date)}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${escapeHTML(comment.text)}
            </div>
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

    document.querySelectorAll('.comment').forEach((commentElement) => {
        commentElement.addEventListener('click', () => {
            const index = commentElement.dataset.index;
            const targetComment = commentsData[index];
            commentInput.value = `${targetComment.name}
        \n> ${targetComment.text}\n`;
        });
    });
};
//hw-5 is done
