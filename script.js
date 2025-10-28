// Константа для ключа в localStorage
const THEME_STORAGE_KEY = 'user-theme'; // 'light' или 'dark'

document.addEventListener('DOMContentLoaded', () => {
    // Инициализация темы при загрузке страницы
    applyInitialTheme();

    const messageText = document.getElementById("messageText");
    messageText.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && !event.shiftKey) { // Отправка по Enter, но Shift+Enter для новой строки
            event.preventDefault();
            sendMessage();
        }
    });
});

// Функция для применения темы (добавляет/удаляет класс 'dark-theme')
function applyTheme(theme) {
    const body = document.querySelector("body");
    if (theme === 'dark') {
        body.classList.add('dark-theme');
    } else {
        body.classList.remove('dark-theme');
    }
    // Сохраняем выбор пользователя в localStorage
    localStorage.setItem(THEME_STORAGE_KEY, theme);
}

// Функция для определения предпочтительной темы
function getPreferredTheme() {
    // 1. Проверяем, есть ли выбор пользователя в localStorage
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (storedTheme) {
        return storedTheme;
    }

    // 2. Если нет, проверяем системные предпочтения
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }

    // 3. По умолчанию - светлая тема
    return 'light';
}

// Функция для инициализации темы при загрузке
function applyInitialTheme() {
    applyTheme(getPreferredTheme());

    // Отслеживаем изменения системных предпочтений, если пользователь еще не сделал явный выбор
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        // Применяем системное предпочтение только если пользователь не сохранил свой выбор
        if (!localStorage.getItem(THEME_STORAGE_KEY)) {
            applyTheme(event.matches ? 'dark' : 'light');
        }
    });
}

// Функция для переключения темы вручную
function toggleTheme() {
    const body = document.querySelector("body");
    const currentTheme = body.classList.contains('dark-theme') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
}


async function sendMessage() {
    const messageText = document.getElementById("messageText").value;
    const imageFile = document.getElementById("imageFile").files[0];
    const messageDiv = document.getElementById("message");

    if (!messageText && !imageFile) {
        messageDiv.className = "error";
        messageDiv.textContent = "Пожалуйста, введите сообщение или выберите изображение.";
        return;
    }

    const formData = new FormData();
    let apiUrl = `https://api.telegram.org/bot${getBotToken()}/`; // Базовый URL
    let successMessage = "Сообщение успешно отправлено!";

    if (imageFile) {
        formData.append("photo", imageFile);
        if (messageText) {
            formData.append("caption", messageText);
        }
        formData.append("chat_id", getChannelId());
        apiUrl += "sendPhoto";
        successMessage = "Изображение и сообщение успешно отправлены!";
    } else {
        formData.append("chat_id", getChannelId());
        formData.append("text", messageText);
        apiUrl += "sendMessage";
    }

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            messageDiv.className = "success";
            messageDiv.textContent = successMessage;
            // Очистка полей после успешной отправки
            document.getElementById("messageText").value = '';
            document.getElementById("imageFile").value = ''; // Сброс выбранного файла
        } else {
            let errorText = "Ошибка при отправке: " + response.statusText;

            try {
                const errorData = await response.json();
                if (errorData.description) {
                    errorText += " - " + errorData.description;
                }
                if (errorData.error_code) {
                    errorText += " (Код ошибки: " + errorData.error_code + ")";
                }
            } catch (jsonError) {
                errorText += " (Не удалось распарсить JSON с ошибкой)";
            }

            messageDiv.className = "error";
            messageDiv.textContent = errorText;
        }

    } catch (error) {
        messageDiv.className = "error";
        messageDiv.textContent = "Ошибка запроса: " + error;
    }
}
