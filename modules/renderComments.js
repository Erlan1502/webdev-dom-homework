import { commentsData } from './comments.js';
import { addAnswer, addComment, addLike } from './eventOnComments.js';
// const commentInput = document.querySelector('.add-form-text');
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
            <div>${comment.author.name}</div>
            <div>${formatDate(comment.date)}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${comment.text}
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
    addAnswer();
    addLike();
};
addComment();
//Исправлено экранирование comment.name и comment.text при помощи удаления escapeHTML
