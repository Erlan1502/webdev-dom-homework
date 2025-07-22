/* eslint-disable prettier/prettier */
import { fetchAndRender } from './modules/fetchAndRender.js';
import { renderComments } from './modules/renderComments.js';
import { renderRegistration } from './modules/renderRegistration.js';

const token = localStorage.getItem('authToken');

if (token) {
    renderComments();
    fetchAndRender();
} else {
    renderRegistration();
}
