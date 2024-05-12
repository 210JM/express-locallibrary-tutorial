document.addEventListener("DOMContentLoaded", function() {
    getGenreData();
});

function getGenreData() {
    fetch('http://localhost:3000/catalog/api/genre_list')
    .then(response => response.json())
    .then(data => {
        displayGenres(data.genre_list);
    })
    .catch(error => console.error('Error fetching data:', error));
}

function displayGenres(genres) {
    const genreList = document.getElementById('genre-list');
    genreList.innerHTML = '';

    genres.forEach(genre => {
        const div = document.createElement('div');
        const link = document.createElement('a');
        link.href = `/catalog/genre/${genre._id}`; // Замените на нужный вам путь
        link.textContent = genre.name;
        link.classList.add('genre-link');
        div.appendChild(link);
        genreList.appendChild(div);
    });
}