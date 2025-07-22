import { registration, updateToken } from './api.js';
import { fetchAndRender } from './fetchAndRender.js';
import { renderLogin } from './renderLogin.js';
/* eslint-disable prettier/prettier */

export const renderRegistration = () => {
    const app = document.getElementById(`app`);
    app.innerHTML = `<h1>Страница регистрации</h1>
        <div class="form">
            <h3 class="form-title">Форма регистрации</h3>
            <div class="form-row">
                <input 
                    type="text" 
                    id="login-input" 
                    class="input" 
                    placeholder="Логин"
                />
                <input 
                    type="text" 
                    id="name-input" 
                    class="input" 
                    placeholder="Имя"
                />
                <input
                    type="password"
                    id="password-input"
                    class="input"
                    placeholder="Пароль"
                />
            </div>
            <br />
            <button class="button" id="reg-button">Зарегистрироваться</button>
            <button class="button" id="login-button">Войти</button>
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
                updateToken(responseData.user.token); //Сохранение для следующей сессии
                localStorage.setItem('authToken', responseData.user.token);
                fetchAndRender();
            })
            .catch((error) => {
                alert('Ошибка регистрации: ' + error.message);
            });
    });
    const buttonLogin = document.getElementById('login-button');
    buttonLogin.addEventListener('click', () => {
        renderLogin();
    });
};
