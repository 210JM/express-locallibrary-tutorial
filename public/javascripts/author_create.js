document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('createAuthorBtn').addEventListener('click', submitForm);
});

function submitForm() {
    // Проверяем наличие всех необходимых элементов формы
    const firstNameInput = document.getElementById("first_name");
    const familyNameInput = document.getElementById("family_name");
    const dateOfBirthInput = document.getElementById("date_of_birth");
    const dateOfDeathInput = document.getElementById("date_of_death");

    if (!firstNameInput ||!familyNameInput ||!dateOfBirthInput ||!dateOfDeathInput) {
        alert('Please fill in all fields.');
        return; // Прекращаем выполнение функции, если какие-либо поля пустые
    }

    fetch('/catalog/api/author/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            first_name: firstNameInput.value,
            family_name: familyNameInput.value,
            date_of_birth: dateOfBirthInput.value,
            date_of_death: dateOfDeathInput.value
        })
    })
   .then(response => {
        if (!response.ok) { // Проверяем статус ответа
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
   .then(data => {
        if (data.errors) {
            console.log(data.errors);
            alert('Error creating author');
        } else {
            const authorId = data.author._id;
            alert(`Author created successfully. Redirecting to author page...`);
            window.location.href = `/catalog/author/${authorId}`; // Используем шаблонную строку
        }
    })    
   .catch(error => {
        console.error('Error creating author:', error);
        alert('An error occurred while creating the author.');
    });
}
