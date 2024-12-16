document.getElementById('upload-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const fileInput = document.getElementById('file-upload');
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);

    fetch('/upload', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`, // JWT token
        },
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        alert('File uploaded successfully!');
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
