async function fetchDataAndPopulateDropdowns(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (!data || !data.authors || !data.genres) {
            throw new Error('Invalid response format');
        }
        populateAuthorsDropdown(data.authors, 'authorId');
        populateGenresCheckboxes(data.genres, 'genresContainer');
    } catch (error) {
        console.error('Error fetching and populating dropdowns:', error);
    }
}

function populateAuthorsDropdown(data, dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    data.forEach(item => {
        const option = document.createElement('option');
        option.text = `${item.first_name} ${item.family_name}`;
        option.value = item._id;
        dropdown.appendChild(option);
    });
}

function populateGenresCheckboxes(data, containerId) {
    const container = document.getElementById(containerId);
    data.forEach(item => {
        const checkboxContainer = document.createElement('div');
        checkboxContainer.classList.add('checkbox-container');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = item._id;
        checkbox.id = item._id;
        checkbox.name = 'genreId'; // Устанавливаем имя для группы чекбоксов

        const label = document.createElement('label');
        label.htmlFor = item._id;
        label.appendChild(checkbox);
        label.innerHTML += '<span>' + item.name + '</span>';

        checkboxContainer.appendChild(label);
        container.appendChild(checkboxContainer);
    });
}

// Выполнить запрос и заполнить выпадающие списки при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    fetchDataAndPopulateDropdowns('/catalog/api/book/create');
});

document.getElementById('createBookBtn').addEventListener('click', function() {
    const title = document.getElementById('title').value;
    const authorId = document.getElementById('authorId').value;
    const summary = document.getElementById('summary').value;
    const isbn = document.getElementById('isbn').value;
    const genreCheckboxes = document.querySelectorAll('input[name="genreId"]:checked');
    const genreIds = Array.from(genreCheckboxes).map(checkbox => checkbox.value); // Создаем массив айдишников жанров

    // Проверка заполнения всех обязательных полей
    if (!title || !authorId || !summary || !isbn || genreIds.length === 0) {
        alert('Please fill in all required fields.');
        return;
    }

    // Отправка POST-запроса на сервер
    fetch('/catalog/api/book/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            author: authorId,
            summary: summary,
            isbn: isbn,
            genre: genreIds // Отправляем массив с айдишниками жанров
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.errors) {
            console.log(data.errors);
            alert('Error creating book');
        } else {
            // const authorId = data.author._id;
            alert('Book created successfully');
        }
    })    
    .catch(error => {
        console.error('Error creating author:', error);
    });
});
