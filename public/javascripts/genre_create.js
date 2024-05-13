// Определение функции postData вне обработчика событий
function postData(url, data) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
   .then(response => response.json())
   .catch(error => console.error('Error:', error));
}

document.addEventListener('DOMContentLoaded', async function() {
    // Получаем форму
    const form = document.getElementById('genreForm');

    // Обработчик события отправки формы
    form.addEventListener('submit', async function(event) {
        event.preventDefault(); // Предотвращаем отправку формы по умолчанию

        // Получаем значения полей формы
        const title = document.getElementById('titleInput').value;

        // Создаем объект с данными формы
        const formData = {
            name: title
            // Добавьте другие поля формы, если есть
        };

        try {
            // Отправляем данные на сервер
            const response = await postData('/catalog/api/genre/create', formData);

            console.log('Response:', response);
            window.location.href = '/catalog/genre/' + response.genre._id;
        } catch (error) {
            console.error('Error:', error);
        }

        // Очищаем поля формы после отправки
        form.reset();
    });
});
