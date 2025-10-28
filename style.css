ss
/* Определяем переменные для светлой темы по умолчанию */
:root {
    --bg-color: #f8f8f8; /* Очень светлый серый */
    --text-color: #333;
    --container-bg: #fff;
    --container-border: #e0e0e0;
    --button-bg: #d32f2f; /* Красный */
    --button-hover-bg: #b71c1c;
    --header-bg: #d32f2f; /* Красный для шапки */
    --header-color: #fff; /* Белый текст в шапке */
    --input-bg: #fff;
    --input-border: #ccc;
    --link-color: #d32f2f;

    /* Цвета для сообщений */
    --success-bg: #d4edda;
    --success-text: #155724;
    --success-border: #c3e6cb;
    --error-bg: #f8d7da;
    --error-text: #721c24;
    --error-border: #f5c6cb;

    /* Цвета для переключателя темы */
    --toggle-button-bg: #6c757d; /* Серый */
    --toggle-button-hover-bg: #5a6268;

    /* Общие стили */
    --border-radius-sm: 6px;
    --border-radius-md: 10px;
    --box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

/* Переопределяем переменные для темной темы, если пользователь предпочитает темную схему */
@media (prefers-color-scheme: dark) {
    :root {
        --bg-color: #303030;
        --text-color: #e0e0e0;
        --container-bg: #424242;
        --container-border: #555;
        --button-bg: #f44336; /* Более светлый красный */
        --button-hover-bg: #e53935;
        --header-bg: #f44336; /* Более светлый красный для шапки */
        --header-color: #fff;
        --input-bg: #4d4d4d;
        --input-border: #666;
        --link-color: #f44336;

        --success-bg: #386738;
        --success-text: #c3e6cb;
        --success-border: #218838;
        --error-bg: #8c3838;
        --error-text: #f5c6cb;
        --error-border: #dc3545;

        --toggle-button-bg: #adb5bd;
        --toggle-button-hover-bg: #9ea7ae;
    }
}

/* Принудительная темная тема при наличии класса .dark-theme (для переключателя) */
body.dark-theme {
    --bg-color: #303030;
    --text-color: #e0e0e0;
    --container-bg: #424242;
    --container-border: #555;
    --button-bg: #f44336;
    --button-hover-bg: #e53935;
    --header-bg: #f44336;
    --header-color: #fff;
    --input-bg: #4d4d4d;
    --input-border: #666;
    --link-color: #f44336;

    --success-bg: #386738;
    --success-text: #c3e6cb;
    --success-border: #218838;
    --error-bg: #8c3838;
    --error-text: #f5c6cb;
    --error-border: #dc3545;

    --toggle-button-bg: #adb5bd;
    --toggle-button-hover-bg: #9ea7ae;
}

/* Общие стили */
body {
    font-family: 'Roboto', 'Segoe UI', Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: var(--bg-color);
    color: var(--text-color);
    transition: background-color 0.3s ease, color 0.3s ease;
}

header {
    background-color: var(--header-bg);
    color: var(--header-color);
    text-align: center;
    padding: 15px 0; /* Уменьшил отступ в шапке */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: sticky; /* Фиксированная шапка */
    top: 0;
    z-index: 100;
}

header h1 {
    margin: 0; /* Убрал отступы у заголовка в шапке */
    font-size: 1.8em;
}

.container {
    background-color: var(--container-bg);
    border: 1px solid var(--container-border);
    border-radius: var(--border-radius-md);
    padding: 20px;
    box-shadow: var(--box-shadow);
    text-align: center;
    width: 90%;
    max-width: 600px;
    margin: 20px auto; /* Центрирование контейнера и небольшой отступ сверху */
    transition: background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}

textarea,
input[type="file"] {
    width: calc(100% - 20px);
    padding: 10px;
    margin-bottom: 12px;
    border: 1px solid var(--input-border);
    border-radius: var(--border-radius-sm);
    background-color: var(--input-bg);
    color: var(--text-color);
    resize: vertical;
    box-sizing: border-box;
    transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
}

textarea::placeholder {
    color: var(--text-color);
    opacity: 0.6;
}

input[type="file"] {
    cursor: pointer;
}

button {
    background-color: var(--button-bg);
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: var(--border-radius-sm);
    cursor: pointer;
    margin: 5px;
    font-size: 1em;
    transition: background-color 0.2s ease, transform 0.1s ease;
}

button:hover {
    background-color: var(--button-hover-bg);
    transform: translateY(-1px);
}

button:active {
    transform: translateY(0);
}

#message {
    margin-top: 15px;
    padding: 12px;
    border-radius: var(--border-radius-sm);
    width: calc(100% - 24px);
    margin-left: auto;
    margin-right: auto;
    text-align: left;
    box-sizing: border-box;
    font-size: 0.9em;
}

.success {
    background-color: var(--success-bg);
    color: var(--success-text);
    border: 1px solid var(--success-border);
}

.error {
    background-color: var(--error-bg);
    color: var(--error-text);
    border: 1px solid var(--error-border);
}

.contact-info {
    margin-top: 25px;
    text-align: center;
    font-size: 0.8em;
    color: var(--text-color);
    opacity: 0.7;
}

.contact-info h3 {
    margin-bottom: 5px;
    color: var(--text-color);
}

.contact-info p {
    margin: 3px 0;
}

.contact-info a {
    color: var(--link-color);
    text-decoration: none;
    transition: color 0.3s ease;
}

.contact-info a:hover {
    text-decoration: underline;
}

/* Стили переключателя тем */
.theme-toggle {
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 1000;
}

.theme-toggle button {
    background-color: var(--toggle-button-bg);
    color: white;
    padding: 6px 12px;
    border: none;
    border-radius: var(--border-radius-sm);
    cursor: pointer;
    font-size: 0.8em;
    transition: background-color 0.2s ease, transform 0.1s ease;
}

.theme-toggle button:hover {
    background-color: var(--toggle-button-hover-bg);
    transform: translateY(-1px);
}