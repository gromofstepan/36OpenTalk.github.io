document.addEventListener('DOMContentLoaded', () => {
    const messageText = document.getElementById("messageText");
    const imageFile = document.getElementById("imageFile");
    messageText.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent the default action to avoid submitting the form
            sendMessage();
        }
    });
})

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

    if (imageFile) {
        formData.append("photo", imageFile);
        if (messageText) {
            formData.append("caption", messageText); // Добавляем текст только если есть изображение
        }
        formData.append("chat_id", getChannelId());
        apiUrl += "sendPhoto"; // Если есть изображение, используем sendPhoto
    } else {
        // Если нет изображения, отправляем только текст
        formData.append("chat_id", getChannelId());
        formData.append("text", messageText);
        apiUrl += "sendMessage"; // Если нет изображения, используем sendMessage
    }

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            messageDiv.className = "success";
            messageDiv.textContent = "Сообщение успешно отправлено!";
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

function toggleTheme() {
    const body = document.querySelector("body");
    body.classList.toggle("dark-theme");
}
