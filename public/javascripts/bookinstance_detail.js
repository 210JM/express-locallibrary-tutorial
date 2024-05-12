function fetchAndInsertData() {
    fetch('/catalog/api/bookinstance/' + window.location.pathname.split('/').pop())
        .then(response => response.json())
        .then(data => {
            const bookinstance = data.bookinstance;
            const book = bookinstance.book;

            const bookDetailDiv = document.getElementById('bookinstanceDetail');
            bookDetailDiv.innerHTML = `
                <h2>${book.title}</h2>
                <p><strong>Author:</strong> ${book.author}</p>
                <p><strong>Summary:</strong> ${book.summary}</p>
                <p><strong>ISBN:</strong> ${book.isbn}</p>
                <p><strong>Imprint:</strong> ${bookinstance.imprint}</p>
                <p><strong>Status:</strong> ${bookinstance.status}</p>
                <p><strong>Due Back:</strong> ${bookinstance.due_back}</p>
            `;
        })
        .catch(error => {
            console.error('Error fetching and inserting data:', error);
        });
}

fetchAndInsertData();