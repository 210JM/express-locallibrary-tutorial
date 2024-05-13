async function fetchGenreDataAndPopulateForm() {
  const path = window.location.pathname;
  const regex = /\/genre\/([^/]+)\/update/;
  const match = path.match(regex);
  const id = match? match[1] : null;

  if (!id) {
      console.error('Genre ID not found in URL');
      return;
  }

  try {
      const response = await fetch('/catalog/api/genre/' + id + '/update');
      if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
      }
      const data = await response.json();
      const titleInput = document.getElementById('titleInput');
      if (titleInput) {
          titleInput.value = data.genre.name;
      } else {
          console.error('Element with id "titleInput" not found');
      }

      const updateGenreBtn = document.getElementById('updateGenreBtn');
      if (updateGenreBtn) {
          updateGenreBtn.addEventListener('click', async function(event) {
              event.preventDefault();
              const newName = titleInput.value;
              await updateGenre(id, newName);
          });
      } else {
          console.error('Button with id "updateGenreBtn" not found');
      }
  } catch (error) {
      console.error('Error fetching data:', error);
  }
}

async function updateGenre(id, newName) {
  const data = { name: newName };

  try {
      const response = await fetch("/catalog/api/genre/" + id + "/update", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
      });
      if (!response.ok) {
          throw new Error('HTTP error: ' + response.status);
      }
      const data = await response.json();
      console.log('Data successfully sent:', data);
      window.location.href = '/catalog/genre/' + data.genre._id;
  } catch (error) {
      console.error('Error sending data:', error);
  }
}

fetchGenreDataAndPopulateForm();
