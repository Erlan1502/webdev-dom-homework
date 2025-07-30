/* eslint-disable prettier/prettier */
import { login, updateToken } from './api.js';
import { renderRegistration } from './renderRegistration.js';
import { renderComments } from './renderComments.js';

export const renderLogin = () => {
    const app = document.getElementById(`app`);
    app.innerHTML = `<h1>Страница входа</h1>
        <div class="form">
            <h3 class="form-title">Форма входа</h3>
            <div class="form-row">
                <input 
                    type="text" 
                    id="login-input" 
                    class="input" 
                    placeholder="Логин"
                />
                <input
                    type="password"
                    id="password-input"
                    class="input"
                    placeholder="Пароль"
                />
            </div>
            <br />
            <button class="button" id="login-button">Войти</button>
            <button class="button" id="reg-button">Зарегистрироваться</button>
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
                return renderComments();
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
