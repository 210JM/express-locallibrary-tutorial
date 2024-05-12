document.addEventListener("DOMContentLoaded", function() {
    getData();
  });
  
  function getData() {
    fetch('http://localhost:3000/catalog/api/author_list')
    .then(response => response.json())
    .then(data => {
        displayAuthors(data.author_list);
    })
    .catch(error => console.error('Error fetching data:', error));
  }
  
  function displayAuthors(authors) {
    const authorList = document.getElementById('author-list');
    authorList.innerHTML = '';
  
    authors.forEach(author => {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = `/catalog/author/${author._id}`; // Замените на нужный вам путь
        link.textContent = `${author.first_name} ${author.family_name}`;
        link.classList.add('author-link');
        li.appendChild(link);
        authorList.appendChild(li);
    });
  }
  