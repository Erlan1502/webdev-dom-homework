import { commentsData } from './comments.js';
import { escapeHTML } from './escapeHTML.js';
const commentInput = document.querySelector('.add-form-text');
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

    document.querySelectorAll('.comment').forEach((commentElement) => {
        commentElement.addEventListener('click', () => {
            const index = commentElement.dataset.index;
            const targetComment = commentsData[index];
            commentInput.value = `${targetComment.name}
        \n> ${targetComment.text}\n`;
        });
    });
};
