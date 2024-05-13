document.addEventListener("DOMContentLoaded", async function() {
  try {
      const response = await fetch('http://localhost:3000/catalog/api/index');
      if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
      }
      const data = await response.json();
      const indexElement = document.getElementById('index');
      if (indexElement) {
          const htmlContent = `
              <p>Books: ${data.book_count}</p>
              <p>Copies: ${data.book_instance_count}</p>
              <p>Copies available: ${data.book_instance_available_count}</p>
              <p>Authors: ${data.author_count}</p>
              <p>Genres: ${data.genre_count}</p>
          `;
          indexElement.innerHTML = htmlContent;
      }
  } catch (error) {
      console.error('An error occurred while fetching data:', error);
  }
});
