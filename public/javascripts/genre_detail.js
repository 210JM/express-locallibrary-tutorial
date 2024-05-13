function fetchGenreDetailsAndDisplay() {
    return new Promise(async (resolve, reject) => {
        try {
            const genreId = window.location.pathname.split("/").pop(); // Предполагается, что это корректный способ получения ID
            const response = await fetch(`/catalog/api/genre/${genreId}`);
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }
            const data = await response.json();
            let genreInfo = `<h2>${data.genre.name}</h2><ul>`;
            genreInfo += `<p><strong>ID:</strong> ${data.genre._id}</p>`;
            genreInfo += `<h2><strong>Books</strong></h2>`;
            data.genre_books.forEach(book => {
                genreInfo += `<li><strong>${book.title}</strong>: ${book.summary}</li>`;
            });
            genreInfo += '</ul>';

            document.getElementById('genreDetail').innerHTML = genreInfo;

            // Создание кнопок и привязка событий
            const buttons = [
                { type: 'delete', text: 'Delete', action: () => deleteGenre(genreId, data.genre_books.length) },
                { type: 'update', text: 'Update', action: () => updateGenre(genreId) }
            ];

            buttons.forEach(button => {
                const buttonElement = document.createElement('button');
                buttonElement.classList.add(button.type + '-button');
                buttonElement.textContent = button.text;
                buttonElement.addEventListener('click', button.action);
                document.getElementById('genreDetail').appendChild(buttonElement);
            });

            resolve();
        } catch (error) {
            reject(error);
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    fetchGenreDetailsAndDisplay().catch(error => {
        console.error('An error occurred:', error);
        alert('An error occurred while fetching genre details. Please try again later.');
    });
});

async function deleteGenre(id, books) {
    if (books > 0) {
        alert('Genre has books. Delete them first');
        return;
    } else {
        try {
            const response = await fetch(`/catalog/api/genre/${id}/delete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: id })
            });
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }
            console.log('Genre deleted successfully');
        } catch (error) {
            console.error('Error deleting genre:', error);
            alert('Failed to delete genre. Please try again.');
        }
    }
};

async function updateGenre(id) {
    window.location.href = 'http://localhost:3000/catalog/genre/' + id + '/update';
}
