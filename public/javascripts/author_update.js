document.addEventListener("DOMContentLoaded", function() {
    fetchAndUpdateAuthor();
});

// Остальные функции остаются без изменений...

async function fetchAndUpdateAuthor() {
    const path = window.location.pathname;
    const regex = /\/author\/([^/]+)\/update/;
    const match = path.match(regex);
    const id = match[1];
    try {
        const response = await fetch(`/catalog/api/author/${id}/update`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const author = data.author;
        let authorUpdateElement = document.getElementById("authorUpdate");
        if (!authorUpdateElement) {
            authorUpdateElement = document.createElement("div");
            authorUpdateElement.id = "authorUpdate";
            document.body.appendChild(authorUpdateElement);
        }
        authorUpdateElement.innerHTML = '';

        const fields = ['first_name', 'family_name', 'date_of_birth', 'date_of_death'];
        fields.forEach(field => {
            let input = createInputField(field, author[field]);
            let label = createLabel(field, field);
            authorUpdateElement.appendChild(label);
            if (field.includes('date')) {
                input.value = author[field]? formatDateToString(author[field]) : '';
            }
            authorUpdateElement.appendChild(input);
            authorUpdateElement.appendChild(document.createElement("br"));
        });

        let submitButton = createButton("Update", function() {
            updateAuthor(id);
        });
        authorUpdateElement.appendChild(submitButton);
    } catch (error) {
        console.error('Error fetching author data:', error);
    }
}

// Остальные функции остаются без изменений...
