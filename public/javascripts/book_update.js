async function fetchDataAndPopulateForm() {
    try {
        const path = window.location.pathname;
        const regex = /\/book\/([^/]+)\/update/;
        const match = path.match(regex);
        const id = match[1];

        const apiUrl = "/catalog/api/book/" + id + "/update";
        const response = await fetch(apiUrl);
        const data = await response.json();

        document.getElementById('title').value = data.title || '';
        document.getElementById('summary').value = data.summary || '';
        document.getElementById('isbn').value = data.isbn || '';

        const authorSelect = document.getElementById('authorId');
        const option = document.createElement('option');
        option.text = data.author.name;
        option.value = data.author.id;
        authorSelect.appendChild(option);

        const genresContainer = document.getElementById('genresContainer');
        for (const genre of data.genres) {
            const genreDiv = document.createElement('div');
            genreDiv.textContent = genre;
            genresContainer.appendChild(genreDiv);
        }
    } catch (error) {
        console.error('Error fetching and populating data:', error);
    }
}

fetchDataAndPopulateForm();