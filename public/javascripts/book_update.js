async function fetchDataAndPopulateForm() {
    try {
        const path = window.location.pathname;
        const regex = /\/book\/([^/]+)\/update/;
        const match = path.match(regex);
        if (!match) {
            console.error('Invalid URL path');
            return;
        }
        const id = match[1];

        const apiUrl = `/catalog/api/book/${id}/update`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error status: ${response.status}`);
        }
        const data = await response.json();

        const titleInput = document.getElementById('title');
        if (titleInput) {
            titleInput.value = data.title || '';
        }

        const summaryInput = document.getElementById('summary');
        if (summaryInput) {
            summaryInput.value = data.summary || '';
        }

        const isbnInput = document.getElementById('isbn');
        if (isbnInput) {
            isbnInput.value = data.isbn || '';
        }

        const authorSelect = document.getElementById('authorId');
        if (authorSelect) {
            const option = document.createElement('option');
            option.text = data.author.name;
            option.value = data.author.id;
            authorSelect.appendChild(option);
        }

        const genresContainer = document.getElementById('genresContainer');
        if (genresContainer) {
            for (const genre of data.genres) {
                const genreDiv = document.createElement('div');
                genreDiv.textContent = genre;
                genresContainer.appendChild(genreDiv);
            }
        }
    } catch (error) {
        console.error('Error fetching and populating data:', error);
    }
}

fetchDataAndPopulateForm();
