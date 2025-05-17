/* eslint-disable prettier/prettier */
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
};
