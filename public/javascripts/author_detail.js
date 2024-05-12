document.addEventListener("DOMContentLoaded", () => {
    getData();
  });
  
  function getData() {
      fetch("/catalog/api/author/" + window.location.pathname.split("/").pop())
      .then(response => response.json())
      .then(data => {
          const authorDetailDiv = document.getElementById('authorDetail');
          // Создаем элементы для отображения данных
          const authorName = document.createElement('h2');
          authorName.textContent = `${data.author.first_name} ${data.author.family_name}`;
          const authorId = document.createElement('p');
          authorId.textContent = `Author ID: ${data.author._id}`;
          const authorBirth = document.createElement('p');
          authorBirth.textContent = `Date of birth: ${data.author.date_of_birth}`;
          authorBirth.classList.add('author-birth');
          if (data.author.date_of_birth === undefined || data.author.date_of_birth === null) {
              authorBirth.textContent = 'Date of birth: N/A';
          }
          const authorDeath = document.createElement('p');
          authorDeath.textContent = `Date of death: ${data.author.date_of_death} `;
          authorDeath.classList.add('author-death');
          if (data.author.date_of_death === undefined || data.author.date_of_death === null) {
              authorDeath.textContent = 'Date of death: N/A';
          }
  
          const booksList = document.createElement('ul');
          data.author_books.forEach(book => {
              const bookItem = document.createElement('li');
              bookItem.textContent = `${book.title}: ${book.summary}`;
              booksList.appendChild(bookItem);
          });
          const authorDelete = document.createElement('button');
          authorDelete.textContent = 'Delete';
          authorDelete.classList.add('delete-button');
          const id = data.author._id;
          const books = data.author_books.length;
          // authorDelete.onclick = () => deleteAuthor(id, books);
          authorDelete.onclick = () => {
              deleteAuthor(id, books)
                  .then(() => {
                      // Функция выполнена успешно, переходим на другую страницу
                      window.location.href = 'http://localhost:3000/catalog/authors';
                  })
                  .catch(error => {
                      // Если произошла ошибка во время выполнения функции, вы можете обработать её здесь
                      console.error('Ошибка при выполнении функции deleteAuthor:', error);
                      // Дополнительные действия по обработке ошибки, если необходимо
                  });
          };
          
          const authorUpdate = document.createElement('button');
          authorUpdate.textContent = 'Update';
          authorUpdate.classList.add('update-button');
          authorUpdate.onclick = () => updateAuthor(id);
  
  
          // Очищаем содержимое div перед вставкой новых данных
          authorDetailDiv.innerHTML = '';
  
          // Вставляем данные в div
          authorDetailDiv.appendChild(authorName);
          authorDetailDiv.appendChild(authorId); 
          authorDetailDiv.appendChild(authorBirth);
          authorDetailDiv.appendChild(authorDeath);
          authorDetailDiv.appendChild(booksList);
          authorDetailDiv.appendChild(authorDelete);
          authorDetailDiv.appendChild(authorUpdate);
      })
      .catch(error => {
          console.error('Error fetching data:', error);
      });
  }
  
  
  async function deleteAuthor(id, books) {
      if (books > 0) {
          alert('Author has books. Delete them first');
          return;
      } else {
          fetch(`/catalog/api/author/${id}/delete`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ authorid: id })
          })
          .then(response => response.json())
      
          .catch(error => {
              console.error('Error deleting author:', error);
          });
      }
  };
  
  async function updateAuthor(id) {
      window.location.href = 'http://localhost:3000/catalog/author/' + id + '/update';
  }