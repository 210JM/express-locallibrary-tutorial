document.addEventListener("DOMContentLoaded", () => {
    getData();
});

async function getData() {
    try {
        const response = await fetch(`/catalog/api/author/${window.location.pathname.split("/").pop()}`);
        const data = await response.json();
        displayAuthorData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayAuthorData(data) {
    const authorDetailDiv = document.getElementById('authorDetail');
    authorDetailDiv.innerHTML = ''; // Очищаем содержимое div перед вставкой новых данных

    // Создаем элементы для отображения данных
    const authorName = document.createElement('h2');
    authorName.textContent = `${data.author.first_name} ${data.author.family_name}`;
    const authorId = document.createElement('p');
    authorId.textContent = `Author ID: ${data.author._id}`;
    const authorBirth = document.createElement('p');
    authorBirth.textContent = `Date of birth: ${data.author.date_of_birth}`;
    authorBirth.classList.add('author-birth');
    if (data.author.date_of_birth === undefined || data.author.date_of_birth === null) {
        authorBirth.textContent = 'Date of birth: N/A';
    }
    const authorDeath = document.createElement('p');
    authorDeath.textContent = `Date of death: ${data.author.date_of_death}`;
    authorDeath.classList.add('author-death');
    if (data.author.date_of_death === undefined || data.author.date_of_death === null) {
        authorDeath.textContent = 'Date of death: N/A';
    }

    const booksList = document.createElement('ul');
    data.author_books.forEach(book => {
        const bookItem = document.createElement('li');
        bookItem.textContent = `${book.title}: ${book.summary}`;
        booksList.appendChild(bookItem);
    });

    const authorDelete = document.createElement('button');
    authorDelete.textContent = 'Delete';
    authorDelete.classList.add('delete-button');
    authorDelete.onclick = () => {
        deleteAuthor(data.author._id)
           .then(() => {
                alert('Author deleted successfully.');
            })
           .catch(error => {
                console.error('Ошибка при выполнении функции deleteAuthor:', error);
            });
    };

    const authorUpdate = document.createElement('button');
    authorUpdate.textContent = 'Update';
    authorUpdate.classList.add('update-button');
    authorUpdate.onclick = () => updateAuthor(data.author._id);

    // Вставляем данные в div
    authorDetailDiv.appendChild(authorName);
    authorDetailDiv.appendChild(authorId);
    authorDetailDiv.appendChild(authorBirth);
    authorDetailDiv.appendChild(authorDeath);
    authorDetailDiv.appendChild(booksList);
    authorDetailDiv.appendChild(authorDelete);
    authorDetailDiv.appendChild(authorUpdate);
}

async function deleteAuthor(id) {
    try {
        if (data.author_books.length > 0) {
            alert('Author has books. Delete them first');
            return;
        } else {
            await fetch(`/catalog/api/author/${id}/delete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ authorid: id })
            });
            alert('Author deleted successfully.');
        }
    } catch (error) {
        console.error('Error deleting author:', error);
    }
};

function updateAuthor(id) {
    window.location.href = `http://localhost:3000/catalog/author/${id}/update`;
}
