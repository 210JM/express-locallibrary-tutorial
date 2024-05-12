document.addEventListener('DOMContentLoaded', function() {
    // Функция, которая отправляет POST запрос
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

    // Получаем форму
    const form = document.getElementById('genreForm');

    // Обработчик события отправки формы
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Предотвращаем отправку формы по умолчанию

        // Получаем значения полей формы
        const title = document.getElementById('titleInput').value;

        // Создаем объект с данными формы
        const formData = {
            name: title
            // Добавьте другие поля формы, если есть
        };

        // Отправляем данные на сервер
        postData('/catalog/api/genre/create', formData)
            .then(response => {
                console.log('Response:', response);
                window.location.href = '/catalog/genre/' + response.genre._id;
            });

        // Очищаем поля формы после отправки
        form.reset();
    });
});