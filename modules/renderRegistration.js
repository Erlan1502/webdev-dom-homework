/* eslint-disable prettier/prettier */
export const renderRegistration = () => {
    const app = document.getElementById(`app`);
    app.innerHTML = `<h1>Страница регистрации</h1>
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
            <button class="button" id="login-button">Зарегистрироваться</button>
        </div>`;
};
