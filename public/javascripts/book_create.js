document.addEventListener('DOMContentLoaded', function() {
    fetchDataAndPopulateDropdowns('/catalog/api/book/create');
});

async function fetchDataAndPopulateDropdowns(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (!data ||!data.authors ||!data.genres) {
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
    if (!container) {
        console.error('Container not found');
        return;
    }
    data.forEach(item => {
        const checkboxContainer = document.createElement('div');
        checkboxContainer.classList.add('checkbox-container');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = item._id;
        checkbox.id = item._id;
        checkbox.name = 'genreId';

        const label = document.createElement('label');
        label.htmlFor = item._id;
        label.appendChild(checkbox);
        label.innerHTML += `<span>${item.name}</span>`;

        checkboxContainer.appendChild(label);
        container.appendChild(checkboxContainer);
    });
}

// Остальной код остается без изменений...
