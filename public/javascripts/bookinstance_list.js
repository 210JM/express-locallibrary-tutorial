document.addEventListener("DOMContentLoaded", function() {
    getData();
});

async function getData() {
    const bookInstanceList = document.getElementById("bookinstance-list");
    const url = "http://localhost:3000/catalog/api/bookinstance_list";

    try {
        const response = await fetch(url);
        const data = await response.json();
        const bookInstances = data.bookinstance_list;

        const list = bookInstances.map(bookInstance => `
            <div id="instance-${bookInstance._id}" class="book-instance">
                <h2><a href="http://localhost:3000/catalog/bookinstance/${bookInstance._id}", class="bookinstance-link">${bookInstance.book.title}</a></h2>
                <p><strong>Author:</strong> ${bookInstance.book.author}</p>
                <p><strong>Summary:</strong> ${bookInstance.book.summary}</p>
                <p><strong>Imprint:</strong> ${bookInstance.imprint}</p>
                <p><strong>Status:</strong> ${bookInstance.status}</p>
                <p><strong>Due Back:</strong> ${bookInstance.due_back? new Date(bookInstance.due_back).toLocaleDateString() : 'N/A'}</p>
                <button data-id="${bookInstance._id}" class="delete-button">Delete</button>
                <button data-id="${bookInstance._id}" class="update-button">Update</button>
            </div>
        `).join('');

        bookInstanceList.innerHTML = list;

        document.querySelectorAll('.delete-button').forEach(button => {
            button.addEventListener('click', function() {
                deleteBookInstance(button.dataset.id);
            });
        });

        document.querySelectorAll('.update-button').forEach(button => {
            button.addEventListener('click', function() {
                updateBookInstance(button.dataset.id);
            });
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function deleteBookInstance(id) {
    try {
        const response = await fetch(`http://localhost:3000/catalog/api/bookinstance/${id}/delete`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: id }),
        });

        if (!response.ok) {
            throw new Error("HTTP error: " + response.status);
        }

        const data = await response.json();
        console.log("Data successfully sent:", data);
        document.getElementById("instance-" + id).remove();
    } catch (error) {
        console.error("Error sending data:", error);
    }
}

function updateBookInstance(id) {
    window.location.href = `http://localhost:3000/catalog/bookinstance/${id}/update`;
}
