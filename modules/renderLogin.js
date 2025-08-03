/* eslint-disable prettier/prettier */
import { login, updateToken } from './api.js';
import { renderRegistration } from './renderRegistration.js';
import { renderComments } from './renderComments.js';
import { fetchAndRender } from './fetchAndRender.js';

export const renderLogin = () => {
    const app = document.getElementById(`app`);
    app.innerHTML = `<div class="container">
        <div class="auth-form">
            <h1 class="auth-title">Вход</h1>
            <div class="auth-fields">
                <input 
                    type="text" 
                    id="login-input" 
                    class="auth-input" 
                    placeholder="Логин"
                />
                <input
                    type="password"
                    id="password-input"
                    class="auth-input"
                    placeholder="Пароль"
                />
            </div>
            <div class="auth-buttons">
                <button class="auth-submit-button" id="login-button">Войти</button>
                <button class="auth-switch-button" id="reg-button">Зарегистрироваться</button>
            </div>
        </div>
    </div>`;

    const button = document.getElementById('login-button');
    const loginElement = document.getElementById('login-input');
    const passwordElement = document.getElementById('password-input');

    button.addEventListener('click', () => {
        const loginValue = loginElement.value.trim();
        const passwordValue = passwordElement.value.trim();

        if (!loginValue || !passwordValue) {
            alert('Заполните все поля');
            return;
        }

        login({
            login: loginValue,
            password: passwordValue,
        })
            .then((responseData) => {
                if (!responseData.user?.token) {
                    throw new Error('Ошибка авторизации');
                }
                updateToken(responseData.user.token);
                localStorage.setItem('authToken', responseData.user.token);
                localStorage.setItem('userName', responseData.user.name); // Для реализации вставки имени

                renderComments();

                return fetchAndRender();
            })
            .then(() => {
                alert('Вы успешно вошли.');
            })
            .catch((error) => {
                console.error('Login error:', error);
                alert('Ошибка входа: ' + error.message);
            });
    });

    const buttonReg = document.getElementById('reg-button');
    buttonReg.addEventListener('click', () => {
        renderRegistration();
    });
};
