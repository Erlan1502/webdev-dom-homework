/* eslint-disable prettier/prettier */
import { addComment } from './modules/eventOnComments.js';
import { fetchAndRender } from './modules/fetchAndRender.js';
import { renderComments } from './modules/renderComments.js';
import { renderLogin } from './modules/renderLogin.js';
import { renderRegistration } from './modules/renderRegistration.js';
renderRegistration();
renderLogin();
renderComments();
fetchAndRender();
addComment();
