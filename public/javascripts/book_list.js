document.addEventListener('DOMContentLoaded', () => {
    fetchBooks();
  });
  
  async function fetchBooks() {
    try {
        const response = await fetch('http://localhost:3000/catalog/api/book_list', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });
  
        const data = await response.json();
  
        if (data && data.book_list) {
            displayBooks(data.book_list);
        } else {
            showError('No books found');
        }
    } catch (error) {
        showError('Error fetching books');
    }
  }
  function displayBooks(books) {
    const bookContainer = document.getElementById('bookContainer');
    bookContainer.innerHTML = '';
    books.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.classList.add('book');
  
        const titleElement = document.createElement('div');
        const titleLink = document.createElement('a');
        titleElement.classList.add('book-title');
        titleLink.classList.add('book-title-link');
        titleElement.appendChild(titleLink);
        titleLink.textContent = book.title;
        bookElement.appendChild(titleElement);
        titleLink.href = `http://localhost:3000/catalog/book/${book._id}`;
  
        const authorsElement = document.createElement('div');
        authorsElement.classList.add('book-authors');
        
        authorsElement.textContent = `${book.author.first_name} ${book.author.family_name}`;
        bookElement.appendChild(authorsElement);
  
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteBook(book._id)); // Call deleteBook function with book's ID
        bookElement.appendChild(deleteButton);
  
        bookContainer.appendChild(bookElement);
    });
  }
  
  async function deleteBook(id) {
      try {
          const response = await fetch(`/catalog/api/book/${id}/delete`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({ id: id })
          });
  
          if (response.ok) {
              // Book successfully deleted, now fetch updated book list
              fetchBooks();
          } else {
              // Handle non-success status codes
              console.error('Error deleting book:', response.status);
              // Optionally show an error message to the user
              showError(`Error deleting book: ${response.status}`);
          }
      } catch (error) {
          console.error('Error deleting book:', error);
          // Optionally show an error message to the user
          showError(`Error deleting book: ${error}`);
      }
  }
  
  
  
  
  
  
  
  
  
  // async function createBook(title, authorId, summary, isbn, genreId) {
  //     try {
  //         const response = await fetch('http://localhost:3000/catalog/books', {
  //             method: 'POST',
  //             headers: {
  //                 'Content-Type': 'application/json'
  //             },
  //             body: JSON.stringify({
  //                 title: title,
  //                 author: authorId,
  //                 summary: summary,
  //                 isbn: isbn,
  //                 genre: genreId
  //             })
  //         });
    
  //         if (!response.ok) {
  //             throw new Error('Error creating book');
  //         }
    
  //         const data = await response.json();
  //         // Optionally, you can refresh the book list after adding a new book
  //         fetchBooks();
  //     } catch (error) {
  //         console.error('Error:', error);
  //         showError('Error creating book');
  //     }
  // }
  // async function fetchFormData() {
  //   try {
  //       const response = await fetch('http://localhost:3000/catalog/bookscreateform', {
  //           method: 'GET',
  //           headers: {
  //               'Content-Type': 'application/json'
  //           }
  //       });
  //       if (!response.ok) {
  //           throw new Error('Error fetching form data');
  //       }
  
  //       const data = await response.json();
  //       console.log(data)
  //       populateForm(data.authors, data.genres);
  //   } catch (error) {
  //       console.error(error);
  //       showError(error);
  //   }
  // }
  // function populateForm(authors, genres) {
  //   const authorSelect = document.getElementById('authorSelect');
  //   const genreCheckboxes = document.getElementById('genreCheckboxes');
  
  //   // Clear existing options
  //   authorSelect.innerHTML = '';
  //   genreCheckboxes.innerHTML = '';
  //   // Populate authors dropdown
  //   authors.forEach(author => {
  //       const option = document.createElement('option');
  //       option.value = author._id;
  //       option.textContent = `${author.first_name} ${author.family_name}`;
  //       authorSelect.appendChild(option);
  //   });
  
  //   // Populate genres checkboxes
  //   genres.forEach(genre => {
  //       const label = document.createElement('label');
  //       const checkbox = document.createElement('input');
  //       checkbox.type = 'checkbox';
  //       checkbox.name = 'genre';
  //       checkbox.value = genre._id;
  //       label.appendChild(checkbox);
  //       label.appendChild(document.createTextNode(genre.name));
  //       genreCheckboxes.appendChild(label);
  //   });
  // }
  // function createModal() {
  //   const modal = document.createElement('div');
  //   modal.id = 'bookCreationModal';
  
  //   const modalContent = document.createElement('div');
  //   modalContent.id = 'modalContent';
  
  //   const closeButton = document.createElement('span');
  //   closeButton.id = 'closeButton';
  //   closeButton.textContent = '×';
  //   closeButton.onclick = function() {
  //       modal.style.display = 'none';
  //   };
  
  //   const form = document.createElement('form');
  //   form.id = 'bookCreationForm';
  
  //   // Title input
  //   const titleLabel = document.createElement('label');
  //   titleLabel.textContent = 'Title:';
  //   const titleInput = document.createElement('input');
  //   titleInput.type = 'text';
  //   titleInput.name = 'title';
  //   titleInput.id = 'titleInput';
  //   form.appendChild(titleLabel);
  //   form.appendChild(titleInput);
  
  //   // Author dropdown
  //   const authorLabel = document.createElement('label');
  //   authorLabel.textContent = 'Author:';
  //   const authorSelect = document.createElement('select');
  //   authorSelect.name = 'author';
  //   authorSelect.id = 'authorSelect'; // Assign a unique ID to the authorSelect element
  //   form.appendChild(authorLabel);
  //   form.appendChild(authorSelect);
  
  //   // Summary textarea
  //   const summaryLabel = document.createElement('label');
  //   summaryLabel.textContent = 'Summary:';
  //   const summaryTextarea = document.createElement('textarea');
  //   summaryTextarea.name = 'summary';
  //   summaryTextarea.id = 'summaryTextarea';
  //   form.appendChild(summaryLabel);
  //   form.appendChild(summaryTextarea);
  
  //   // ISBN input
  //   const isbnLabel = document.createElement('label');
  //   isbnLabel.textContent = 'ISBN:';
  //   const isbnInput = document.createElement('input');
  //   isbnInput.type = 'text';
  //   isbnInput.name = 'isbn';
  //   isbnInput.id = 'isbnInput';
  //   form.appendChild(isbnLabel);
  //   form.appendChild(isbnInput);
  
  //   // Genre checkboxes
  //   const genreLabel = document.createElement('label');
  //   genreLabel.textContent = 'Genres:';
  //   const genreCheckboxesContainer = document.createElement('div');
  //   genreCheckboxesContainer.id = 'genreCheckboxes'; // Assign a unique ID to the genreCheckboxesContainer
  //   form.appendChild(genreLabel);
  //   form.appendChild(genreCheckboxesContainer);
  
  //   const cancelButton = document.createElement('button');
  //   cancelButton.type = 'button';
  //   cancelButton.textContent = 'Cancel';
  //   cancelButton.onclick = function() {
  //       modal.style.display = 'none';
  //   };
  
  //   const createButton = document.createElement('button');
  //   createButton.type = 'submit';
  //   createButton.textContent = 'Create';
  //   createButton.onclick = function(event) {
  //       event.preventDefault();
  //       // Collect form data
  //       const title = document.getElementById('titleInput').value;
  //       const authorId = document.getElementById('authorSelect').value;
  //       const summary = document.getElementById('summaryTextarea').value;
  //       const isbn = document.getElementById('isbnInput').value;
  
  //       // Collect selected genres
  //       const genreCheckboxes = document.querySelectorAll('#genreCheckboxes input[type="checkbox"]:checked');
  //       const genreIds = Array.from(genreCheckboxes).map(checkbox => checkbox.value);
  
  //       // Call createBook function with collected data
  //       createBook(title, authorId, summary, isbn, genreIds);
  //       modal.style.display = 'none';
  //       // fetchBooks()
  //   };
  
  //   modalContent.appendChild(closeButton);
  //   modalContent.appendChild(form);
  //   modalContent.appendChild(cancelButton);
  //   modalContent.appendChild(createButton);
  //   modal.appendChild(modalContent);
  //   document.body.appendChild(modal);
  //   // Create a button to trigger the modal display
  //   const triggerButton = document.createElement('button');
  //   triggerButton.textContent = 'Create New Book';
  //   triggerButton.id = 'createBookButton';
  //   document.body.appendChild(triggerButton);
  
  //   // Add an event listener to the trigger button
  //   triggerButton.addEventListener('click', () => {
  //       modal.style.display = 'block'; // Show the modal
  //       fetchFormData(); // Fetch and populate form data
  //   });
  // }
  function showError(message) {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
  
    // Append toast to body
    document.body.appendChild(toast);
  
    // Show the toast
    toast.classList.add('show');
  
    // Hide the toast after 15 seconds or when clicked
    const hideToast = () => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 500); // Remove from DOM after transition
    };
  
    setTimeout(hideToast, 15000); // Hide after 15 seconds
    toast.addEventListener('click', hideToast);
  }