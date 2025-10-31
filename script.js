
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
    // Проверяем, существует ли window.matchMedia, чтобы избежать ошибок в SSR
    if (typeof window.matchMedia !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }

    // 3. По умолчанию - светлая тема
    return 'light';
}

// Функция для инициализации темы при загрузке
function applyInitialTheme() {
    // Применяем тему, определенную getPreferredTheme()
    applyTheme(getPreferredTheme());

    // Отслеживаем изменения системных предпочтений,
    // но будем применять их только если пользователь еще не сделал свой выбор (т.е. нет записи в localStorage)
    if (typeof window.matchMedia !== 'undefined') {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
            // Если в localStorage нет явного выбора темы, применяем системное предпочтение
            if (!localStorage.getItem(THEME_STORAGE_KEY)) {
                applyTheme(event.matches ? 'dark' : 'light');
            }
        });
    }
}

// Функция для переключения темы вручную
function toggleTheme() {
    const body = document.querySelector("body");
    // Определяем текущую тему на основе класса на body
    const currentTheme = body.classList.contains('dark-theme') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme); // Применяем новую тему
}


async function sendMessage() {
    const messageText = document.getElementById("messageText").value;
    const imageFile = document.getElementById("imageFile").files[0];
    const messageDiv = document.getElementById("message");

    // Очистка предыдущих сообщений об ошибках/успехе
    messageDiv.textContent = '';
    messageDiv.className = '';

    if (!messageText && !imageFile) {
        messageDiv.className = "error";
        messageDiv.textContent = "Пожалуйста, введите сообщение или выберите изображение.";
        return;
    }

    const formData = new FormData();
    // Используем константы из config.js
    const botToken = getBotToken();
    const channelId = getChannelId();

    // Проверяем, что токен и ID канала существуют
    if (!botToken || !channelId) {
        messageDiv.className = "error";
        messageDiv.textContent = "Ошибка конфигурации: токен бота или ID канала не установлен.";
        return;
    }

    let apiUrl = `https://api.telegram.org/bot${botToken}/`; // Базовый URL
    let successMessage = "Сообщение успешно отправлено!";

    if (imageFile) {
        formData.append("photo", imageFile);
        if (messageText) {
            formData.append("caption", messageText);
        }
        formData.append("chat_id", channelId);
        apiUrl += "sendPhoto";
        successMessage = "Изображение и сообщение успешно отправлены!";
    } else {
        formData.append("chat_id", channelId);
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
            let errorText = `Ошибка при отправке: ${response.status} ${response.statusText}`;

            try {
                const errorData = await response.json();
                if (errorData.description) {
                    errorText += ` - ${errorData.description}`;
                }
                if (errorData.error_code) {
                    errorText += ` (Код ошибки: ${errorData.error_code})`;
                }
            } catch (jsonError) {
                // Если ответ не JSON, пытаемся прочитать как текст
                try {
                    const textError = await response.text();
                    errorText += ` (Текст ошибки: ${textError})`;
                } catch (textErrorCatch) {
                    errorText += " (Не удалось получить дополнительную информацию об ошибке)";
                }
            }

            messageDiv.className = "error";
            messageDiv.textContent = errorText;
        }

    } catch (error) {
        messageDiv.className = "error";
        messageDiv.textContent = `Ошибка запроса: ${error.message}`;
    }
}