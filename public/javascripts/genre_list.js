document.addEventListener("DOMContentLoaded", async function() {
    try {
        await getGenreData();
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('An error occurred while fetching genre data. Please try again later.');
    }
});

async function getGenreData() {
    try {
        const response = await fetch('http://localhost:3000/catalog/api/genre_list');
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        const data = await response.json();
        displayGenres(data.genre_list);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayGenres(genres) {
    const genreList = document.getElementById('genre-list');
    genreList.innerHTML = '';

    const genreLinkTemplate = document.createElement('template');
    genreLinkTemplate.innerHTML = `
        <div class="genre-item">
            <a href="/catalog/genre/{{_id}}" class="genre-link">{{name}}</a>
        </div>
    `;

    genres.forEach(genre => {
        const div = genreLinkTemplate.content.cloneNode(true);
        div.querySelector('.genre-link').href = `/catalog/genre/${genre._id}`;
        div.querySelector('.genre-link').textContent = genre.name;
        genreList.appendChild(div);
    });
}
