/* eslint-disable prettier/prettier */
import { addComment } from './modules/eventOnComments.js';
import { fetchAndRender } from './modules/fetchAndRender.js';
import { renderComments } from './modules/renderComments.js';
renderComments();
fetchAndRender();
addComment();
