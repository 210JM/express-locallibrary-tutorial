document.addEventListener("DOMContentLoaded", function() {
  getData();
});

async function getData() {
  try {
      const response = await fetch('http://localhost:3000/catalog/api/author_list');
      const data = await response.json();
      displayAuthors(data.author_list);
  } catch (error) {
      console.error('Error fetching data:', error);
  }
}

function displayAuthors(authors) {
  const authorList = document.getElementById('author-list');
  authorList.innerHTML = '';

  if (!authors || authors.length === 0) {
      authorList.innerHTML = '<li>No authors found.</li>';
      return;
  }

  authors.forEach(author => {
      const li = document.createElement('li');
      const link = document.createElement('a');
      link.href = `/catalog/author/${author._id}`; // Используем шаблонную строку
      link.textContent = `${author.first_name} ${author.family_name}`;
      link.classList.add('author-link');
      li.appendChild(link);
      authorList.appendChild(li);
  });
}
