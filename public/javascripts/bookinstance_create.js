async function loadBooks() {
  try {
      const response = await fetch("http://localhost:3000/catalog/api/book_list");
      if (!response.ok) {
          throw new Error("Failed to fetch books");
      }
      const data = await response.json();
      const bookDropdown = document.getElementById("book");
      bookDropdown.innerHTML = ""; // Clear previous options
      data.book_list.forEach(book => {
          const option = document.createElement("option");
          option.value = book._id;
          option.textContent = book.title;
          bookDropdown.appendChild(option);
      });
  } catch (error) {
      console.error("Error:", error);
  }
}

window.addEventListener("load", loadBooks);

document.getElementById("updateForm").addEventListener("submit", async function(event) {
  event.preventDefault();
  const formData = new FormData(this);
  const requestData = Object.fromEntries(formData.entries());
  const jsonData = JSON.stringify(requestData);
  try {
      const response = await fetch("/catalog/api/bookinstance/create", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: jsonData
      });
      if (response.ok) {
          console.log("Create successful");
          alert("Book instance created successfully");
      }
  } catch (error) {
      console.error("Error:", error);
  }
});
