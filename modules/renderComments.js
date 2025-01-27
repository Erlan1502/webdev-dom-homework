import { commentsData } from './comments.js';
import { escapeHTML } from './escapeHTML.js';
import { addAnswer, addLike } from './eventOnComments.js';
// const commentInput = document.querySelector('.add-form-text');
const comments = document.querySelector('.comments');
export const renderComments = () => {
    comments.innerHTML = commentsData
        .map(
            (comment, index) => `
        <li class="comment" data-index="${index}">
          <div class="comment-header">
            <div>${escapeHTML(comment.name)}</div>
            <div>${comment.date}</div>
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

    addAnswer();
    addLike();
};
