/* eslint-disable prettier/prettier */
import { registration, updateToken } from './api.js';
import { renderComments } from './renderComments.js';
import { renderLogin } from './renderLogin.js';

export const renderRegistration = () => {
    const app = document.getElementById(`app`);
    app.innerHTML = `<div class="container">
        <div class="auth-form">
            <h1 class="auth-title">Регистрация</h1>
            <div class="auth-fields">
                <input 
                    type="text" 
                    id="login-input" 
                    class="auth-input" 
                    placeholder="Логин"
                />
                <input 
                    type="text" 
                    id="name-input" 
                    class="auth-input" 
                    placeholder="Имя"
                />
                <input
                    type="password"
                    id="password-input"
                    class="auth-input"
                    placeholder="Пароль"
                />
            </div>
            <div class="auth-buttons">
                <button class="auth-submit-button" id="reg-button">Зарегистрироваться</button>
                <button class="auth-switch-button" id="login-button">Войти</button>
            </div>
        </div>
    </div>`;

    const buttonReg = document.getElementById('reg-button');
    const loginElement = document.getElementById('login-input');
    const nameElement = document.getElementById('name-input');
    const passwordElement = document.getElementById('password-input');

    buttonReg.addEventListener('click', () => {
        registration({
            login: loginElement.value,
            name: nameElement.value,
            password: passwordElement.value,
        })
            .then((responseData) => {
                updateToken(responseData.user.token); 
                localStorage.setItem('authToken', responseData.user.token);
                localStorage.setItem('userName', responseData.user.name);
                alert('Вы успешно зарегистрировались.');
            })
            .catch((error) => {
                alert('Ошибка регистрации: ' + error.message);
            });

        renderComments();
    });
    const buttonLogin = document.getElementById('login-button');
    buttonLogin.addEventListener('click', () => {
        renderLogin();
    });
};
